(function(){
'use strict';
if(window.__ivPremiumEnhancementsLoaded)return;
window.__ivPremiumEnhancementsLoaded=true;
const css = `
/* Fluent Immersion · Interactive Video Lab premium layer */
.iv-lab{--iv-bg:#090b12;--iv-panel:#121621;--iv-panel2:#191e2b;--iv-line:#2b3142;--iv-text:#f7f8fc;--iv-muted:#a7afc2;gap:22px;color:var(--iv-text)}
.iv-lab>.page-head{padding:22px 24px;border:1px solid #252b3a;border-radius:20px;background:radial-gradient(ellipse at 90% 0%,#4c267a70,transparent 42%),linear-gradient(120deg,#111521,#171222);color:#fff}
.iv-lab>.page-head h1{font-size:clamp(25px,3vw,36px);letter-spacing:-.8px;margin:0 0 7px;color:#fff}
.iv-lab>.page-head p{color:#b9bfd0;margin:0}
.iv-lab #ivWorkspace{padding:0;border:0;background:transparent;box-shadow:none;display:grid;gap:18px}
.iv-lab .iv-card{background:var(--iv-panel);border-color:var(--iv-line);color:var(--iv-text);box-shadow:0 12px 35px #0002;border-radius:20px}
.iv-lab .iv-card h2,.iv-lab .iv-card h3,.iv-lab .iv-media-content h3{color:#f7f8fc;letter-spacing:-.25px}
.iv-lab .iv-muted,.iv-lab .iv-due{color:var(--iv-muted)}
.iv-lab .iv-card input,.iv-lab .iv-card textarea,.iv-lab .iv-card select{background:#0d111b;border-color:#343b4d;color:#f6f7fb;border-radius:11px;min-height:42px}
.iv-lab .iv-card textarea{min-height:82px}
.iv-lab .iv-card label{font-size:12px;font-weight:750;color:#e4e7f1}
.iv-lab .iv-btn{background:linear-gradient(135deg,#8b5cf6,#6d3bd1);border-radius:11px;padding:11px 15px;box-shadow:0 7px 18px #6d3bd126;transition:transform .18s,filter .18s}
.iv-lab .iv-btn:hover{transform:translateY(-1px);filter:brightness(1.08)}
.iv-lab .iv-btn.alt{background:#202637;color:#e9e9f5;border-color:#343b4d;box-shadow:none}
.iv-lab .iv-badge{background:#292044;color:#d9c9ff;border:1px solid #4b3676}
.iv-lab .iv-tool-option{background:#0d111b;border-color:#303749;border-radius:13px;padding:13px;transition:border-color .18s,background .18s}
.iv-lab .iv-tool-option:has(input:checked){border-color:#8b5cf6;background:#211a35;box-shadow:inset 0 0 0 1px #8b5cf633}
.iv-lab .iv-tool-option input{min-height:initial;accent-color:#9b76ff}
.iv-lab .iv-tools-grid{gap:10px}
.iv-lab .iv-player{border:1px solid #2d3446;border-radius:15px;background:#05070c}
.iv-lab .iv-caption{background:#080b12;border:1px solid #34304a}
.iv-lab .iv-media-card{background:#121621;border-color:#2b3142;border-radius:18px;box-shadow:0 10px 30px #0003}
.iv-lab .iv-media-card:hover{border-color:#7651df;box-shadow:0 16px 38px #0005;transform:translateY(-4px)}
.iv-lab .iv-thumb{background:linear-gradient(135deg,#211a35,#080b12)}
.iv-lab .iv-thumb img{transition:transform .35s;opacity:.88}
.iv-lab .iv-media-card:hover .iv-thumb img{transform:scale(1.04);opacity:1}
.iv-lab .iv-thumb:after{background:#7c4deddc;border:1px solid #ffffff65}
.iv-lab .iv-media-content{padding:17px}
.iv-lab .iv-feature span{background:#202637;border:1px solid #343b4d;color:#d7dbea}
.iv-lab .iv-status{background:#123c2e;color:#91f0bf}
.iv-lab .iv-status[data-state="pending"]{background:#392d15;color:#f8d58a}
.iv-lab .iv-status[data-state="completed"]{background:#123c2e;color:#91f0bf}
.iv-lab .iv-empty{background:#111521;border-color:#343b4d;color:#f6f7fb}
.iv-lab .iv-task-details{border-color:#343b4d}
.iv-lab .iv-result{color:#c4a8ff}
.iv-lab .iv-bar{background:#2b3142}
.iv-lab .iv-bar span{background:linear-gradient(90deg,#7048d8,#c084fc)}
.iv-student-library-head{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:20px 22px;border-radius:20px;border:1px solid #2b3142;background:radial-gradient(ellipse at 100% 0%,#6d3bd140,transparent 44%),linear-gradient(120deg,#111521,#171222)}
.iv-student-library-head h2{font-size:clamp(22px,2.5vw,30px);margin:0 0 7px;color:#fff}
.iv-student-library-head p{margin:0;color:#b9bfd0}
.iv-library-count{display:inline-flex;align-items:center;gap:8px;border:1px solid #49346d;background:#211a35;color:#d9c9ff;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800}
.iv-library-controls{display:grid;grid-template-columns:minmax(180px,1fr) 190px;gap:10px}
.iv-library-controls input,.iv-library-controls select{width:100%;min-height:43px;padding:10px 13px;border-radius:12px;background:#121621;border:1px solid #2b3142;color:#f7f8fc}
.iv-library-section-title{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:4px}
.iv-library-section-title h3{margin:0;font-size:18px;color:#fff}
.iv-library-section-title span{color:#a7afc2;font-size:12px}
.iv-student-hero-card{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(180px,.85fr);overflow:hidden;border:1px solid #3b2a60;border-radius:20px;background:linear-gradient(120deg,#1b1730,#111521);margin-bottom:4px}
.iv-student-hero-copy{padding:22px;display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.iv-student-hero-copy h3{font-size:22px;margin:0;color:#fff}
.iv-student-hero-copy p{margin:0;color:#b9bfd0;font-size:13px;line-height:1.6}
.iv-student-hero-art{min-height:180px;background-position:center;background-size:cover;position:relative}
.iv-student-hero-art:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#1b1730,transparent 75%),linear-gradient(0deg,#11152130,#11152110)}
.iv-lab .iv-student-tools-panel{margin-top:15px;padding:16px;border:1px solid #343b4d;border-radius:15px;background:#0d111b}
.iv-lab .iv-student-tools-panel h3{margin-top:15px}
.iv-lab .iv-word{padding:1px 2px}
.iv-lab .iv-word:hover{color:#fff;background:#7651df}
.iv-lab .iv-optional-note{display:flex;gap:9px;align-items:flex-start;border:1px solid #34304a;background:#171426;color:#c9bddf;border-radius:12px;padding:11px 13px;font-size:12px;line-height:1.5;margin:10px 0 14px}
.iv-lab .iv-tools-count{font-size:11px;color:#bba5ff;font-weight:800}
body.fi-light .iv-lab,body.fi-premium.fi-light .iv-lab{--iv-bg:#f4f6fb;--iv-panel:#fff;--iv-panel2:#f7f8fc;--iv-line:#dfe4ef;--iv-text:#17233a;--iv-muted:#66748a;color:#17233a}
body.fi-light .iv-lab>.page-head,body.fi-premium.fi-light .iv-lab>.page-head{background:radial-gradient(ellipse at 90% 0%,#ded4ff,transparent 42%),linear-gradient(120deg,#fff,#f5f2ff);border-color:#e0d9f3;color:#17233a}
body.fi-light .iv-lab>.page-head h1,body.fi-premium.fi-light .iv-lab>.page-head h1,body.fi-light .iv-lab .iv-card h2,body.fi-light .iv-lab .iv-card h3,body.fi-premium.fi-light .iv-lab .iv-card h2,body.fi-premium.fi-light .iv-lab .iv-card h3,body.fi-light .iv-lab .iv-media-content h3,body.fi-premium.fi-light .iv-lab .iv-media-content h3{color:#17233a}
body.fi-light .iv-lab>.page-head p,body.fi-premium.fi-light .iv-lab>.page-head p,body.fi-light .iv-lab .iv-muted,body.fi-premium.fi-light .iv-lab .iv-muted{color:#66748a}
body.fi-light .iv-lab .iv-card,body.fi-premium.fi-light .iv-lab .iv-card,body.fi-light .iv-lab .iv-media-card,body.fi-premium.fi-light .iv-lab .iv-media-card{background:#fff;border-color:#dfe4ef;color:#17233a}
body.fi-light .iv-lab .iv-card input,body.fi-light .iv-lab .iv-card textarea,body.fi-light .iv-lab .iv-card select,body.fi-premium.fi-light .iv-lab .iv-card input,body.fi-premium.fi-light .iv-lab .iv-card textarea,body.fi-premium.fi-light .iv-lab .iv-card select,body.fi-light .iv-library-controls input,body.fi-light .iv-library-controls select{background:#fff;border-color:#d5ddeb;color:#17233a}
body.fi-light .iv-lab .iv-tool-option,body.fi-premium.fi-light .iv-lab .iv-tool-option{background:#f8f9fd;border-color:#dfe4ef}
body.fi-light .iv-lab .iv-tool-option:has(input:checked),body.fi-premium.fi-light .iv-lab .iv-tool-option:has(input:checked){background:#f1ebff;border-color:#9a7be8}
body.fi-light .iv-lab .iv-tool-option b,body.fi-premium.fi-light .iv-lab .iv-tool-option b{color:#17233a}
body.fi-light .iv-lab .iv-feature span,body.fi-premium.fi-light .iv-lab .iv-feature span{background:#f3f1fa;border-color:#e3dcef;color:#4d4265}
body.fi-light .iv-student-library-head,body.fi-premium.fi-light .iv-student-library-head{background:radial-gradient(ellipse at 100% 0%,#ded4ff,transparent 44%),linear-gradient(120deg,#fff,#f5f2ff);border-color:#e0d9f3}
body.fi-light .iv-student-library-head h2,body.fi-premium.fi-light .iv-student-library-head h2,body.fi-light .iv-library-section-title h3,body.fi-premium.fi-light .iv-library-section-title h3{color:#17233a}
body.fi-light .iv-student-library-head p,body.fi-premium.fi-light .iv-student-library-head p{color:#66748a}
body.fi-light .iv-library-controls input,body.fi-light .iv-library-controls select,body.fi-premium.fi-light .iv-library-controls input,body.fi-premium.fi-light .iv-library-controls select{background:#fff;color:#17233a;border-color:#d5ddeb}
body.fi-light .iv-student-hero-card,body.fi-premium.fi-light .iv-student-hero-card{background:linear-gradient(120deg,#f2edff,#fff);border-color:#d9c9fa}
body.fi-light .iv-student-hero-copy h3,body.fi-premium.fi-light .iv-student-hero-copy h3{color:#17233a}
body.fi-light .iv-student-hero-copy p,body.fi-premium.fi-light .iv-student-hero-copy p{color:#66748a}
body.fi-light .iv-lab .iv-student-tools-panel,body.fi-premium.fi-light .iv-lab .iv-student-tools-panel{background:#f8f9fd;border-color:#dfe4ef}
body.fi-light .iv-lab .iv-student-tools-panel h3,body.fi-premium.fi-light .iv-lab .iv-student-tools-panel h3{color:#17233a}
body.fi-light .iv-lab .iv-empty,body.fi-premium.fi-light .iv-lab .iv-empty{background:#fff;border-color:#d5ddeb;color:#17233a}
@media(max-width:720px){.iv-library-controls{grid-template-columns:1fr}.iv-student-hero-card{grid-template-columns:1fr}.iv-student-hero-art{min-height:120px;order:-1}.iv-student-hero-art:after{background:linear-gradient(0deg,#1b1730,transparent)}.iv-student-hero-copy{padding:17px}.iv-student-library-head{padding:17px}.iv-lab>.page-head{padding:18px}}
/* Responsive sizing pass: comfortable cards and a clean learner viewer */
.iv-lab,.iv-lab #ivWorkspace,.iv-lab .iv-grid,.iv-lab .iv-card,.iv-lab .iv-catalog{width:100%;max-width:100%;min-width:0;box-sizing:border-box}
.iv-lab .iv-grid{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:start}
.iv-lab .iv-catalog{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:18px;align-items:stretch}
.iv-lab .iv-media-card{width:100%;min-width:0;height:fit-content;display:flex;flex-direction:column}
.iv-lab .iv-thumb{width:100%;aspect-ratio:16/9;flex:0 0 auto}
.iv-lab .iv-thumb img{width:100%;height:100%;object-fit:cover}
.iv-lab .iv-media-content{width:100%;box-sizing:border-box;gap:12px}
.iv-lab .iv-media-content h3{font-size:clamp(16px,1.35vw,19px);line-height:1.35;overflow-wrap:anywhere}
.iv-lab .iv-media-content p{font-size:13px;line-height:1.55;overflow-wrap:anywhere}
.iv-lab .iv-media-content>.iv-btn,.iv-lab .iv-media-content [data-open-video]{width:100%;min-height:44px;margin:0}
.iv-lab .iv-media-content .iv-feature{gap:7px}
.iv-lab .iv-media-content .iv-feature button{flex:1 1 90px;min-width:0;min-height:42px;margin:0;padding:10px 8px;font-size:12px}
.iv-lab .iv-media-content .iv-feature span{max-width:100%;overflow-wrap:anywhere}
.iv-lab .iv-student-tools-panel{width:100%;max-width:100%;box-sizing:border-box;overflow:hidden}
.iv-lab .iv-student-tools-panel .iv-player{width:100%;aspect-ratio:16/9}
.iv-lab .iv-student-tools-panel input,.iv-lab .iv-student-tools-panel textarea{max-width:100%;box-sizing:border-box}
.iv-lab .iv-task-details .iv-btn{min-height:42px}
.iv-lab .iv-library-controls{width:100%;grid-template-columns:minmax(0,1fr) minmax(150px,210px)}
.iv-lab #ivCreate{min-width:0}
.iv-lab #ivStudents{min-height:150px}
@media(max-width:1000px){
 .iv-lab .iv-grid{grid-template-columns:minmax(0,1fr)}
 .iv-lab .iv-catalog{grid-template-columns:repeat(auto-fill,minmax(min(100%,245px),1fr))}
}
@media(max-width:600px){
 .iv-lab{gap:14px}
 .iv-lab>.page-head{padding:16px;border-radius:16px}
 .iv-lab .iv-card{padding:14px;border-radius:16px}
 .iv-lab .iv-catalog{grid-template-columns:minmax(0,1fr);gap:14px}
 .iv-lab .iv-media-content{padding:14px}
 .iv-lab .iv-library-controls{grid-template-columns:minmax(0,1fr)}
 .iv-lab .iv-student-hero-card{grid-template-columns:minmax(0,1fr)}
 .iv-lab .iv-student-hero-art{min-height:155px;order:-1}
 .iv-lab .iv-student-hero-copy{padding:16px}
 .iv-lab .iv-student-hero-copy h3{font-size:21px}
 .iv-lab .iv-media-content .iv-feature button{flex:1 1 100%}
 .iv-lab .iv-tools-grid{grid-template-columns:minmax(0,1fr)}
 .iv-lab .iv-topline{align-items:flex-start}
}

`;
function installStyle(){if(document.getElementById('iv-premium-enhancements-css'))return;const s=document.createElement('style');s.id='iv-premium-enhancements-css';s.textContent=css;document.head.appendChild(s)}
function el(id){return document.getElementById(id)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function decorate(){
 const lab=document.querySelector('.iv-lab'),workspace=el('ivWorkspace');if(!lab||!workspace)return;
 const studentHead=workspace.querySelector('.iv-topline');
 const catalog=workspace.querySelector('.iv-catalog');
 if(catalog&&!el('ivLibraryControls')){
   const title=studentHead?.querySelector('h2');
   const name=studentHead?.querySelector('p')?.textContent||'Seus vídeos e atividades atribuídos pelo Teacher.';
   const count=catalog.querySelectorAll('.iv-media-card').length;
   const head=document.createElement('section');head.className='iv-student-library-head';head.innerHTML='<div><h2>🎬 Minha biblioteca</h2><p>'+esc(name.replace(/^Olá,.*?\./,'Olá!'))+' Continue de onde parou e pratique no seu ritmo.</p></div><span class="iv-library-count">▶ '+count+' vídeo(s)</span>';
   studentHead?.replaceWith(head);
   const controls=document.createElement('div');controls.id='ivLibraryControls';controls.className='iv-library-controls';controls.innerHTML='<input id="ivLibrarySearch" type="search" placeholder="⌕ Buscar por título, nível ou ferramenta..." aria-label="Buscar vídeos"><select id="ivLibraryFilter" aria-label="Filtrar vídeos"><option value="all">Todas as atividades</option><option value="pending">Pendentes</option><option value="completed">Concluídas</option><option value="tools">Com ferramentas interativas</option><option value="video">Somente vídeo</option></select>';
   catalog.parentNode.insertBefore(controls,catalog);
   const section=document.createElement('div');section.className='iv-library-section-title';section.innerHTML='<h3>Explore suas atividades</h3><span id="ivLibraryResultCount">'+count+' resultados</span>';catalog.parentNode.insertBefore(section,catalog);
   const cards=Array.from(catalog.querySelectorAll('.iv-media-card'));
   cards.forEach(card=>{
     const h=card.querySelector('h3'),p=card.querySelector('.iv-muted'),badge=card.querySelector('.iv-status'),features=card.querySelector('.iv-feature');
     card.dataset.search=[h?.textContent,p?.textContent,card.textContent].join(' ').toLowerCase();
     if(badge)badge.dataset.state=(badge.textContent.toLowerCase().includes('conclu')?'completed':'pending');
     if(!features||!features.children.length){if(features)features.innerHTML='<span>▶ Vídeo</span>'}
     const b=card.querySelector('[data-open-video]');
     if(b)b.textContent='▶ Assistir agora';
   });
   const apply=()=>{
     const q=(el('ivLibrarySearch')?.value||'').toLowerCase().trim(),f=el('ivLibraryFilter')?.value||'all';let visible=0;
     cards.forEach(card=>{const status=card.querySelector('.iv-status')?.dataset.state||'pending',featureText=(card.querySelector('.iv-feature')?.textContent||'').trim(),hasTools=!!featureText&&featureText!=='▶ Vídeo';let show=(!q||card.dataset.search.includes(q))&&(f==='all'||f===status||(f==='tools'&&hasTools)||(f==='video'&&!hasTools));card.hidden=!show;if(show)visible++});
     if(el('ivLibraryResultCount'))el('ivLibraryResultCount').textContent=visible+' resultado(s)';
   };
   el('ivLibrarySearch').addEventListener('input',apply);el('ivLibraryFilter').addEventListener('change',apply);
   if(count){
     const first=cards[0],thumb=first?.querySelector('.iv-thumb img'),h=first?.querySelector('h3'),p=first?.querySelector('.iv-muted'),btn=first?.querySelector('[data-open-video]');
     if(first&&thumb){const hero=document.createElement('section');hero.className='iv-student-hero-card';hero.innerHTML='<div class="iv-student-hero-copy"><span class="iv-badge">▶ CONTINUE LEARNING</span><h3>'+esc(h?.textContent||'Sua próxima aula')+'</h3><p>'+esc(p?.textContent||'Continue sua jornada de inglês.')+'</p><div class="iv-meta"><span class="iv-badge">'+esc(first.querySelector('.iv-badge')?.textContent||'A1')+'</span></div><button type="button" class="iv-btn" id="ivContinueFeatured">▶ Continuar assistindo</button></div><div class="iv-student-hero-art" style="background-image:url(&quot;'+esc(thumb.src)+'&quot;)"></div>';controls.parentNode.insertBefore(hero,controls);el('ivContinueFeatured').addEventListener('click',()=>btn?.click())}
   }
 }
 const form=el('ivCreate');
 if(form&&!form.dataset.ivDecorated){
   form.dataset.ivDecorated='1';
   const title=form.querySelector('h3');
   if(title){const note=document.createElement('div');note.className='iv-optional-note';note.innerHTML='<span>✨</span><span><b>Monte do seu jeito.</b> O vídeo é o único item obrigatório. Todas as ferramentas são opcionais; se nenhuma for marcada, o aluno verá apenas o vídeo, o título e as instruções.</span>';title.parentNode.insertBefore(note,title.nextSibling)}
   const select=el('ivStudents');if(select){select.setAttribute('aria-label','Alunos que receberão a atividade');}
   const url=el('ivUrl');if(url)url.setAttribute('autocomplete','url');
   const selectedCount=()=>{const n=document.querySelectorAll('input[name="ivTool"]:checked').length;let label=el('ivToolsSelectedCount');if(!label){label=document.createElement('span');label.id='ivToolsSelectedCount';label.className='iv-tools-count';const h=form.querySelector('h3');h?.appendChild(label)}if(label)label.textContent=n?' '+n+' recurso(s) selecionado(s)':' · somente vídeo'};
   form.querySelectorAll('input[name="ivTool"]').forEach(b=>b.addEventListener('change',selectedCount));selectedCount();
 }
 // Make each opened activity a distinct, well-spaced viewer panel; tools remain strictly opt-in.
 workspace.querySelectorAll('.iv-task-details').forEach(panel=>panel.classList.add('iv-student-tools-panel'));
 workspace.querySelectorAll('.iv-status').forEach(b=>{if(b.textContent.toLowerCase().includes('pend'))b.dataset.state='pending';if(b.textContent.toLowerCase().includes('conclu'))b.dataset.state='completed'});
}
function run(){installStyle();decorate()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
const observer=new MutationObserver(()=>{if(!window.__ivPremiumDecorating){window.__ivPremiumDecorating=true;requestAnimationFrame(()=>{window.__ivPremiumDecorating=false;run()})}});
observer.observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('load',run);
})();