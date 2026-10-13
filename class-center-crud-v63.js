/* Fluent Immersion — Class Center record actions */
(function(){
 'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const fmt=x=>x?new Date(x).toLocaleString('pt-BR'):'—';
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
     const date=e.starts_at||e.created_at;
     return '<article class="v63-record"><div class="v63-record-main"><b>'+esc(title)+'</b><small>'+esc(e.event_type==='next_class'||e.event_type==='next'?'Próxima aula':e.event_type==='review'?'Revisão':'Aula')+(e.notes?' · '+esc(e.notes):'')+'</small><small>'+esc(fmt(date))+(e.meeting_url?' · 🔗 Link configurado':'')+'</small></div><div class="v63-actions"><button type="button" class="btn sm secondary" onclick="ticV61EditEvent(\''+esc(e.id)+'\',\''+esc(classId)+'\')">✏️ Editar</button><button type="button" class="btn sm ghost v61-danger" onclick="ticV61DeleteEvent(\''+esc(e.id)+'\',\''+esc(classId)+'\')">🗑 Remover</button></div></article>';
   }).join('');
   body.innerHTML=kpis+'<div class="v41-panel v63-lessons"><div class="v63-heading"><div><h3>📚 Aulas</h3><p>Edite ou remova cada registro. O título é opcional.</p></div><button class="btn primary" onclick="openClassLessonForm(\''+esc(classId)+'\')">＋ Registrar aula</button></div><div class="v63-list">'+(rows||'<div class="v41-empty">Nenhuma aula registrada. Clique em “Registrar aula” para adicionar a primeira.</div>')+'</div></div>';
 }
 const wrapped=async function(classId,tab){if(tab==='lessons')return renderLessons(classId);return original.apply(this,arguments)};
 wrapped.__v63Crud=true;
 window.classCenterTabV41=wrapped;
 window.classCenterTab=wrapped;
 const style=document.createElement('style');
 style.id='v63-class-crud-css';
 style.textContent='.v63-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.v63-heading h3{margin:0 0 5px}.v63-heading p{margin:0;color:var(--muted,#74809a);font-size:13px}.v63-list{display:grid;gap:9px;margin-top:16px}.v63-record{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid var(--border,#e2e6f0);border-radius:13px;padding:13px 15px;background:var(--card,#fff);min-width:0}.v63-record-main{flex:1;min-width:0}.v63-record-main b{display:block;overflow-wrap:anywhere}.v63-record-main small{display:block;margin-top:4px;color:var(--muted,#74809a);overflow-wrap:anywhere}.v63-actions{display:flex;gap:7px;align-items:center;flex-wrap:wrap;flex-shrink:0}.v63-actions .btn{white-space:nowrap}.v63-actions .v61-danger{border:1px solid #efcaca!important;color:#b42318!important;background:#fff7f7!important}@media(max-width:720px){.v63-record{align-items:flex-start;flex-direction:column}.v63-actions{width:100%;justify-content:flex-start}}';
 document.head.appendChild(style);
})();