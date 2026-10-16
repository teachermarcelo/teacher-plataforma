/* Teacher Platform — individual Teacher ↔ Student conversations.
   Uses existing tic_messages records; no new tables and no destructive operations. */
(function(){
 'use strict';
 if(window.__tpIndividualMessagesV1)return;
 window.__tpIndividualMessagesV1=true;
 const $=id=>document.getElementById(id);
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const currentSession=()=>{try{return typeof session!=='undefined'&&session?session:window.session}catch(_){return window.session||null}};
 const client=()=>{try{return typeof sb!=='undefined'&&sb?sb:window.sb}catch(_){return window.sb||null}};
 const notify=(msg,type='error')=>{try{if(typeof toast==='function')toast(msg,type);else alert(msg)}catch(_){alert(msg)}};
 const state={studentId:null,studentRecord:null,teacherStudents:[],messages:[],isStudent:false,search:''};
 function style(){
  if($('tp-individual-messages-css'))return;
  const s=document.createElement('style');s.id='tp-individual-messages-css';
  s.textContent=`
  .tp-messenger{--tp-line:var(--line,#e5e1ef);--tp-card:var(--card,#fff);--tp-text:var(--text,#27223b);--tp-muted:var(--muted,#77748a);color:var(--tp-text);display:grid;grid-template-columns:minmax(220px,290px) minmax(0,1fr);gap:14px;min-width:0}
  .tp-msg-contacts,.tp-msg-conversation{background:var(--tp-card);border:1px solid var(--tp-line);border-radius:17px;min-width:0;overflow:hidden}
  .tp-msg-contacts-head,.tp-msg-thread-head{padding:15px 16px;border-bottom:1px solid var(--tp-line)}
  .tp-msg-contacts-head h3,.tp-msg-thread-head h3{margin:0;font-size:15px;font-weight:850}
  .tp-msg-contacts-head p,.tp-msg-thread-head p{margin:4px 0 0;font-size:11px;color:var(--tp-muted)}
  .tp-msg-search{box-sizing:border-box;width:calc(100% - 24px);margin:12px;padding:10px 11px;border:1px solid var(--tp-line);border-radius:10px;background:var(--tp-card);color:var(--tp-text);font:inherit;font-size:12px}
  .tp-msg-contact-list{display:grid;gap:3px;padding:0 8px 10px;max-height:520px;overflow:auto}
  .tp-msg-contact{display:flex;align-items:center;gap:10px;width:100%;padding:10px;border:1px solid transparent;border-radius:11px;background:transparent;color:var(--tp-text);text-align:left;cursor:pointer;min-width:0}
  .tp-msg-contact:hover{background:rgba(110,70,220,.07)}.tp-msg-contact.active{background:#f0eaff;border-color:#d8caff;color:#4926a5}
  .tp-msg-avatar{display:grid;place-items:center;flex:0 0 36px;width:36px;height:36px;border-radius:12px;background:#ece5ff;color:#5a36bd;font-weight:900}
  .tp-msg-contact-copy{flex:1;min-width:0}.tp-msg-contact-copy b{display:block;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-msg-contact-copy small{display:block;margin-top:4px;font-size:10px;color:var(--tp-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .tp-msg-unread{flex:0 0 auto;min-width:18px;padding:3px 5px;border-radius:99px;background:#6b42dc;color:white;font-size:10px;font-weight:850;text-align:center}
  .tp-msg-thread-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.tp-msg-thread-head .tp-msg-person{display:flex;align-items:center;gap:10px;min-width:0}
  .tp-msg-thread{display:flex;flex-direction:column;gap:10px;padding:16px;min-height:250px;max-height:480px;overflow:auto;background:linear-gradient(180deg,rgba(119,90,185,.025),transparent)}
  .tp-msg-empty{margin:auto;text-align:center;color:var(--tp-muted);font-size:12px;line-height:1.7;padding:25px 10px}
  .tp-msg-bubble{max-width:min(78%,620px);padding:10px 12px;border:1px solid var(--tp-line);border-radius:14px;background:var(--tp-card);align-self:flex-start;overflow-wrap:anywhere;box-shadow:0 2px 7px rgba(30,20,55,.035)}
  .tp-msg-bubble.mine{align-self:flex-end;background:#eee8ff;border-color:#d9ccff;color:#35205e;border-bottom-right-radius:5px}
  .tp-msg-bubble.theirs{border-bottom-left-radius:5px}.tp-msg-bubble p{margin:0;white-space:pre-wrap;font-size:12px;line-height:1.6}.tp-msg-bubble small{display:block;margin-top:6px;text-align:right;font-size:9px;opacity:.72}
  .tp-msg-compose{padding:12px;border-top:1px solid var(--tp-line);display:flex;gap:8px;align-items:flex-end;background:var(--tp-card)}
  .tp-msg-compose textarea{box-sizing:border-box;flex:1;min-width:0;resize:vertical;min-height:46px;max-height:150px;padding:11px 12px;border:1px solid var(--tp-line);border-radius:12px;background:var(--tp-card);color:var(--tp-text);font:inherit;font-size:12px;line-height:1.5}
  .tp-msg-send{border:0;border-radius:11px;padding:12px 14px;min-height:44px;background:#6840dc;color:#fff;font-weight:850;font-size:12px;cursor:pointer}.tp-msg-send:disabled{opacity:.55;cursor:wait}
  .tp-msg-error{margin:12px;padding:12px;border-radius:10px;background:#fff1f1;color:#9e2331;font-size:12px}
  .tp-msg-standalone{max-width:100%}
  body:not(.fi-light) .tp-messenger .tp-msg-contact.active{background:#30264b;border-color:#5d4a88;color:#f4efff}
  body:not(.fi-light) .tp-messenger .tp-msg-bubble.mine{background:#352853;border-color:#5b477f;color:#f7f2ff}
  body:not(.fi-light) .tp-messenger .tp-msg-avatar{background:#33274f;color:#e7dcff}
  @media(max-width:760px){.tp-messenger{grid-template-columns:minmax(0,1fr);gap:10px}.tp-msg-contacts{max-height:none}.tp-msg-contact-list{display:flex;gap:6px;max-height:none;overflow:auto;padding:0 10px 10px}.tp-msg-contact{flex:0 0 190px;width:190px;border-color:var(--tp-line)}.tp-msg-thread{min-height:220px;max-height:55vh;padding:12px}.tp-msg-bubble{max-width:90%}.tp-msg-compose{padding:9px}.tp-msg-send{padding:10px}}
  `;
  document.head.appendChild(s);
 }
 function fmtDate(value){const d=new Date(value);return Number.isNaN(d.getTime())?'':d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}
 function short(value){const t=String(value||'');return t.length>48?t.slice(0,48)+'…':t}
 function setHeader(isStudent){try{if(typeof setPage==='function')setPage(isStudent?'Messages':'Comunicação individual',isStudent?'Converse diretamente com seu professor.':'Escolha um aluno para abrir a conversa individual.')}catch(_){}}
 async function loadStudentRecord(){
  const ss=currentSession(),db=client();if(!ss?.user?.id||!db)throw new Error('Sua sessão não está disponível. Entre novamente na plataforma.');
  const {data,error}=await db.from('tic_students').select('id,teacher_id,display_name,auth_user_id').eq('auth_user_id',ss.user.id).maybeSingle();
  if(error)throw error;if(!data)throw new Error('Sua conta ainda não está vinculada a um cadastro de aluno.');
  return data;
 }
 async function render(isStudent=true,requestedStudentId=null){
  style();state.isStudent=isStudent;state.search='';
  const content=$('content'),ss=currentSession(),db=client();
  if(!content||!ss?.user?.id||!db){if(content)content.innerHTML='<div class="card">Não foi possível identificar sua sessão. Entre novamente.</div>';return}
  setHeader(isStudent);
  content.innerHTML='<div class="card" style="padding:22px">Carregando conversas...</div>';
  try{
   if(isStudent){
    state.studentRecord=await loadStudentRecord();state.studentId=state.studentRecord.id;
    const {data,error}=await db.from('tic_messages').select('id,teacher_id,student_id,sender_id,body,created_at,read_at').eq('teacher_id',state.studentRecord.teacher_id).eq('student_id',state.studentRecord.id).order('created_at',{ascending:true});
    if(error)throw error;state.messages=data||[];
    content.innerHTML=studentMarkup(state.studentRecord,state.messages);
    bindComposer(true,state.studentId);scrollThreadBottom();
    markIncomingRead(state.studentId,state.studentRecord.teacher_id);
   }else{
    const {data:students,error:studentsError}=await db.from('tic_students').select('id,teacher_id,display_name,auth_user_id,status').eq('teacher_id',ss.user.id).order('display_name',{ascending:true});
    if(studentsError)throw studentsError;state.teacherStudents=students||[];
    const {data:allMessages,error:messagesError}=await db.from('tic_messages').select('id,teacher_id,student_id,sender_id,body,created_at,read_at').eq('teacher_id',ss.user.id).order('created_at',{ascending:true});
    if(messagesError)throw messagesError;state.messages=allMessages||[];
    const lastStudent=(state.teacherStudents.find(s=>s.id===requestedStudentId)||state.teacherStudents.find(s=>state.messages.some(m=>m.student_id===s.id))||state.teacherStudents[0]);
    state.studentId=lastStudent?.id||null;
    content.innerHTML=teacherMarkup(state.teacherStudents,state.messages,state.studentId);
    bindTeacherControls();
    if(state.studentId){bindComposer(false,state.studentId);scrollThreadBottom();markIncomingRead(state.studentId,ss.user.id)}
   }
  }catch(err){
   content.innerHTML='<div class="card"><h3>Não foi possível abrir as mensagens</h3><p>'+esc(err?.message||String(err))+'</p><p style="font-size:11px;color:var(--muted)">Nenhuma mensagem foi apagada. Verifique as permissões de acesso da tabela tic_messages se o erro persistir.</p></div>';
  }
 }
 function studentMarkup(student,messages){
  const teacherName='Seu Teacher';
  return '<div class="tp-msg-standalone"><div class="tp-messenger"><section class="tp-msg-conversation"><header class="tp-msg-thread-head"><div class="tp-msg-person"><span class="tp-msg-avatar">T</span><div><h3>'+teacherName+'</h3><p>Conversa privada · somente você e seu professor</p></div></div></header><div class="tp-msg-thread" id="tpMsgThread">'+messageBubbles(messages,student.id)+'</div><form class="tp-msg-compose" id="tpMsgComposer"><textarea id="tpMsgBody" maxlength="10000" placeholder="Escreva uma mensagem para seu professor..." required></textarea><button class="tp-msg-send" type="submit">Enviar ↗</button></form></section></div></div>';
 }
 function teacherMarkup(students,messages,selectedId){
  const counts={};messages.forEach(m=>{if(m.sender_id!==currentSession()?.user?.id&&!m.read_at)counts[m.student_id]=(counts[m.student_id]||0)+1});
  const filtered=students.filter(s=>(s.display_name||'Aluno').toLowerCase().includes(state.search.toLowerCase()));
  const contacts=filtered.map(s=>{
   const msgs=messages.filter(m=>m.student_id===s.id),last=msgs[msgs.length-1],name=s.display_name||'Aluno';
   return '<button type="button" class="tp-msg-contact '+(s.id===selectedId?'active':'')+'" data-tp-student="'+esc(s.id)+'"><span class="tp-msg-avatar">'+esc(name.trim().slice(0,1).toUpperCase()||'A')+'</span><span class="tp-msg-contact-copy"><b>'+esc(name)+'</b><small>'+esc(last?short(last.body):'Iniciar conversa')+'</small></span>'+(counts[s.id]?'<span class="tp-msg-unread">'+counts[s.id]+'</span>':'')+'</button>';
  }).join('');
  const chosen=students.find(s=>s.id===selectedId),thread=chosen?messages.filter(m=>m.student_id===chosen.id):[];
  return '<div class="tp-messenger"><aside class="tp-msg-contacts"><header class="tp-msg-contacts-head"><h3>👥 Alunos</h3><p>Conversas individuais vinculadas ao cadastro de cada aluno.</p></header><input class="tp-msg-search" id="tpMsgSearch" type="search" placeholder="Buscar aluno..." value="'+esc(state.search)+'"><div class="tp-msg-contact-list" id="tpMsgContacts">'+(contacts||'<div class="tp-msg-empty">Nenhum aluno cadastrado para esta conta.</div>')+'</div></aside><section class="tp-msg-conversation">'+(chosen?'<header class="tp-msg-thread-head"><div class="tp-msg-person"><span class="tp-msg-avatar">'+esc((chosen.display_name||'A').trim().slice(0,1).toUpperCase())+'</span><div><h3>'+esc(chosen.display_name||'Aluno')+'</h3><p>Conversa individual · '+thread.length+' mensagem(ns)</p></div></div><span class="tp-msg-unread">Privada</span></header><div class="tp-msg-thread" id="tpMsgThread">'+messageBubbles(thread,chosen.id)+'</div><form class="tp-msg-compose" id="tpMsgComposer"><textarea id="tpMsgBody" maxlength="10000" placeholder="Escreva uma mensagem para '+esc(chosen.display_name||'o aluno')+'..." required></textarea><button class="tp-msg-send" type="submit">Enviar ↗</button></form>':'<div class="tp-msg-empty">Selecione um aluno para iniciar uma conversa individual.</div>')+'</section></div>';
 }
 function messageBubbles(messages,studentId){
  const me=currentSession()?.user?.id;
  if(!messages.length)return '<div class="tp-msg-empty">Ainda não há mensagens nesta conversa.<br>Envie a primeira mensagem para iniciar o contato.</div>';
  return messages.map(m=>{
   const mine=m.sender_id===me;
   return '<article class="tp-msg-bubble '+(mine?'mine':'theirs')+'"><p>'+esc(m.body)+'</p><small>'+(mine?'Você':'Mensagem recebida')+' · '+esc(fmtDate(m.created_at))+(mine?'':m.read_at?' · Lida':' · Nova')+'</small></article>';
  }).join('');
 }
 function bindTeacherControls(){
  const list=$('tpMsgContacts');if(list)list.addEventListener('click',e=>{const b=e.target.closest('[data-tp-student]');if(b)render(false,b.dataset.tpStudent)});
  const search=$('tpMsgSearch');if(search)search.addEventListener('input',()=>{state.search=search.value;const filtered=state.teacherStudents.filter(s=>(s.display_name||'Aluno').toLowerCase().includes(state.search.toLowerCase()));const counts={};state.messages.forEach(m=>{if(m.sender_id!==currentSession()?.user?.id&&!m.read_at)counts[m.student_id]=(counts[m.student_id]||0)+1});list.innerHTML=filtered.map(s=>{const ms=state.messages.filter(m=>m.student_id===s.id),last=ms[ms.length-1],n=s.display_name||'Aluno';return '<button type="button" class="tp-msg-contact '+(s.id===state.studentId?'active':'')+'" data-tp-student="'+esc(s.id)+'"><span class="tp-msg-avatar">'+esc(n.trim().slice(0,1).toUpperCase()||'A')+'</span><span class="tp-msg-contact-copy"><b>'+esc(n)+'</b><small>'+esc(last?short(last.body):'Iniciar conversa')+'</small></span>'+(counts[s.id]?'<span class="tp-msg-unread">'+counts[s.id]+'</span>':'')+'</button>'}).join('')||'<div class="tp-msg-empty">Nenhum aluno encontrado.</div>'});
 }
 function bindComposer(isStudent,studentId){
  const form=$('tpMsgComposer');if(!form)return;
  form.addEventListener('submit',async e=>{
   e.preventDefault();const textarea=$('tpMsgBody'),body=textarea?.value.trim();if(!body)return;
   const ss=currentSession(),db=client();if(!ss?.user?.id||!db)return;
   const target=isStudent?state.studentRecord:state.teacherStudents.find(s=>s.id===studentId);
   if(!target)return notify('Selecione um aluno válido para enviar a mensagem.');
   const teacherId=isStudent?target.teacher_id:ss.user.id;
   const payload={teacher_id:teacherId,student_id:target.id,sender_id:ss.user.id,body};
   const button=form.querySelector('button[type="submit"]');if(button){button.disabled=true;button.textContent='Enviando…'}
   const {error}=await db.from('tic_messages').insert(payload);
   if(error){if(button){button.disabled=false;button.textContent='Enviar ↗'}return notify('Não foi possível enviar a mensagem: '+error.message)}
   state.search='';await render(isStudent,target.id);
   requestAnimationFrame(scrollThreadBottom);
  });
 }
 function scrollThreadBottom(){const t=$('tpMsgThread');if(t)t.scrollTop=t.scrollHeight}
 async function markIncomingRead(studentId,teacherId){
  try{const db=client(),ss=currentSession();if(!db||!ss?.user?.id)return;await db.from('tic_messages').update({read_at:new Date().toISOString()}).eq('teacher_id',teacherId).eq('student_id',studentId).neq('sender_id',ss.user.id).is('read_at',null)}catch(_){}
 }
 function install(){
  const base=window.loadView;if(typeof base!=='function'||base.__tpIndividualMessages)return;
  const wrapped=function(v){if(v==='messages')return render(false);if(v==='studentMessages')return render(true);return base.apply(this,arguments)};
  wrapped.__tpIndividualMessages=true;window.loadView=wrapped;
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
 setTimeout(install,400);setTimeout(install,1200);
 window.tpOpenIndividualConversation=id=>render(false,id);
})();