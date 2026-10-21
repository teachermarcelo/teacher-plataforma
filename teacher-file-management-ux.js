/* Teacher Platform — additive teacher file management UX. No schema or data changes. */
(function(){
'use strict';
const STYLE = `.fi-media-folder-organizer{display:block!important;min-height:112px;position:relative;z-index:1;width:auto;box-sizing:border-box;background:var(--card,#fff)!important;color:var(--text,#251b40)!important;border:1px solid var(--line,#e3ddf4)!important;border-radius:16px!important;padding:16px 18px!important;margin:14px 0 20px!important;clear:both;opacity:1!important;visibility:visible!important}.fi-media-folder-organizer .fi-mo-heading,.fi-media-folder-organizer .fi-mo-controls,.fi-media-folder-organizer .fi-mo-folder-list,.fi-media-folder-organizer .fi-mo-foot{opacity:1!important;visibility:visible!important}.fi-mo-loading,.fi-mo-error{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-height:70px;color:var(--text,#251b40)!important}.fi-mo-loading>div{display:grid;gap:4px}.fi-mo-loading small,.fi-mo-error small{display:block;color:var(--muted,#77728b)!important;font-size:12px}.fi-mo-spinner{width:22px;height:22px;border:3px solid #e5dcff;border-top-color:#7440f5;border-radius:50%;animation:fiMoSpin .8s linear infinite}@keyframes fiMoSpin{to{transform:rotate(360deg)}}.fi-mo-error{color:#b42345!important}.fi-mo-error .fi-fc-btn{margin-left:auto}body.fi-premium:not(.fi-light) .fi-media-folder-organizer{background:#151d2e!important;color:#f4f7ff!important;border-color:#34415c!important}body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-heading b,body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-folder b{color:#f4f7ff!important}body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-heading small,body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-folder small,body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-foot{color:#c0cce0!important}body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-folder{background:#202a3d!important;border-color:#3b4961!important;color:#f4f7ff!important}body.fi-premium:not(.fi-light) .fi-media-folder-organizer .fi-mo-controls select{background:#101a2a!important;color:#f4f7ff!important;border-color:#3b4961!important}body.fi-premium.fi-light .fi-media-folder-organizer{background:#fff!important;color:#17233a!important;border-color:#dce3ef!important}body.fi-premium.fi-light .fi-media-folder-organizer .fi-mo-folder{background:#f8f9ff!important;border-color:#dce3ef!important;color:#17233a!important}.fi-folder-editor{display:grid;gap:9px}.fi-folder-hero{display:flex;align-items:center;gap:13px;padding:14px;border:1px solid #e8e1f6;border-radius:15px;background:linear-gradient(135deg,#faf8ff,#f1ebff);margin:8px 0 6px}.fi-folder-hero-icon{width:48px;height:48px;display:grid;place-items:center;border-radius:14px;background:color-mix(in srgb,var(--folder-color) 13%,white);color:var(--folder-color);flex:none}.fi-folder-hero-icon svg{width:27px;height:27px;fill:currentColor}.fi-folder-hero b{display:block;font-size:13px;color:#24183d}.fi-folder-hero small{display:block;color:#7d7394;font-size:11px;margin-top:3px;line-height:1.4}.fi-folder-field-label{font-size:12px;font-weight:750;color:var(--text,#251b40);margin-top:5px}.fi-folder-name-input{margin:0!important;padding:13px 14px!important;border:1px solid #dcd2f2!important;border-radius:12px!important;font-size:14px!important;outline:none;transition:border .16s,box-shadow .16s}.fi-folder-name-input:focus{border-color:#8155ef!important;box-shadow:0 0 0 4px #8155ef20}.fi-folder-name-input.is-invalid{border-color:#e54868!important;box-shadow:0 0 0 3px #e5486818}.fi-folder-input-meta{display:flex;justify-content:space-between;gap:10px;color:#8a819f;font-size:10px;margin-top:-5px}.fi-folder-colors{display:flex;gap:9px;flex-wrap:wrap;padding:3px 0 6px}.fi-folder-color{width:31px;height:31px;border:2px solid transparent;border-radius:10px;background:var(--folder-color);cursor:pointer;display:grid;place-items:center;box-shadow:inset 0 0 0 1px #00000008;transition:transform .15s,border .15s}.fi-folder-color span{color:white;font-size:15px;opacity:0}.fi-folder-color.is-selected{border-color:var(--text,#24183d);transform:scale(1.08)}.fi-folder-color.is-selected span{opacity:1}.fi-folder-tip{display:flex;gap:9px;align-items:flex-start;padding:11px 12px;border-radius:12px;background:#f5f1ff;color:#756a91;font-size:11px;line-height:1.5;margin-top:3px}.fi-folder-tip>span:first-child{color:#7440f5;font-size:16px}.fi-fc-dialog{border:1px solid #ffffffbb!important;border-radius:22px!important;padding:24px!important;box-shadow:0 28px 90px #160a2d45,0 4px 16px #160a2d12!important}.fi-fc-dialog h3{font-size:21px!important;letter-spacing:-.45px}.fi-fc-overlay{backdrop-filter:blur(7px);background:#17102578!important}.fi-fc-dialog .fi-fc-actions{margin-top:20px!important}.fi-fc-dialog .fi-fc-actions .fi-fc-primary{min-width:145px}.fi-fc-dialog .fi-fc-actions button{padding:11px 15px}
.fi-mo-folder-open{display:flex;align-items:center;justify-content:space-between;gap:12px;flex:1;min-width:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer;padding:0}.fi-mo-folder-open:hover b{color:#7440f5;text-decoration:underline}.fi-mo-folder-open>span:first-child{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px}.fi-mo-folder-open small{color:var(--muted,#77728b);font-size:10px}.fi-mo-move-title{font-weight:750;color:var(--text,#251b40)!important}.fi-mo-modal-label{display:block;font-size:12px;font-weight:750;margin-top:10px}.fi-mo-modal-note{padding:10px 12px;border-radius:10px;background:var(--bg,#f7f4ff);font-size:11px;color:var(--muted,#77728b);line-height:1.5;margin:4px 0 12px}.fi-mo-folder-list{display:grid;gap:7px;margin-top:12px}.fi-mo-folder{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 11px;border:1px solid var(--line,#e3ddf4);border-radius:11px;background:var(--bg,#faf9ff)}.fi-mo-folder>span:first-child{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px}.fi-mo-folder small{color:var(--muted,#77728b);font-size:10px}.fi-mo-folder-actions{display:flex;gap:6px;flex-wrap:wrap}.fi-mo-empty{margin:12px 0 2px;color:var(--muted,#77728b);font-size:12px}.fi-mo-folder .fi-fc-btn{padding:7px 9px;font-size:11px}@media(max-width:650px){.fi-mo-folder{align-items:flex-start;flex-direction:column}.fi-mo-folder-actions{width:100%}.fi-mo-folder-actions .fi-fc-btn{flex:1}}.fi-media-folder-organizer{margin:12px 0 18px;padding:16px 18px;border:1px solid var(--line,#e3ddf4);border-radius:16px;background:var(--card,#fff);color:var(--text,#251b40);box-shadow:0 5px 18px #38205c08}.fi-mo-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.fi-mo-heading b{display:block;font-size:14px}.fi-mo-heading small{display:block;color:var(--muted,#77728b);font-size:11px;margin-top:4px}.fi-mo-controls{display:grid;grid-template-columns:minmax(200px,1fr) minmax(200px,1fr) auto;gap:10px;align-items:end;margin-top:13px}.fi-mo-controls label{display:grid;gap:6px;font-size:11px;font-weight:750;color:var(--muted,#77728b)}.fi-mo-controls select{width:100%;min-width:0;padding:10px 12px;border:1px solid var(--line,#ddd5f0);border-radius:10px;background:var(--card,#fff);color:var(--text,#251b40);font:inherit;font-size:12px}.fi-mo-foot{font-size:10px;color:var(--muted,#77728b);margin-top:10px}@media(max-width:650px){.fi-mo-controls{grid-template-columns:1fr}.fi-mo-controls .fi-fc-btn{width:100%}}
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
 b.addEventListener('click',e=>{e.stopPropagation();document.querySelectorAll('.fi-fc-menu').forEach(x=>x.remove());const m=document.createElement('div');m.className='fi-fc-menu';m.innerHTML='<button data-action="open">↗ Visualizar / abrir</button><button data-action="edit">✎ Editar detalhes</button><button data-action="assign">♙ Atribuir a alunos</button><button data-action="send-ready">🎬 Enviar para Ready Class…</button><button data-action="move">📁 Mover para pasta</button><button data-action="category">🏷️ Definir categoria</button><button data-action="download">↓ Baixar / salvar</button><button data-action="remove" class="danger">⌫ Remover material</button>';m.addEventListener('click',ev=>{const action=ev.target.closest('button')?.dataset.action;if(!action)return;m.remove();if(action==='send-ready'){mediaSendToReadyClass(card);return}if(action==='move'&&/Media Library/i.test(document.body.innerText||'')){mediaMoveCardToFolder(card);return}if(action==='category'&&/Media Library/i.test(document.body.innerText||'')){mediaSetCategory(card);return}handleAction(card,action)});card.appendChild(m);const close=ev=>{if(!m.contains(ev.target)&&ev.target!==b){m.remove();document.removeEventListener('click',close)}};setTimeout(()=>document.addEventListener('click',close),0)});card.appendChild(b)
}
function handleAction(card,action){
 const title=inferCardTitle(card);const buttons='<button class="fi-fc-btn" data-close>Cancelar</button><button class="fi-fc-btn fi-fc-primary" data-continue>Continuar</button>';
 if(action==='open'){const a=card.querySelector('a[href]');if(a){window.open(a.href,'_blank','noopener');return}if(callExisting(['openMaterial','viewMaterial','openTeacherMaterial'],[card.dataset.id]))return;toast('Abra o material pelo botão Visualizar existente no cartão.');return}
 if(action==='edit'){if(callExisting(['openMaterialForm','editMaterial','openTeacherMaterialFormV53','editTeacherMaterial'],[card.dataset.id]))return;dialog('Editar material','<p>Para preservar os dados, use o editor original deste registro. Selecione o botão Editar já disponível no cartão ou na tela de materiais.</p>',buttons);return}
 if(action==='assign'){const row=mediaRowForCard(card);if(row&&typeof window.assignTeacherMaterialV1==='function'){window.assignTeacherMaterialV1(row.id);return}if(row&&typeof window.openTeacherMaterialFormV53==='function'){window.openTeacherMaterialFormV53(row);return}if(callExisting(['assignMaterial','openMaterialAssignment'],[row?.id||card.dataset.id]))return;dialog('Atribuir material','<p>Não consegui vincular este cartão ao cadastro original. Atualize a biblioteca e tente novamente. A atribuição deve usar o formulário original para selecionar aluno/turma e preservar os vínculos.</p>',buttons);return}
 if(action==='move'){mediaMoveCardToFolder(card);return}
 if(action==='download'){const a=card.querySelector('a[href]');if(a){window.open(a.href,'_blank','noopener');return}const url=card.dataset.url||card.querySelector('[data-url]')?.dataset.url;if(url){window.open(url,'_blank','noopener');return}toast('Não encontrei um link direto para baixar este material.');return}
 if(action==='remove'){dialog('Remover material?','<p><b>'+escapeHtml(title)+'</b></p><p>Para evitar perda de dados, esta interface não exclui registros diretamente. Use a ação Remover/Arquivar do editor original, que deve preservar vínculos e histórico.</p>','<button class="fi-fc-btn" data-close>Fechar</button>');return}
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

const organizerState={ready:false,rows:[],folders:[],teacherId:null,folderFilter:'all',categoryFilter:'all',loading:false};
function mediaDb(){try{if(typeof sb!=='undefined'&&sb)return sb}catch(_){}return window.sb||window.supabase||null}
function mediaEscape(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function mediaUser(){const d=mediaDb();if(!d||!d.auth)return null;const r=await d.auth.getUser();if(r.error)throw r.error;return r.data&&r.data.user||null}
function mediaCards(){return Array.from(document.querySelectorAll('.fi-media-card,.material-card,.teacher-material-card,[data-material-card]'))}
function mediaCardTitle(card){return inferCardTitle(card)}
function mediaRowForCard(card){const id=card.dataset.id||card.dataset.materialId||card.getAttribute('data-material-id');return organizerState.rows.find(r=>id&&String(r.id)===String(id))||organizerState.rows.find(r=>String(r.title||'').trim().toLowerCase()===mediaCardTitle(card).trim().toLowerCase())||null}
function mediaApplyFilters(){
 const cards=mediaCards();
 cards.forEach(card=>{const row=mediaRowForCard(card);if(!row)return;const folderOk=organizerState.folderFilter==='all'||(organizerState.folderFilter==='none'?!row.folder_id:String(row.folder_id||'')===organizerState.folderFilter);const category=String(row.category||'Sem categoria');const categoryOk=organizerState.categoryFilter==='all'||category===organizerState.categoryFilter;card.hidden=!(folderOk&&categoryOk)});
}
async function mediaLoadOrganizer(){
 const d=mediaDb();if(!d)return;
 const user=await mediaUser();if(!user)return;
 organizerState.teacherId=user.id;
 const [rr,tm,ff]=await Promise.all([
  d.from('tic_teacher_materials').select('*').eq('teacher_id',user.id),
  d.from('tic_materials').select('*').eq('teacher_id',user.id),
  d.from('tic_material_folders').select('id,name,color,teacher_id').eq('teacher_id',user.id).order('name')
 ]);
 if(rr.error)throw rr.error;if(tm.error)throw tm.error;if(ff.error)throw ff.error;
 organizerState.rows=[...(rr.data||[]).map(r=>({...r,_source_table:'tic_teacher_materials'})),...(tm.data||[]).map(r=>({...r,_source_table:'tic_materials',category:r.material_type||r.category||'website',description:r.description||'',tags:r.skill||'',notes:'',resource_items:r.resource_items||[],url:r.external_url||r.file_url||null}))];organizerState.folders=ff.data||[];
 mediaRenderOrganizer();mediaApplyFilters();
}
function mediaRenderOrganizer(){
 const host=document.getElementById('fi-media-folder-organizer');if(!host)return;
 const categories=Array.from(new Set(organizerState.rows.map(r=>String(r.category||'Sem categoria')).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
 host.innerHTML='<div class="fi-mo-heading"><div><b>📁 Organizar biblioteca</b><small>Crie pastas, renomeie, remova e classifique aulas, links, PDFs e conteúdos sem duplicar materiais.</small></div><button type="button" class="fi-fc-btn fi-fc-primary" data-mo-create>＋ Criar pasta</button></div><div class="fi-mo-controls"><label>📂 Pasta<select data-mo-folder><option value="all">Todas as pastas</option><option value="none">Sem pasta</option>'+organizerState.folders.map(f=>'<option value="'+mediaEscape(f.id)+'">'+mediaEscape(f.name)+'</option>').join('')+'</select></label><label>🏷️ Categoria<select data-mo-category><option value="all">Todas as categorias</option>'+categories.map(x=>'<option value="'+mediaEscape(x)+'">'+mediaEscape(x)+'</option>').join('')+'</select></label><button type="button" class="fi-fc-btn" data-mo-clear>Limpar filtros</button></div><div class="fi-mo-folder-list">'+(organizerState.folders.length?organizerState.folders.map(f=>'<div class="fi-mo-folder"><button type="button" class="fi-mo-folder-open" data-mo-open="'+mediaEscape(f.id)+'" title="Abrir pasta"><span>📂 <b>'+mediaEscape(f.name)+'</b><small>'+organizerState.rows.filter(x=>x.folder_id===f.id).length+' material(is) · clique para abrir</small></span><span>›</span></button><span class="fi-mo-folder-actions"><button type="button" class="fi-fc-btn" data-mo-rename="'+mediaEscape(f.id)+'">✎ Renomear</button><button type="button" class="fi-fc-btn fi-fc-danger" data-mo-delete="'+mediaEscape(f.id)+'">Excluir pasta</button></span></div>').join(''):'<p class="fi-mo-empty">Nenhuma pasta criada ainda. Clique em “＋ Criar pasta” para começar.</p>')+'</div><div class="fi-mo-foot">'+organizerState.folders.length+' pasta(s) · '+organizerState.rows.length+' material(is) · organização salva na sua conta</div>';
 host.querySelector('[data-mo-folder]').value=organizerState.folderFilter;host.querySelector('[data-mo-category]').value=organizerState.categoryFilter;
 host.querySelector('[data-mo-folder]').addEventListener('change',e=>{organizerState.folderFilter=e.target.value;mediaApplyFilters()});
 host.querySelector('[data-mo-category]').addEventListener('change',e=>{organizerState.categoryFilter=e.target.value;mediaApplyFilters()});
 host.querySelector('[data-mo-clear]').addEventListener('click',()=>{organizerState.folderFilter='all';organizerState.categoryFilter='all';mediaRenderOrganizer();mediaApplyFilters()});
 host.querySelector('[data-mo-create]').addEventListener('click',mediaCreateFolder);
 host.querySelectorAll('[data-mo-open]').forEach(b=>b.addEventListener('click',()=>{organizerState.folderFilter=b.dataset.moOpen;organizerState.categoryFilter='all';mediaRenderOrganizer();mediaApplyFilters();const sel=host.querySelector('[data-mo-folder]');if(sel)sel.value=b.dataset.moOpen;const first=mediaCards().find(card=>{const row=mediaRowForCard(card);return row&&String(row.folder_id)===String(b.dataset.moOpen)});if(first)first.scrollIntoView({behavior:'smooth',block:'center'});}));
 host.querySelectorAll('[data-mo-rename]').forEach(b=>b.addEventListener('click',()=>mediaRenameFolder(b.dataset.moRename)));
 host.querySelectorAll('[data-mo-delete]').forEach(b=>b.addEventListener('click',()=>mediaDeleteFolder(b.dataset.moDelete)));
}
async function mediaCreateFolder(){
 const values=await mediaFolderEditor({title:'Criar nova pasta',subtitle:'Organize seus materiais em um espaço fácil de encontrar.',button:'Criar pasta',hint:'Ex.: Speaking A1, Grammar, PDFs, Listening'});
 if(!values)return;
 const name=values.name;
 const d=mediaDb();if(!d||!organizerState.teacherId){toast('Não foi possível identificar sua conta. Atualize a página e tente novamente.');return}
 const exists=organizerState.folders.some(f=>String(f.name||'').trim().toLowerCase()===name.toLowerCase());if(exists){toast('Já existe uma pasta com esse nome. Escolha um nome diferente.');return}
 const r=await d.from('tic_material_folders').insert({teacher_id:organizerState.teacherId,name,color:values.color}).select('id,name,color,teacher_id').single();
 if(r.error){console.error('[Media Library folder]',r.error);toast('Não foi possível criar a pasta: '+r.error.message);return}
 organizerState.folders.push(r.data);organizerState.folders.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));mediaRenderOrganizer();toast('Pasta criada com sucesso.');
}
async function mediaFolderEditor({title='Nova pasta',subtitle='Organize sua biblioteca.',button='Salvar pasta',hint='Digite um nome',initialName='',initialColor='#7440f5'}={}){
 return await new Promise(resolve=>{
  const colors=['#7440f5','#2563eb','#0891b2','#059669','#ca8a04','#ea580c','#db2777','#64748b'];
  const colorBtns=colors.map(color=>'<button type="button" class="fi-folder-color '+(color===initialColor?'is-selected':'')+'" data-folder-color="'+color+'" style="--folder-color:'+color+'" aria-label="Selecionar cor '+color+'" title="'+color+'"><span>✓</span></button>').join('');
  const overlay=dialog(title,'<div class="fi-folder-editor"><div class="fi-folder-hero"><div class="fi-folder-hero-icon" id="fi-folder-preview" style="--folder-color:'+mediaEscape(initialColor)+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/></svg></div><div><b>Organização inteligente</b><small>Nomeie e identifique visualmente sua pasta.</small></div></div><label class="fi-folder-field-label" for="fi-folder-name">Nome da pasta</label><input id="fi-folder-name" class="fi-folder-name-input" maxlength="60" value="'+mediaEscape(initialName)+'" placeholder="'+mediaEscape(hint)+'" autocomplete="off"><div class="fi-folder-input-meta"><span>Use um nome curto e fácil de reconhecer.</span><span><b id="fi-folder-count">'+String(initialName.length)+'</b>/60</span></div><label class="fi-folder-field-label">Cor da pasta</label><div class="fi-folder-colors">'+colorBtns+'</div><div class="fi-folder-tip"><span>✦</span><span>Você poderá mover materiais para esta pasta agora ou depois. Criar uma pasta não duplica nem apaga conteúdos.</span></div></div>','<button type="button" class="fi-fc-btn" data-folder-cancel>Cancelar</button><button type="button" class="fi-fc-btn fi-fc-primary" data-folder-save>＋ '+mediaEscape(button)+'</button>');
  const input=overlay.querySelector('#fi-folder-name'),count=overlay.querySelector('#fi-folder-count'),preview=overlay.querySelector('#fi-folder-preview');let chosen=initialColor,done=false;
  const finish=value=>{if(done)return;done=true;overlay.remove();resolve(value)};
  overlay.querySelector('[data-folder-cancel]').addEventListener('click',()=>finish(null));
  overlay.addEventListener('click',e=>{if(e.target===overlay)finish(null)});
  overlay.querySelectorAll('[data-folder-color]').forEach(btn=>btn.addEventListener('click',()=>{chosen=btn.dataset.folderColor;overlay.querySelectorAll('[data-folder-color]').forEach(x=>x.classList.toggle('is-selected',x===btn));preview.style.setProperty('--folder-color',chosen)}));
  input.addEventListener('input',()=>{count.textContent=input.value.length;input.classList.remove('is-invalid')});
  const save=()=>{const name=input.value.trim();if(!name){input.classList.add('is-invalid');input.focus();return}finish({name,color:chosen})};
  overlay.querySelector('[data-folder-save]').addEventListener('click',save);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();save()}if(e.key==='Escape')finish(null)});
  setTimeout(()=>{input.focus();input.select()},30);
 });
}
async function mediaRenameFolder(id){
 const folder=organizerState.folders.find(f=>f.id===id);if(!folder)return;
 const values=await mediaFolderEditor({title:'Renomear pasta',subtitle:'Atualize o nome e a identificação visual.',button:'Salvar alterações',hint:'Nome da pasta',initialName:folder.name,initialColor:folder.color||'#7440f5'});if(!values)return;
 if(organizerState.folders.some(f=>f.id!==id&&String(f.name||'').trim().toLowerCase()===values.name.toLowerCase())){toast('Já existe uma pasta com esse nome. Escolha outro nome.');return}
 const d=mediaDb(),r=await d.from('tic_material_folders').update({name:values.name,color:values.color,updated_at:new Date().toISOString()}).eq('id',id).eq('teacher_id',organizerState.teacherId).select('id,name,color,teacher_id').single();
 if(r.error){console.error('[Media Library rename folder]',r.error);toast('Não foi possível renomear: '+r.error.message);return}
 Object.assign(folder,r.data);mediaRenderOrganizer();toast('Pasta renomeada.');
}
async function mediaDeleteFolder(id){
 const folder=organizerState.folders.find(f=>f.id===id);if(!folder)return;
 const count=organizerState.rows.filter(r=>r.folder_id===id).length;
 if(!confirm('Excluir a pasta “'+folder.name+'”? '+(count?'Os '+count+' material(is) serão mantidos na biblioteca e ficarão sem pasta.':'Os materiais não serão excluídos.')))return;
 const d=mediaDb(),r=await d.from('tic_material_folders').delete().eq('id',id).eq('teacher_id',organizerState.teacherId);
 if(r.error){console.error('[Media Library delete folder]',r.error);toast('Não foi possível excluir a pasta: '+r.error.message);return}
 organizerState.rows.forEach(x=>{if(x.folder_id===id)x.folder_id=null});organizerState.folders=organizerState.folders.filter(x=>x.id!==id);
 if(organizerState.folderFilter===id)organizerState.folderFilter='all';mediaRenderOrganizer();mediaApplyFilters();toast('Pasta excluída; materiais preservados.');
}
async function mediaMoveCardToFolder(card){
 const row=mediaRowForCard(card);if(!row){toast('Não consegui vincular este cartão ao cadastro do material. Atualize a biblioteca e tente novamente.');return}
 if(!organizerState.ready){try{await mediaLoadOrganizer();organizerState.ready=true}catch(e){toast('Não foi possível carregar as pastas: '+e.message);return}}
 if(!organizerState.folders.length){toast('Crie uma pasta em “Organizar biblioteca” antes de mover o material.');return}
 const opts=organizerState.folders.map(f=>'<option value="'+mediaEscape(f.id)+'" '+(String(row.folder_id||'')===String(f.id)?'selected':'')+'>'+mediaEscape(f.name)+'</option>').join('');
 const overlay=dialog('📁 Mover material para uma pasta','<p class="fi-mo-move-title">'+mediaEscape(row.title)+'</p><label class="fi-mo-modal-label" for="fi-mo-destination">Pasta de destino</label><select id="fi-mo-destination"><option value="">Sem pasta — deixar na biblioteca geral</option>'+opts+'</select><div class="fi-mo-modal-note">O material original, seus links e suas atribuições aos alunos serão preservados. Apenas a pasta será alterada.</div><button type="button" class="fi-fc-btn" data-mo-create-inline>＋ Criar pasta</button>','<button type="button" class="fi-fc-btn" data-close>Cancelar</button><button type="button" class="fi-fc-btn fi-fc-primary" data-mo-confirm>📁 Mover material</button>');
 overlay.querySelector('[data-mo-create-inline]').addEventListener('click',async()=>{const values=await mediaFolderEditor({title:'Criar pasta de destino',subtitle:'A nova pasta será selecionada para este material.',button:'Criar e selecionar',hint:'Ex.: Speaking B1, PDFs'});if(!values)return;const dup=organizerState.folders.find(f=>f.name.trim().toLowerCase()===values.name.toLowerCase());if(dup){overlay.querySelector('#fi-mo-destination').value=dup.id;toast('Pasta existente selecionada.');return}const d=mediaDb(),r=await d.from('tic_material_folders').insert({teacher_id:organizerState.teacherId,name:values.name,color:values.color}).select('id,name,color,teacher_id').single();if(r.error){toast('Não foi possível criar a pasta: '+r.error.message);return}organizerState.folders.push(r.data);organizerState.folders.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));overlay.querySelector('#fi-mo-destination').insertAdjacentHTML('beforeend','<option value="'+mediaEscape(r.data.id)+'">'+mediaEscape(r.data.name)+'</option>');overlay.querySelector('#fi-mo-destination').value=r.data.id;mediaRenderOrganizer();toast('Pasta criada e selecionada.');});
 overlay.querySelector('[data-mo-confirm]').addEventListener('click',async()=>{const folderId=overlay.querySelector('#fi-mo-destination').value||null;const d=mediaDb(),table=row._source_table||'tic_teacher_materials',res=await d.from(table).update({folder_id:folderId}).eq('id',row.id).eq('teacher_id',organizerState.teacherId).select('id,folder_id').maybeSingle();if(res.error){console.error('[Media Library move]',res.error);toast('Não foi possível mover o material: '+res.error.message);return}row.folder_id=folderId;overlay.remove();mediaRenderOrganizer();mediaApplyFilters();toast(folderId?'Material movido para “'+(organizerState.folders.find(f=>f.id===folderId)?.name||'pasta')+'”.':'Material removido da pasta.');});
}
function mediaReadyHtml(row){
 const esc=mediaEscape;
 const title=String(row.title||'Material').trim();
 const description=String(row.description||'').trim();
 const notes=String(row.notes||'').trim();
 const tags=String(row.tags||'').trim();
 let items=row.resource_items;
 if(typeof items==='string'){try{items=JSON.parse(items)}catch(_){items=[]}}
 if(!Array.isArray(items)){items=items&&typeof items==='object'?[items]:[]}
 const safeUrl=value=>{try{const u=new URL(String(value||''),location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch(_){return ''}};
 const resources=items.map((it,index)=>{
  if(typeof it==='string')it={url:it,title:'Recurso '+(index+1)};
  it=it&&typeof it==='object'?it:{};
  const url=safeUrl(it.url||it.href||it.link||it.content_url||it.pdf_url||it.video_url||it.embed_url||it.src);
  const name=String(it.title||it.name||it.label||('Recurso '+(index+1)));
  const detail=String(it.description||it.notes||'');
  if(!url)return '<li><strong>'+esc(name)+'</strong>'+(detail?'<p>'+esc(detail)+'</p>':'')+'</li>';
  const ext=(url.split('?')[0].split('.').pop()||'').toLowerCase();
  const isPdf=ext==='pdf'||/pdf/i.test(String(it.type||it.category||''));
  const embed=/youtube\.com\/embed\//i.test(url)||/player\.vimeo\.com\/video\//i.test(url);
  return '<li><strong>'+esc(name)+'</strong>'+(detail?'<p>'+esc(detail)+'</p>':'')+'<p><a rel="noopener noreferrer" target="_blank" href="'+esc(url)+'">Abrir recurso ↗</a></p>'+(isPdf?'<iframe title="'+esc(name)+'" src="'+esc(url)+'" loading="lazy"></iframe>':embed?'<iframe title="'+esc(name)+'" src="'+esc(url)+'" loading="lazy" allowfullscreen></iframe>':'')+'</li>';
 }).join('');
 const extraLinks=[];
 ['url','href','link','content_url','pdf_url','video_url','embed_url'].forEach(k=>{const u=safeUrl(row[k]);if(u&&!items.some(it=>it&&typeof it==='object'&&safeUrl(it.url||it.href||it.link||it.content_url||it.pdf_url||it.video_url||it.embed_url||it.src)===u))extraLinks.push('<li><strong>'+esc(k.replace(/_/g,' '))+'</strong><p><a rel="noopener noreferrer" target="_blank" href="'+esc(u)+'">Abrir recurso ↗</a></p>'+(k==='pdf_url'?'<iframe title="PDF" src="'+esc(u)+'" loading="lazy"></iframe>':'')+'</li>')});
 const content=resources+extraLinks.join('');
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:920px;margin:0 auto;padding:clamp(18px,4vw,42px);color:#20243a;background:#f7f5fc}header,section{background:#fff;border:1px solid #e5def4;border-radius:18px;padding:22px;margin:14px 0}h1{line-height:1.2;color:#39256d}h2{font-size:18px}li{margin:12px 0}a{color:#6236d7;font-weight:700}iframe{width:100%;height:min(70vh,680px);border:1px solid #ddd;border-radius:12px;margin-top:10px}small{color:#6f7183}.pill{display:inline-block;border-radius:99px;padding:4px 10px;background:#eee8ff;color:#4b318b;font-size:12px;font-weight:700;margin-right:6px}pre{white-space:pre-wrap;overflow-wrap:anywhere}</style></head><body><header><span class="pill">Material da biblioteca</span><span class="pill">'+esc(row.level||'A0')+'</span><h1>'+esc(title)+'</h1>'+(description?'<p>'+esc(description)+'</p>':'')+(tags?'<p><small>Tags: '+esc(tags)+'</small></p>':'')+'</header>'+(content?'<section><h2>Recursos</h2><ul>'+content+'</ul></section>':'<section><h2>Conteúdo</h2><p>Este material foi enviado da biblioteca de materiais. Use as informações abaixo e adicione links ou atividades no editor da Ready Class quando necessário.</p>'+(description?'<p>'+esc(description)+'</p>':'')+'</section>')+(notes?'<section><h2>Notas do professor</h2><pre>'+esc(notes)+'</pre></section>':'')+'<footer><small>Importado da biblioteca de materiais. O original permanece preservado na aba Materials.</small></footer></body></html>';
}
async function mediaSendToReadyClass(card){
 const row=mediaRowForCard(card);
 if(!row){toast('Não consegui localizar os dados completos deste material. Atualize a biblioteca e tente novamente.');return}
 if(!organizerState.ready){try{await mediaLoadOrganizer();organizerState.ready=true}catch(e){toast('Não foi possível carregar os dados do material: '+e.message);return}}
 const d=mediaDb();if(!d||!organizerState.teacherId){toast('Entre novamente na plataforma para enviar o material.');return}
 let folders=[];
 try{const f=await d.from('tic_ready_class_folders').select('id,name,color').eq('teacher_id',organizerState.teacherId).order('name');if(f.error)throw f.error;folders=f.data||[]}catch(e){console.error('[Send to Ready Class folders]',e);toast('Não foi possível carregar as pastas do Ready Class: '+e.message);return}
 const level=/^(A0|A1|A2|B1|B2|C1|C2)$/i.test(String(row.level||''))?String(row.level).toUpperCase():'A0';
 const overlay=dialog('🎬 Enviar para Ready Class','<p class="fi-mo-move-title">'+mediaEscape(row.title)+'</p><p>Será criada uma cópia na biblioteca Ready Class. O material original, suas pastas e atribuições atuais continuarão intactos.</p><label class="fi-mo-modal-label" for="fi-ready-level">Nível CEFR</label><select id="fi-ready-level">'+['A0','A1','A2','B1','B2','C1','C2'].map(x=>'<option '+(x===level?'selected':'')+'>'+x+'</option>').join('')+'</select><label class="fi-mo-modal-label" for="fi-ready-folder-search">🔎 Encontrar uma pasta</label><input id="fi-ready-folder-search" type="search" placeholder="Digite o nome da pasta..." autocomplete="off"><label class="fi-mo-modal-label" for="fi-ready-folder">Pasta de destino no Ready Class</label><select id="fi-ready-folder"><option value="">Sem pasta — biblioteca geral</option>'+folders.map(f=>'<option value="'+mediaEscape(f.id)+'">'+mediaEscape(f.name)+'</option>').join('')+'</select><div class="fi-mo-modal-note">Você pode escolher uma pasta existente ou criar uma nova sem sair desta janela.</div><button type="button" class="fi-fc-btn" data-ready-newfolder>＋ Criar pasta no Ready Class</button>','<button type="button" class="fi-fc-btn" data-close>Cancelar</button><button type="button" class="fi-fc-btn fi-fc-primary" data-ready-send>📚 Criar cópia na Ready Class</button>');
 overlay.querySelector('#fi-ready-folder-search').addEventListener('input',e=>{const term=e.target.value.trim().toLocaleLowerCase('pt-BR');const sel=overlay.querySelector('#fi-ready-folder');const current=sel.value;Array.from(sel.options).forEach((opt,i)=>{if(i===0){opt.hidden=false;return}opt.hidden=!!term&&!opt.textContent.toLocaleLowerCase('pt-BR').includes(term)});if(current&&sel.selectedOptions[0]&&sel.selectedOptions[0].hidden)sel.value='';});
 overlay.querySelector('[data-ready-newfolder]').addEventListener('click',async()=>{
  const name=prompt('Nome da nova pasta no Ready Class:');if(name===null)return;const clean=name.trim();if(!clean)return toast('Digite um nome para a pasta.');
  const dupe=folders.find(f=>String(f.name||'').trim().toLowerCase()===clean.toLowerCase());if(dupe){overlay.querySelector('#fi-ready-folder').value=dupe.id;toast('Pasta existente selecionada.');return}
  const res=await d.from('tic_ready_class_folders').insert({teacher_id:organizerState.teacherId,name:clean,color:'#7440f5'}).select('id,name,color').single();
  if(res.error){toast('Não foi possível criar a pasta: '+res.error.message);return}
  folders.push(res.data);folders.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  overlay.querySelector('#fi-ready-folder').insertAdjacentHTML('beforeend','<option value="'+mediaEscape(res.data.id)+'">'+mediaEscape(res.data.name)+'</option>');
  overlay.querySelector('#fi-ready-folder').value=res.data.id;toast('Pasta criada e selecionada.');
 });
 overlay.querySelector('[data-ready-send]').addEventListener('click',async()=>{
  const btn=overlay.querySelector('[data-ready-send]');btn.disabled=true;btn.textContent='Enviando…';
  try{
   const levelNow=overlay.querySelector('#fi-ready-level').value;
   const folderId=overlay.querySelector('#fi-ready-folder').value||null;
   const html=mediaReadyHtml(row);
   const payload={teacher_id:organizerState.teacherId,title:String(row.title||'Material').trim().slice(0,180),description:String(row.description||'Material enviado da biblioteca de materiais.').slice(0,500),cefr_level:levelNow,skills:[],duration_minutes:30,source_filename:'material-'+String(row.id)+'.html',html_content:html,html_version:1,active:true,folder_id:folderId};
   const res=await d.from('tic_ready_classes').insert(payload).select('id,title').single();
   if(res.error)throw res.error;
   overlay.remove();toast('Material enviado para Ready Class. O original foi preservado.');
   if(confirm('Material enviado! Deseja abrir Ready Class agora?')){if(typeof window.rcOpenPage==='function')window.rcOpenPage();else if(typeof window.loadView==='function')window.loadView('readyClass');else location.href='./index.html#readyClass'}
  }catch(e){console.error('[Send material to Ready Class]',e);btn.disabled=false;btn.textContent='📚 Criar cópia na Ready Class';toast('Não foi possível enviar para Ready Class: '+(e.message||'erro inesperado'))}
 });
}
async function mediaSetCategory(card){
 const row=mediaRowForCard(card);if(!row){toast('Não consegui vincular este cartão ao registro da biblioteca.');return}
 const current=String(row.category||'');const next=prompt('Categoria do material (ex.: Aula interativa, PDF, Vídeo, Speaking):',current);if(next===null)return;
 const value=next.trim()||null,d=mediaDb();const table=row._source_table||'tic_teacher_materials';const patch=table==='tic_materials'?{material_type:value||'link'}:{category:value};const r=await d.from(table).update(patch).eq('id',row.id).eq('teacher_id',organizerState.teacherId).select('*').maybeSingle();
 if(r.error){console.error('[Media Library category]',r.error);toast('Não foi possível salvar a categoria: '+r.error.message);return}
 row.category=value||'Sem categoria';if(table==='tic_materials')row.material_type=value||'link';mediaRenderOrganizer();mediaApplyFilters();toast('Categoria atualizada.');
}
function installMediaOrganizer(){
 // Route detection uses the actual Media Library root, not translated/visible text.
 const root=document.querySelector('#content .fi-media-library, #content [data-tm53-tab], #content #tm53Stats')?.closest('.fi-media-library')||document.querySelector('#content .fi-media-library');
 if(!root)return;
 const cards=mediaCards();
 let host=document.getElementById('fi-media-folder-organizer');
 if(!host){
  host=document.createElement('section');host.id='fi-media-folder-organizer';host.className='fi-media-folder-organizer';host.setAttribute('aria-label','Organização da Media Library');
  const anchor=root.querySelector('.fi-media-filterbar')||root.querySelector('.fi-media-stats')||root.querySelector('.fi-teacher-material-tip');
  const grid=root.querySelector('.fi-media-cards')||root.querySelector('.fi-media-empty');
  if(anchor)anchor.insertAdjacentElement('afterend',host);
  else if(grid)grid.before(host);
  else root.appendChild(host);
 }else if(!root.contains(host)){
  const anchor=root.querySelector('.fi-media-filterbar')||root.querySelector('.fi-media-stats')||root.querySelector('.fi-teacher-material-tip');
  const grid=root.querySelector('.fi-media-cards')||root.querySelector('.fi-media-empty');
  if(anchor)anchor.insertAdjacentElement('afterend',host);else if(grid)grid.before(host);else root.appendChild(host);
 }
 if(!organizerState.ready&&!organizerState.loading){
  organizerState.loading=true;
  host.innerHTML='<div class="fi-mo-loading"><span class="fi-mo-spinner"></span><div><b>📁 Pastas da biblioteca</b><small>Carregando suas pastas salvas…</small></div></div>';
  mediaLoadOrganizer().then(()=>{organizerState.ready=true}).catch(e=>{
   console.error('[Media Library organizer]',e);
   host.innerHTML='<div class="fi-mo-error"><b>Não foi possível carregar as pastas.</b><small>'+mediaEscape(e&&e.message||'Verifique sua conexão e tente novamente.')+'</small><button type="button" class="fi-fc-btn fi-fc-primary" data-mo-retry>↻ Tentar novamente</button></div>';
   host.querySelector('[data-mo-retry]')?.addEventListener('click',()=>{organizerState.ready=false;organizerState.loading=false;installMediaOrganizer()});
  }).finally(()=>{organizerState.loading=false})
 } else if(organizerState.ready&&!host.querySelector('.fi-mo-heading')) mediaRenderOrganizer();
 cards.forEach(menuFor);
}
function enhance(){
 addStyle();
 installMediaOrganizer();
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
