(function(){
'use strict';
function classIdNow(btn){
 const shell=btn&&btn.closest('.v41-class-shell');
 return shell?.getAttribute('data-v41-class')||window.__ticClassCenterV41?.classId||window.__ticClassCenter?.classId||'';
}
async function showMaterials(classId){
 const body=document.getElementById('ticV41ClassBody');
 if(!body||!classId)return;
 document.querySelectorAll('.v41-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='materials'));
 if(typeof window.renderPrivateMaterialsV49!=='function'){
   body.innerHTML='<div class="v41-panel"><h3>Materiais</h3><p>O módulo de materiais não foi carregado. Atualize a página e tente novamente.</p></div>';
   return;
 }
 try{
   await window.renderPrivateMaterialsV49(classId);
   if(typeof window.enhancePrivateCards==='function')window.enhancePrivateCards();
 }catch(err){
   console.error('Class Center Materials routing:',err);
   body.insertAdjacentHTML('afterbegin','<div class="v41-panel" role="alert">Não foi possível carregar Materiais. Abra o console do navegador para ver o erro.</div>');
 }
}
const previousTab=window.classCenterTabV41;
if(typeof previousTab==='function'){
 const routedTab=async function(classId,tab){
   if(tab==='materials')return showMaterials(classId);
   return previousTab.apply(this,arguments);
 };
 routedTab.__fiMaterialRouting=true;
 routedTab.__fiOriginal=previousTab;
 window.classCenterTabV41=routedTab;
 /* Keep both public entry points synchronized. Quick actions call classCenterTab,
    while the tab strip and older modules call classCenterTabV41. */
 window.classCenterTab=routedTab;
}
function setActive(tab){document.querySelectorAll('.v41-tabs button[data-tab]').forEach(b=>{const on=b.dataset.tab===tab;b.classList.toggle('active',on);b.setAttribute('aria-selected',on?'true':'false')})}
function routeSpecialTab(ev){
 const btn=ev.target.closest?.('.v41-tabs button[data-tab="materials"],.v41-tabs button[data-tab="resources"]');
 if(!btn)return;
 const tab=btn.dataset.tab,id=classIdNow(btn);
 if(!id)return;
 ev.preventDefault();ev.stopImmediatePropagation();setActive(tab);
 if(tab==='materials'){showMaterials(id);return}
 const fn=window.classCenterTabV41||window.classCenterTab;
 if(typeof fn==='function')Promise.resolve(fn(id,'resources')).then(()=>setActive('resources')).catch(err=>{console.error('Class Center Resources routing:',err);setActive('resources')});
}
document.addEventListener('click',routeSpecialTab,true);
window.addEventListener('load',function(){
 const body=document.getElementById('ticV41ClassBody');
 const active=document.querySelector('.v41-tabs button[data-tab="materials"].active');
 if(body&&active&&/Tasks \/ Conteúdos/i.test(body.textContent||'')){
   const id=classIdNow(active);
   if(id)showMaterials(id);
 }
 const resourceActive=document.querySelector('.v41-tabs button[data-tab="resources"].active');
 if(body&&resourceActive&&/Resources da turma/i.test(body.textContent||''))setActive('resources');
});
})();