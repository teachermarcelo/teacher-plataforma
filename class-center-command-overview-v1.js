/* Teacher Platform — Class Center Command Overview V1
   Additive overview: visible teacher agenda, task summary, and dated student planning notes.
   Uses existing Supabase tables and existing edit/delete handlers; does not migrate or delete data.
*/
(function(){
 'use strict';
 if(window.__ticClassCenterCommandOverviewV1)return;
 window.__ticClassCenterCommandOverviewV1=true;
 const llScript=document.createElement('script');
 llScript.src='./links-lesson-v1.js?v=1';
 llScript.defer=true;
 document.head.appendChild(llScript);
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dateFmt=v=>{if(!v)return 'Sem data';const d=new Date(v);return Number.isNaN(d.getTime())?'Sem data':d.toLocaleString('pt-BR',{weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});};
 const dayFmt=v=>{if(!v)return 'Sem data';const d=new Date(v);return Number.isNaN(d.getTime())?'Sem data':d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'});};
 const db=()=>window.sb||(typeof sb!=='undefined'?sb:null);
 const user=()=>window.session?.user||(typeof session!=='undefined'?session?.user:null)||window.__session?.user||null;
 const parseExtraLinks=value=>{const s=String(value||''),i=s.indexOf('[FI_EXTRA_LINKS]');if(i<0)return [];return [...new Set(s.slice(i+'[FI_EXTRA_LINKS]'.length).split(/[\n\r,;]+/).map(x=>x.trim()).filter(x=>/^https?:\/\//i.test(x)))];};
 const cleanNotes=value=>String(value||'').split('[FI_EXTRA_LINKS]')[0].replace(/\\n?\\[TEACHER_PLANNING_ITEM:[^\\]]+\\]/g,'').trim();
 function addStyles(){
  if(document.getElementById('tic-cc-command-overview-css'))return;
  const s=document.createElement('style');s.id='tic-cc-command-overview-css';
  s.textContent=`
  .tic-cc-command{margin:18px 0 22px;display:grid;gap:14px;color:var(--text,#201a36)}
  .tic-cc-command-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .tic-cc-command-head h2{font-size:19px;margin:0 0 5px;letter-spacing:-.03em}
  .tic-cc-command-head p{margin:0;color:var(--muted,#77708b);font-size:12px;line-height:1.5}
  .tic-cc-command-actions{display:flex;gap:8px;flex-wrap:wrap}
  .tic-cc-command-actions button,.tic-cc-command-card button{cursor:pointer;border:1px solid #dcd2ff;background:#fff;color:#5130b4;border-radius:10px;padding:8px 11px;font-weight:750;font-size:11px}
  .tic-cc-command-actions .primary{background:linear-gradient(120deg,#702ff0,#a02ef2);border:0;color:white}
  .tic-cc-command-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
  .tic-cc-command-kpi{border:1px solid #e2dcf1;border-radius:14px;background:linear-gradient(140deg,#fff,#faf8ff);padding:13px}
  .tic-cc-command-kpi span{display:block;font-size:10px;color:#71688a;margin-bottom:8px}.tic-cc-command-kpi b{font-size:24px;letter-spacing:-.04em}
  .tic-cc-command-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:12px;align-items:start}
  .tic-cc-command-card{border:1px solid #e2dcf1;background:var(--card,#fff);border-radius:16px;overflow:hidden;min-width:0;box-shadow:0 5px 20px #2c19540a}
  .tic-cc-command-card-head{padding:14px 15px;border-bottom:1px solid #eee9f7;display:flex;justify-content:space-between;gap:10px;align-items:center}
  .tic-cc-command-card-head h3{font-size:14px;margin:0}.tic-cc-command-card-head p{font-size:10px;color:#827a95;margin:4px 0 0}
  .tic-cc-command-list{padding:5px 12px}
  .tic-cc-command-item{padding:12px 3px;border-bottom:1px solid #f0edf6;display:grid;grid-template-columns:45px minmax(0,1fr);gap:10px;align-items:start}
  .tic-cc-command-item:last-child{border-bottom:0}
  .tic-cc-command-item{position:relative;border:1px solid #e8e5f2;border-left:4px solid #8b5cf6;border-radius:13px;margin:8px 0;padding:12px;background:linear-gradient(110deg,#fff 0%,#fcfbff 100%);transition:transform .16s,box-shadow .16s,border-color .16s}
  .tic-cc-command-item:hover{transform:translateY(-1px);box-shadow:0 8px 20px #38216b12;border-color:#d4c7ff}
  .tic-cc-command-item.kind-meeting{border:1px solid #38bdf8;border-left:5px solid #0284c7;background:linear-gradient(135deg,#e0f2fe 0%,#bae6fd 48%,#f0f9ff 100%);box-shadow:0 6px 18px #0284c722}
  .tic-cc-command-item.kind-assessment{border:1px solid #fbbf24;border-left:5px solid #d97706;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 45%,#fffbeb 100%);box-shadow:0 6px 18px #d9770622}
  .tic-cc-command-item.kind-class{border:1px solid #a78bfa;border-left:5px solid #7c3aed;background:linear-gradient(135deg,#ede9fe 0%,#ddd6fe 48%,#f5f3ff 100%);box-shadow:0 6px 18px #7c3aed22}
  .tic-cc-command-item.kind-planning{border:1px solid #34d399;border-left:5px solid #059669;background:linear-gradient(135deg,#d1fae5 0%,#a7f3d0 48%,#ecfdf5 100%);box-shadow:0 6px 18px #05966922}
  .tic-cc-command-item.kind-material{border:1px solid #38bdf8;border-left:5px solid #0369a1;background:linear-gradient(135deg,#dbeafe 0%,#bfdbfe 48%,#eff6ff 100%);box-shadow:0 6px 18px #0369a122}
  .tic-cc-command-item.kind-task{border:1px solid #fbbf24;border-left:5px solid #b45309;background:linear-gradient(135deg,#fef3c7 0%,#fed7aa 48%,#fff7ed 100%);box-shadow:0 6px 18px #b4530922}
  .tic-cc-command-item.kind-other{border:1px solid #cbd5e1;border-left:5px solid #475569;background:linear-gradient(135deg,#e2e8f0 0%,#cbd5e1 48%,#f8fafc 100%);box-shadow:0 6px 18px #47556922}
  .tic-cc-command-item.kind-cancelled{border:1px solid #fda4af;border-left:5px solid #e11d48;background:linear-gradient(135deg,#ffe4e6 0%,#fecdd3 48%,#fff1f2 100%);box-shadow:0 6px 18px #e11d4822}
  .tic-cc-command-item .tic-cc-command-date{box-shadow:0 3px 8px #00000012}
  .tic-cc-command-item.kind-meeting .tic-cc-command-date{background:#0284c7;color:#fff}
  .tic-cc-command-item.kind-assessment .tic-cc-command-date{background:#d97706;color:#fff}
  .tic-cc-command-item.kind-class .tic-cc-command-date{background:#7c3aed;color:#fff}
  .tic-cc-command-item.kind-planning .tic-cc-command-date{background:#059669;color:#fff}
  .tic-cc-command-item.kind-material .tic-cc-command-date{background:#0369a1;color:#fff}
  .tic-cc-command-item.kind-task .tic-cc-command-date{background:#b45309;color:#fff}
  .tic-cc-command-item.kind-cancelled .tic-cc-command-date{background:#e11d48;color:#fff}
  .tic-cc-command-item .tic-cc-command-type{box-shadow:0 2px 6px #00000010}
  .tic-cc-command-type.planning{background:#d1fae5;color:#065f46}
  .tic-cc-command-type.material{background:#dbeafe;color:#1e40af}
  .tic-cc-command-type.task{background:#fef3c7;color:#92400e}
  .tic-cc-command-type.other{background:#e2e8f0;color:#334155}
  .tic-cc-command-item.kind-cancelled{border-left-color:#ef4444;background:linear-gradient(110deg,#fff1f2,#fff)}
  .tic-cc-command-title{border:0;background:transparent;padding:0;color:#21143d;font:inherit;font-size:13px;font-weight:850;text-align:left;cursor:pointer;line-height:1.35}
  .tic-cc-command-title:hover{color:#6d28d9;text-decoration:underline}
  .tic-cc-command-type{display:inline-flex;margin-left:6px;padding:3px 7px;border-radius:99px;font-size:9px;font-weight:850;vertical-align:middle;background:#ede9fe;color:#5b21b6}
  .tic-cc-command-type.meeting{background:#e0f2fe;color:#075985}.tic-cc-command-type.assessment{background:#fef3c7;color:#92400e}.tic-cc-command-type.cancelled{background:#fee2e2;color:#991b1b}
  .tic-cc-command-date{background:#ede9fe;color:#5b21b6}
  .tic-cc-command-date{border-radius:10px;background:#f1eaff;color:#5427bc;padding:8px 3px;text-align:center;font-size:10px;font-weight:800;line-height:1.25}
  .tic-cc-command-date b{display:block;font-size:17px}
  .tic-cc-command-item-main{min-width:0}.tic-cc-command-item-main h4{font-size:12px;margin:0 0 5px;overflow-wrap:anywhere}
  .tic-cc-command-meta{font-size:10px;line-height:1.55;color:#7b748e}.tic-cc-command-note{font-size:11px;line-height:1.5;margin:7px 0 0;color:#49415f;white-space:pre-wrap;overflow-wrap:anywhere}
  .tic-cc-command-item-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .tic-cc-command-item-actions button{padding:5px 8px;font-size:10px}
  .tic-cc-command-pill{display:inline-flex;align-items:center;gap:4px;border-radius:99px;padding:4px 7px;font-size:9px;font-weight:800;background:#f0eaff;color:#5a32b7}
  .tic-cc-command-pill.done{background:#e4f8ed;color:#16774a}.tic-cc-command-pill.late{background:#fff0e9;color:#a64a21}
  .tic-cc-command-empty,.tic-cc-command-error{padding:18px 12px;color:#827a95;font-size:11px;line-height:1.6}
  .tic-cc-command-loading{padding:18px;color:#827a95;font-size:11px}
  .tic-cc-command-filters{display:flex;gap:6px;flex-wrap:wrap;padding:10px 14px 0}
  .tic-cc-command-filters button{border:1px solid #e4def2;border-radius:99px;background:#fff;padding:6px 9px;color:#655b7c;font-size:10px;cursor:pointer}
  .tic-cc-command-filters button.active{background:#ede5ff;color:#5225b4;border-color:#cfc0ff;font-weight:800}
  .tic-cc-command-link{border:0!important;background:transparent!important;color:#6338c7!important;padding:0!important;text-align:left;font-weight:800}
  .tic-cc-resource-link{display:inline-flex;align-items:center;gap:6px;color:#6338c7;font-size:11px;font-weight:800;text-decoration:none;overflow-wrap:anywhere}
  .tic-cc-resource-link:hover{text-decoration:underline}
  @media(max-width:900px){.tic-cc-command-grid{grid-template-columns:1fr}.tic-cc-command-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:520px){.tic-cc-command-head h2{font-size:17px}.tic-cc-command-kpi{padding:10px}.tic-cc-command-kpi b{font-size:21px}.tic-cc-command-card-head{align-items:flex-start;flex-direction:column}.tic-cc-command-actions{width:100%}.tic-cc-command-actions button{flex:1}}
  `;
  document.head.appendChild(s);
 }
 function findHost(){
  const page=document.querySelector('.class-center-v41');
  const kpis=page?.querySelector('.v41-kpis');
  if(!page||!kpis)return null;
  let panel=page.querySelector('.tic-cc-command');
  if(!panel){panel=document.createElement('section');panel.className='tic-cc-command';panel.setAttribute('aria-label','Teacher Command Center — agenda, tasks e planejamento');kpis.insertAdjacentElement('afterend',panel);}
  return panel;
 }
 function showLoading(panel){panel.innerHTML='<div class="tic-cc-command-card"><div class="tic-cc-command-loading">Carregando agenda, tarefas e planejamento do professor…</div></div>';}
 function cardItem(kind,item,studentName,className){
  const d=item.starts_at||item.scheduled_at||item.due_at||item.due_date||item.created_at;
  const date=d?new Date(d):null;const valid=date&&!Number.isNaN(date.getTime());
  const label=valid?date.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.',''):'—';
  const day=valid?date.toLocaleDateString('pt-BR',{day:'2-digit'}):'—';
  let title=item.title||item.name||item.assignment_title||({event:'Aula agendada',planning:'Acompanhamento',task:'Tarefa'})[kind];
  let status=item.status||'planned';
  const statusLabel=({scheduled:'Agendada',planned:'Planejado',in_progress:'Em preparação',pending:'Pendente',submitted:'Entregue',overdue:'Atrasada',completed:'Realizada',done:'Concluído',cancelled:'Cancelada',postponed:'Adiada'})[status]||status;
  const statusClass=['completed','done','submitted'].includes(status)?'done':['overdue','cancelled'].includes(status)?'late':'';
  const details=[studentName,className,item.event_type?({class:'Aula',meeting:'Reunião',assessment:'Avaliação',next_class:'Próxima aula',other:'Outro'}[item.event_type]||item.event_type):'',valid?dateFmt(d):'Sem data'].filter(Boolean).join(' · ');
  const notes=cleanNotes(item.notes||item.instructions||'');
  let actions='';
  const resourceUrl=kind==='event'?(item.meeting_url||item.resource_url||item.url):(kind==='planning'?(item.resource_url||item.meeting_url||item.url):'');
  const trimmedUrl=typeof resourceUrl==='string'?resourceUrl.trim():'';
  const allUrls=[...new Set([trimmedUrl,...parseExtraLinks(item.notes)].filter(u=>/^https?:\/\//i.test(u)))];
  const linkHtml=allUrls.length?'<div class="tic-cc-command-note" style="display:flex;flex-direction:column;gap:6px">'+allUrls.map((url,i)=>'<a class="tic-cc-resource-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">🔗 '+(i===0?'Abrir link principal':'Abrir recurso '+(i+1))+' ↗</a>').join('')+'</div>':'';
  const eventType=String(item.event_type||item.category||'class').toLowerCase();
  const categoryType=String(item.category||'').toLowerCase();
  const typeClass=kind==='planning'?(categoryType.includes('material')?'material':categoryType.includes('agenda')||categoryType.includes('comprom')?'meeting':categoryType.includes('note')||categoryType.includes('anota')?'other':'planning'):kind==='task'?'task':eventType.includes('meet')||eventType.includes('reuni')?'meeting':eventType.includes('assess')||eventType.includes('avali')?'assessment':eventType.includes('other')?'other':'class';
  const cardClass='kind-'+(status==='cancelled'?'cancelled':typeClass);
  const clickUrl=allUrls[0]||'';
  if(kind==='event'){
   actions='<div class="tic-cc-command-item-actions">'+(item.class_id?'<button type="button" data-tic-cc-edit-event="'+esc(item.id)+'" data-class-id="'+esc(item.class_id)+'">✎ Editar</button>':'')+'<button type="button" data-tic-cc-delete-event="'+esc(item.id)+'">Remover</button>'+'</div>';
  }else if(kind==='planning'){
   actions='<div class="tic-cc-command-item-actions"><button type="button" data-tic-cc-edit-planning="'+esc(item.id)+'">✎ Editar</button><button type="button" data-tic-cc-delete-planning="'+esc(item.id)+'">Remover</button></div>';
  }else{
   actions='<div class="tic-cc-command-item-actions"><button type="button" class="tic-cc-command-link" data-tic-cc-open-tasks>Ver / corrigir tasks ↗</button></div>';
  }
  return '<article class="tic-cc-command-item '+cardClass+'"><div class="tic-cc-command-date"><b>'+esc(day)+'</b>'+esc(label)+'</div><div class="tic-cc-command-item-main"><h4>'+(kind==='event'&&clickUrl?'<a class="tic-cc-command-title" href="'+esc(clickUrl)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+'</a>':'<button type="button" class="tic-cc-command-title" '+(kind==='event'?'data-tic-cc-open-event="'+esc(item.id)+'" data-class-id="'+esc(item.class_id||'')+'"':'')+'>'+esc(title)+'</button>')+' <span class="tic-cc-command-type '+typeClass+'">'+esc(typeClass==='meeting'?'Compromisso':typeClass==='assessment'?'Avaliação':typeClass==='material'?'Material':typeClass==='planning'?'Planejamento':typeClass==='other'?'Anotação':typeClass==='task'?'Tarefa':'Aula')+'</span><div class="tic-cc-command-meta">'+esc(details)+'</div><div style="margin-top:6px"><span class="tic-cc-command-pill '+statusClass+'">'+esc(statusLabel)+'</span></div>'+(notes?'<p class="tic-cc-command-note">'+esc(notes)+'</p>':'')+linkHtml+actions+'</div></article>';
 }
 function renderList(items,kind,studentMap,classMap,assignmentMap){
  if(!items.length)return '<div class="tic-cc-command-empty">Nada registrado aqui ainda. Os itens existentes aparecerão automaticamente.</div>';
  return items.map(item=>{
   let student=studentMap[item.student_id]?.display_name||studentMap[item.student_id]?.name||'';
   let className=classMap[item.class_id]?.name||'';
   if(kind==='event'&&!student&&item.class_id)student=classMap[item.class_id]?.studentNames||'';
   if(kind==='task'){const a=assignmentMap[item.assignment_id]||{};item={...item,title:a.title||a.name||'Task atribuída',due_at:item.due_at||a.due_at||a.due_date,notes:a.instructions||a.description||''};}
   return cardItem(kind,item,student,className);
  }).join('');
 }
 async function load(panel){
  const database=db(),u=user();
  if(!database||!u?.id){panel.innerHTML='<div class="tic-cc-command-card"><div class="tic-cc-command-error">Não foi possível identificar a sessão do professor. Entre novamente e atualize esta página.</div></div>';return;}
  showLoading(panel);
  const results=await Promise.all([
   database.from('tic_events').select('*').eq('teacher_id',u.id).order('starts_at',{ascending:true}).limit(100),
   database.from('tic_teacher_planning_items').select('*').eq('teacher_id',u.id).order('scheduled_at',{ascending:true,nullsFirst:false}).limit(100),
   database.from('tic_assignments').select('*').eq('teacher_id',u.id).order('created_at',{ascending:false}).limit(100),
   database.from('tic_students').select('id,display_name,name,current_level').eq('teacher_id',u.id),
   database.from('tic_classes').select('id,name,level').eq('teacher_id',u.id),
   database.from('tic_class_students').select('class_id,student_id,status')
  ]);
  const [evR,plR,asR,stR,clR,memR]=results;
  const errs=[evR,plR,asR,stR,clR].filter(r=>r.error);
  if(errs.length&& !evR.data && !plR.data && !asR.data){panel.innerHTML='<div class="tic-cc-command-card"><div class="tic-cc-command-error">Não foi possível carregar a agenda e o planejamento: '+esc(errs[0].error.message)+'<br>Os dados não foram alterados.<br><button type="button" data-tic-cc-retry>↻ Tentar novamente</button></div></div>';panel.querySelector('[data-tic-cc-retry]')?.addEventListener('click',()=>load(panel));return;}
  const events=evR.data||[],planning=plR.data||[],assignments=asR.data||[],students=stR.data||[],classes=clR.data||[],members=memR.data||[];
  const studentMap=Object.fromEntries(students.map(s=>[s.id,s]));
  const classMap=Object.fromEntries(classes.map(c=>[c.id,{...c,studentNames:members.filter(m=>m.class_id===c.id&&m.status==='active').map(m=>studentMap[m.student_id]?.display_name||studentMap[m.student_id]?.name).filter(Boolean).join(', ')}]));
  const assignmentMap=Object.fromEntries(assignments.map(a=>[a.id,a]));
  const ids=assignments.map(a=>a.id);
  let taskRows=[];
  if(ids.length){
   const taskR=await database.from('tic_task_assignments').select('*').in('assignment_id',ids).order('created_at',{ascending:false}).limit(150);
   if(!taskR.error)taskRows=taskR.data||[];
  }
  const now=Date.now(),upcoming=events.filter(e=>e.starts_at&&new Date(e.starts_at).getTime()>=now&&!['cancelled','completed'].includes(e.status)).sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at));
  const todayTasks=taskRows.filter(t=>!['completed','done','cancelled'].includes(t.status));
  const datedPlanning=planning.filter(p=>p.scheduled_at);
  const upcomingPlanning=datedPlanning.filter(p=>new Date(p.scheduled_at).getTime()>=now&&p.status!=='done');
  const recentEvents=upcoming.slice(0,6);
  const recentPlanning=[...planning].sort((a,b)=>new Date(a.scheduled_at||a.created_at||0)-new Date(b.scheduled_at||b.created_at||0)).slice(0,5);
  const topTasks=[...todayTasks].slice(0,5);
  panel.innerHTML=
   '<div class="tic-cc-command-head"><div><h2>🗓️ Agenda & Teacher Planning</h2><p>Visão diária do que está agendado, das tarefas e do que você está preparando para cada aluno.</p></div><div class="tic-cc-command-actions"><button type="button" data-tic-cc-new-event class="primary">＋ Agendar aula</button><button type="button" data-tic-cc-new-planning>＋ Planejar para aluno</button><button type="button" data-tic-cc-refresh>↻ Atualizar</button></div></div>'+
   '<div class="tic-cc-command-kpis"><div class="tic-cc-command-kpi"><span>📅 Aulas futuras</span><b>'+upcoming.length+'</b></div><div class="tic-cc-command-kpi"><span>🗂️ Planejamentos datados</span><b>'+upcomingPlanning.length+'</b></div><div class="tic-cc-command-kpi"><span>📝 Tasks pendentes</span><b>'+todayTasks.filter(t=>['pending','overdue'].includes(t.status)).length+'</b></div><div class="tic-cc-command-kpi"><span>👤 Alunos com planejamento</span><b>'+new Set(planning.map(p=>p.student_id).filter(Boolean)).size+'</b></div></div>'+
   '<div class="tic-cc-command-grid"><section class="tic-cc-command-card"><header class="tic-cc-command-card-head"><div><h3>📆 Agenda visível</h3><p>Aulas, reuniões, avaliações e links por data.</p></div><span class="tic-cc-command-pill">'+upcoming.length+' próximas</span></header><div class="tic-cc-command-filters"><button class="active" data-tic-cc-event-filter="upcoming">Próximas</button><button data-tic-cc-event-filter="all">Todas</button><button data-tic-cc-event-filter="past">Anteriores</button></div><div class="tic-cc-command-list" data-tic-cc-events>'+renderList(recentEvents,'event',studentMap,classMap,assignmentMap)+'</div></section>'+
   '<div style="display:grid;gap:12px;min-width:0"><section class="tic-cc-command-card"><header class="tic-cc-command-card-head"><div><h3>📝 Tasks dos alunos</h3><p>Itens atribuídos e seus status.</p></div><span class="tic-cc-command-pill">'+todayTasks.length+' abertas</span></header><div class="tic-cc-command-list">'+renderList(topTasks,'task',studentMap,classMap,assignmentMap)+'</div></section><section class="tic-cc-command-card"><header class="tic-cc-command-card-head"><div><h3>📌 Planejamento & anotações</h3><p>Notas datadas, materiais e preparação por aluno.</p></div><span class="tic-cc-command-pill">'+planning.length+' registros</span></header><div class="tic-cc-command-list">'+renderList(recentPlanning,'planning',studentMap,classMap,assignmentMap)+'</div></section></div></div>'+
   '<div class="tic-cc-command-error" data-tic-cc-warning hidden></div>';
  let eventFilter='upcoming';
  const eventList=panel.querySelector('[data-tic-cc-events]');
  const drawEvents=()=>{let rows=events;if(eventFilter==='upcoming')rows=upcoming;else if(eventFilter==='past')rows=events.filter(e=>e.starts_at&&new Date(e.starts_at).getTime()<now);eventList.innerHTML=renderList(rows.slice(0,eventFilter==='all'?100:12),'event',studentMap,classMap,assignmentMap)};
  panel.querySelectorAll('[data-tic-cc-event-filter]').forEach(b=>b.addEventListener('click',()=>{eventFilter=b.dataset.ticCcEventFilter;panel.querySelectorAll('[data-tic-cc-event-filter]').forEach(x=>x.classList.toggle('active',x===b));drawEvents()}));
  panel.querySelector('[data-tic-cc-refresh]')?.addEventListener('click',()=>load(panel));
  panel.querySelector('[data-tic-cc-new-planning]')?.addEventListener('click',()=>{if(typeof window.openTeacherPlanningForm==='function')window.openTeacherPlanningForm();else alert('Abra a seção Teacher Planning para registrar o planejamento.');});
  panel.querySelector('[data-tic-cc-new-event]')?.addEventListener('click',()=>{
   const activeClasses=classes;
   if(!activeClasses.length){alert('Cadastre uma turma antes de agendar uma aula.');return;}
   const options=activeClasses.map(c=>({id:c.id,name:c.name||'Turma'}));
   let promptText='Escolha o número da turma para agendar:';
   const choice=window.prompt(promptText+'\n'+options.map((o,i)=>(i+1)+'. '+o.name).join('\n'),'1');
   if(choice===null)return;const n=Number(choice),picked=options[n-1];
   if(!picked){alert('Número de turma inválido.');return;}
   if(typeof window.ticAgendaOpenFormV66==='function')window.ticAgendaOpenFormV66(picked.id);else if(typeof window.loadView==='function')window.loadView('calendar');
  });
  panel.addEventListener('click',async ev=>{
   const openEv=ev.target.closest('[data-tic-cc-open-event]');
   if(openEv){const item=events.find(x=>String(x.id)===openEv.dataset.ticCcOpenEvent);if(item?.class_id&&typeof window.ticAgendaOpenFormV66==='function'){window.ticAgendaOpenFormV66(item.class_id,item);return;}if(typeof window.loadView==='function')window.loadView('calendar');return;}
   const editEv=ev.target.closest('[data-tic-cc-edit-event]');
   if(editEv){const item=events.find(x=>String(x.id)===editEv.dataset.ticCcEditEvent);if(item&&typeof window.ticAgendaOpenFormV66==='function')window.ticAgendaOpenFormV66(item.class_id,item);else alert('Não foi possível abrir a edição deste compromisso.');return;}
   const delEv=ev.target.closest('[data-tic-cc-delete-event]');
   if(delEv){const item=events.find(x=>String(x.id)===delEv.dataset.ticCcDeleteEvent);if(!item)return;if(!confirm('Remover este compromisso da agenda?'))return;const {error}=await database.from('tic_events').delete().eq('id',item.id).eq('teacher_id',u.id);if(error){alert('Não foi possível remover: '+error.message);return;}await load(panel);return;}
   const editPl=ev.target.closest('[data-tic-cc-edit-planning]');
   if(editPl){if(typeof window.openTeacherPlanningForm==='function')window.openTeacherPlanningForm(editPl.dataset.ticCcEditPlanning);return;}
   const delPl=ev.target.closest('[data-tic-cc-delete-planning]');
   if(delPl){const id=delPl.dataset.ticCcDeletePlanning;if(!confirm('Remover esta anotação/planejamento?'))return;const {error}=await database.from('tic_teacher_planning_items').delete().eq('id',id).eq('teacher_id',u.id);if(error){alert('Não foi possível remover: '+error.message);return;}await load(panel);return;}
   const url=ev.target.closest('[data-tic-cc-open-url]');
   if(url){window.open(url.dataset.ticCcOpenUrl,'_blank','noopener,noreferrer');return;}
   if(ev.target.closest('[data-tic-cc-open-tasks]')&&typeof window.loadView==='function')window.loadView('assignments');
  });
 }
 let scheduled=false;
 function scan(){
  const panel=findHost();if(!panel)return;
  addStyles();
  if(panel.dataset.loaded==='1')return;
  panel.dataset.loaded='1';load(panel).catch(err=>{panel.dataset.loaded='0';panel.innerHTML='<div class="tic-cc-command-card"><div class="tic-cc-command-error">Falha ao carregar o overview: '+esc(err?.message||err)+'<button type="button" data-tic-cc-retry>↻ Tentar novamente</button></div></div>';panel.querySelector('[data-tic-cc-retry]')?.addEventListener('click',()=>{panel.dataset.loaded='0';scan()})});
 }
 function watch(){if(scheduled)return;scheduled=true;const run=()=>{scheduled=false;scan()};if(window.requestAnimationFrame)requestAnimationFrame(run);else setTimeout(run,50);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{watch();new MutationObserver(watch).observe(document.getElementById('content')||document.body,{childList:true,subtree:true})},{once:true});
 else{watch();new MutationObserver(watch).observe(document.getElementById('content')||document.body,{childList:true,subtree:true});}
})();
