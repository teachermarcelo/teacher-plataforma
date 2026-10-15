(function(){
'use strict';
function classIdNow(btn){
 const shell=btn&&btn.closest('.v41-class-shell');
 return shell?.getAttribute('data-v41-class')||window.__ticClassCenterV41?.classId||window.__ticClassCenter?.classId||'';
}
function routeMaterials(ev){
 const btn=ev.target.closest?.('.v41-tabs button[data-tab="materials"]');
 if(!btn)return;
 const id=classIdNow(btn);
 if(!id)return;
 ev.preventDefault();
 ev.stopImmediatePropagation();
 document.querySelectorAll('.v41-tabs button').forEach(b=>b.classList.toggle('active',b===btn));
 if(typeof window.renderPrivateMaterialsV49==='function'){
   Promise.resolve(window.renderPrivateMaterialsV49(id)).then(function(){
     if(typeof window.enhancePrivateCards==='function')window.enhancePrivateCards();
   }).catch(function(err){console.error('Class Center Materials routing:',err);});
 } else {
   const body=document.getElementById('ticV41ClassBody');
   if(body)body.innerHTML='<div class="v41-panel"><h3>Materiais</h3><p>O módulo de materiais ainda não foi carregado. Atualize a página e tente novamente.</p></div>';
 }
}
document.addEventListener('click',routeMaterials,true);
window.addEventListener('load',function(){
 const body=document.getElementById('ticV41ClassBody');
 if(!body)return;
 const active=document.querySelector('.v41-tabs button[data-tab="materials"].active');
 if(active && /Tasks \/ Conteúdos/i.test(body.textContent||'')){
   const id=classIdNow(active);
   if(id&&typeof window.renderPrivateMaterialsV49==='function')window.renderPrivateMaterialsV49(id);
 }
});
})();