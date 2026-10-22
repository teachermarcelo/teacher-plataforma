/* Missing Agenda renderer: the previous tab called this function without defining it. */

function ticAgendaGetUser(){
 try{if(typeof session!=='undefined'&&session?.user)return session.user}catch(_){}
 return window.session?.user||window.__session?.user||window.supabaseSession?.user||null;
}
function ticAgendaEsc(v){return typeof window.escV41==='function'?window.escV41(v??''):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function ticAgendaLocalValue(value){
 if(!value)return '';
 const d=new Date(value);if(Number.isNaN(d.getTime()))return '';
 const pad=n=>String(n).padStart(2,'0');
 return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
}
window.ticAgendaOpenFormV66=function(classId,eventData=null){
 const old=document.getElementById('tic-agenda-form-overlay');if(old)old.remove();
 const e=eventData||{};
 const overlay=document.createElement('div');overlay.id='tic-agenda-form-overlay';overlay.className='tic-agenda-overlay';
 overlay.innerHTML='<section class="tic-agenda-modal" role="dialog" aria-modal="true" aria-labelledby="tic-agenda-form-title"><header class="tic-agenda-modal-head"><div><span class="tic-agenda-eyebrow">CLASS CENTER · AGENDA</span><h3 id="tic-agenda-form-title">'+(e.id?'Editar compromisso':'Agendar nova aula')+'</h3><p>Preencha os dados e salve para registrar na agenda da turma.</p></div><button type="button" class="tic-agenda-close" data-agenda-close aria-label="Fechar">×</button></header><form class="tic-agenda-form"><div class="tic-agenda-form-grid"><label class="tic-agenda-field tic-agenda-field-wide"><span>Título da aula *</span><input name="title" required maxlength="140" placeholder="Ex.: English conversation — Unit 3" value="'+ticAgendaEsc(e.title||'')+'"></label><label class="tic-agenda-field"><span>Data e horário de início *</span><input name="starts_at" type="datetime-local" required value="'+ticAgendaLocalValue(e.starts_at)+'"></label><label class="tic-agenda-field"><span>Data e horário de término</span><input name="ends_at" type="datetime-local" value="'+ticAgendaLocalValue(e.ends_at)+'"></label><label class="tic-agenda-field"><span>Tipo de compromisso</span><select name="event_type"><option value="class">Aula</option><option value="meeting">Reunião</option><option value="assessment">Avaliação</option><option value="next_class">Próxima aula</option><option value="other">Outro</option></select></label><label class="tic-agenda-field"><span>Status</span><select name="status"><option value="scheduled">Agendada</option><option value="completed">Realizada</option><option value="cancelled">Cancelada</option><option value="postponed">Adiada</option></select></label><label class="tic-agenda-field tic-agenda-field-wide"><span>Link da aula / reunião</span><input name="meeting_url" type="url" placeholder="https://..." value="'+ticAgendaEsc(e.meeting_url||'')+'"></label><label class="tic-agenda-field tic-agenda-field-wide"><span>Observações</span><textarea name="notes" rows="3" maxlength="2000" placeholder="Conteúdo, preparação, materiais ou lembretes…">'+ticAgendaEsc(e.notes||'')+'</textarea></label></div><div class="tic-agenda-form-error" role="alert" hidden></div><footer class="tic-agenda-form-footer"><button type="button" class="btn secondary" data-agenda-close>Cancelar</button><button type="submit" class="btn primary"><span data-agenda-save-label>'+(e.id?'Salvar alterações':'Salvar agendamento')+'</span></button></footer></form></section>';
 document.body.appendChild(overlay);
 const form=overlay.querySelector('form'),type=form.elements.event_type,status=form.elements.status;
 type.value=e.event_type||'class';status.value=e.status||'scheduled';
 overlay.querySelectorAll('[data-agenda-close]').forEach(b=>b.addEventListener('click',()=>overlay.remove()));
 overlay.addEventListener('click',ev=>{if(ev.target===overlay)overlay.remove()});
 document.addEventListener('keydown',function escClose(ev){if(ev.key==='Escape'&&document.getElementById('tic-agenda-form-overlay')===overlay){overlay.remove();document.removeEventListener('keydown',escClose)}});
 form.addEventListener('submit',async ev=>{
  ev.preventDefault();const submit=form.querySelector('[type="submit"]'),errorBox=form.querySelector('.tic-agenda-form-error');submit.disabled=true;submit.textContent='Salvando…';errorBox.hidden=true;
  try{
   const db=(typeof sb!=='undefined'?sb:window.sb),user=ticAgendaGetUser();
   if(!db)throw Error('Conexão com o banco indisponível. Recarregue a página.');
   if(!user?.id)throw Error('Não foi possível identificar sua sessão. Entre novamente e tente.');
   const fd=new FormData(form),start=String(fd.get('starts_at')||''),end=String(fd.get('ends_at')||'');
   if(!start)throw Error('Informe a data e o horário de início.');
   if(end&&new Date(end).getTime()<new Date(start).getTime())throw Error('O término não pode ser anterior ao início.');
   const payload={class_id:classId,teacher_id:user.id,title:String(fd.get('title')||'').trim(),event_type:String(fd.get('event_type')||'class'),starts_at:new Date(start).toISOString(),ends_at:end?new Date(end).toISOString():null,meeting_url:String(fd.get('meeting_url')||'').trim()||null,notes:String(fd.get('notes')||'').trim()||null,status:String(fd.get('status')||'scheduled')};
   if(!payload.title)throw Error('Informe um título para a aula.');
   let q=e.id?db.from('tic_events').update(payload).eq('id',e.id).eq('class_id',classId).eq('teacher_id',user.id):db.from('tic_events').insert(payload);
   const {error}=await q;if(error)throw error;
   overlay.remove();await window.ticClassAgendaRefreshV65(classId);
  }catch(err){errorBox.textContent=err?.message||'Não foi possível salvar o agendamento.';errorBox.hidden=false;submit.disabled=false;submit.innerHTML='<span data-agenda-save-label>'+(e.id?'Salvar alterações':'Salvar agendamento')+'</span>'}
 });
 setTimeout(()=>form.elements.title?.focus(),40);
};

window.ticClassAgendaRefreshV65=async function(classId){
 const body=document.getElementById('ticV41ClassBody')||document.getElementById('classCenterBody');if(!body)return;
 const esc=v=>typeof window.escV41==='function'?window.escV41(v??''):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const user=(typeof session!=='undefined'?session?.user:null)||window.session?.user;
 const fmt=d=>d?new Date(d).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}):'Data não definida';
 body.innerHTML='<div class="v41-panel"><p>Carregando a agenda da turma…</p></div>';
 try{
  const db=(typeof sb!=='undefined'?sb:window.sb);if(!db)throw Error('Conexão com o banco indisponível. Recarregue a página.');
  if(!user?.id)throw Error('Sua sessão expirou. Entre novamente.');
  const {data:cls,error:ce}=await db.from('tic_classes').select('id,name').eq('id',classId).eq('teacher_id',user.id).maybeSingle();
  if(ce)throw ce;if(!cls)throw Error('Turma não encontrada ou sem permissão.');
  const {data,error}=await db.from('tic_events').select('id,title,event_type,starts_at,ends_at,notes,meeting_url,status,created_at').eq('class_id',classId).eq('teacher_id',user.id).order('starts_at',{ascending:true});
  if(error)throw error;
  const events=data||[],now=Date.now(),up=events.filter(x=>x.starts_at&&new Date(x.starts_at).getTime()>=now),past=events.filter(x=>!x.starts_at||new Date(x.starts_at).getTime()<now);
  const renderGrouped=(items,makeCard)=>{
   const groups=new Map();
   items.forEach(x=>{const d=x.starts_at?new Date(x.starts_at):null;const key=d&&!Number.isNaN(d.getTime())?d.toLocaleDateString('sv-SE'):'sem-data';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(x)});
   if(!items.length)return '<div class="v41-empty">Nenhuma aula neste filtro.</div>';
   return [...groups.entries()].map(([key,list])=>{const date=key==='sem-data'?'Data não definida':new Date(key+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});return '<section class="cc-agenda-day-group"><h4 class="cc-agenda-day-heading"><span>📅 '+esc(date)+'</span><span class="cc-agenda-day-count">'+list.length+' '+(list.length===1?'compromisso':'compromissos')+'</span></h4><div class="cc-agenda-day-list">'+list.map(makeCard).join('')+'</div></section>'}).join('');
  };
  const card=x=>'<article class="cc-agenda-event"><div class="cc-agenda-date"><b>'+esc(x.starts_at?new Date(x.starts_at).toLocaleDateString('pt-BR',{day:'2-digit'}):'—')+'</b><span>'+esc(x.starts_at?new Date(x.starts_at).toLocaleDateString('pt-BR',{month:'short'}):'sem data')+'</span></div><div class="cc-agenda-main"><b>'+esc(x.title||'Aula')+'</b><small>'+esc(fmt(x.starts_at))+' · '+esc(x.event_type||'Aula')+(x.ends_at?' – '+esc(new Date(x.ends_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})):'')+'</small>'+(x.notes?'<p>'+esc(x.notes)+'</p>':'')+(x.meeting_url?'<a href="'+esc(x.meeting_url)+'" target="_blank" rel="noopener noreferrer">Abrir link da aula ↗</a>':'')+'<div class="cc-agenda-card-actions"><button type="button" data-agenda-edit="'+esc(x.id)+'">✎ Editar</button><button type="button" data-agenda-delete="'+esc(x.id)+'">Remover</button></div></div><span class="cc-agenda-status '+((x.status==='completed')?'is-done':(x.status==='cancelled'?'is-cancelled':(x.status==='postponed'?'is-postponed':'is-planned'))) +'">'+(x.status==='completed'?'Realizada':(x.status==='cancelled'?'Cancelada':(x.status==='postponed'?'Adiada':'Agendada')))+'</span></article>';
  body.innerHTML='<div class="v41-kpis"><div class="v41-kpi"><span>📅 Eventos</span><b>'+events.length+'</b></div><div class="v41-kpi"><span>🟣 Próximos</span><b>'+up.length+'</b></div><div class="v41-kpi"><span>✓ Anteriores</span><b>'+past.length+'</b></div></div><section class="v41-panel cc-agenda-panel"><div class="cc-agenda-heading"><div><h3>📅 Agenda · '+esc(cls.name)+'</h3><p>Consulte horários, links e registre novas aulas.</p></div><div class="cc-agenda-actions"><button class="btn secondary" data-cc-refresh>↻ Atualizar</button><button class="btn primary" data-cc-create>＋ Agendar aula</button></div></div><div class="cc-agenda-toolbar"><div class="cc-agenda-filters"><button class="active" data-cc-filter="all">Todas ('+events.length+')</button><button data-cc-filter="up">Próximas ('+up.length+')</button><button data-cc-filter="past">Anteriores ('+past.length+')</button></div><label class="cc-agenda-search"><span>⌕</span><input type="search" data-cc-search placeholder="Buscar por aula, link ou observação…" aria-label="Buscar compromissos"></label></div><div class="cc-agenda-events" data-cc-events>'+(events.length?renderGrouped(events,card):'<div class="v41-empty">Ainda não há aulas nesta agenda. Clique em “Agendar aula” para registrar a primeira.</div>')+'</div></section>';
  body.querySelector('[data-cc-refresh]').onclick=()=>window.ticClassAgendaRefreshV65(classId);
  body.querySelector('[data-cc-create]').onclick=()=>window.ticAgendaOpenFormV66(classId);
  let activeFilter='all',searchTerm='';
  const drawEvents=()=>{const base=activeFilter==='up'?up:activeFilter==='past'?past:events;const filtered=base.filter(x=>[x.title,x.event_type,x.notes,x.meeting_url,x.status].some(v=>String(v||'').toLocaleLowerCase('pt-BR').includes(searchTerm)));body.querySelector('[data-cc-events]').innerHTML=renderGrouped(filtered,card)};
  body.querySelectorAll('[data-cc-filter]').forEach(b=>b.onclick=()=>{activeFilter=b.dataset.ccFilter;body.querySelectorAll('[data-cc-filter]').forEach(x=>x.classList.toggle('active',x===b));drawEvents()});
  body.querySelector('[data-cc-search]').oninput=e=>{searchTerm=e.target.value.trim().toLocaleLowerCase('pt-BR');drawEvents()};
  body.addEventListener('click',async ev=>{
   const edit=ev.target.closest('[data-agenda-edit]');
   if(edit){const item=events.find(x=>String(x.id)===edit.dataset.agendaEdit);if(item)window.ticAgendaOpenFormV66(classId,item);return}
   const del=ev.target.closest('[data-agenda-delete]');
   if(!del)return;
   const item=events.find(x=>String(x.id)===del.dataset.agendaDelete);
   if(!item||!confirm('Remover este compromisso da agenda? Esta ação não pode ser desfeita.'))return;
   try{const db=(typeof sb!=='undefined'?sb:window.sb),user=ticAgendaGetUser();if(!db||!user?.id)throw Error('Sessão ou conexão indisponível.');const {error}=await db.from('tic_events').delete().eq('id',item.id).eq('class_id',classId).eq('teacher_id',user.id);if(error)throw error;await window.ticClassAgendaRefreshV65(classId)}catch(err){alert('Não foi possível remover: '+(err?.message||'erro inesperado'))}
  });

 }catch(e){
  body.innerHTML='<section class="v41-panel cc-agenda-error"><h3>Não foi possível carregar a agenda</h3><p>'+esc(e?.message||'Erro inesperado')+'</p><button class="btn secondary" data-cc-retry>↻ Tentar novamente</button><button class="btn primary" data-cc-create>＋ Agendar aula</button></section>';
  body.querySelector('[data-cc-retry]').onclick=()=>window.ticClassAgendaRefreshV65(classId);
  body.querySelector('[data-cc-create]').onclick=()=>window.ticAgendaOpenFormV66(classId);
 }
};

/* Class Center usability helper. Adds navigation shortcuts without replacing existing handlers. */
(function(){
'use strict';
const labels=[['overview','📊 Visão geral'],['agenda','📅 Agenda'],['lessons','📚 Lessons'],['students','👥 Alunos'],['tasks','📝 Tasks'],['materials','🔗 Materiais'],['resources','🧰 Resources'],['notes','💬 Observações'],['progress','📈 Progresso']];
function enhance(root){
 if(!root||root.dataset.ccUsability==='1')return;root.dataset.ccUsability='1';
 const classId=root.getAttribute('data-class-center');if(!classId)return;
 const top=root.querySelector('.class-center-top'),tabs=root.querySelector('.class-center-tabs');if(!top||!tabs)return;
 const quick=document.createElement('div');quick.className='cc-quickbar';quick.setAttribute('aria-label','Atalhos rápidos');
 quick.innerHTML='<span class="cc-quickbar-label">ATALHOS RÁPIDOS</span>'+
 '<button type="button" class="cc-quick-link cc-primary" data-cc-tab="agenda">＋ Agendar aula</button>'+
 '<button type="button" class="cc-quick-link" data-cc-tab="lessons">📚 Abrir lessons</button>'+
 '<button type="button" class="cc-quick-link" data-cc-tab="students">👥 Gerenciar alunos</button>'+
 '<button type="button" class="cc-quick-link" data-cc-tab="tasks">📝 Ver tarefas</button>'+
 '<button type="button" class="cc-quick-link" data-cc-tab="materials">🔗 Materiais</button>';
 tabs.parentNode.insertBefore(quick,tabs);
 const tools=document.createElement('div');tools.className='cc-tab-tools';
 tools.innerHTML='<input class="cc-tab-search" type="search" aria-label="Buscar seção do Class Center" placeholder="⌕ Encontrar uma seção…">';
 tabs.parentNode.insertBefore(tools,tabs);
 quick.addEventListener('click',e=>{const b=e.target.closest('[data-cc-tab]');if(!b)return;const tab=b.dataset.ccTab;if(typeof window.classCenterTab==='function')window.classCenterTab(classId,tab);});
 const search=tools.querySelector('input');
 search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('pt-BR');let visible=0;tabs.querySelectorAll('button[data-tab]').forEach(b=>{const show=!q||b.textContent.toLocaleLowerCase('pt-BR').includes(q);b.hidden=!show;if(show)visible++});let note=tools.querySelector('.cc-no-tab-results');if(!visible){if(!note){note=document.createElement('span');note.className='cc-no-tab-results';note.textContent='Nenhuma seção encontrada';note.style.cssText='font-size:11px;color:#8b4770;align-self:center';tools.appendChild(note)}}else note?.remove();});
 tabs.addEventListener('click',e=>{const b=e.target.closest('button[data-tab]');if(!b)return;const body=root.querySelector('.class-center-body');if(body)body.scrollIntoView({behavior:'smooth',block:'start'});});
 const body=root.querySelector('.class-center-body');
 if(body){let timer;const check=()=>{const text=(body.innerText||'').trim();if(/^(Carregando|Loading)(…|\.\.\.)?$/i.test(text)){clearTimeout(timer);timer=setTimeout(()=>{if(/^(Carregando|Loading)(…|\.\.\.)?$/i.test((body.innerText||'').trim())){body.innerHTML='<div class="cc-empty-load">Esta seção está demorando para carregar.<button class="btn secondary" type="button" data-cc-retry>↻ Tentar novamente</button></div>';body.querySelector('[data-cc-retry]')?.addEventListener('click',()=>{const active=tabs.querySelector('button.active')?.dataset.tab||'overview';if(typeof window.classCenterTab==='function')window.classCenterTab(classId,active)})}},10000)}else clearTimeout(timer)};new MutationObserver(check).observe(body,{childList:true,subtree:true,characterData:true});check()}
}
function scan(){document.querySelectorAll('.class-center-shell.class-center-page[data-class-center]').forEach(enhance)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{scan();new MutationObserver(scan).observe(document.getElementById('content')||document.body,{childList:true,subtree:true})},{once:true});else{scan();new MutationObserver(scan).observe(document.getElementById('content')||document.body,{childList:true,subtree:true})}
})();