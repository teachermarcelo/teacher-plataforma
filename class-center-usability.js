/* Missing Agenda renderer: the previous tab called this function without defining it. */
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
  const card=x=>'<article class="cc-agenda-event"><div class="cc-agenda-date"><b>'+esc(x.starts_at?new Date(x.starts_at).toLocaleDateString('pt-BR',{day:'2-digit'}):'—')+'</b><span>'+esc(x.starts_at?new Date(x.starts_at).toLocaleDateString('pt-BR',{month:'short'}):'sem data')+'</span></div><div class="cc-agenda-main"><b>'+esc(x.title||'Aula')+'</b><small>'+esc(fmt(x.starts_at))+' · '+esc(x.event_type||'Aula')+(x.ends_at?' – '+esc(new Date(x.ends_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})):'')+'</small>'+(x.notes?'<p>'+esc(x.notes)+'</p>':'')+(x.meeting_url?'<a href="'+esc(x.meeting_url)+'" target="_blank" rel="noopener noreferrer">Abrir link da aula ↗</a>':'')+'</div><span class="cc-agenda-status '+((String(x.event_type).includes('next')||x.status==='scheduled')?'is-planned':'is-done')+'">'+((String(x.event_type).includes('next')||x.status==='scheduled')?'Planejada':'Registrada')+'</span></article>';
  body.innerHTML='<div class="v41-kpis"><div class="v41-kpi"><span>📅 Eventos</span><b>'+events.length+'</b></div><div class="v41-kpi"><span>🟣 Próximos</span><b>'+up.length+'</b></div><div class="v41-kpi"><span>✓ Anteriores</span><b>'+past.length+'</b></div></div><section class="v41-panel cc-agenda-panel"><div class="cc-agenda-heading"><div><h3>📅 Agenda · '+esc(cls.name)+'</h3><p>Consulte horários, links e registre novas aulas.</p></div><div class="cc-agenda-actions"><button class="btn secondary" data-cc-refresh>↻ Atualizar</button><button class="btn primary" data-cc-create>＋ Agendar aula</button></div></div><div class="cc-agenda-filters"><button class="active" data-cc-filter="all">Todas ('+events.length+')</button><button data-cc-filter="up">Próximas ('+up.length+')</button><button data-cc-filter="past">Anteriores ('+past.length+')</button></div><div class="cc-agenda-events" data-cc-events>'+(events.map(card).join('')||'<div class="v41-empty">Ainda não há aulas nesta agenda. Clique em “Agendar aula” para registrar a primeira.</div>')+'</div></section>';
  body.querySelector('[data-cc-refresh]').onclick=()=>window.ticClassAgendaRefreshV65(classId);
  body.querySelector('[data-cc-create]').onclick=()=>window.openClassLessonForm?.(classId);
  body.querySelectorAll('[data-cc-filter]').forEach(b=>b.onclick=()=>{body.querySelectorAll('[data-cc-filter]').forEach(x=>x.classList.toggle('active',x===b));const arr=b.dataset.ccFilter==='up'?up:b.dataset.ccFilter==='past'?past:events;body.querySelector('[data-cc-events]').innerHTML=arr.map(card).join('')||'<div class="v41-empty">Nenhuma aula neste filtro.</div>'});
 }catch(e){
  body.innerHTML='<section class="v41-panel cc-agenda-error"><h3>Não foi possível carregar a agenda</h3><p>'+esc(e?.message||'Erro inesperado')+'</p><button class="btn secondary" data-cc-retry>↻ Tentar novamente</button><button class="btn primary" data-cc-create>＋ Agendar aula</button></section>';
  body.querySelector('[data-cc-retry]').onclick=()=>window.ticClassAgendaRefreshV65(classId);
  body.querySelector('[data-cc-create]').onclick=()=>window.openClassLessonForm?.(classId);
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