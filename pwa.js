(function(){
 'use strict';
 var deferredPrompt=null;
 var isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
 function addInstallButton(){
  if(document.getElementById('tpInstallAppBtn')||isStandalone)return;
  var btn=document.createElement('button');
  btn.id='tpInstallAppBtn';btn.type='button';btn.setAttribute('aria-label','Instalar Teacher Plataforma como aplicativo');
  btn.innerHTML='<span aria-hidden="true">⬇</span><span>Instalar app</span>';
  btn.style.cssText='position:fixed;right:18px;bottom:82px;z-index:99990;display:flex;align-items:center;gap:8px;padding:12px 16px;border:0;border-radius:999px;background:#6d4aff;color:#fff;font:700 14px system-ui,sans-serif;box-shadow:0 8px 24px #3b247744;cursor:pointer';
  btn.addEventListener('click',async function(){
   if(deferredPrompt){
    deferredPrompt.prompt();
    try{await deferredPrompt.userChoice;}catch(_){}
    deferredPrompt=null;
    btn.hidden=true;
    return;
   }
   var ua=navigator.userAgent||'';
   var ios=/iphone|ipad|ipod/i.test(ua);
   var android=/android/i.test(ua);
   var msg=ios
    ?'Para instalar no iPhone/iPad: toque em Compartilhar no Safari e escolha “Adicionar à Tela de Início”.'
    :android
     ?'No Android: abra o menu ⋮ do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”. Se a opção não aparecer, atualize a página e tente novamente.'
     :'No celular, abra o menu de compartilhamento ou do navegador e escolha “Adicionar à tela inicial” ou “Instalar app”. No computador, procure o ícone de instalação na barra de endereço.';
   window.alert(msg);
  });
  document.body.appendChild(btn);
  window.addEventListener('beforeinstallprompt',function(ev){ev.preventDefault();deferredPrompt=ev;btn.hidden=false;});
  window.addEventListener('appinstalled',function(){btn.hidden=true;deferredPrompt=null;});
 }
 function addUpdateButton(){
  if(document.getElementById('tpUpdateAppBtn'))return;
  var btn=document.createElement('button');
  btn.id='tpUpdateAppBtn';btn.type='button';btn.setAttribute('aria-label','Verificar atualizações da Teacher Plataforma');
  btn.title='Verificar e carregar a versão mais recente';
  btn.innerHTML='<span aria-hidden="true">↻</span><span>Atualizar</span>';
  btn.style.cssText='position:fixed;right:18px;bottom:18px;z-index:99989;display:flex;align-items:center;gap:7px;padding:9px 12px;border:1px solid #38516d;border-radius:999px;background:#10243a;color:#f4f7ff;font:700 12px system-ui,sans-serif;box-shadow:0 6px 18px #0003;cursor:pointer';
  btn.addEventListener('click',async function(){
   btn.disabled=true;btn.innerHTML='<span aria-hidden="true">↻</span><span>Atualizando…</span>';
   try{if('serviceWorker' in navigator){var reg=await navigator.serviceWorker.getRegistration('./');if(reg)await reg.update();}}catch(err){console.warn('PWA update check:',err)}
   setTimeout(function(){window.location.reload()},500);
  });
  document.body.appendChild(btn);
 }
 function registerSW(){
  if(!('serviceWorker' in navigator)||!/^https?:$/.test(location.protocol))return;
  window.addEventListener('load',function(){
   navigator.serviceWorker.register('./service-worker.js',{scope:'./'}).catch(function(err){console.warn('PWA: não foi possível registrar o service worker.',err);});
  },{once:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){addInstallButton();addUpdateButton()},{once:true});else{addInstallButton();addUpdateButton()}
 registerSW();
})();