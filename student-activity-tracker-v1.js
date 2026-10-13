/* Fluent Immersion — richer student activity telemetry.
   Records platform actions only; never records passwords, typed answers, or field values. */
(function(){
 'use strict';
 if(window.__fiActivityTrackerV1)return;
 window.__fiActivityTrackerV1=true;
 const state={userId:null,student:null,ready:false,queue:Promise.resolve(),last:new Map(),lastView:null};
 const client=()=>window.sb||window.supabaseClient||null;
 const clean=(v,n=180)=>String(v||'').replace(/\s+/g,' ').trim().slice(0,n);
 const getLabel=el=>clean(el?.getAttribute?.('aria-label')||el?.getAttribute?.('title')||el?.innerText||el?.textContent||el?.value||el?.dataset?.action||el?.id||el?.name||'Ação',180);
 const viewName=()=>clean(window.currentView||document.body?.dataset?.view||document.querySelector('[data-page-title]')?.textContent||document.querySelector('#content h1, #content h2, main h1, main h2')?.textContent||'Plataforma',100);
 async function resolveStudent(){
   const sb=client();if(!sb?.auth)return null;
   const {data,error}=await sb.auth.getSession();if(error||!data?.session?.user?.id)return null;
   const user=data.session.user;
   if(state.userId===user.id&&state.student)return state.student;
   const {data:student,error:se}=await sb.from('tic_students').select('id,auth_user_id,teacher_id,display_name').eq('auth_user_id',user.id).maybeSingle();
   if(se||!student){state.userId=user.id;state.student=null;state.ready=false;return null;}
   state.userId=user.id;state.student=student;state.ready=true;return student;
 }
 function log(type,label,view,entityType,entityId,metadata){
   const key=[type,entityType||'',entityId||'',clean(label,80)].join('|'),now=Date.now();
   if(state.last.has(key)&&now-state.last.get(key)<1200)return state.queue;
   state.last.set(key,now);
   state.queue=state.queue.then(async()=>{
     try{
       const sb=client(),student=await resolveStudent();if(!sb||!student)return;
       const {data,error}=await sb.from('tic_student_activity_events').insert({
         student_id:student.id,auth_user_id:student.auth_user_id,
         event_type:clean(type,80)||'action',event_label:clean(label,180)||null,
         view_name:clean(view||viewName(),100)||null,
         entity_type:clean(entityType,80)||null,entity_id:clean(entityId,180)||null,
         metadata:metadata&&typeof metadata==='object'?metadata:{}
       });
       if(error)console.warn('[FI activity tracker] event not saved:',error.message);
       else window.dispatchEvent(new CustomEvent('fi:student-activity-logged',{detail:{type,label}}));
     }catch(err){console.warn('[FI activity tracker]',err);}
   });
   return state.queue;
 }
 window.fiLogStudentActivity=log;
 window.ticLogStudentEventV58=window.ticLogStudentEventV58||log;

 function elementInfo(el){
   const a=el?.closest?.('a[href]'),data=el?.dataset||{};
   const label=getLabel(el);
   let type='action_click',entityType=data.entityType||data.entityType||null,entityId=data.id||data.assignmentId||data.studentId||data.lessonId||data.activityId||null;
   if(a){
     type='resource_open';entityType='link';
     try{const u=new URL(a.href,location.href);entityId=u.origin===location.origin?u.pathname:u.hostname;}catch(_){}
   }else if(el?.closest?.('.v44-row,.v58-material-card,.iv-media-card,[data-open-video],[data-use-library]')){
     type='content_open';entityType='content';
   }
   const low=label.toLowerCase();
   if(/concluir|finalizar|complete|finish|marcar como conclu[ií]d/.test(low))type='activity_complete';
   else if(/iniciar|começar|start|tentar|responder|conferir|verificar|corrigir|submit|quiz|exerc[ií]cio|exercise/.test(low))type='assessment_attempt';
   else if(/assistir|play|vídeo|video|lesson|aula|material|recurso|abrir|visualizar/.test(low)&&type==='action_click')type='content_open';
   return {type,label,entityType,entityId,metadata:{tag:el?.tagName?.toLowerCase()||'',id:clean(el?.id,100),className:clean(typeof el?.className==='string'?el.className:'',140),href:a?(()=>{try{const u=new URL(a.href,location.href);return u.origin===location.origin?u.pathname:u.hostname}catch(_){return''}})():undefined}};
 }
 document.addEventListener('click',ev=>{
   const el=ev.target?.closest?.('button,a,[role="button"],[data-action],.v44-row,.v58-material-card,.iv-media-card,[onclick]');
   if(!el||el.closest('#v58ActivityGrid,#v62ActivityGrid,#v59ActivityGrid,[data-teacher-only="true"]'))return;
   if(el.matches('input,textarea,select')||el.closest('form')?.querySelector('input[type="password"]'))return;
   if((el.getAttribute('onclick')||'').includes('ticLogStudentEventV58'))return;
   const info=elementInfo(el);
   if(!info.label||info.label==='Ação')return;
   log(info.type,info.label,viewName(),info.entityType,info.entityId,info.metadata);
 },true);
 document.addEventListener('submit',ev=>{
   const form=ev.target;if(!(form instanceof HTMLFormElement))return;
   const label=clean(form.getAttribute('aria-label')||form.querySelector('button[type="submit"],input[type="submit"]')?.textContent||form.querySelector('button[type="submit"],input[type="submit"]')?.value||form.id||'Formulário enviado',180);
   log('form_submit',label,viewName(),'form',form.id||null,{formId:clean(form.id,100),fieldCount:form.querySelectorAll('input:not([type=password]),select,textarea').length});
 },true);
 document.addEventListener('change',ev=>{
   const el=ev.target;if(!(el instanceof HTMLInputElement||el instanceof HTMLSelectElement||el instanceof HTMLTextAreaElement))return;
   if(el.type==='password'||el.type==='email'||el.type==='tel'||el.autocomplete==='current-password'||el.autocomplete==='new-password')return;
   if(!el.closest('.quiz,.exercise,.game,[data-quiz],[data-exercise],[data-game],#content [class*="quiz"],#content [class*="exercise"],#content [class*="game"]'))return;
   log('assessment_interaction','Resposta alterada em exercício',viewName(),'assessment',el.closest('[data-quiz],[data-exercise],[data-game]')?.id||null,{control:el.tagName.toLowerCase(),controlType:clean(el.type||el.tagName,40)});
 },true);
 document.addEventListener('play',ev=>{
   const media=ev.target;if(!(media instanceof HTMLVideoElement||media instanceof HTMLAudioElement))return;
   log('media_play','Reprodução iniciada',viewName(),'media',media.currentSrc?(()=>{try{const u=new URL(media.currentSrc,location.href);return u.origin===location.origin?u.pathname:u.hostname}catch(_){return''}})():null,{mediaType:media.tagName.toLowerCase(),durationSeconds:Number.isFinite(media.duration)?Math.round(media.duration):null});
 },true);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')log('resume','Retorno à plataforma',viewName(),'session',null,{visibility:'visible'});else log('pause','Aba em segundo plano',viewName(),'session',null,{visibility:'hidden'});});
 window.addEventListener('message',ev=>{
   if(ev.origin!==location.origin||!ev.data||typeof ev.data!=='object')return;
   if(ev.data.type==='iv-student-activity')log(clean(ev.data.eventType||'video_activity',80),clean(ev.data.label||'Atividade de vídeo',180),viewName(),clean(ev.data.entityType||'video',80),clean(ev.data.entityId||'',180),ev.data.metadata||{});
 });
 // Track SPA navigation after the existing router is available.
 function hookRouter(){
   if(typeof window.loadView!=='function'||window.loadView.__fiTracked)return;
   const original=window.loadView;
   const wrapped=function(view){
     const result=original.apply(this,arguments);
     const next=clean(view||viewName(),100);
     if(next&&next!==state.lastView){state.lastView=next;log('view','Abriu a área: '+next,next,'view',next,{route:next});}
     return result;
   };
   wrapped.__fiTracked=true;window.loadView=wrapped;
 }
 hookRouter();
 document.addEventListener('DOMContentLoaded',hookRouter);
 setTimeout(hookRouter,800);setTimeout(hookRouter,2500);
 const sb=client();
 if(sb?.auth)sb.auth.onAuthStateChange((event,session)=>{
   if(!session?.user){state.userId=null;state.student=null;state.ready=false;return;}
   state.userId=null;state.student=null;resolveStudent().then(st=>{if(st)log('login','Sessão do aluno ativa',viewName(),'session',null,{source:event||'auth'});});
 });
 setTimeout(()=>resolveStudent().then(st=>{if(st)log('tracker_ready','Rastreamento de atividades ativado',viewName(),'system',null,{version:1});}),1800);
})();