(function(){'use strict';
const css='.v63-card-toolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0}.v63-card-search{flex:1;min-width:210px;padding:10px 12px;border:1px solid #e5def2;border-radius:11px;background:#fff;color:#251b40;font-size:12px}.v63-card-menu{position:absolute;right:10px;top:10px;z-index:20;background:#fff;border:1px solid #e5def2;border-radius:12px;padding:6px;box-shadow:0 10px 25px #24124b22}.v63-card-menu button{display:block;width:100%;border:0;background:transparent;padding:8px;text-align:left;cursor:pointer}.v63-card-enhanced{position:relative;transition:transform .15s,box-shadow .15s}.v63-card-enhanced:hover{transform:translateY(-2px);box-shadow:0 10px 26px #24124b12}';
function installClassTabRefreshPersistence(){
 if(window.__fiClassTabRefreshPersistence)return;
 window.__fiClassTabRefreshPersistence=true;
 var CLASS='ticPlatformLastClassTabV1',CLASSVIEW='ticPlatformLastClassTabViewV1',VIEW='ticPlatformLastViewV1',GESTURE='ticPlatformLastGestureV1';
 document.addEventListener('click',function(ev){if(!ev.isTrusted)return;try{sessionStorage.setItem(GESTURE,String(Date.now()))}catch(_){}},true);
 function recent(){try{return Date.now()-Number(sessionStorage.getItem(GESTURE)||0)<2500}catch(_){return false}}
 function safeText(el){return String(el&&(el.innerText||el.textContent)||'').replace(/\\s+/g,' ').trim().slice(0,180)}
 function stableAttr(el){if(!el)return{};var o={};['data-student-id','data-id','data-student','data-studentid','data-folder-id','id'].forEach(function(k){var v=el.getAttribute&&el.getAttribute(k);if(v)o[k]=v});return o}
 function installFolderTracker(){
  if(window.__fiStudentFolderClickTracker)return;
  window.__fiStudentFolderClickTracker=true;
  document.addEventListener('click',function(ev){
   if(!ev.isTrusted||window.__fiRestoringLastPosition)return;
   var body=document.getElementById('ticV41ClassBody');if(!body||!body.contains(ev.target))return;
   var target=ev.target.closest('button,a,[role="button"],.v41-student-card,.student-card,[data-student-id],[data-folder-id]');
   if(!target||target.closest('button[data-act="delete"],.delete,.danger,[aria-label*="Excluir"],[aria-label*="Remover"]'))return;
   var card=target.closest('.v41-student-card,.student-card,[data-student-id],[data-folder-id]')||target;
   var label=safeText(target),cardText=safeText(card);
   var looksFolder=/pasta|perfil|ficha do aluno|abrir aluno|ver aluno|student folder|student profile/i.test(label);
   var looksStudent=card!==target||/aluno|student/i.test(label);
   if(!looksFolder&&!looksStudent)return;
   if(/excluir|remover|apagar|deletar|salvar|enviar|cancelar|resolver|editar|mensagem|message/i.test(label))return;
   var state=window.__ticClassCenterV41||{},classId=state.classId||window.__fiBoardClassId||'';
   if(!classId)return;
   var descriptor={classId:String(classId),tab:document.querySelector('.v41-tabs button.active')?.dataset.tab||'students',targetText:label,cardText:cardText,cardAttrs:stableAttr(card),targetAttrs:stableAttr(target),isCard:target===card,at:Date.now()};
   try{sessionStorage.setItem('ticPlatformStudentFolderV1',JSON.stringify(descriptor));sessionStorage.setItem('ticPlatformStudentFolderViewV1',sessionStorage.getItem(VIEW)||'')}catch(_){}
  },true);
 }
 function restoreFolder(){
  var d,view='';try{d=JSON.parse(sessionStorage.getItem('ticPlatformStudentFolderV1')||'null');view=sessionStorage.getItem(VIEW)||'';if((sessionStorage.getItem('ticPlatformStudentFolderViewV1')||'')!==view)return}catch(_){return}
  if(!d||!d.classId||!d.at||Date.now()-d.at>86400000)return;
  var count=0,attempt=setInterval(function(){
   count++;var s=window.__ticClassCenterV41||{},body=document.getElementById('ticV41ClassBody');
   if(!body||String(s.classId||'')!==String(d.classId)){if(count>24)clearInterval(attempt);return}
   var normText=function(v){return String(v||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/\\s+/g,' ').trim()};
   var nodes=Array.from(body.querySelectorAll('.v41-student-card,.student-card,[data-student-id],[data-folder-id],button,a,[role="button"]'));
   function attrsMatch(el,attrs){return Object.keys(attrs||{}).some(function(k){return el.getAttribute(k)===attrs[k]})}
   var candidate=nodes.find(function(el){return attrsMatch(el,d.cardAttrs)||attrsMatch(el,d.targetAttrs)});
   if(!candidate&&d.cardText)candidate=nodes.find(function(el){var t=normText(safeText(el)),want=normText(d.cardText);return t&&want&&(t===want||t.includes(want)||want.includes(t))&&t.length>3});
   if(candidate){
    var actual=candidate;
    var buttons=Array.from((candidate.matches('button,a,[role="button"]')?[candidate]:candidate.querySelectorAll('button,a,[role="button"]')));
    var explicit=buttons.find(function(el){return /pasta|abrir|ver perfil|ficha|detalhes/i.test(safeText(el))&&!/excluir|remover|apagar|editar|salvar/i.test(safeText(el))});
    if(explicit)actual=explicit;
    if(!actual.dataset.fiFolderRestored){actual.dataset.fiFolderRestored='1';window.__fiRestoringLastPosition=true;try{actual.click()}catch(e){console.warn('Restauração da pasta do aluno:',e)}setTimeout(function(){window.__fiRestoringLastPosition=false},1200);clearInterval(attempt);return}
   }
   if(count>=24)clearInterval(attempt);
  },450);
 }
 installFolderTracker();
 function wrap(){
  var fn=window.classCenterTabV41;
  if(typeof fn!=='function'||fn.__fiRefreshClassTabWrapped)return false;
  var wrapped=function(classId,tab){
   if(!window.__fiRestoringLastPosition&&recent()&&classId&&tab){
    try{sessionStorage.setItem(CLASS,JSON.stringify({classId:String(classId),tab:String(tab)}));sessionStorage.setItem(CLASSVIEW,sessionStorage.getItem(VIEW)||'')}catch(_){}
   }
   return fn.apply(this,arguments);
  };
  wrapped.__fiRefreshClassTabWrapped=true;wrapped.__fiOriginal=fn;window.classCenterTabV41=wrapped;
  if(typeof window.classCenterTab!=='function'||window.classCenterTab===fn)window.classCenterTab=wrapped;
  return true;
 }
 wrap();var tries=0;var watcher=setInterval(function(){tries++;if(wrap()||tries>24)clearInterval(watcher)},250);
 setTimeout(restoreFolder,4200);
 setTimeout(function(){
  var data=null,view='';
  try{data=JSON.parse(sessionStorage.getItem(CLASS)||'null');view=sessionStorage.getItem(VIEW)||'';if((sessionStorage.getItem(CLASSVIEW)||'')!==view)return}catch(_){return}
  if(!data||!data.classId||!data.tab)return;
  var count=0;var timer=setInterval(function(){
   count++;var fn=window.classCenterTabV41;
   var body=document.getElementById('ticV41ClassBody');
   if(typeof fn==='function'&&body){
    window.__fiRestoringLastPosition=true;
    try{var original=fn.__fiRefreshClassTabWrapped?fn.__fiOriginal:fn;Promise.resolve(original.call(window,data.classId,data.tab)).catch(function(e){console.warn('Não foi possível restaurar a aba do Class Center:',e)});}catch(e){console.warn('Não foi possível restaurar a aba do Class Center:',e)}
    setTimeout(function(){window.__fiRestoringLastPosition=false},1800);clearInterval(timer);
   }else if(count>=20)clearInterval(timer);
  },400);
 },2600);
}
function init(){installClassTabRefreshPersistence();if(!document.getElementById('v63-card-css')){var st=document.createElement('style');st.id='v63-card-css';st.textContent=css;document.head.appendChild(st)}
var body=document.getElementById('ticV41ClassBody');if(!body)return;
wireOverviewCards(body);
var cards=body.querySelectorAll('.v61-task-card,.v61-resource-card,.v49-private-card,.v61-lesson-card');if(!cards.length)return;
if(!body.querySelector('.v63-card-toolbar')){var bar=document.createElement('div');bar.className='v63-card-toolbar';bar.innerHTML='<input class="v63-card-search" placeholder="⌕ Buscar título, descrição ou link..." aria-label="Buscar cartões"><button type="button" data-filter="all">Tudo</button><button type="button" data-filter="links">Com links</button><button type="button" data-filter="nolinks">Sem links</button>';var first=cards[0].parentElement;first.parentElement.insertBefore(bar,first);bar.querySelector('input').addEventListener('input',function(){apply(bar,'search')});bar.addEventListener('click',function(e){var b=e.target.closest('[data-filter]');if(b)apply(bar,b.dataset.filter)})}
cards.forEach(function(card){card.classList.add('v63-card-enhanced');if(card.dataset.v63Done)return;card.dataset.v63Done='1';var has=!!card.querySelector('a[href^="http"]');card.dataset.v63HasLink=has?'yes':'no';if(!card.querySelector('.v63-more')){var b=document.createElement('button');b.type='button';b.className='v63-more';b.setAttribute('aria-label','Ações do cartão');b.textContent='⋮';b.style.cssText='position:absolute;right:10px;top:10px;border:1px solid #e5def2;border-radius:9px;background:#fff;width:30px;height:30px;cursor:pointer;font-size:19px';b.addEventListener('click',function(ev){ev.stopPropagation();var old=card.querySelector('.v63-card-menu');document.querySelectorAll('.v63-card-menu').forEach(function(x){x.remove()});if(old)return;var m=document.createElement('div');m.className='v63-card-menu';m.innerHTML='<button type="button" data-act="open">↗ Abrir primeiro link</button><button type="button" data-act="copy">⧉ Copiar link</button>';m.addEventListener('click',function(e){var a=card.querySelector('a[href^="http"]');var act=e.target.closest('[data-act]')&&e.target.closest('[data-act]').dataset.act;if(!a){alert('Este cartão não possui link direto.');return}if(act==='open')window.open(a.href,'_blank','noopener');if(act==='copy'&&navigator.clipboard)navigator.clipboard.writeText(a.href).then(function(){alert('Link copiado.')}).catch(function(){prompt('Copie o link:',a.href)});m.remove()});card.appendChild(m)});card.appendChild(b)}});

function wireOverviewCards(body){
 if(!document.getElementById('v63-overview-card-style')){
  var st=document.createElement('style');st.id='v63-overview-card-style';
  st.textContent='.v41-kpi.v63-clickable,.v41-panel .v63-overview-clickable,.v63-overview-clickable{cursor:pointer!important;transition:transform .16s,box-shadow .16s,border-color .16s!important}.v63-overview-clickable:hover{transform:translateY(-2px);border-color:#9b7af4!important;box-shadow:0 8px 24px #6941d91c!important}.v63-overview-clickable:focus-visible{outline:3px solid #9b7af4!important;outline-offset:3px}.v63-overview-clickable:after{content:"↗";float:right;color:#7650d9;font-size:12px;font-weight:900;margin-left:6px}.v63-overview-clickable .v63-click-hint{font-size:9px;color:#7650d9;font-weight:800;margin-top:5px}body:not(.fi-light) .v63-overview-clickable:after{color:#c5afff}';
  document.head.appendChild(st);
 }
 var rules=[
  {title:'Total de registros',tab:'lessons',mode:'all'},
  {title:'Ministradas',tab:'lessons',mode:'status',terms:['ministrada','ministradas','realizada','realizadas','completed']},
  {title:'Canceladas',tab:'lessons',mode:'status',terms:['cancelada','canceladas','cancelado','cancelados','cancelled']},
  {title:'Adiadas',tab:'lessons',mode:'status',terms:['adiada','adiadas','adiado','adiados','postergada','postergadas','rescheduled']},
  {title:'Próximas / agendadas',tab:'lessons',mode:'status',terms:['agendada','agendadas','próxima','próximas','scheduled','planejada','planejadas']},
  {title:'Sem status definido',tab:'lessons',mode:'status',terms:['sem status','não definido','nao definido','undefined']},
  {title:'Alunos',tab:'students',mode:'all'},
  {title:'Conteúdos',tab:'tasks',mode:'all'},
  {title:'Aulas',tab:'lessons',mode:'all'},
  {title:'Resources',tab:'resources',mode:'all'},
  {title:'Nível',tab:'students',mode:'all'}
 ];
 function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
 function findTitleNode(root,title){var target=norm(title);return Array.from(root.querySelectorAll('h1,h2,h3,h4,small,span,label,p,strong,b,div')).find(function(n){return norm(n.textContent)===target&&n.children.length<3})}
 function findCard(node,root,title){
  var n=node,chosen=null;
  while(n&&n!==root){
   var text=(n.innerText||n.textContent||'').trim();
   if(text.length>0&&text.length<150&&(/v41-kpi|kpi|stat|metric|summary-card|overview-card/i.test(n.className||'')||n.querySelectorAll('*').length<=8))chosen=n;
   if(/v41-kpi|summary-card|overview-card/i.test(n.className||''))return n;
   n=n.parentElement;
  }
  return chosen;
 }
 rules.forEach(function(rule){
  var titleNode=findTitleNode(body,rule.title);if(!titleNode)return;
  var card=findCard(titleNode,body,rule.title);if(!card||card.dataset.v63OverviewAction)return;
  // Avoid promoting a large summary panel when the actual small KPI card is available.
  if((card.innerText||'').trim().length>150)return;
  card.dataset.v63OverviewAction=rule.title;card.classList.add('v63-overview-clickable');card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('aria-label','Abrir '+rule.title);card.title='Clique para abrir '+(rule.tab==='students'?'Alunos':rule.tab==='tasks'?'Conteúdos':'Aulas');
  if(!card.querySelector('.v63-click-hint')){var hint=document.createElement('div');hint.className='v63-click-hint';hint.textContent='Clique para abrir';card.appendChild(hint)}
  function activate(ev){if(ev&&ev.target.closest('a,button,input,select,textarea'))return;if(ev){ev.preventDefault()}var s=window.__ticClassCenterV41||window.__ticClassCenter||{};var id=s.classId||window.__fiBoardClassId;if(!id){var shell=body.closest('.v41-class-shell');id=shell&&shell.getAttribute('data-v41-class')}if(!id){console.warn('Não foi possível identificar a turma para abrir o resumo:',rule.title);return}
   var fn=window.classCenterTabV41||window.classCenterTab;if(typeof fn!=='function')return;
   Promise.resolve(fn.call(window,id,rule.tab)).then(function(){if(rule.mode!=='status')return;setTimeout(function(){var b=document.getElementById('ticV41ClassBody');if(!b)return;var selectors='.v41-list-row,.v63-record,.fi64-card,.v41-board-card,.v41-task-card,.v61-lesson-card';var rows=Array.from(b.querySelectorAll(selectors)).filter(function(el){return !el.closest('.fi64-toolbar,.v41-tabs')});var terms=rule.terms.map(norm);var matched=rows.filter(function(row){var txt=norm(row.innerText||row.textContent);return terms.some(function(term){return txt.includes(term)})});if(matched.length){rows.forEach(function(row){row.hidden=!matched.includes(row)});var note=b.querySelector('.v63-status-filter-note');if(!note){note=document.createElement('div');note.className='v63-status-filter-note';note.style.cssText='padding:10px 12px;margin:8px 0 12px;border-radius:10px;background:#f1ebff;color:#5630ba;font-size:12px;font-weight:800';b.prepend(note)}note.textContent='Filtro: '+rule.title+' · '+matched.length+' registro(s).';} },220)});
  }
  card.addEventListener('click',activate);card.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){if(ev.target!==card)return;activate(ev)}});
 });
}
function apply(bar,mode){var q=(bar.querySelector('input').value||'').toLowerCase().trim();body.querySelectorAll('.v61-task-card,.v61-resource-card,.v49-private-card,.v61-lesson-card').forEach(function(c){var text=(c.textContent||'').toLowerCase();var has=c.dataset.v63HasLink==='yes';c.hidden=(mode==='links'&&!has)||(mode==='nolinks'&&has)||(mode==='search'&&q&&!text.includes(q));if(mode==='all')c.hidden=false})}
}
var timer;function schedule(){clearTimeout(timer);timer=setTimeout(init,120)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
})();