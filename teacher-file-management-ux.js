/* Teacher Platform — additive teacher file management UX. No schema or data changes. */
(function(){
'use strict';
const STYLE = `.fi-mo-folder-open{display:flex;align-items:center;justify-content:space-between;gap:12px;flex:1;min-width:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer;padding:0}.fi-mo-folder-open:hover b{color:#7440f5;text-decoration:underline}.fi-mo-folder-open>span:first-child{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px}.fi-mo-folder-open small{color:var(--muted,#77728b);font-size:10px}.fi-mo-move-title{font-weight:750;color:var(--text,#251b40)!important}.fi-mo-modal-label{display:block;font-size:12px;font-weight:750;margin-top:10px}.fi-mo-modal-note{padding:10px 12px;border-radius:10px;background:var(--bg,#f7f4ff);font-size:11px;color:var(--muted,#77728b);line-height:1.5;margin:4px 0 12px}.fi-mo-folder-list{display:grid;gap:7px;margin-top:12px}.fi-mo-folder{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 11px;border:1px solid var(--line,#e3ddf4);border-radius:11px;background:var(--bg,#faf9ff)}.fi-mo-folder>span:first-child{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px}.fi-mo-folder small{color:var(--muted,#77728b);font-size:10px}.fi-mo-folder-actions{display:flex;gap:6px;flex-wrap:wrap}.fi-mo-empty{margin:12px 0 2px;color:var(--muted,#77728b);font-size:12px}.fi-mo-folder .fi-fc-btn{padding:7px 9px;font-size:11px}@media(max-width:650px){.fi-mo-folder{align-items:flex-start;flex-direction:column}.fi-mo-folder-actions{width:100%}.fi-mo-folder-actions .fi-fc-btn{flex:1}}.fi-media-folder-organizer{margin:12px 0 18px;padding:16px 18px;border:1px solid var(--line,#e3ddf4);border-radius:16px;background:var(--card,#fff);color:var(--text,#251b40);box-shadow:0 5px 18px #38205c08}.fi-mo-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.fi-mo-heading b{display:block;font-size:14px}.fi-mo-heading small{display:block;color:var(--muted,#77728b);font-size:11px;margin-top:4px}.fi-mo-controls{display:grid;grid-template-columns:minmax(200px,1fr) minmax(200px,1fr) auto;gap:10px;align-items:end;margin-top:13px}.fi-mo-controls label{display:grid;gap:6px;font-size:11px;font-weight:750;color:var(--muted,#77728b)}.fi-mo-controls select{width:100%;min-width:0;padding:10px 12px;border:1px solid var(--line,#ddd5f0);border-radius:10px;background:var(--card,#fff);color:var(--text,#251b40);font:inherit;font-size:12px}.fi-mo-foot{font-size:10px;color:var(--muted,#77728b);margin-top:10px}@media(max-width:650px){.fi-mo-controls{grid-template-columns:1fr}.fi-mo-controls .fi-fc-btn{width:100%}}
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
 b.addEventListener('click',e=>{e.stopPropagation();document.querySelectorAll('.fi-fc-menu').forEach(x=>x.remove());const m=document.createElement('div');m.className='fi-fc-menu';m.innerHTML='<button data-action="open">↗ Visualizar / abrir</button><button data-action="edit">✎ Editar detalhes</button><button data-action="assign">♙ Atribuir a alunos</button><button data-action="move">📁 Mover para pasta</button><button data-action="category">🏷️ Definir categoria</button><button data-action="download">↓ Baixar / salvar</button><button data-action="remove" class="danger">⌫ Remover material</button>';m.addEventListener('click',ev=>{const action=ev.target.closest('button')?.dataset.action;if(!action)return;m.remove();if(action==='move'&&/Media Library/i.test(document.body.innerText||'')){mediaMoveCardToFolder(card);return}if(action==='category'&&/Media Library/i.test(document.body.innerText||'')){mediaSetCategory(card);return}handleAction(card,action)});card.appendChild(m);const close=ev=>{if(!m.contains(ev.target)&&ev.target!==b){m.remove();document.removeEventListener('click',close)}};setTimeout(()=>document.addEventListener('click',close),0)});card.appendChild(b)
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
 const [rr,ff]=await Promise.all([
  d.from('tic_teacher_materials').select('id,title,teacher_id,category,folder_id,level').eq('teacher_id',user.id),
  d.from('tic_material_folders').select('id,name,color,teacher_id').eq('teacher_id',user.id).order('name')
 ]);
 if(rr.error)throw rr.error;if(ff.error)throw ff.error;
 organizerState.rows=rr.data||[];organizerState.folders=ff.data||[];
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
 const name=prompt('Nome da nova pasta (ex.: Speaking A1, PDFs, Aulas interativas):');if(!name||!name.trim())return;
 const d=mediaDb();if(!d||!organizerState.teacherId){toast('Não foi possível identificar sua conta. Atualize a página e tente novamente.');return}
 const exists=organizerState.folders.some(f=>String(f.name||'').trim().toLowerCase()===name.trim().toLowerCase());if(exists){toast('Já existe uma pasta com esse nome.');return}
 const r=await d.from('tic_material_folders').insert({teacher_id:organizerState.teacherId,name:name.trim(),color:'#7440f5'}).select('id,name,color,teacher_id').single();
 if(r.error){console.error('[Media Library folder]',r.error);toast('Não foi possível criar a pasta: '+r.error.message);return}
 organizerState.folders.push(r.data);organizerState.folders.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));mediaRenderOrganizer();toast('Pasta criada com sucesso.');
}
async function mediaRenameFolder(id){
 const folder=organizerState.folders.find(f=>f.id===id);if(!folder)return;
 const name=prompt('Novo nome da pasta:',folder.name);if(name===null||!name.trim())return;
 if(organizerState.folders.some(f=>f.id!==id&&String(f.name||'').trim().toLowerCase()===name.trim().toLowerCase())){toast('Já existe uma pasta com esse nome.');return}
 const d=mediaDb(),r=await d.from('tic_material_folders').update({name:name.trim(),updated_at:new Date().toISOString()}).eq('id',id).eq('teacher_id',organizerState.teacherId).select('id,name,color,teacher_id').single();
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
 overlay.querySelector('[data-mo-create-inline]').addEventListener('click',async()=>{const name=prompt('Nome da nova pasta:');if(name===null||!name.trim())return;const dup=organizerState.folders.find(f=>f.name.trim().toLowerCase()===name.trim().toLowerCase());if(dup){overlay.querySelector('#fi-mo-destination').value=dup.id;toast('Pasta existente selecionada.');return}const d=mediaDb(),r=await d.from('tic_material_folders').insert({teacher_id:organizerState.teacherId,name:name.trim(),color:'#7440f5'}).select('id,name,color,teacher_id').single();if(r.error){toast('Não foi possível criar a pasta: '+r.error.message);return}organizerState.folders.push(r.data);organizerState.folders.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));overlay.querySelector('#fi-mo-destination').insertAdjacentHTML('beforeend','<option value="'+mediaEscape(r.data.id)+'">'+mediaEscape(r.data.name)+'</option>');overlay.querySelector('#fi-mo-destination').value=r.data.id;mediaRenderOrganizer();toast('Pasta criada e selecionada.');});
 overlay.querySelector('[data-mo-confirm]').addEventListener('click',async()=>{const folderId=overlay.querySelector('#fi-mo-destination').value||null;const d=mediaDb(),res=await d.from('tic_teacher_materials').update({folder_id:folderId}).eq('id',row.id).eq('teacher_id',organizerState.teacherId).select('id,folder_id').maybeSingle();if(res.error){console.error('[Media Library move]',res.error);toast('Não foi possível mover o material: '+res.error.message);return}row.folder_id=folderId;overlay.remove();mediaRenderOrganizer();mediaApplyFilters();toast(folderId?'Material movido para “'+(organizerState.folders.find(f=>f.id===folderId)?.name||'pasta')+'”.':'Material removido da pasta.');});
}
async function mediaSetCategory(card){
 const row=mediaRowForCard(card);if(!row){toast('Não consegui vincular este cartão ao registro da biblioteca.');return}
 const current=String(row.category||'');const next=prompt('Categoria do material (ex.: Aula interativa, PDF, Vídeo, Speaking):',current);if(next===null)return;
 const value=next.trim()||null,d=mediaDb();const r=await d.from('tic_teacher_materials').update({category:value}).eq('id',row.id).eq('teacher_id',organizerState.teacherId).select('id,category').maybeSingle();
 if(r.error){console.error('[Media Library category]',r.error);toast('Não foi possível salvar a categoria: '+r.error.message);return}
 row.category=value||'Sem categoria';mediaRenderOrganizer();mediaApplyFilters();toast('Categoria atualizada.');
}
function installMediaOrganizer(){
 const pageText=(document.body.innerText||'');
 const isMedia=/Media Library/i.test(pageText)&&(/Modelos seus|Minha biblioteca|PDFs e links do Drive/i.test(pageText));
 if(!isMedia)return;
 const cards=mediaCards();if(!cards.length)return;
 let host=document.getElementById('fi-media-folder-organizer');
 if(!host){host=document.createElement('section');host.id='fi-media-folder-organizer';host.className='fi-media-folder-organizer';host.setAttribute('aria-label','Organização da Media Library');const first=cards[0];const parent=first.closest('.media-library,.media-library-content,.materials-grid,.fi-media-grid')||first.parentElement?.parentElement||first.parentElement;if(parent&&parent.parentElement)parent.parentElement.insertBefore(host,parent);else if(parent)parent.before(host)}
 // The card action menu is extended in menuFor(), including folders and categories.
 if(!organizerState.ready&&!organizerState.loading){organizerState.loading=true;mediaLoadOrganizer().then(()=>{organizerState.ready=true}).catch(e=>{console.error('[Media Library organizer]',e);toast('Não foi possível carregar as pastas da biblioteca.')}).finally(()=>{organizerState.loading=false})}
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
