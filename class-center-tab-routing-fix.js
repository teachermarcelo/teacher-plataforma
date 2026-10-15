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
 window.classCenterTabV41=async function(classId,tab){
   if(tab==='materials')return showMaterials(classId);
   return previousTab.apply(this,arguments);
 };
}
function routeMaterials(ev){
 const btn=ev.target.closest?.('.v41-tabs button[data-tab="materials"]');
 if(!btn)return;
 const id=classIdNow(btn);
 if(!id)return;
 ev.preventDefault();
 ev.stopImmediatePropagation();
 showMaterials(id);
}
document.addEventListener('click',routeMaterials,true);
window.addEventListener('load',function(){
 const body=document.getElementById('ticV41ClassBody');
 const active=document.querySelector('.v41-tabs button[data-tab="materials"].active');
 if(body&&active&&/Tasks \/ Conteúdos/i.test(body.textContent||'')){
   const id=classIdNow(active);
   if(id)showMaterials(id);
 }
});
})();