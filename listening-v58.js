/* Teacher Platform — Listening Studio V58
   Additive external module. Preserves the existing index and all existing modules.
*/
(function(){
'use strict';
const $=id=>document.getElementById(id);
const E=v=>typeof window.esc==='function'?esc(v==null?'':v):String(v==null?'':v).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const toastL=(m,t)=>typeof window.toast==='function'?toast(m,t):alert(m);
const CEFR=['Pre-A1','A0','A1','A2','B1','B2','C1','C2'];
let lesson=null,mode='learn',idx=0,answers={};

function styles(){
 if($('ticListeningCss'))return;
 const s=document.createElement('style');s.id='ticListeningCss';
 s.textContent='.ticL{display:grid;gap:14px}.ticHero{background:linear-gradient(135deg,#4d24a8,#7650df);color:#fff;border-radius:20px;padding:20px}.ticGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.ticCard{background:#fff;border:1px solid #e5def0;border-radius:16px;padding:15px;box-shadow:0 5px 18px #24144b0a}.ticCard h3{margin:7px 0;font-size:16px}.ticActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.ticPill{display:inline-block;padding:4px 8px;border-radius:99px;background:#eee7ff;color:#4d2ca4;font-size:9px;font-weight:800}.ticPlayer{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:14px}.ticScene,.ticPanel{background:#fff;border:1px solid #e5def0;border-radius:18px;overflow:hidden}.ticScene img{width:100%;height:250px;object-fit:cover}.ticTranscript{padding:14px}.ticLine{display:flex;gap:9px;padding:10px;border-radius:11px;cursor:pointer}.ticLine:hover,.ticLine.on{background:#eee7ff}.ticLine b{min-width:70px}.ticPanel{padding:16px}.ticQ{padding:12px;border:1px solid #e7e0ef;border-radius:12px;margin:8px 0}.ticOpt{display:block;width:100%;text-align:left;margin:7px 0;padding:10px;border:1px solid #e1dbea;border-radius:10px;background:#fff;cursor:pointer}.ticDict{width:100%;min-height:100px;border:1px solid #ddd4eb;border-radius:12px;padding:12px}.ticEmpty{padding:28px;text-align:center;border:1px dashed #d8d0e5;border-radius:13px;color:#766d82}.ticForm textarea{min-height:130px}.ticTop{display:flex;justify-content:space-between;gap:12px;align-items:center}.ticTable{width:100%;border-collapse:collapse;font-size:11px}.ticTable td,.ticTable th{padding:9px;border-bottom:1px solid #eee8f4;text-align:left}.ticLevel{margin:18px 0 26px}.ticLevelHead{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;margin-bottom:12px;background:#fff;border:1px solid #e6e1f4;border-radius:16px;box-shadow:0 6px 18px rgba(40,20,80,.05)}.ticLevelHead h3{margin:8px 0 0;font-size:18px}.ticLevelHead strong{font-size:12px;color:#6b5bb5}.ticLevel .ticGrid{margin-top:0}@media(max-width:900px){.ticGrid{grid-template-columns:1fr 1fr}.ticPlayer{grid-template-columns:1fr}}@media(max-width:600px){.ticGrid{grid-template-columns:1fr}}';
 document.head.appendChild(s);
}
function linesRaw(a){return (a||[]).map(x=>(x.speaker||'Speaker')+'|'+(x.text||'')).join('\n')}
function parseLines(v){return String(v||'').split(/\n+/).map(x=>x.trim()).filter(Boolean).map((x,i)=>{let p=x.split('|');return{id:'l'+i,speaker:p.shift()||'Speaker',text:p.join('|').trim()}}).filter(x=>x.text)}
function qsRaw(a){return (a||[]).map(x=>(x.prompt||'Question')+'|'+(x.options||[]).join('|')+'|'+(x.answer||'')).join('\n')}
function parseQs(v){return String(v||'').split(/\n+/).map(x=>x.trim()).filter(Boolean).map((x,i)=>{let p=x.split('|');return{id:'q'+i,prompt:p[0]||'Question',options:p.slice(1,4),answer:p[4]||p[1]||''}})}
function getTicVoices(lang){
 const voices=speechSynthesis.getVoices();
 const base=(lang||'en-US').toLowerCase().slice(0,2);
 return voices.filter(v=>v.lang&&v.lang.toLowerCase().startsWith(base));
}
function getSpeakerProfile(speaker,lang){
 const key=String(speaker||'Speaker').trim().toLowerCase();
 const all=[...new Set((lesson?.lines||[]).map(x=>String(x.speaker||'Speaker').trim().toLowerCase()))];
 let index=all.indexOf(key); if(index<0) index=0;
 const voices=getTicVoices(lang);
 const voice=voices[index % Math.max(voices.length,1)] || null;
 return {voice,index};
}
function speak(text,rate,voiceName,speaker){
 if(!('speechSynthesis' in window))return toastL('Seu navegador não oferece TTS.','error');
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);
 const lang=voiceName||'en-US';
 const profile=getSpeakerProfile(speaker,lang);
 u.lang=lang;
 u.rate=Number(rate)||1;
 u.pitch=profile.index===0?0.92:profile.index===1?1.08:1+(profile.index%3-1)*0.08;
 if(profile.voice)u.voice=profile.voice;
 speechSynthesis.speak(u);
}

async function teacherPage(){
 styles();
 if(typeof window.setPage!=='function' || typeof window.sb==='undefined'){throw new Error('A plataforma principal ainda não terminou de carregar.');}
 setPage('🎧 Listening Studio','Crie Listening com TTS, transcript, dictation e exam.','<button class="btn primary" onclick="ticNewListening()">+ Novo Listening</button>');
 const r=await sb.from('tic_listening_lessons').select('*').eq('teacher_id',session.user.id).order('created_at',{ascending:false});
 if(r.error){$('content').innerHTML='<div class="card attention"><b>Listening Studio indisponível.</b><p>'+E(r.error.message)+'</p></div>';return}
 const rows=r.data||[], levels=['A0','A1','A2','B1','B2','C1','C2'];
 const grouped=levels.map(level=>[level,rows.filter(x=>String(x.cefr_level||'').toUpperCase()===level)]).filter(g=>g[1].length);
 const other=rows.filter(x=>!levels.includes(String(x.cefr_level||'').toUpperCase()));
 if(other.length)grouped.push(['Outros',other]);
 const levelHtml=grouped.map(([level,items])=>'<section class="ticLevel"><div class="ticLevelHead"><div><span class="ticPill">'+E(level)+'</span><h3>'+E(level==='A0'?'Beginner Foundation':level==='A1'?'Elementary':level==='A2'?'Elementary Plus':level==='B1'?'Intermediate':level==='B2'?'Upper-Intermediate':level==='C1'?'Advanced':'Proficiency')+'</h3></div><strong>'+items.length+' Listening'+(items.length!==1?'s':'')+'</strong></div><div class="ticGrid">'+items.map(x=>'<article class="ticCard">'+(x.cover_image_url?'<img src="'+E(x.cover_image_url)+'" style="width:100%;height:130px;object-fit:cover;border-radius:12px;margin-bottom:10px">':'')+'<span class="ticPill">'+E(x.cefr_level||level)+'</span><h3>'+E(x.title)+'</h3><p>'+E(x.topic||'Listening')+' · '+E(x.accent||'en-US')+'</p><small>'+((x.lines||[]).length)+' linhas · '+((x.questions||[]).length)+' questões</small><div class="ticActions"><button class="btn sm primary" onclick="ticOpenListening(\''+x.id+'\',true)">👁 Ver</button><button class="btn sm secondary" onclick="ticEditListening(\''+x.id+'\')">✏️ Editar</button><button class="btn sm secondary" onclick="ticAssignListening(\''+x.id+'\')">📤 Atribuir</button><button class="btn sm secondary" onclick="ticDeleteListening(\''+x.id+'\')">🗑 Remover</button></div></article>').join('')}</div></section>').join('');
 $('content').innerHTML='<div class="ticL"><div class="ticHero"><span class="ticPill">TEACHER</span><h2>🎧 Listening Studio</h2><p>Crie e organize atividades Pre-A1–C2 por nível, tema e conteúdo.</p></div>'+ (levelHtml||'<div class="ticEmpty">Nenhum Listening criado.</div>')+'</div>';
}
window.ticNewListening=()=>ticEditListening();
window.ticEditListening=async function(id){
 styles();let x={};if(id){const r=await sb.from('tic_listening_lessons').select('*').eq('id',id).eq('teacher_id',session.user.id).maybeSingle();if(r.error)return toastL(r.error.message,'error');x=r.data||{}}
 openModal(id?'✏️ Editar Listening':'🎧 Novo Listening','<form class="form ticForm" onsubmit="ticSaveListening(event,\''+(id||'')+'\')">'+
 '<div class="form-grid"><div class="field"><label>Título</label><input id="ticLT" required value="'+E(x.title||'')+'" placeholder="Ready for the warehouse?"></div><div class="field"><label>CEFR</label><select id="ticLL">'+CEFR.map(v=>'<option '+(v===(x.cefr_level||'A1')?'selected':'')+'>'+v+'</option>').join('')+'</select></div></div>'+
 '<div class="form-grid"><div class="field"><label>Tema</label><input id="ticTopic" value="'+E(x.topic||'')+'" placeholder="Business & Workplace"></div><div class="field"><label>Voz</label><select id="ticAccent"><option value="en-US" '+(x.accent==='en-US'?'selected':'')+'>🇺🇸 American English</option><option value="en-GB" '+(x.accent==='en-GB'?'selected':'')+'>🇬🇧 British English</option></select></div></div>'+
 '<div class="field"><label>Imagem da cena — URL opcional</label><input id="ticCover" value="'+E(x.cover_image_url||'')+'"></div>'+
 '<div class="field"><label>Introdução</label><textarea id="ticIntro">'+E(x.intro||'')+'</textarea></div>'+
 '<div class="field"><label>Diálogo</label><small>Uma linha por vez: Speaker|Text</small><textarea id="ticLines" required>'+E(linesRaw(x.lines))+'</textarea></div>'+
 '<div class="field"><label>Exam</label><small>Uma por linha: Question|A|B|C|Resposta correta</small><textarea id="ticQs">'+E(qsRaw(x.questions))+'</textarea></div>'+
 '<label><input id="ticPub" type="checkbox" '+(x.published!==false?'checked':'')+'> Publicado</label>'+
 '<div class="modal-actions"><button type="button" class="btn secondary" onclick="closeModal()">Cancelar</button><button class="btn primary">💾 Salvar</button></div></form>');
};
window.ticSaveListening=async function(e,id){
 e.preventDefault();const payload={teacher_id:session.user.id,title:$('ticLT').value.trim(),cefr_level:$('ticLL').value,topic:$('ticTopic').value.trim()||null,accent:$('ticAccent').value,intro:$('ticIntro').value.trim()||null,cover_image_url:$('ticCover').value.trim()||null,lines:parseLines($('ticLines').value),questions:parseQs($('ticQs').value),published:$('ticPub').checked};
 if(!payload.title||!payload.lines.length)return toastL('Informe título e pelo menos uma linha de diálogo.','error');
 const r=id?await sb.from('tic_listening_lessons').update(payload).eq('id',id).eq('teacher_id',session.user.id):await sb.from('tic_listening_lessons').insert(payload);
 if(r.error)return toastL(r.error.message,'error');closeModal();toastL(id?'Listening atualizado.':'Listening criado.','success');teacherPage();
};
window.ticDeleteListening=async function(id){if(!confirm('Remover este Listening?'))return;const r=await sb.from('tic_listening_lessons').delete().eq('id',id).eq('teacher_id',session.user.id);if(r.error)return toastL(r.error.message,'error');toastL('Listening removido.','success');teacherPage()};
window.ticAssignListening=async function(id){
 const [a,b]=await Promise.all([sb.from('tic_students').select('id,display_name,current_level,email').eq('teacher_id',session.user.id).eq('status','active').order('display_name'),sb.from('tic_classes').select('id,name,level').eq('teacher_id',session.user.id).eq('status','active').order('name')]);
 if(a.error||b.error)return toastL((a.error||b.error).message,'error');
 openModal('📤 Atribuir Listening','<form class="form" onsubmit="ticSaveAssign(event,\''+id+'\')"><div class="field"><label>Aluno</label><select id="ticStudent" required><option value="">Selecione...</option>'+a.data.map(s=>'<option value="'+s.id+'">'+E(s.display_name)+' · '+E(s.current_level||'')+'</option>').join('')+'</select></div><div class="field"><label>Turma opcional</label><select id="ticClass"><option value="">Sem turma específica</option>'+b.data.map(c=>'<option value="'+c.id+'">'+E(c.name)+' · '+E(c.level||'')+'</option>').join('')+'</select></div><div class="modal-actions"><button type="button" class="btn secondary" onclick="closeModal()">Cancelar</button><button class="btn primary">Enviar ao aluno</button></div></form>');
};
window.ticSaveAssign=async function(e,id){e.preventDefault();const r=await sb.from('tic_listening_assignments').upsert({listening_id:id,student_id:$('ticStudent').value,class_id:$('ticClass').value||null,active:true},{onConflict:'listening_id,student_id'});if(r.error)return toastL(r.error.message,'error');closeModal();toastL('Listening atribuído.','success');teacherPage()};
async function getLesson(id){const r=await sb.from('tic_listening_lessons').select('*').eq('id',id).maybeSingle();if(r.error||!r.data)throw new Error(r.error?.message||'Listening não encontrado.');return r.data}
window.ticOpenListening=async function(id,isTeacher){
 try{lesson=await getLesson(id);mode='learn';idx=0;answers={};ticRenderPlayer(!!isTeacher)}catch(e){toastL(e.message,'error')}
};
function ticRenderPlayer(isTeacher){
 const l=lesson,ls=l.lines||[],qs=l.questions||[],root=$('content');setPage('🎧 '+(l.title||'Listening'),(l.topic||'Listening')+' · '+(l.cefr_level||'A1'),'');
 const transcript=ls.map((x,n)=>'<div class="ticLine '+(mode==='learn'&&n===idx?'on':'')+'" onclick="ticLine('+n+')"><b>'+E(x.speaker)+'</b><span>'+E(x.text)+'</span><button class="btn sm secondary" onclick="event.stopPropagation();ticPlay('+n+')">▶</button></div>').join('');
 let right='';
 if(mode==='dictation'){const x=ls[idx]||{};right='<div class="ticPanel"><h2>Dictation</h2><p>Ouça e escreva exatamente o que ouvir.</p><button class="btn primary" onclick="ticPlay('+idx+')">🔊 Ouvir</button><textarea id="ticDict" class="ticDict" placeholder="Type what you hear...">'+E(answers[x.id]||'')+'</textarea><button class="btn primary" onclick="ticCheckDict()">Check</button></div>'}
 else if(mode==='exam'){const q=qs[idx];right=q?'<div class="ticPanel"><h2>Exam</h2><div class="ticQ"><b>'+(idx+1)+'. '+E(q.prompt)+'</b>'+q.options.map((o,n)=>'<button class="ticOpt" onclick="ticAnswer('+n+')">'+String.fromCharCode(65+n)+'. '+E(o)+'</button>').join('')+'</div></div>':'<div class="ticPanel"><h2>Exam</h2><p>Nenhuma questão criada.</p></div>'}
 else {const x=ls[idx]||{};right='<div class="ticPanel"><span class="ticPill">'+E(l.cefr_level||'A1')+'</span><h2>'+E(x.speaker||'Speaker')+'</h2><p style="font-size:20px">'+E(x.text||'')+'</p><div class="ticActions"><button class="btn primary" onclick="ticPlay('+idx+')">▶ Play</button><button class="btn secondary" onclick="ticAll()">🔊 Play all</button></div><label>Speed <select id="ticRate"><option>0.75</option><option selected>1</option><option>1.25</option><option>1.5</option></select></label></div>'}
 const nav=`<div class="ticActions"><button class="btn ${mode==='learn'?'primary':'secondary'}" onclick="ticMode('learn')">Learn</button><button class="btn ${mode==='dictation'?'primary':'secondary'}" onclick="ticMode('dictation')">Dictation</button><button class="btn ${mode==='exam'?'primary':'secondary'}" onclick="ticMode('exam')">Exam</button></div>`;
 root.innerHTML='<div class="ticL"><div class="ticHero"><span class="ticPill">'+E(l.cefr_level||'A1')+'</span><h2>'+E(l.title)+'</h2><p>'+E(l.intro||'Listen carefully and practice.')+'</p>'+nav+'</div><div class="ticPlayer"><div class="ticScene">'+(l.cover_image_url?'<img src="'+E(l.cover_image_url)+'">':'')+'<div class="ticTranscript"><h3>Transcript</h3>'+transcript+'</div></div>'+right+'</div></div>';
}
window.ticPlay=n=>{const x=(lesson.lines||[])[n];if(x)speak(x.text,Number($('ticRate')?.value||1),lesson.accent||'en-US',x.speaker)};
window.ticLine=n=>{idx=n;ticRenderPlayer(false)};
window.ticAll=()=>{speechSynthesis.cancel();const ls=lesson.lines||[];let n=0;const go=()=>{const x=ls[n++];if(!x)return;const u=new SpeechSynthesisUtterance(x.text);const lang=lesson.accent||'en-US';const p=getSpeakerProfile(x.speaker,lang);u.lang=lang;u.rate=Number($('ticRate')?.value||1);u.pitch=p.index===0?0.92:p.index===1?1.08:1+(p.index%3-1)*0.08;if(p.voice)u.voice=p.voice;u.onend=go;speechSynthesis.speak(u)};go()};
window.ticMode=m=>{mode=m;idx=0;ticRenderPlayer(false)};
window.ticCheckDict=()=>{const x=(lesson.lines||[])[idx];if(!x)return;const a=String($('ticDict')?.value||'').trim().toLowerCase().replace(/[^a-z0-9' ]/g,''),b=x.text.trim().toLowerCase().replace(/[^a-z0-9' ]/g,'');const aw=a.split(/\s+/).filter(Boolean),bw=b.split(/\s+/).filter(Boolean);const ok=aw.filter((w,i)=>w===bw[i]).length;const score=bw.length?Math.round(ok/bw.length*100):0;answers[x.id]=$('ticDict').value;toastL('Dictation: '+score+'% ',score===100?'success':'info')};
window.ticAnswer=async n=>{const q=(lesson.questions||[])[idx];if(!q)return;answers[q.id]=(q.options||[])[n];if(idx<(lesson.questions||[]).length-1){idx++;ticRenderPlayer(false);return}const qs=lesson.questions||[];const correct=qs.filter(q=>String(answers[q.id]||'').trim().toLowerCase()===String(q.answer||'').trim().toLowerCase()).length;const score=qs.length?Math.round(correct/qs.length*100):0;toastL('Exam: '+correct+'/'+qs.length+' · '+score+'%',score>=70?'success':'info');if(!isTeacherMode())try{const s=await studentRecord();if(s){const a=await sb.from('tic_listening_assignments').select('id').eq('listening_id',lesson.id).eq('student_id',s.id).eq('active',true).maybeSingle();await sb.from('tic_listening_results').insert({listening_id:lesson.id,student_id:s.id,assignment_id:a.data?.id||null,mode:'exam',score,correct,total:qs.length,details:answers})}}catch(e){console.warn(e)}};
async function studentPage(){
 styles();setPage('🎧 Listening Practice','Pratique listening com TTS, transcript, dictation e exam.','');
 const s=await studentRecord();if(!s){$('content').innerHTML='<div class="card empty">Sua conta não está vinculada a um aluno.</div>';return}
 const r=await sb.from('tic_listening_assignments').select('id,assigned_at,active,tic_listening_lessons(id,title,cefr_level,topic,accent,cover_image_url,lines,questions,intro)').eq('student_id',s.id).eq('active',true).order('assigned_at',{ascending:false});
 if(r.error){$('content').innerHTML='<div class="card attention"><b>Listening Practice indisponível.</b><p>'+E(r.error.message)+'</p></div>';return}
 const rows=r.data||[], levels=['A0','A1','A2','B1','B2','C1','C2'];
 const grouped=levels.map(level=>[level,rows.filter(a=>String(a.tic_listening_lessons?.cefr_level||'').toUpperCase()===level)]).filter(g=>g[1].length);
 const other=rows.filter(a=>!levels.includes(String(a.tic_listening_lessons?.cefr_level||'').toUpperCase()));
 if(other.length)grouped.push(['Outros',other]);
 const levelHtml=grouped.map(([level,items])=>'<section class="ticLevel"><div class="ticLevelHead"><div><span class="ticPill">'+E(level)+'</span><h3>'+E(level==='A0'?'Beginner Foundation':level==='A1'?'Elementary':level==='A2'?'Elementary Plus':level==='B1'?'Intermediate':level==='B2'?'Upper-Intermediate':level==='C1'?'Advanced':'Proficiency')+'</h3></div><strong>'+items.length+' atividade'+(items.length!==1?'s':'')+'</strong></div><div class="ticGrid">'+items.map(a=>{const x=a.tic_listening_lessons||{};return '<article class="ticCard">'+(x.cover_image_url?'<img src="'+E(x.cover_image_url)+'" style="width:100%;height:130px;object-fit:cover;border-radius:12px;margin-bottom:10px">':'')+'<span class="ticPill">'+E(x.cefr_level||level)+'</span><h3>'+E(x.title||'Listening')+'</h3><p>'+E(x.topic||'Listening')+' · '+((x.lines||[]).length)+' falas</p><small>Aprenda · Dictation · Exam</small><div class="ticActions"><button class="btn primary" onclick="ticOpenListening(\''+x.id+'\',false)">▶ Start Listening</button></div></article>'}).join('')}</div></section>').join('');
 $('content').innerHTML='<div class="ticL"><div class="ticHero"><span class="ticPill">STUDENT</span><h2>🎧 Listening Practice</h2><p>Seus Listenings aparecem organizados por nível. Abra um card para estudar, ouvir, fazer dictation e exam.</p></div>'+(levelHtml||'<div class="ticEmpty">Nenhum Listening foi atribuído a você ainda.</div>')+'</div>';
}
function addNav(){
 const nav=$('teacherNav');if(!nav)return;const role=window.profile?.role||window.profile?.user_role||session?.user?.user_metadata?.role;
 const v=role==='teacher'||role==='admin'?'listeningStudio':role==='student'?'listeningPractice':null;if(!v||nav.querySelector('[data-view="'+v+'"]'))return;
 const b=document.createElement('button');b.dataset.view=v;b.innerHTML='🎧 <span>'+(role==='student'?'Listening Practice':'Listening Studio')+'</span>';b.addEventListener('click',()=>window.loadView(v));
 const a=nav.querySelector('[data-view="teacherMaterials"]')||nav.querySelector('[data-view="studentLessons"]')||nav.querySelector('[data-view="resources"]');if(a)a.parentNode.insertBefore(b,a.nextSibling);else nav.appendChild(b);
}
const oldLoad=window.loadView;
window.loadView=async function(v){
 if(v==='listeningStudio'){
   try{return await teacherPage()}catch(e){console.error('Listening Studio:',e);const el=$('content');if(el)el.innerHTML='<div class="card attention"><h2>🎧 Listening Studio</h2><p>O módulo encontrou um erro ao abrir.</p><pre style="white-space:pre-wrap">'+E(e?.message||e)+'</pre><button class="btn primary" onclick="window.ticListeningTeacherPage()">Tentar novamente</button></div>';}
 }
 if(v==='listeningPractice'){
   try{return await studentPage()}catch(e){console.error('Listening Practice:',e);const el=$('content');if(el)el.innerHTML='<div class="card attention"><h2>🎧 Listening Practice</h2><p>O módulo encontrou um erro ao abrir.</p><pre style="white-space:pre-wrap">'+E(e?.message||e)+'</pre><button class="btn primary" onclick="window.ticListeningStudentPage()">Tentar novamente</button></div>';}
 }
 return oldLoad.apply(this,arguments)
};
setTimeout(addNav,800);setTimeout(addNav,2000);setTimeout(addNav,4000);
if($('teacherNav'))new MutationObserver(addNav).observe($('teacherNav'),{childList:true,subtree:true});
window.ticListeningTeacherPage=teacherPage;window.ticListeningStudentPage=studentPage;
})();