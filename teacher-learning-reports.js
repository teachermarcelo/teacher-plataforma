/* Teacher learning reports and richer student interaction tracking.
   Additive only: reads existing tic_* records and writes only to the existing
   tic_student_activity_events table. No schema changes or dashboard redesign. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const role=()=>String((typeof profile!=='undefined'&&profile&&profile.role)||window.profile&&window.profile.role||$('userRole')&&$('userRole').textContent||'').toLowerCase();
const isStudent=()=>role().indexOf('student')>=0;
const isTeacher=()=>role().indexOf('teacher')>=0||role().indexOf('admin')>=0;
const viewName=()=>typeof currentView!=='undefined'?String(currentView||'student'):String(window.currentView||'student');
const fmtDate=v=>{if(!v)return '—';const d=new Date(v);return isNaN(d.getTime())?'—':d.toLocaleString('pt-BR')};
const fmtDay=v=>{if(!v)return '—';const d=new Date(v);return isNaN(d.getTime())?'—':d.toLocaleDateString('pt-BR')};
const duration=seconds=>{const n=Math.max(0,Number(seconds)||0);const h=Math.floor(n/3600),m=Math.floor((n%3600)/60);return h?h+'h '+m+'min':m+' min'};
const dateValue=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+day};
function dateBounds(){
 const from=$('ticReportFrom')&&$('ticReportFrom').value||dateValue(new Date(Date.now()-29*86400000));
 const to=$('ticReportTo')&&$('ticReportTo').value||dateValue(new Date());
 return {from:new Date(from+'T00:00:00').toISOString(),to:new Date(to+'T23:59:59.999').toISOString(),fromDate:from,toDate:to};
}
function logStudentEvent(type,label,view,entityType,entityId,metadata){
 try{if(typeof window.ticLogStudentEventV58==='function')window.ticLogStudentEventV58(type,label,view||viewName(),entityType||null,entityId||null,metadata||{});}catch(e){console.warn('[student tracking]',e)}
}
function wrapStudentAction(name,eventType,label,entityType){
 const base=window[name];
 if(typeof base!=='function'||base.__ticStudentActionWrapped)return;
 const wrapped=async function(){
  const args=Array.prototype.slice.call(arguments);
  if(isStudent()&&typeof session!=='undefined'&&session&&session.user){
   logStudentEvent(eventType,label,viewName(),entityType,args[0]||null,{action:name});
  }
  return base.apply(this,args);
 };
 wrapped.__ticStudentActionWrapped=true;window[name]=wrapped;
}
function installActionTracking(){
 wrapStudentAction('openStudentCourse','course_open','Abriu o curso','course');
 wrapStudentAction('viewStudentLessonInteractive','lesson_open','Abriu a aula','lesson');
 wrapStudentAction('openStudentTask','task_open','Abriu a tarefa','task');
 wrapStudentAction('openStudentTaskViewer','task_open','Abriu o visualizador da tarefa','task_assignment');
 const planner=window.ticImmersionPlannerOpen;
 if(typeof planner==='function'&&!planner.__ticStudentActionWrapped){
  const wrapped=async function(){
   const level=(()=>{try{return sessionStorage.getItem('ticImmRequestedLevel')||''}catch(_){return ''}})();
   const search=(()=>{try{return sessionStorage.getItem('ticImmRequestedSearch')||''}catch(_){return ''}})();
   if(isStudent()&&typeof session!=='undefined'&&session&&session.user)logStudentEvent('planner_open','Abriu o Immersion Planner',viewName(),'immersion_activity',null,{level:level,search:search});
   return planner.apply(this,arguments);
  };
  wrapped.__ticStudentActionWrapped=true;window.ticImmersionPlannerOpen=wrapped;
 }
}
function trackStudentClicks(){
 if(window.__ticStudentClickTrackingInstalled)return;
 window.__ticStudentClickTrackingInstalled=true;
 document.addEventListener('click',function(ev){
  if(!isStudent()||!(typeof session!=='undefined'&&session&&session.user))return;
  const el=ev.target&&ev.target.closest&&ev.target.closest('#content button, #content a, #content [role="button"], #content [data-fi2-level], #content [data-fi2-activity]');
  if(!el||el.id==='fi2Theme'||el.id==='tpInstallAppBtn'||el.id==='tpUpdateAppBtn')return;
  const label=String(el.getAttribute('aria-label')||el.getAttribute('title')||el.innerText||el.textContent||'').replace(/\s+/g,' ').trim().slice(0,120);
  if(!label||/^(☼|☾|×|fechar|close)$/i.test(label))return;
  const entityType=el.dataset.entityType||el.dataset.activityId&&'immersion_activity'||el.dataset.lessonId&&'lesson'||el.dataset.taskId&&'task'||el.dataset.courseId&&'course'||(el.matches('[data-fi2-level]')?'cefr_level':'interaction');
  const entityId=el.dataset.entityId||el.dataset.activityId||el.dataset.lessonId||el.dataset.taskId||el.dataset.courseId||el.dataset.fi2Level||null;
  const metadata={tag:el.tagName.toLowerCase(),view:viewName(),target:label};
  if(el.dataset.view)metadata.destination=el.dataset.view;
  if(el.dataset.fi2Level)metadata.cefr_level=el.dataset.fi2Level;
  setTimeout(()=>logStudentEvent('interaction',label,viewName(),entityType,entityId,metadata),0);
 },true);
}
function wrapStudentNavigation(){
 const base=window.loadView;
 if(typeof base!=='function'||base.__ticLearningTrackingWrapped)return;
 const wrapped=async function(v){
  const before=String(v||'');
  const result=await base.apply(this,arguments);
  if(isStudent()&&typeof session!=='undefined'&&session&&session.user&&before){
   const views=['student','studentCourses','studentClass','studentTasks','studentProgress','studentLessons','studentCalendar','studentMessages','immersionPlanner','learningHub','games','listeningPractice','speakingPractice','vocabulary','grammar'];
   if(views.indexOf(before)>=0)logStudentEvent('view','Abriu a aba: '+before,before,'view',before,{destination:before});
  }
  return result;
 };
 wrapped.__ticLearningTrackingWrapped=true;
 window.loadView=wrapped;
}
function appendReportPanel(){
 if(!isTeacher()||!$('content')||$('ticLearningReportPanel'))return;
 const section=document.createElement('section');
 section.id='ticLearningReportPanel';
 section.className='card section tic-learning-report-panel';
 section.innerHTML=
  '<div class="section-head"><div><h2>📊 Relatório pedagógico individual</h2><p>Histórico real de aulas, missões, habilidades, feedbacks e atividade do aluno.</p></div></div>'+
  '<div class="form-grid">'+
   '<div class="field"><label for="ticReportStudent">Aluno</label><select class="input" id="ticReportStudent"><option value="">Carregando alunos...</option></select></div>'+
   '<div class="field"><label for="ticReportFrom">De</label><input class="input" id="ticReportFrom" type="date"></div>'+
   '<div class="field"><label for="ticReportTo">Até</label><input class="input" id="ticReportTo" type="date"></div>'+
  '</div>'+
  '<div class="actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">'+
   '<button class="btn primary" id="ticReportGenerate" type="button">Gerar relatório</button>'+
   '<button class="btn secondary" id="ticReportPdf" type="button">Baixar PDF</button>'+
  '</div><p class="muted" style="font-size:12px;margin-top:8px">O PDF abre a janela de impressão do navegador. Escolha “Salvar como PDF”. O relatório usa apenas dados encontrados no Supabase.</p>'+
  '<div id="ticReportStatus" role="status" style="margin-top:10px"></div><div id="ticReportPreview" style="margin-top:12px"></div>';
 $('content').appendChild(section);
 const now=new Date(),from=new Date(Date.now()-29*86400000);
 $('ticReportFrom').value=dateValue(from);$('ticReportTo').value=dateValue(now);
 $('ticReportGenerate').addEventListener('click',()=>generateReport(false));
 $('ticReportPdf').addEventListener('click',()=>generateReport(true));
 loadReportStudents();
}
async function loadReportStudents(){
 const select=$('ticReportStudent');if(!select||typeof sb==='undefined'||!(typeof session!=='undefined'&&session&&session.user))return;
 const {data,error}=await sb.from('tic_students').select('id,display_name,email,current_level,target_level').eq('teacher_id',session.user.id).order('display_name');
 if(error){select.innerHTML='<option value="">Erro ao carregar alunos</option>';setStatus('Não foi possível carregar os alunos: '+error.message,true);return}
 const rows=data||[];
 select.innerHTML='<option value="">Selecione um aluno</option>'+rows.map(s=>'<option value="'+esc(s.id)+'">'+esc(s.display_name||s.email||'Aluno')+' · '+esc(s.current_level||'Sem nível')+'</option>').join('');
}
function setStatus(text,error){const el=$('ticReportStatus');if(el){el.textContent=text;el.style.color=error?'#ef4444':'var(--fi-muted,#8ca4bd)'}}
async function fetchReportData(){
 const studentId=$('ticReportStudent')&&$('ticReportStudent').value;
 if(!studentId)throw new Error('Selecione um aluno.');
 const bounds=dateBounds();
 if(bounds.fromDate>bounds.toDate)throw new Error('A data inicial deve ser anterior à data final.');
 const {data:student,error:studentError}=await sb.from('tic_students').select('id,display_name,email,current_level,target_level,teacher_id').eq('id',studentId).eq('teacher_id',session.user.id).maybeSingle();
 if(studentError)throw studentError;if(!student)throw new Error('Aluno não encontrado para este professor.');
 const from=bounds.from,to=bounds.to;
 const requests=await Promise.all([
  sb.from('tic_progress').select('level,skill,progress').eq('student_id',studentId),
  sb.from('tic_student_activity').select('id,started_at,last_seen_at,duration_seconds').eq('student_id',studentId).gte('started_at',from).lte('started_at',to).order('started_at',{ascending:false}).limit(2000),
  sb.from('tic_student_activity_events').select('event_type,event_label,view_name,entity_type,entity_id,metadata,created_at').eq('student_id',studentId).gte('created_at',from).lte('created_at',to).order('created_at',{ascending:false}).limit(3000),
  sb.from('tic_lesson_responses').select('id,lesson_id,attempt,status,score,response_text,response_data,teacher_comment,improvement_skill,improvement_link,created_at,reviewed_at,tic_lessons(title,level,skill)').eq('student_id',studentId).gte('created_at',from).lte('created_at',to).order('created_at',{ascending:false}).limit(2000),
  sb.from('tic_task_assignments').select('id,assignment_id,status,active,assigned_at,completed_at,tic_assignments(title,cefr_level,skill,task_level,points,due_at)').eq('student_id',studentId).gte('assigned_at',from).lte('assigned_at',to).order('assigned_at',{ascending:false}).limit(2000),
  sb.from('tic_submissions').select('id,task_assignment_id,attempt,grade,submitted_at,answer_text,response_data').eq('student_id',studentId).gte('submitted_at',from).lte('submitted_at',to).order('submitted_at',{ascending:false}).limit(3000)
 ]);
 const labels=['progresso','sessões','eventos','respostas de aulas','tarefas atribuídas','entregas'];
 const errors=requests.map((r,i)=>r.error?labels[i]+': '+r.error.message:null).filter(Boolean);
 const vals=requests.map(r=>r.data||[]);
 const submissionIds=vals[5].map(x=>x.id).filter(Boolean);
 let feedback=[],feedbackError=null;
 if(submissionIds.length){
  const fr=await sb.from('tic_feedback').select('submission_id,grade,comment,improvement_skill,improvement_link,created_at').in('submission_id',submissionIds).order('created_at',{ascending:false});
  feedback=fr.data||[];feedbackError=fr.error;
  if(feedbackError)errors.push('feedback de tarefas: '+feedbackError.message);
 }
 return {student,bounds,progress:vals[0],sessions:vals[1],events:vals[2],responses:vals[3],assignments:vals[4],submissions:vals[5],feedback,errors};
}
function scoreNum(v){if(v===null||v===undefined||v==='')return null;const n=Number(v);return Number.isFinite(n)?n:null}
function reportHtml(d){
 const {student,bounds,progress,sessions,events,responses,assignments,submissions,feedback,errors}=d;
 const assignmentMap=new Map(assignments.map(a=>[a.id,a]));
 const taskRows=submissions.map(sub=>{const a=assignmentMap.get(sub.task_assignment_id),fb=feedback.find(x=>x.submission_id===sub.id);return {sub,a,fb,score:scoreNum(sub.grade!==undefined&&sub.grade!==null?sub.grade:fb&&fb.grade)}});
 const scored=[...responses.map(r=>({score:scoreNum(r.score),skill:r.tic_lessons&&r.tic_lessons.skill||r.improvement_skill||'Não identificada',topic:r.tic_lessons&&r.tic_lessons.title||'Lesson',source:'Lesson',date:r.created_at})),...taskRows.map(x=>({score:x.score,skill:x.a&&x.a.tic_assignments&&x.a.tic_assignments.skill||x.fb&&x.fb.improvement_skill||'Não identificada',topic:x.a&&x.a.tic_assignments&&x.a.tic_assignments.title||'Task',source:'Task',date:x.sub.submitted_at}))].filter(x=>x.score!==null);
 const average=scored.length?Math.round(scored.reduce((n,x)=>n+x.score,0)/scored.length):null;
 const skillScores={};
 scored.forEach(x=>{const k=String(x.skill||'Não identificada');(skillScores[k]||(skillScores[k]=[])).push(x.score)});
 const skillHtml=Object.keys(skillScores).sort().map(k=>{const arr=skillScores[k],avg=Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);return '<tr><td>'+esc(k)+'</td><td>'+arr.length+'</td><td>'+avg+'%</td><td>'+(avg<70?'Precisa de reforço':avg<85?'Em desenvolvimento':'Bom desempenho')+'</td></tr>'}).join('')||'<tr><td colspan="4">Não há notas registradas neste período.</td></tr>';
 const improvements=[];
 responses.forEach(r=>{const score=scoreNum(r.score),lesson=r.tic_lessons||{};if(r.improvement_skill||r.teacher_comment||r.improvement_link)improvements.push({topic:lesson.title||'Lesson',skill:r.improvement_skill||lesson.skill||'Não identificada',score,advice:r.teacher_comment||'Revisar a resposta e praticar novamente o conteúdo indicado pelo professor.',link:r.improvement_link||''});else if(score!==null&&score<70)improvements.push({topic:lesson.title||'Lesson',skill:lesson.skill||'Não identificada',score,advice:'Resultado abaixo de 70%. Recomenda-se revisar este assunto e propor uma nova prática direcionada.',link:''})});
 taskRows.forEach(x=>{const title=x.a&&x.a.tic_assignments&&x.a.tic_assignments.title||'Task';const skill=x.fb&&x.fb.improvement_skill||x.a&&x.a.tic_assignments&&x.a.tic_assignments.skill||'Não identificada';if(x.fb&&(x.fb.improvement_skill||x.fb.comment||x.fb.improvement_link))improvements.push({topic:title,skill,score:x.score,advice:x.fb.comment||'Praticar novamente a habilidade indicada pelo professor.',link:x.fb.improvement_link||''});else if(x.score!==null&&x.score<70)improvements.push({topic:title,skill,score:x.score,advice:'Resultado abaixo de 70%. Retomar o conteúdo da tarefa e realizar prática adicional.',link:''})});
 const lowProgress=progress.filter(x=>Number(x.progress)<70);
 lowProgress.forEach(x=>{if(!improvements.some(i=>i.skill===x.skill&&i.topic==='Progresso por habilidade'))improvements.push({topic:'Progresso por habilidade',skill:x.skill+' ('+x.level+')',score:Number(x.progress),advice:'Progresso registrado abaixo de 70%. Planejar revisão curta e verificar novamente a habilidade.',link:''})});
 const improvementHtml=improvements.length?improvements.slice(0,30).map(i=>'<article class="tic-report-recommendation"><b>'+esc(i.topic)+'</b><div><strong>Habilidade:</strong> '+esc(i.skill)+(i.score!==null?' · Resultado: '+esc(i.score)+'%':'')+'</div><p>'+esc(i.advice)+'</p>'+(i.link?'<p>Material sugerido: '+esc(i.link)+'</p>':'')+'</article>').join(''):'<p>Não há evidências suficientes de dificuldade no período para gerar recomendações específicas. Continue registrando respostas e feedbacks para enriquecer o relatório.</p>';
 const eventHtml=events.slice(0,100).map(e=>'<tr><td>'+esc(fmtDate(e.created_at))+'</td><td>'+esc(e.event_label||e.event_type||'Ação')+'</td><td>'+esc(e.view_name||'—')+'</td><td>'+esc(e.entity_type||'—')+'</td></tr>').join('')||'<tr><td colspan="4">Nenhuma ação registrada no período.</td></tr>';
 const responseHtml=responses.map(r=>'<tr><td>'+esc(fmtDate(r.created_at))+'</td><td>'+esc(r.tic_lessons&&r.tic_lessons.title||'Lesson')+'</td><td>'+esc(r.tic_lessons&&r.tic_lessons.skill||'—')+'</td><td>'+esc(r.attempt||1)+'</td><td>'+(scoreNum(r.score)===null?'Sem nota':esc(r.score)+'%')+'</td><td>'+esc(r.status||'—')+'</td></tr>').join('')||'<tr><td colspan="6">Nenhuma resposta de lesson registrada no período.</td></tr>';
 const taskHtml=taskRows.map(x=>'<tr><td>'+esc(fmtDate(x.sub.submitted_at))+'</td><td>'+esc(x.a&&x.a.tic_assignments&&x.a.tic_assignments.title||'Task')+'</td><td>'+esc(x.a&&x.a.tic_assignments&&x.a.tic_assignments.skill||'—')+'</td><td>'+esc(x.sub.attempt||1)+'</td><td>'+(x.score===null?'Sem nota':esc(x.score)+'%')+'</td><td>'+esc(x.fb&&x.fb.comment||'—')+'</td></tr>').join('')||'<tr><td colspan="6">Nenhuma entrega de task registrada no período.</td></tr>';
 const sessionHtml=sessions.map(s=>'<tr><td>'+esc(fmtDate(s.started_at))+'</td><td>'+esc(fmtDate(s.last_seen_at))+'</td><td>'+esc(duration(s.duration_seconds))+'</td></tr>').join('')||'<tr><td colspan="3">Nenhuma sessão registrada no período.</td></tr>';
 const totalSeconds=sessions.reduce((n,s)=>n+(Number(s.duration_seconds)||0),0);
 const statusWarnings=errors.length?'<div class="tic-report-warning"><b>Observações sobre os dados</b><ul>'+errors.map(e=>'<li>'+esc(e)+'</li>').join('')+'</ul>Algumas seções podem estar incompletas porque o Supabase não retornou todos os registros.</div>':'';
 return '<div class="tic-report-document">'+
  '<header><div class="tic-report-brand">FLUENT IMMERSION · RELATÓRIO PEDAGÓGICO</div><h1>'+esc(student.display_name||'Aluno')+'</h1><p>'+esc(student.email||'')+' · Nível atual: '+esc(student.current_level||'—')+' · Objetivo: '+esc(student.target_level||'—')+'</p><p>Período: '+esc(fmtDay(bounds.fromDate))+' até '+esc(fmtDay(bounds.toDate))+'</p></header>'+
  statusWarnings+
  '<div class="tic-report-metrics"><div><small>Sessões</small><b>'+sessions.length+'</b></div><div><small>Tempo registrado</small><b>'+esc(duration(totalSeconds))+'</b></div><div><small>Interações</small><b>'+events.length+'</b></div><div><small>Respostas/entregas</small><b>'+(responses.length+submissions.length)+'</b></div><div><small>Média das notas disponíveis</small><b>'+(average===null?'Sem notas':average+'%')+'</b></div></div>'+
  '<h2>1. Progresso por nível e habilidade</h2><table><thead><tr><th>Nível</th><th>Habilidade</th><th>Progresso</th></tr></thead><tbody>'+(progress.map(p=>'<tr><td>'+esc(p.level||'—')+'</td><td>'+esc(p.skill||'—')+'</td><td>'+esc(p.progress||0)+'%</td></tr>').join('')||'<tr><td colspan="3">Sem progresso registrado.</td></tr>')+'</tbody></table>'+
  '<h2>2. Desempenho por habilidade</h2><table><thead><tr><th>Habilidade</th><th>Resultados</th><th>Média</th><th>Leitura pedagógica</th></tr></thead><tbody>'+skillHtml+'</tbody></table>'+
  '<h2>3. Respostas de lessons</h2><table><thead><tr><th>Data</th><th>Assunto/aula</th><th>Habilidade</th><th>Tentativa</th><th>Nota</th><th>Status</th></tr></thead><tbody>'+responseHtml+'</tbody></table>'+
  '<h2>4. Entregas de tarefas</h2><table><thead><tr><th>Data</th><th>Tarefa</th><th>Habilidade</th><th>Tentativa</th><th>Nota</th><th>Feedback</th></tr></thead><tbody>'+taskHtml+'</tbody></table>'+
  '<h2>5. O que melhorar e próximas ações</h2>'+improvementHtml+
  '<h2>6. Histórico de sessões</h2><table><thead><tr><th>Início</th><th>Última atividade</th><th>Duração registrada</th></tr></thead><tbody>'+sessionHtml+'</tbody></table>'+
  '<h2>7. Linha do tempo de ações</h2><table><thead><tr><th>Data/hora</th><th>Ação registrada</th><th>Aba</th><th>Tipo</th></tr></thead><tbody>'+eventHtml+'</tbody></table>'+
  '<footer>Gerado a partir dos registros disponíveis na Teacher Plataforma. Os indicadores descrevem apenas atividades e resultados registrados; dados ausentes não são interpretados como desempenho zero.</footer></div>';
}
let lastReport=null,lastKey='';
async function generateReport(pdf){
 let printWindow=null;
 if(pdf){printWindow=window.open('','_blank');if(!printWindow){setStatus('O navegador bloqueou a janela do PDF. Permita pop-ups para este site e tente novamente.',true);return}}
 setStatus('Carregando dados reais do aluno...');
 try{
  const d=await fetchReportData();const html=reportHtml(d);
  lastReport={data:d,html};lastKey=String($('ticReportStudent').value)+'|'+$('ticReportFrom').value+'|'+$('ticReportTo').value;
  const preview=$('ticReportPreview');if(preview)preview.innerHTML=html;
  setStatus('Relatório gerado com '+d.events.length+' ações, '+d.responses.length+' respostas de lessons e '+d.submissions.length+' entregas de tarefas.'+(d.errors.length?' Há avisos de dados incompletos.':''));
  if(pdf){
   printWindow.document.open();
   printWindow.document.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório pedagógico - '+esc(d.student.display_name||'Aluno')+'</title><style>'+printCss()+'</style></head><body>'+html+'<script>window.addEventListener("load",function(){setTimeout(function(){window.focus();window.print()},350)});<\/script></body></html>');
   printWindow.document.close();
  }
 }catch(err){if(printWindow)printWindow.close();setStatus(err&&err.message||'Erro ao gerar relatório.',true)}
}
function printCss(){
 return 'body{font:12px Arial,sans-serif;color:#17233a;margin:24px}.tic-report-document{max-width:1000px;margin:auto}.tic-report-brand{font-size:10px;letter-spacing:1.4px;color:#5a39b5;font-weight:800}h1{font-size:26px;margin:8px 0}h2{font-size:16px;margin:24px 0 8px;border-bottom:1px solid #d7deea;padding-bottom:6px}header{border-bottom:2px solid #6d45d8;padding-bottom:12px;margin-bottom:16px}header p,footer{color:#5b6b80}.tic-report-metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:16px 0}.tic-report-metrics>div{border:1px solid #d7deea;border-radius:8px;padding:10px}.tic-report-metrics small,.tic-report-metrics b{display:block}.tic-report-metrics small{color:#617187}.tic-report-metrics b{font-size:18px;margin-top:4px}table{width:100%;border-collapse:collapse;margin:8px 0 16px;break-inside:auto}th,td{border:1px solid #dce3ed;padding:6px;text-align:left;vertical-align:top}th{background:#edf1f7}tr{break-inside:avoid}.tic-report-recommendation{border:1px solid #d7deea;border-left:4px solid #7147db;border-radius:8px;padding:10px;margin:8px 0}.tic-report-recommendation p{margin:5px 0}.tic-report-warning{background:#fff6db;border:1px solid #eed28c;padding:10px;border-radius:8px}.tic-report-warning ul{margin:5px 0}footer{font-size:10px;margin-top:24px;border-top:1px solid #d7deea;padding-top:10px}@media print{body{margin:10mm}.tic-report-document{max-width:none}button{display:none!important}@page{size:A4 landscape;margin:12mm}}';
}
function installStyle(){
 if($('ticLearningReportsStyle'))return;
 const st=document.createElement('style');st.id='ticLearningReportsStyle';
 st.textContent='body.fi-premium:not(.fi-light) #ticLearningReportPanel{background:#0d2034!important;color:#f4f7ff!important;border-color:#29445f!important}body.fi-premium:not(.fi-light) #ticLearningReportPanel h2,body.fi-premium:not(.fi-light) #ticLearningReportPanel label{color:#f4f7ff!important}body.fi-premium:not(.fi-light) #ticLearningReportPanel p{color:#bdcde0!important}body.fi-premium:not(.fi-light) #ticLearningReportPanel .input{background:#09192a!important;color:#f4f7ff!important;border-color:#34506d!important}body.fi-premium.fi-light #ticLearningReportPanel{background:#fff!important;color:#17233a!important;border-color:#dce4ef!important}body.fi-premium.fi-light #ticLearningReportPanel h2,body.fi-premium.fi-light #ticLearningReportPanel label{color:#17233a!important}body.fi-premium.fi-light #ticLearningReportPanel p{color:#596b81!important}.tic-report-document{background:#fff;color:#17233a;border:1px solid #dce3ed;border-radius:10px;padding:18px;overflow:auto}.tic-report-document h1,.tic-report-document h2{color:#17233a!important}.tic-report-document table{width:100%;border-collapse:collapse;font-size:12px}.tic-report-document th,.tic-report-document td{border:1px solid #dce3ed;padding:7px;text-align:left;color:#17233a!important}.tic-report-document th{background:#edf1f7!important}.tic-report-metrics{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:16px 0}.tic-report-metrics>div{border:1px solid #d7deea;border-radius:8px;padding:10px}.tic-report-metrics small,.tic-report-metrics b{display:block}.tic-report-metrics small{color:#617187!important}.tic-report-metrics b{font-size:18px;margin-top:4px;color:#17233a!important}.tic-report-recommendation{border:1px solid #d7deea;border-left:4px solid #7147db;border-radius:8px;padding:10px;margin:8px 0;color:#17233a!important}.tic-report-recommendation p{color:#34445a!important}.tic-report-warning{background:#fff6db!important;color:#604d1c!important;border:1px solid #eed28c;padding:10px;border-radius:8px}';
 document.head.appendChild(st);
}
const originalReports=window.reportsPage;
if(typeof originalReports==='function'&&!originalReports.__ticLearningReportsWrapped){
 const wrapped=async function(){await originalReports.apply(this,arguments);installStyle();appendReportPanel()};
 wrapped.__ticLearningReportsWrapped=true;window.reportsPage=wrapped;
}
trackStudentClicks();wrapStudentNavigation();installActionTracking();
document.addEventListener('click',function(ev){
 const b=ev.target&&ev.target.closest&&ev.target.closest('#teacherNav [data-view]');
 if(b&&b.dataset.view==='reports')setTimeout(()=>{installStyle();appendReportPanel()},0);
},true);
document.addEventListener('DOMContentLoaded',function(){trackStudentClicks();wrapStudentNavigation();installActionTracking()});
window.ticRefreshLearningReportPanel=appendReportPanel;
})();