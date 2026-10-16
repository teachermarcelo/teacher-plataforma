/* Fluent Immersion — Class Center record actions */
(function(){
 'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const fmt=x=>x?new Date(x).toLocaleString('pt-BR'):'—';
 const EXTRA='\n\n[FI_EXTRA_LINKS]\n';
 window.ticV63ParseLinks=value=>[...new Set(String(value||'').split(/[\n\r,]+/).map(x=>x.trim()).filter(x=>/^https?:\/\//i.test(x)))];
 window.ticV63GetEventNotes=e=>String(e?.notes||'').split(EXTRA)[0].trim();
 window.ticV63GetEventLinks=e=>{
   const main=window.ticV63ParseLinks(e?.meeting_url||'');
   const raw=String(e?.notes||'');
   const extra=raw.includes(EXTRA)?raw.split(EXTRA).slice(1).join(EXTRA):'';
   return [...new Set([...main,...window.ticV63ParseLinks(extra)])];
 };
 window.ticV63PackEventNotes=(notes,extra)=>{
   const clean=String(notes||'').trim(),links=window.ticV63ParseLinks((extra||[]).join('\n'));
   return clean+(links.length?EXTRA+links.join('\n'):'');
 };
 window.ticV63OpenCard=(ev,id,classId)=>{
   if(ev?.target?.closest('a,button'))return;
   const state=window.__ticClassCenterV41||{},item=(state.evs||[]).find(x=>x.id===id);
   const link=window.ticV63GetEventLinks(item||{})[0];
   if(link)window.open(link,'_blank','noopener,noreferrer');
   else if(window.ticV61EditEvent)window.ticV61EditEvent(id,classId);
 };
 window.ticV63CardKey=(ev,id,classId)=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();window.ticV63OpenCard(ev,id,classId)}};
 const original=window.classCenterTabV41;
 if(typeof original!=='function'||original.__v63Crud)return;
 async function renderLessons(classId){
   const state=window.__ticClassCenterV41||{};
   if(state.classId!==classId)return;
   const body=document.getElementById('ticV41ClassBody');if(!body)return;
   const students=state.students||[],tasks=state.tasks||[],events=state.evs||[],cls=state.cls||{};
   const kpis='<div class="v41-kpis"><div class="v41-kpi"><span>👥 Alunos</span><b>'+students.length+'</b></div><div class="v41-kpi"><span>📝 Conteúdos</span><b>'+tasks.length+'</b></div><div class="v41-kpi"><span>📚 Aulas</span><b>'+events.length+'</b></div><div class="v41-kpi"><span>🧰 Resources</span><b>'+tasks.reduce((n,t)=>n+(Array.isArray(t.resource_items)?t.resource_items.length:0),0)+'</b></div><div class="v41-kpi"><span>📅 Nível</span><b>'+esc(cls.level||'—')+'</b></div></div>';
   const rows=events.map(e=>{
     const title=e.title&&e.title.trim()?e.title:((e.event_type==='next_class'||e.event_type==='next')?'Próxima aula':e.event_type==='review'?'Revisão':'Aula')+' · '+(e.starts_at?new Date(e.starts_at).toLocaleDateString('pt-BR'):'sem data');
     const date=e.starts_at||e.created_at, links=window.ticV63GetEventLinks(e), notes=window.ticV63GetEventNotes(e);
     const linkCards=links.map((url,i)=>{let label=url;try{label=new URL(url).hostname.replace('www.','')}catch(_){}return '<a class="v63-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Abrir link '+(i+1)+' em nova aba"><span>↗</span><span>'+esc(i===0?'Link principal':'Link '+(i+1))+' · '+esc(label)+'</span></a>'}).join('');
     const type=e.event_type==='next_class'||e.event_type==='next'?'Próxima aula':e.event_type==='review'?'Revisão':'Aula';
     return '<article class="v63-record'+(links.length?' has-links':'')+'" role="button" tabindex="0" aria-label="'+esc(title)+' — abrir aula" onclick="ticV63OpenCard(event,\''+esc(e.id)+'\',\''+esc(classId)+'\')" onkeydown="ticV63CardKey(event,\''+esc(e.id)+'\',\''+esc(classId)+'\')"><div class="v63-record-main"><div class="v63-titleline"><b>'+esc(title)+'</b><span class="v63-type">'+esc(type)+'</span></div><small class="v63-date">🗓 '+esc(fmt(date))+(e.ends_at?' · até '+esc(new Date(e.ends_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})):'')+'</small>'+(notes?'<p class="v63-notes">'+esc(notes)+'</p>':'')+(links.length?'<div class="v63-links">'+linkCards+'</div>':'<small class="v63-no-link">Sem links anexados · clique no card para editar</small>')+'</div><div class="v63-actions"><button type="button" class="btn sm secondary" onclick="event.stopPropagation();ticV61EditEvent(\''+esc(e.id)+'\',\''+esc(classId)+'\')">✏️ Editar</button><button type="button" class="btn sm ghost v61-danger" onclick="event.stopPropagation();ticV61DeleteEvent(\''+esc(e.id)+'\',\''+esc(classId)+'\')">🗑 Remover</button></div></article>';
   }).join('');
   body.innerHTML=kpis+'<div class="v41-panel v63-lessons"><div class="v63-heading"><div><h3>📚 Aulas</h3><p>Edite ou remova cada registro. O título é opcional.</p></div><button class="btn primary" onclick="openClassLessonForm(\''+esc(classId)+'\')">＋ Registrar aula</button></div><div class="v63-list">'+(rows||'<div class="v41-empty">Nenhuma aula registrada. Clique em “Registrar aula” para adicionar a primeira.</div>')+'</div></div>';
 }
 function renderLessonStatusOverview(classId){
   const state=window.__ticClassCenterV41||{};
   if(state.classId!==classId)return;
   const body=document.getElementById('ticV41ClassBody');if(!body)return;
   const events=state.evs||[];
   const classify=e=>{
     const raw=[e.status,e.lesson_status,e.event_status,e.event_type,e.title,e.notes].filter(Boolean).join(' ').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
     if(/cancelad|cancelled|canceled|\bcancel\b/.test(raw))return 'cancelled';
     if(/adiad|postpon|reschedul/.test(raw))return 'postponed';
     if(/ministrad|realizad|concluid|completed|\btaught\b|\bdone\b/.test(raw))return 'taught';
     if(/proxima aula|agendad|scheduled|next_class|\bnext\b|\bplanned\b/.test(raw))return 'upcoming';
     const date=e.starts_at?new Date(e.starts_at):null;
     return date&&date.getTime()>=Date.now()?'upcoming':'unmarked';
   };
   const counts={taught:0,cancelled:0,postponed:0,upcoming:0,unmarked:0};
   events.forEach(e=>counts[classify(e)]++);
   let panel=body.querySelector('.v63-status-overview');
   if(!panel){
     panel=document.createElement('section');panel.className='v41-panel v63-status-overview';
     const lessonsPanel=[...body.querySelectorAll('.v41-panel')].find(el=>/Aulas/.test(el.querySelector('h3')?.textContent||''));
     if(lessonsPanel)body.insertBefore(panel,lessonsPanel);else body.insertBefore(panel,body.firstChild);
   }
   const cards=[
     ['📚','Total de registros',events.length,'total'],
     ['✅','Ministradas',counts.taught,'taught'],
     ['🚫','Canceladas',counts.cancelled,'cancelled'],
     ['🔁','Adiadas',counts.postponed,'postponed'],
     ['🗓️','Próximas / agendadas',counts.upcoming,'upcoming'],
     ['ℹ️','Sem status definido',counts.unmarked,'unmarked']
   ];
   panel.innerHTML='<div class="v63-status-heading"><div><h3>📊 Resumo das aulas</h3><p>Contagem baseada no status salvo em cada registro. Aulas antigas sem status ficam em “Sem status definido”.</p></div></div><div class="v63-status-grid">'+cards.map(c=>'<article class="v63-status-card is-'+c[3]+'"><span class="v63-status-icon">'+c[0]+'</span><div><small>'+c[1]+'</small><b>'+c[2]+'</b></div></article>').join('')+'</div>';
 }
 const wrapped=async function(classId,tab){
   if(tab==='lessons')return renderLessons(classId);
   const result=await original.apply(this,arguments);
   if(tab==='overview'||tab==='overview_v41'||tab==null){
     renderLessonStatusOverview(classId);
     setTimeout(()=>renderLessonStatusOverview(classId),80);
   }
   return result;
 };
 wrapped.__v63Crud=true;
 window.classCenterTabV41=wrapped;
 window.classCenterTab=wrapped;
 const style=document.createElement('style');
 style.id='v63-class-crud-css';
 style.textContent='.v63-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.v63-heading h3{margin:0 0 5px}.v63-heading p{margin:0;color:var(--muted,#74809a);font-size:13px}.v63-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:14px;margin-top:16px}.v63-record{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;border:1px solid var(--border,#e2e6f0);border-radius:17px;padding:17px;background:var(--card,#fff);min-width:0;box-shadow:0 5px 18px #1b25500a;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;cursor:pointer;position:relative}.v63-record:hover,.v63-record:focus-visible{transform:translateY(-2px);border-color:#9a7af7;box-shadow:0 12px 26px #5434a51c;outline:none}.v63-record-main{flex:1;min-width:0}.v63-titleline{display:flex;align-items:flex-start;gap:8px;justify-content:space-between;flex-wrap:wrap}.v63-record-main b{display:block;overflow-wrap:anywhere;font-size:14px;line-height:1.45}.v63-type{font-size:10px;font-weight:750;border-radius:99px;background:#eee8ff;color:#5b35c6;padding:5px 8px;white-space:nowrap}.v63-record-main small{display:block;margin-top:7px;color:var(--muted,#74809a);overflow-wrap:anywhere}.v63-date{font-size:11px}.v63-notes{font-size:12px;line-height:1.5;color:var(--muted,#74809a);white-space:pre-wrap;overflow-wrap:anywhere;margin:10px 0 0}.v63-links{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.v63-link{display:inline-flex;align-items:center;gap:7px;max-width:100%;padding:8px 10px;border:1px solid #ddd3ff;border-radius:10px;background:#f7f4ff;color:#5030b5;text-decoration:none;font-size:11px;font-weight:750;overflow-wrap:anywhere}.v63-link:hover{background:#ece5ff;border-color:#a68af9}.v63-link span:last-child{overflow-wrap:anywhere}.v63-no-link{opacity:.78}.v63-actions{display:flex;gap:7px;align-items:center;flex-wrap:wrap;flex-shrink:0;position:relative;z-index:1}.v63-actions .btn{white-space:nowrap}.v63-actions .v61-danger{border:1px solid #efcaca!important;color:#b42318!important;background:#fff7f7!important}@media(max-width:720px){.v63-list{grid-template-columns:minmax(0,1fr)}.v63-record{flex-direction:column}.v63-actions{width:100%;justify-content:flex-start}.v63-actions .btn{flex:1;justify-content:center}}';
 style.textContent += '\n.v63-status-overview{margin-bottom:16px}.v63-status-heading h3{margin:0 0 5px}.v63-status-heading p{margin:0;color:var(--muted,#74809a);font-size:12px;line-height:1.5}.v63-status-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-top:14px}.v63-status-card{display:flex;align-items:center;gap:10px;min-width:0;padding:13px 12px;border:1px solid var(--border,#e2e6f0);border-radius:14px;background:var(--card,#fff)}.v63-status-icon{display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:10px;background:#f1edff;font-size:16px}.v63-status-card div{min-width:0}.v63-status-card small{display:block;font-size:11px;line-height:1.35;color:var(--muted,#74809a);overflow-wrap:anywhere}.v63-status-card b{display:block;margin-top:4px;font-size:24px;line-height:1.1;color:var(--text,#18243b)}.v63-status-card.is-taught .v63-status-icon{background:#dcfce7}.v63-status-card.is-cancelled .v63-status-icon{background:#fee2e2}.v63-status-card.is-postponed .v63-status-icon{background:#fef3c7}.v63-status-card.is-upcoming .v63-status-icon{background:#dbeafe}.v63-status-card.is-unmarked .v63-status-icon{background:#f1f5f9}@media(max-width:1000px){.v63-status-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:560px){.v63-status-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.v63-status-card{padding:11px 9px}.v63-status-card b{font-size:21px}}';
 document.head.appendChild(style);
})();