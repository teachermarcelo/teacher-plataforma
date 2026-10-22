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