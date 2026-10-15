/* Teacher Platform — additive teacher file management UX. No schema or data changes. */
(function(){
'use strict';
const STYLE = `
.fi-file-commandbar{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:12px 0;padding:12px 14px;border:1px solid var(--line,#e3ddf4);border-radius:16px;background:var(--card,#fff)}
.fi-file-commandbar .fi-fc-left{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.fi-file-commandbar strong{font-size:13px}.fi-file-commandbar small{display:block;color:var(--muted,#77728b);font-size:11px;margin-top:3px}
.fi-fc-btn{border:1px solid var(--line,#ddd5f0);background:var(--card,#fff);color:var(--text,#251b40);border-radius:10px;padding:9px 12px;font:600 12px inherit;cursor:pointer;transition:.15s}
.fi-fc-btn:hover{border-color:#8050f5;transform:translateY(-1px)}.fi-fc-primary{background:linear-gradient(135deg,#7440f5,#5730c7);color:#fff;border-color:transparent}
.fi-fc-danger{color:#c52d50}.fi-fc-menu{position:absolute;z-index:50;right:10px;top:10px;background:var(--card,#fff);border:1px solid var(--line,#ddd5f0);box-shadow:0 12px 32px #21123a24;border-radius:12px;padding:6px;min-width:165px;display:grid;gap:3px}
.fi-fc-menu button{border:0;background:transparent;color:var(--text,#251b40);text-align:left;padding:9px 10px;border-radius:8px;font:500 12px inherit;cursor:pointer}.fi-fc-menu button:hover{background:#eee7ff}.fi-fc-menu .danger{color:#c52d50}
.fi-fc-card{position:relative}.fi-fc-kebab{position:absolute;right:10px;top:10px;width:32px;height:32px;border-radius:10px;border:1px solid #ffffff80;background:#fff;color:#36245b;box-shadow:0 2px 8px #160b2520;cursor:pointer;font-size:20px;line-height:1}
.fi-fc-overlay{position:fixed;inset:0;background:#17102588;z-index:9999;display:grid;place-items:center;padding:18px}
.fi-fc-dialog{width:min(560px,100%);max-height:85vh;overflow:auto;background:var(--card,#fff);color:var(--text,#211735);border-radius:20px;padding:22px;box-shadow:0 24px 80px #0e071b55}
.fi-fc-dialog h3{margin:0 0 8px;font-size:20px}.fi-fc-dialog p{font-size:13px;line-height:1.6;color:var(--muted,#77728b)}
.fi-fc-dialog .fi-fc-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin-top:18px}
.fi-fc-dialog input,.fi-fc-dialog textarea,.fi-fc-dialog select{width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--line,#ddd5f0);border-radius:10px;background:var(--bg,#fff);color:inherit;margin:5px 0 12px}
@media(max-width:650px){.fi-file-commandbar{align-items:flex-start}.fi-file-commandbar .fi-fc-left{width:100%}.fi-fc-btn{padding:9px 10px}}
`;
function addStyle(){if(document.getElementById('fi-file-commandbar-style'))return;const s=document.createElement('style');s.id='fi-file-commandbar-style';s.textContent=STYLE;document.head.appendChild(s)}
function toast(msg){if(typeof window.toast==='function')window.toast(msg,'info');else alert(msg)}
function dialog(title,body,buttons){const old=document.querySelector('.fi-fc-overlay');if(old)old.remove();const o=document.createElement('div');o.className='fi-fc-overlay';o.innerHTML='<section class="fi-fc-dialog" role="dialog" aria-modal="true"><h3>'+title+'</h3>'+body+'<div class="fi-fc-actions">'+buttons+'</div></section>';o.addEventListener('click',e=>{if(e.target===o)o.remove()});document.body.appendChild(o);return o}
function callExisting(names,args){for(const n of names){if(typeof window[n]==='function'){try{window[n](...(args||[]));return true}catch(e){console.error('[Teacher file actions]',n,e);toast('A ação encontrou um erro. Consulte o Console do navegador.');return true}}}return false}
function inferCardTitle(card){return (card.querySelector('h3,h4,b,strong,.fi-media-cardbody h3,.material-title')?.textContent||card.getAttribute('aria-label')||'Material').trim()}
function menuFor(card){
 if(card.dataset.fiFcEnhanced)return;card.dataset.fiFcEnhanced='1';card.classList.add('fi-fc-card');
 const b=document.createElement('button');b.type='button';b.className='fi-fc-kebab';b.setAttribute('aria-label','Ações do material');b.title='Editar, atribuir, mover ou remover';b.textContent='⋮';
 b.addEventListener('click',e=>{e.stopPropagation();document.querySelectorAll('.fi-fc-menu').forEach(x=>x.remove());const m=document.createElement('div');m.className='fi-fc-menu';m.innerHTML='<button data-action="open">↗ Visualizar / abrir</button><button data-action="edit">✎ Editar detalhes</button><button data-action="assign">♙ Atribuir a alunos</button><button data-action="move">▣ Organizar / mover</button><button data-action="download">↓ Baixar / salvar</button><button data-action="remove" class="danger">⌫ Remover material</button>';m.addEventListener('click',ev=>{const action=ev.target.closest('button')?.dataset.action;if(!action)return;m.remove();handleAction(card,action)});card.appendChild(m);const close=ev=>{if(!m.contains(ev.target)&&ev.target!==b){m.remove();document.removeEventListener('click',close)}};setTimeout(()=>document.addEventListener('click',close),0)});card.appendChild(b)
}
function handleAction(card,action){
 const title=inferCardTitle(card);const buttons='<button class="fi-fc-btn" data-close>Cancelar</button><button class="fi-fc-btn fi-fc-primary" data-continue>Continuar</button>';
 if(action==='open'){const a=card.querySelector('a[href]');if(a){window.open(a.href,'_blank','noopener');return}if(callExisting(['openMaterial','viewMaterial','openTeacherMaterial'],[card.dataset.id]))return;toast('Abra o material pelo botão Visualizar existente no cartão.');return}
 if(action==='edit'){if(callExisting(['openMaterialForm','editMaterial','openTeacherMaterialFormV53','editTeacherMaterial'],[card.dataset.id]))return;dialog('Editar material','<p>Para preservar os dados, use o editor original deste registro. Selecione o botão Editar já disponível no cartão ou na tela de materiais.</p>',buttons);return}
 if(action==='assign'){if(callExisting(['manageTaskLinksV1','assignMaterial','openMaterialAssignment','openAssignmentForm'],[card.dataset.id]))return;dialog('Atribuir material','<p>A atribuição precisa usar o vínculo de aluno já existente na plataforma. Abra a área de atribuição do material para escolher os alunos e salvar sem duplicar registros.</p>',buttons);return}
 if(action==='move'){if(callExisting(['moveMaterial','openMoveMaterial','moveTeacherMaterial'],[card.dataset.id]))return;dialog('Organizar material','<p>Use a organização por pastas e níveis já disponível em Materials / Media Library. Esta ação visual não altera o registro até o comando original ser executado.</p>',buttons);return}
 if(action==='download'){const a=card.querySelector('a[href]');if(a){window.open(a.href,'_blank','noopener');return}const url=card.dataset.url||card.querySelector('[data-url]')?.dataset.url;if(url){window.open(url,'_blank','noopener');return}toast('Não encontrei um link direto para baixar este material.');return}
 if(action==='remove'){dialog('Remover material?','<p><b>'+escapeHtml(title)+'</b></p><p>Para evitar perda de dados, esta interface não exclui registros diretamente. Use a ação Remover/Arquivar do editor original, que deve preservar vínculos e histórico.</p>','<button class="fi-fc-btn" data-close>Fechar</button>');return}
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function enhance(){
 addStyle();
 document.querySelectorAll('.fi-media-card,.material-card,.teacher-material-card,[data-material-card]').forEach(menuFor);
 const center=document.querySelector('.materials-workspace')||document.querySelector('.class-center,.class-center-wrap,#classCenter,.class-center-page');
 if(center&&!center.querySelector('.fi-file-commandbar')){
 const bar=document.createElement('div');bar.className='fi-file-commandbar';bar.innerHTML='<div class="fi-fc-left"><div><strong>Gerenciador de materiais da turma</strong><small>Organize arquivos, links, PDFs e vídeos sem sair do Class Center.</small></div></div><div class="fi-fc-left"><button class="fi-fc-btn" data-tool="search">⌕ Buscar</button><button class="fi-fc-btn" data-tool="folders">▣ Pastas</button><button class="fi-fc-btn fi-fc-primary" data-tool="add">＋ Adicionar material</button></div>';
 const tabs=center.querySelector('.class-center-tabs');(tabs||center.firstElementChild)?.after(bar);
 bar.addEventListener('click',e=>{const action=e.target.closest('[data-tool]')?.dataset.tool;if(!action)return;if(action==='search'){const input=center.querySelector('input[placeholder*="Buscar"],input[placeholder*="buscar"],input[type="search"]');if(input){input.focus();input.scrollIntoView({block:'center',behavior:'smooth'})}else toast('Use a busca disponível na aba Materiais.')}else if(action==='folders'){if(!callExisting(['openMaterialFolders','renderMaterialFolders','loadMaterialsFolders'],[]))toast('Abra a aba Materiais para gerenciar as pastas existentes.')}else{if(!callExisting(['openMaterialForm','openTeacherMaterialFormV53','openAssignmentForm'],[]))toast('Use o botão Adicionar material existente na aba Materiais.')}});
 }
}
let scheduled=false;function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',queue);else queue();
new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});
})();
