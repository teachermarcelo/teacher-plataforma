/* Teacher Planning ↔ Class Center ↔ Calendar bridge, additive/no migration.
   Keeps existing planning records. Scheduled records with a class are mirrored into tic_events
   using an explicit marker, so edits/removals can target only the matching mirrored event.
*/
(function(){
 'use strict';
 if(window.__ticPlanningCalendarBridgeV1)return;
 window.__ticPlanningCalendarBridgeV1=true;
 const EXTRA='\n\n[FI_EXTRA_LINKS]\n';
 const MARK='[TEACHER_PLANNING_ITEM:';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const db=()=>window.sb||(typeof sb!=='undefined'?sb:null);
 const usr=()=>window.session?.user||(typeof session!=='undefined'?session?.user:null)||window.__session?.user||null;
 const parseUrls=s=>[...new Set(String(s||'').split(/[\n\r,;]+/).map(x=>x.trim()).filter(x=>/^https?:\/\//i.test(x)))];
 function unpackNotes(value){
  const raw=String(value||''),ix=raw.indexOf(EXTRA);
  const clean=(ix>=0?raw.slice(0,ix):raw).replace(/\n?\[TEACHER_PLANNING_ITEM:[^\]]+\]/g,'').trim();
  const links=ix>=0?parseUrls(raw.slice(ix+EXTRA.length)):[];
  return {clean,links};
 }
 function packNotes(clean,extras,id){
  return String(clean||'').trim()+EXTRA+parseUrls((extras||[]).join('\n')).join('\n')+'\n'+MARK+id+']';
 }
 function localValue(value){
  if(!value)return '';const d=new Date(value);if(Number.isNaN(d.getTime()))return '';
  const p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+p(d.getHours())+':'+p(d.getMinutes());
 }
 function installStyles(){
  if(document.getElementById('tic-planning-bridge-css'))return;
  const style=document.createElement('style');style.id='tic-planning-bridge-css';
  style.textContent='.tic-planning-multi-links{display:flex;gap:7px;flex-wrap:wrap;margin:8px 0}.tic-planning-multi-links a{display:inline-flex;gap:5px;align-items:center;padding:6px 9px;border:1px solid #d9ccff;border-radius:9px;color:#5630b8;background:#faf8ff;text-decoration:none;font-size:11px;font-weight:700;overflow-wrap:anywhere}.tic-planning-multi-links a:hover{background:#eee7ff;text-decoration:underline}.tic-planning-links-help{font-size:11px;color:#71688a;margin:4px 0 0}';
  document.head.appendChild(style);
 }
 function decoratePlanning(){
  installStyles();
  const root=document.getElementById('content');if(!root)return;
  root.querySelectorAll('.tic-planning-multi-links').forEach(x=>x.remove());
  root.querySelectorAll('p').forEach(p=>{
   const raw=p.textContent||'';if(!raw.includes('[FI_EXTRA_LINKS]'))return;
   const ix=raw.indexOf('[FI_EXTRA_LINKS]'),notes=raw.slice(0,ix).trim(),urls=parseUrls(raw.slice(ix+'[FI_EXTRA_LINKS]'.length));
   p.textContent=notes;p.hidden=!notes;
   const existing=[...p.parentElement.querySelectorAll('a[href]')].map(a=>a.href);
   const all=[...new Set([...existing.filter(u=>/^https?:\/\//i.test(u)),...urls])];
   if(!all.length)return;
   const box=document.createElement('div');box.className='tic-planning-multi-links';box.setAttribute('aria-label','Links de aula e materiais');
   all.forEach((url,i)=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='↗ '+(i===0?'Abrir link principal':'Recurso '+(i+1));a.title=url;box.appendChild(a)});
   p.insertAdjacentElement('afterend',box);
  });
 }
 function enhanceForm(){
  const notesEl=document.getElementById('tpNotes'),urlEl=document.getElementById('tpUrl');
  if(notesEl){
   const {clean,links}=unpackNotes(notesEl.value);
   notesEl.value=clean;
   if(urlEl&&links.length){urlEl.value=[urlEl.value,...links].filter(Boolean).join('\n')}
  }
  if(urlEl&&urlEl.tagName!=='TEXTAREA'){
   const area=document.createElement('textarea');area.id='tpUrl';area.name=urlEl.name||'tpUrl';area.rows=4;area.value=urlEl.value;
   area.placeholder='Cole um link por linha (aula, slides, vídeo, material...)';area.setAttribute('aria-label','Links da aula e recursos, um por linha');
   urlEl.replaceWith(area);
   const field=area.closest('.field');
   const label=field?.querySelector('label');if(label)label.textContent='Links da aula e recursos (opcional; um por linha)';
   const help=document.createElement('p');help.className='tic-planning-links-help';help.textContent='O primeiro link será o principal. Todos ficarão clicáveis na turma, no planejamento e na agenda.';field?.appendChild(help);
  }
 }
 async function syncOne(item){
  const database=db(),u=usr();if(!database||!u?.id||!item?.id||!item.class_id||!item.scheduled_at)return {skipped:true};
  const links=[item.resource_url,...unpackNotes(item.notes).links].filter(Boolean);
  const parsed=unpackNotes(item.notes),stamp=new Date(item.scheduled_at);
  if(Number.isNaN(stamp.getTime()))return {skipped:true};
  const marker=MARK+item.id+']';
  const base=database.from('tic_events').select('id,title,notes,starts_at,meeting_url,class_id,teacher_id,event_type,status,ends_at');
  let event=null;
  const marked=await base.eq('teacher_id',u.id).eq('class_id',item.class_id).ilike('notes','%'+marker+'%').limit(1).maybeSingle();
  if(marked.error)throw marked.error;
  event=marked.data||null;
  if(!event){
   const lower=new Date(stamp.getTime()-120000).toISOString(),upper=new Date(stamp.getTime()+120000).toISOString();
   const matched=await database.from('tic_events').select('id,title,notes,starts_at,meeting_url,class_id,teacher_id,event_type,status,ends_at').eq('teacher_id',u.id).eq('class_id',item.class_id).eq('title',item.title).gte('starts_at',lower).lte('starts_at',upper).limit(5);
   if(matched.error)throw matched.error;
   event=(matched.data||[]).find(e=>String(e.title||'').trim().toLowerCase()===String(item.title||'').trim().toLowerCase())||null;
  }
  const existingLinks=event?(window.ticV63GetEventLinks?window.ticV63GetEventLinks(event):[event.meeting_url,...parseUrls(unpackNotes(event.notes).links.join('\n'))].filter(Boolean)):[];
  const mergedLinks=[...new Set([...links,...existingLinks])];
  const main=links[0]||event?.meeting_url||null;
  const extra=mergedLinks.filter(x=>x!==main);
  const oldEventNotes=event?unpackNotes(event.notes).clean:'';
  const noteText=parsed.clean||oldEventNotes;
  const payload={teacher_id:u.id,class_id:item.class_id,title:item.title,event_type:(item.category==='agenda'?'meeting':'lesson'),starts_at:stamp.toISOString(),ends_at:new Date(stamp.getTime()+60*60000).toISOString(),meeting_url:main,notes:packNotes(noteText,extra,item.id),status:item.status==='done'?'completed':'scheduled'};
  if(event){
   const {error:updateError}=await database.from('tic_events').update(payload).eq('id',event.id).eq('teacher_id',u.id);
   if(updateError)throw updateError;
   return {updated:true};
  }
  const {error:insertError}=await database.from('tic_events').insert(payload);
  if(insertError)throw insertError;
  return {created:true};
 }
 function install(){
  if(typeof window.openTeacherPlanningForm==='function'&&!window.openTeacherPlanningForm.__bridgeV1){
   const original=window.openTeacherPlanningForm;
   const wrapped=async function(...args){const result=await original.apply(this,args);enhanceForm();return result};
   wrapped.__bridgeV1=true;window.openTeacherPlanningForm=wrapped;
  }
  if(typeof window.saveTeacherPlanningItem==='function'&&!window.saveTeacherPlanningItem.__bridgeV1){
   window.saveTeacherPlanningItem=async function(e,itemId){
    e.preventDefault();const btn=document.getElementById('tpSave');const originalText=btn?.textContent||'Salvar planejamento';
    if(btn){btn.disabled=true;btn.textContent='Salvando…';btn.setAttribute('aria-busy','true')}
    const notify=(message,type)=>{if(typeof window.toast==='function')window.toast(message,type);else alert(message)};
    try{
     const database=db(),u=usr();if(!database||!u?.id)throw Error('Sessão indisponível. Entre novamente e tente.');
     const studentId=document.getElementById('tpStudent')?.value,classId=document.getElementById('tpClass')?.value||null;
     const category=document.getElementById('tpCategory')?.value,title=document.getElementById('tpTitle')?.value.trim();
     const notes=String(document.getElementById('tpNotes')?.value||'').trim(),urls=parseUrls(document.getElementById('tpUrl')?.value||'');
     const date=document.getElementById('tpDate')?.value||'',status=document.getElementById('tpStatus')?.value||'planned';
     if(!studentId||!title)throw Error('Selecione o aluno e informe o título.');
     const payload={teacher_id:u.id,student_id:studentId,class_id:classId,category,title,notes,resource_url:urls[0]||null,scheduled_at:date?new Date(date).toISOString():null,status};
     if(btn)btn.textContent='Salvando no banco…';
     let query=itemId?database.from('tic_teacher_planning_items').update(payload).eq('id',itemId).eq('teacher_id',u.id).select('*').single():database.from('tic_teacher_planning_items').insert(payload).select('*').single();
     const result=await query;
     if(result.error)throw result.error;
     let saved=result.data;
     if(!saved?.id)throw Error('O banco não confirmou o registro salvo. Atualize a lista antes de tentar novamente.');
     const extras=urls.slice(1),storedNotes=notes+(extras.length?EXTRA+extras.join('\n'):'');
     if(storedNotes!==String(saved.notes||'')){
      if(btn)btn.textContent='Salvando links…';
      const up=await database.from('tic_teacher_planning_items').update({notes:storedNotes}).eq('id',saved.id).eq('teacher_id',u.id);
      if(up.error)throw Error('Planejamento salvo, mas não foi possível guardar todos os links: '+up.error.message);
      saved.notes=storedNotes;
     }
     notify('Planejamento salvo. Atualizando agenda e calendário…','success');
     let calendarOk=true;
     if(saved.class_id&&saved.scheduled_at){
      try{if(btn)btn.textContent='Atualizando agenda…';await syncOne(saved)}
      catch(err){calendarOk=false;console.error('[Planning bridge] Calendar sync failed:',err);notify('Planejamento salvo, mas a agenda não foi sincronizada: '+(err?.message||err),'error')}
     }
     if(typeof window.closeModal==='function')window.closeModal();
     if(typeof window.loadTeacherPlanningItems==='function'){
      if(btn)btn.textContent='Atualizando lista…';
      try{await window.loadTeacherPlanningItems()}catch(err){console.warn('[Planning bridge] List refresh failed:',err);notify('Planejamento salvo, mas a lista não atualizou automaticamente. Recarregue a seção.','error')}
     }
     if(calendarOk)notify(saved.class_id&&saved.scheduled_at?'Concluído! Planejamento salvo e agenda atualizada.':'Concluído! Planejamento salvo.','success');
    }catch(err){
     console.error('[Planning bridge] Save failed:',err);
     notify('Não foi possível concluir o salvamento: '+(err?.message||String(err)),'error');
    }finally{
     if(btn){btn.disabled=false;btn.removeAttribute('aria-busy');btn.textContent=originalText}
    }
   };
   window.saveTeacherPlanningItem.__bridgeV1=true;
  }
  if(typeof window.loadTeacherPlanningItems==='function'&&!window.loadTeacherPlanningItems.__bridgeV1){
   const original=window.loadTeacherPlanningItems;
   const wrapped=async function(...args){const result=await original.apply(this,args);decoratePlanning();return result};
   wrapped.__bridgeV1=true;window.loadTeacherPlanningItems=wrapped;
  }
  if(typeof window.updateTeacherPlanningStatus==='function'&&!window.updateTeacherPlanningStatus.__bridgeV1){
   window.updateTeacherPlanningStatus=async function(id,status){
    const database=db(),u=usr();const {error}=await database.from('tic_teacher_planning_items').update({status}).eq('id',id).eq('teacher_id',u.id);
    if(error)return (window.toast||alert)('Não foi possível atualizar o status: '+error.message,'error');
    const {data}=await database.from('tic_teacher_planning_items').select('*').eq('id',id).eq('teacher_id',u.id).maybeSingle();
    if(data?.class_id&&data?.scheduled_at){try{await syncOne(data)}catch(e){console.warn(e)}}
    if(typeof window.toast==='function')window.toast('Status atualizado.','success');if(typeof window.loadTeacherPlanningItems==='function')window.loadTeacherPlanningItems();
   };
   window.updateTeacherPlanningStatus.__bridgeV1=true;
  }
  if(typeof window.deleteTeacherPlanningItem==='function'&&!window.deleteTeacherPlanningItem.__bridgeV1){
   window.deleteTeacherPlanningItem=async function(id){
    if(!confirm('Excluir este planejamento e o compromisso espelhado no Calendar? Esta ação não pode ser desfeita.'))return;
    const database=db(),u=usr();const {data:events}=await database.from('tic_events').select('id,notes').eq('teacher_id',u.id).limit(500);
    const linked=(events||[]).filter(e=>String(e.notes||'').includes(MARK+id+']'));
    const {error}=await database.from('tic_teacher_planning_items').delete().eq('id',id).eq('teacher_id',u.id);
    if(error)return (window.toast||alert)('Não foi possível excluir: '+error.message,'error');
    for(const ev of linked){const r=await database.from('tic_events').delete().eq('id',ev.id).eq('teacher_id',u.id);if(r.error)console.warn('[Planning bridge] Could not remove mirrored event:',r.error.message)}
    if(typeof window.toast==='function')window.toast('Planejamento removido. Compromissos vinculados removidos quando permitido.','success');
    if(typeof window.loadTeacherPlanningItems==='function')await window.loadTeacherPlanningItems();
   };
   window.deleteTeacherPlanningItem.__bridgeV1=true;
  }
  if(typeof window.loadTeacherPlanningItems==='function')window.loadTeacherPlanningItems.__bridgeV1=true;
  // Deliberately do not bulk-sync existing records at page load: syncing happens only after an explicit save/status change.
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
