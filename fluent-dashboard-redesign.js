(function(){
'use strict';
const $=s=>document.querySelector(s);
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photos={
hero:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
levels:['https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80'],
skills:['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1455390582262-044cdead802a?auto=format&fit=crop&w=500&q=80']
};
const levels=[['A0','Starter'],['A1','Elementary'],['A2','Pre-Intermediate'],['B1','Intermediate'],['B2','Upper-Intermediate'],['C1','Advanced'],['C2','Proficiency']];
function style(){
 if($('#fi2-style'))return;
 const s=document.createElement('style');s.id='fi2-style';
 s.textContent = [
'body.fi2-home{--f2-bg:#04111f;--f2-panel:#0b1c2e;--f2-line:#1d3851;--f2-text:#f5f8ff;--f2-muted:#b4c4d8;background:var(--f2-bg)!important;color:var(--f2-text)!important}',
'body.fi2-home .main>.topbar,body.fi2-home .main>.container>.page-head{display:none!important}',
'body.fi2-home .main,body.fi2-home .main>.container{background:var(--f2-bg)!important}body.fi2-home .main>.container{padding:0 18px 30px!important;overflow:visible!important}',
'body.fi2-home .sidebar{background:#061322!important;border-right:1px solid #142c41!important;box-shadow:none!important}body.fi2-home .brand{font-size:18px!important;line-height:1.05;color:#fff!important;letter-spacing:-.5px}body.fi2-home .brand:before{content:"🌐";display:inline-grid;place-items:center;float:left;margin:0 9px 0 0;width:37px;height:37px;border-radius:50%;background:linear-gradient(135deg,#10d8ff,#7b3cff,#ff3b9d);font-size:21px}body.fi2-home .brand span{color:#bd65ff!important}body.fi2-home .brand small{color:#a9bbd0!important;font-size:8px!important;letter-spacing:1.1px}',
'body.fi2-home .user{background:#0b1b2d!important;border:1px solid #17324b!important;color:#fff!important}body.fi2-home .nav-label{color:#7e99b5!important}body.fi2-home .nav button{color:#e0e9f6!important;border-radius:11px!important;margin:2px 0!important}body.fi2-home .nav button.active,body.fi2-home .nav button:hover{background:linear-gradient(105deg,#a62cff,#4a3bff)!important;color:#fff!important}',
'.fi2-top{display:flex;align-items:center;gap:14px;padding:13px 0 12px;min-width:0}.fi2-search{display:flex;align-items:center;gap:10px;max-width:490px;flex:1;background:linear-gradient(120deg,#132a40,#0d2136);border:1px solid #25415d;border-radius:12px;padding:0 14px;height:42px;color:#b6c7da}.fi2-search input{width:100%;border:0!important;outline:0!important;box-shadow:none!important;background:transparent!important;color:#fff!important;font-size:12px!important;min-width:0}.fi2-search input::placeholder{color:#b2c0d2}.fi2-top-actions{display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-left:auto;min-width:0}.fi2-user{display:flex;align-items:center;gap:9px;font-size:12px;white-space:nowrap}.fi2-avatar{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#16bde9,#8245ff);font-weight:900}',
'.fi2-home-grid{display:grid;grid-template-columns:minmax(0,1fr) 315px;gap:16px;align-items:start}.fi2-maincol,.fi2-rightcol{min-width:0}.fi2-hero{position:relative;overflow:hidden;min-height:225px;border:1px solid #23435e;border-radius:20px;margin-bottom:12px;background:#10263b}.fi2-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(90deg,#06182af5 0%,#071b2bdb 38%,#071b2b55 76%,#071b2b30 100%),url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85");background-position:center;background-size:cover}.fi2-hero-content{position:relative;padding:22px 20px;max-width:650px}.fi2-eyebrow{font-size:10px;font-weight:900;letter-spacing:1.3px;color:#f34fb0;text-transform:uppercase}.fi2-hero h1{font-size:clamp(25px,3vw,36px);line-height:1.08;letter-spacing:-1.2px;margin:8px 0;color:#fff!important}.fi2-hero h1 span{color:#ff83b8}.fi2-hero p{font-size:13px;line-height:1.5;max-width:470px;color:#e1ebf7!important;margin:0 0 12px}.fi2-pills{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:11px;color:#e4edf8;margin:10px 0}.fi2-pill{padding:4px 9px;border-radius:7px;background:#ff2869;color:#fff;font-weight:900}.fi2-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap}.fi2-btn{border:1px solid #647c96;background:#0b2034;color:#fff;border-radius:11px;padding:11px 14px;font-size:12px;font-weight:900;cursor:pointer}.fi2-btn.primary{background:linear-gradient(100deg,#ff1760,#e52f8d);border-color:transparent}.fi2-hero-progress{width:min(200px,100%);font-size:10px;color:#e4edf8}.fi2-bar{height:8px;border-radius:99px;background:#34465b;overflow:hidden;margin-top:6px}.fi2-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#17bfff,#ad49ff)}',
'.fi2-section{margin:13px 0 17px;min-width:0}.fi2-section-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}.fi2-section-head h2{font-size:16px;margin:0;color:#f5f8ff!important}.fi2-link{border:0;background:none;color:#26c9ff;font-size:11px;cursor:pointer;white-space:nowrap}',
'.fi2-levels{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}.fi2-level{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:108px;overflow:hidden;border:1px solid #24445f;border-radius:12px;padding:9px;background:#142c42;cursor:pointer;text-align:left;color:white!important}.fi2-level:before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#061523f5 0%,#071b2b4d 70%,#071b2b1a 100%),var(--f2-img);background-position:center;background-size:cover;z-index:0;transition:transform .25s}.fi2-level:hover:before{transform:scale(1.07)}.fi2-level>*{position:relative;z-index:1}.fi2-level b{font-size:22px;color:#fff!important}.fi2-level span{font-size:10px;color:#f0f5ff!important;font-weight:700}',
'.fi2-courses{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.fi2-course{min-width:0;overflow:hidden;border:1px solid #203c55;border-radius:13px;background:#0b1d30;cursor:pointer;color:#fff!important}.fi2-course-img{height:68px;background-size:cover;background-position:center;position:relative}.fi2-course-img:after{content:"";position:absolute;inset:25% 0 0;background:linear-gradient(0deg,#071523e8,transparent)}.fi2-course-body{padding:8px}.fi2-course b{display:block;font-size:11px;color:#fff!important;line-height:1.3}.fi2-course small{display:block;font-size:10px;color:#b8c9dc!important;margin-top:4px}.fi2-course-foot{display:flex;align-items:center;gap:7px;margin-top:8px}.fi2-course-foot .fi2-bar{flex:1;height:5px;margin:0}.fi2-circle{width:27px;height:27px;flex:none;border-radius:50%;border:0;background:#e7f0ff;color:#13273d;font-size:12px;cursor:pointer}',
'.fi2-games{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.fi2-game{min-width:0;min-height:76px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;text-align:center;border:0;border-radius:11px;padding:9px 4px;color:#fff!important;font-size:10px;font-weight:900;cursor:pointer;background:linear-gradient(145deg,#e52d8b,#5a24ce)}.fi2-game:nth-child(2){background:linear-gradient(145deg,#15c4ff,#3732e8)}.fi2-game:nth-child(3){background:linear-gradient(145deg,#e52a92,#7122ca)}.fi2-game:nth-child(4){background:linear-gradient(145deg,#14d7b1,#008d74)}.fi2-game:nth-child(5){background:linear-gradient(145deg,#ff9e2d,#f12d50)}.fi2-game:nth-child(6){background:linear-gradient(145deg,#13bfff,#352dff)}.fi2-game i{font-style:normal;font-size:22px}',
'.fi2-skills{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.fi2-skill{min-height:70px;border:1px solid #28465e;border-radius:12px;display:flex;align-items:center;gap:8px;padding:9px;background:#10263a;color:#fff!important;cursor:pointer;overflow:hidden;position:relative}.fi2-skill:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0a2035f5,#0a2035a6,transparent),var(--f2-img);background-size:cover;background-position:center}.fi2-skill>*{position:relative;z-index:1}.fi2-skill i{font-style:normal;font-size:20px}.fi2-skill b{display:block;font-size:11px;color:#fff!important}.fi2-skill small{display:block;font-size:9px;color:#d1dfef!important;margin-top:3px}.fi2-recommend{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.fi2-recommend .fi2-course-img{height:70px}',
'.fi2-panel{border:1px solid #1d3b55;background:linear-gradient(145deg,#0c2034,#081829);border-radius:16px;padding:11px;margin-bottom:10px;color:#f5f8ff!important;min-width:0}.fi2-panel h2{font-size:15px;margin:0;color:#f7faff!important}.fi2-panel-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}.fi2-progress-overview{display:flex;align-items:center;gap:12px;border:1px solid #1e3c56;border-radius:13px;background:#10253a;padding:12px}.fi2-ring{width:84px;height:84px;flex:none;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#11b7ff var(--fi2-pct),#253c53 0);position:relative}.fi2-ring:before{content:"";position:absolute;inset:9px;background:#10253a;border-radius:50%}.fi2-ring b{position:relative;font-size:21px;color:#fff!important}.fi2-progress-overview strong{display:block;font-size:14px;color:#fff!important}.fi2-progress-overview p{font-size:11px;line-height:1.5;color:#c4d3e4!important;margin:5px 0 0}.fi2-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;margin-top:7px}.fi2-stat{border:1px solid #1e3b55;background:#0d2135;border-radius:10px;padding:8px 3px;text-align:center;min-width:0}.fi2-stat i{font-style:normal;font-size:17px}.fi2-stat b{display:block;font-size:15px;color:#fff!important;margin:3px 0}.fi2-stat small{display:block;font-size:9px;line-height:1.25;color:#c0d0e2!important}',
'.fi2-plan-row{display:flex;align-items:center;gap:8px;padding:9px 3px;border-bottom:1px solid #1c354c;font-size:11px;color:#eef4fc!important}.fi2-plan-row:last-child{border-bottom:0}.fi2-check{width:19px;height:19px;flex:none;border-radius:50%;border:2px solid #8ca0b8;display:grid;place-items:center;color:#05271f;font-size:11px}.fi2-check.done{background:#22e4b4;border-color:#22e4b4}.fi2-plan-row small{margin-left:auto;color:#bdcde0!important;white-space:nowrap}.fi2-wide-btn{width:100%;border:0;border-radius:10px;background:linear-gradient(100deg,#8d35ff,#3e43ff);color:#fff;font-weight:900;font-size:11px;padding:12px;cursor:pointer;margin-top:9px}.fi2-upcoming{display:grid;gap:6px}.fi2-upcoming-row{display:flex;align-items:center;gap:8px;padding:7px;border:1px solid #1d3a53;border-radius:10px;background:#0d2033;color:#fff!important;cursor:pointer}.fi2-upcoming-img{width:62px;height:42px;flex:none;border-radius:7px;background-size:cover;background-position:center}.fi2-upcoming-row b{display:block;font-size:11px;color:#fff!important}.fi2-upcoming-row small{display:block;color:#c0d0e2!important;font-size:9px;margin-top:3px}.fi2-awards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.fi2-award{text-align:center;padding:9px 2px;border:1px solid #1d3b54;border-radius:10px;background:#0d2135}.fi2-award i{font-style:normal;font-size:25px}.fi2-award b{display:block;color:#fff!important;font-size:12px;margin:4px 0}.fi2-award small{font-size:9px;color:#c3d2e3!important}',
'body.fi-light.fi2-home{--f2-bg:#f2f5fb;--f2-panel:#fff;--f2-line:#dce4ef;--f2-text:#18263a;--f2-muted:#52647a;background:#f2f5fb!important;color:#18263a!important}body.fi-light.fi2-home .sidebar{background:#fff!important;border-color:#dce4ef!important}body.fi-light.fi2-home .brand,body.fi-light.fi2-home .user{color:#18263a!important}body.fi-light.fi2-home .user{background:#f7f9ff!important;border-color:#dce4ef!important}body.fi-light.fi2-home .nav button{color:#3e4f66!important}body.fi-light.fi2-home .nav button.active,body.fi-light.fi2-home .nav button:hover{color:#fff!important}body.fi-light.fi2-home .main,body.fi-light.fi2-home .main>.container{background:#f2f5fb!important}body.fi-light.fi2-home .fi2-section-head h2{color:#18263a!important}body.fi-light.fi2-home .fi2-course,body.fi-light.fi2-home .fi2-panel{background:#fff!important;border-color:#dce4ef!important;color:#18263a!important}body.fi-light.fi2-home .fi2-panel h2{color:#18263a!important}body.fi-light.fi2-home .fi2-progress-overview,body.fi-light.fi2-home .fi2-stat,body.fi-light.fi2-home .fi2-plan-row,body.fi-light.fi2-home .fi2-upcoming-row,body.fi-light.fi2-home .fi2-award{background:#f7f9ff!important;border-color:#dce4ef!important;color:#18263a!important}body.fi-light.fi2-home .fi2-progress-overview strong,body.fi-light.fi2-home .fi2-stat b,body.fi-light.fi2-home .fi2-award b,body.fi-light.fi2-home .fi2-upcoming-row b{color:#18263a!important}body.fi-light.fi2-home .fi2-progress-overview p,body.fi-light.fi2-home .fi2-stat small,body.fi-light.fi2-home .fi2-plan-row,body.fi-light.fi2-home .fi2-plan-row small,body.fi-light.fi2-home .fi2-upcoming-row small,body.fi-light.fi2-home .fi2-award small{color:#52647a!important}body.fi-light.fi2-home .fi2-ring:before{background:#fff}',
'@media(max-width:1250px){.fi2-home-grid{grid-template-columns:minmax(0,1fr) 285px}.fi2-recommend{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:1050px){.fi2-home-grid{grid-template-columns:1fr}.fi2-rightcol{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.fi2-rightcol .fi2-panel{margin:0}.fi2-levels{grid-template-columns:repeat(4,minmax(0,1fr))}.fi2-courses{grid-template-columns:repeat(2,minmax(0,1fr))}.fi2-games{grid-template-columns:repeat(3,minmax(0,1fr))}.fi2-skills{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){body.fi2-home .main>.container{padding:0 10px 22px!important}.fi2-top{flex-wrap:wrap}.fi2-search{max-width:none;flex-basis:100%;order:2}.fi2-top-actions{gap:7px}.fi2-user span:last-child{display:none}.fi2-hero-content{padding:17px}.fi2-hero{min-height:245px}.fi2-levels{grid-template-columns:repeat(2,minmax(0,1fr))}.fi2-courses,.fi2-recommend{grid-template-columns:repeat(2,minmax(0,1fr))}.fi2-games{grid-template-columns:repeat(3,minmax(0,1fr))}.fi2-rightcol{grid-template-columns:1fr}.fi2-skills{grid-template-columns:repeat(2,minmax(0,1fr))}}',
/* Shared layout fixes for every authenticated page, including teacher and student tabs. */
'html,body{min-height:100%!important;height:auto!important;overflow-y:auto!important}body.fi-premium .app{height:auto!important;min-height:100vh!important;overflow:visible!important}body.fi-premium .main{height:auto!important;min-height:100vh!important;overflow:visible!important}body.fi-premium .main>.container{height:auto!important;max-height:none!important;overflow:visible!important}body.fi-premium .topbar{position:relative!important;top:auto!important}',
'body.fi-premium:not(.fi-light) .main>.container>.page-head{position:static!important;top:auto!important;background:transparent!important;backdrop-filter:none!important;box-shadow:none!important}body.fi-premium:not(.fi-light) .main>.container>.page-head h1{color:#f7faff!important}body.fi-premium:not(.fi-light) .main>.container>.page-head p{color:#bdcde0!important}',
'body.fi-premium:not(.fi-light) #content .card,body.fi-premium:not(.fi-light) #content .stat,body.fi-premium:not(.fi-light) #content .quick,body.fi-premium:not(.fi-light) #content .row,body.fi-premium:not(.fi-light) #content .table-wrap,body.fi-premium:not(.fi-light) #content .empty{background:#0d2034!important;border-color:#29445f!important;color:#f4f7ff!important;box-shadow:0 10px 26px #0003}body.fi-premium:not(.fi-light) #content .card h1,body.fi-premium:not(.fi-light) #content .card h2,body.fi-premium:not(.fi-light) #content .card h3,body.fi-premium:not(.fi-light) #content .card b,body.fi-premium:not(.fi-light) #content .quick b,body.fi-premium:not(.fi-light) #content .row b,body.fi-premium:not(.fi-light) #content .stat-value{color:#f7faff!important}body.fi-premium:not(.fi-light) #content .card p,body.fi-premium:not(.fi-light) #content .card small,body.fi-premium:not(.fi-light) #content .row small,body.fi-premium:not(.fi-light) #content .stat-label,body.fi-premium:not(.fi-light) #content .stat-note{color:#bdcde0!important}',
'body.fi-premium:not(.fi-light) #content [style*="background:#fff"],body.fi-premium:not(.fi-light) #content [style*="background: #fff"],body.fi-premium:not(.fi-light) #content [style*="background-color:#fff"],body.fi-premium:not(.fi-light) #content [style*="background-color: #fff"]{background:#10263b!important;color:#f4f7ff!important;border-color:#29445f!important}body.fi-premium:not(.fi-light) #content [style*="color:#fff"],body.fi-premium:not(.fi-light) #content [style*="color: #fff"]{color:#f4f7ff!important}',
'body.fi-premium:not(.fi-light) .hero{background:linear-gradient(110deg,#0e2945 0%,#173b62 48%,#36245f 100%)!important;border:1px solid #31577a!important;box-shadow:0 18px 38px #0003}body.fi-premium:not(.fi-light) .quick{border-top:3px solid #7c55ff!important}body.fi-premium:not(.fi-light) .grid.stats .card{border-top:3px solid #17bfff!important}',
'body.fi-premium.fi-light .main>.container{overflow:visible!important}body.fi-premium.fi-light #content .card,body.fi-premium.fi-light #content .stat,body.fi-premium.fi-light #content .quick,body.fi-premium.fi-light #content .row,body.fi-premium.fi-light #content .table-wrap,body.fi-premium.fi-light #content .empty{background:#fff!important;border-color:#dce4ef!important;color:#17233a!important}body.fi-premium.fi-light #content .card h1,body.fi-premium.fi-light #content .card h2,body.fi-premium.fi-light #content .card h3,body.fi-premium.fi-light #content .card b,body.fi-premium.fi-light #content .quick b,body.fi-premium.fi-light #content .row b,body.fi-premium.fi-light #content .stat-value{color:#17233a!important}body.fi-premium.fi-light #content .card p,body.fi-premium.fi-light #content .card small,body.fi-premium.fi-light #content .row small,body.fi-premium.fi-light #content .stat-label,body.fi-premium.fi-light #content .stat-note{color:#52647a!important}',
'body.fi-premium.fi-light #content [style*="background:#fff"],body.fi-premium.fi-light #content [style*="background: #fff"],body.fi-premium.fi-light #content [style*="background-color:#fff"],body.fi-premium.fi-light #content [style*="background-color: #fff"]{background:#fff!important;color:#17233a!important;border-color:#dce4ef!important}',
'@media(max-width:700px){body.fi-premium .main{margin-left:0!important}body.fi-premium .main>.container{padding:18px 12px 36px!important}body.fi-premium .topbar{padding:0 12px!important}}'

,'body.fi2-home .fi2-menu-toggle{display:none;border:1px solid #3b5876;border-radius:10px;background:#122a42;color:#f5f8ff;padding:9px 11px;font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap}'
,'body.fi2-home .fi2-nav-help{font-size:10px;color:#9eb5ce;white-space:nowrap}'
,'body.fi2-home .fi2-plan-task{display:flex;align-items:center;gap:8px;background:#10263b;border:1px solid #27445f;border-radius:9px;padding:10px;color:#f5f8ff}'
,'body.fi2-home .fi2-plan-task>span:nth-child(2){flex:1;min-width:0;font-size:11px;color:#f5f8ff}'
,'body.fi2-home .fi2-plan-task>span:nth-child(2) small{display:block;color:#aebfd2;font-size:10px;margin-top:3px}'
,'body.fi2-home .fi2-plan-task>small{font-size:10px;color:#b8c9dc;white-space:nowrap}'
,'body.fi2-home .fi2-plan-task .fi2-check{display:grid;place-items:center;flex:none;width:18px;height:18px;border-radius:50%;border:1px solid #4a6a88;color:#8ee7ff}'
,'@media(max-width:900px){body.fi2-home .fi2-menu-toggle{display:inline-flex;align-items:center;justify-content:center}body.fi2-home .fi2-nav-help{display:none}body.fi2-home .fi2-top{gap:8px}body.fi2-home .fi2-search{min-width:0}body.fi2-home .fi2-top-actions{gap:6px}body.fi2-home .fi2-user>span:last-child{display:none}}'
 ].join('\n');
 document.head.appendChild(s);
}
const go=v=>{if(typeof window.loadView==='function')window.loadView(v)};
async function data(){
 let s=null,activities=[],rows=[],taskAssignments=[],tasks=[];
 try{if(typeof window.studentRecord==='function')s=await window.studentRecord()}catch(_){}
 try{if(s&&typeof sb!=='undefined'){
 const r=await Promise.all([
  sb.from('tic_immersion_activities').select('id,title,description,day_number,cefr_level,skill,estimated_minutes,cover_image_url,is_published,is_archived,sort_order').eq('teacher_id',s.teacher_id).eq('is_published',true).eq('is_archived',false).order('day_number').order('sort_order'),
  sb.from('tic_immersion_progress').select('activity_id,status,student_id').eq('student_id',s.id),
  sb.from('tic_task_assignments').select('id,assignment_id,status,active,assigned_at,completed_at').eq('student_id',s.id).eq('active',true).order('assigned_at',{ascending:false}).limit(1000)
 ]);
  if(!r[0].error)activities=r[0].data||[];
  if(!r[1].error)rows=r[1].data||[];
  if(!r[2].error)taskAssignments=r[2].data||[];
  const ids=[...new Set(taskAssignments.map(x=>x.assignment_id).filter(Boolean))];
  if(ids.length){
   const tr=await sb.from('tic_assignments').select('id,title,due_at,points,assignment_type,cefr_level,skill,task_level,active').in('id',ids);
   if(!tr.error){
    const map=new Map((tr.data||[]).map(x=>[x.id,x]));
    tasks=taskAssignments.map(x=>({...x,assignment:map.get(x.assignment_id)})).filter(x=>x.assignment&&x.assignment.active!==false);
   }
  }
 }}catch(err){console.warn('[Fluent dashboard data]',err)}
 const done={};rows.filter(x=>x.status==='completed').forEach(x=>done[x.activity_id]=true);
 activities.sort((a,b)=>levels.findIndex(x=>x[0]===a.cefr_level)-levels.findIndex(x=>x[0]===b.cefr_level)||(a.day_number||0)-(b.day_number||0)||(a.sort_order||0)-(b.sort_order||0));
 return {s,activities,done,tasks};
}
function openImmersionFilter(level,search){
 document.body.classList.remove('fi2-home');
 try{
  if(level)sessionStorage.setItem('ticImmRequestedLevel',String(level).toUpperCase());
  else sessionStorage.removeItem('ticImmRequestedLevel');
  if(search)sessionStorage.setItem('ticImmRequestedSearch',String(search));
  else sessionStorage.removeItem('ticImmRequestedSearch');
 }catch(_){}
 if(typeof window.ticImmersionPlannerOpen==='function')return window.ticImmersionPlannerOpen();
 if(typeof window.loadView==='function')return window.loadView('immersionPlanner');
}
window.fiOpenImmersionLevel=function(level){return openImmersionFilter(level,'');};
window.fiOpenCourseLevel=function(level){
 try{sessionStorage.setItem('fiRequestedCourseLevel',String(level||'').trim().toUpperCase());}catch(_){}
 if(typeof window.loadView==='function')return window.loadView('studentCourses');
};
function openImmersionActivity(id,title,level){
 try{if(id)sessionStorage.setItem('ticImmRequestedActivityId',String(id));else sessionStorage.removeItem('ticImmRequestedActivityId')}catch(_){}
 return openImmersionFilter(level||'',title||'');
}
window.fiOpenImmersionActivity=function(id,title,level){return openImmersionActivity(id,title,level)};
function course(a,d,i){
 const complete=!!d[a.id],cover=a.cover_image_url&&/^https?:/i.test(a.cover_image_url)?a.cover_image_url:photos.skills[i%4];
 const title=String(a.title||'English practice'),lev=String(a.cefr_level||'A1');
 return '<article class="fi2-course fi2-searchable" role="button" tabindex="0" data-fi2-activity data-activity-id="'+esc(a.id)+'" data-activity-title="'+esc(title)+'" data-activity-level="'+esc(lev)+'" data-search="'+esc(title+' '+lev+' '+(a.skill||''))+'"><div class="fi2-course-img" style="background-image:url('+esc(cover)+')"><span class="fi2-pill" style="position:absolute;top:7px;left:7px;z-index:2">'+esc(lev)+'</span></div><div class="fi2-course-body"><b>'+esc(title)+'</b><small>Lesson · '+esc(a.skill||'English')+'</small><div class="fi2-course-foot"><div class="fi2-bar"><i style="width:'+(complete?100:15)+'%"></i></div><small>'+(complete?'100%':'Continue')+'</small><button class="fi2-circle" type="button" data-fi2-activity-open aria-label="Open lesson">▶</button></div></div></article>';
}
function home(d){
 const s=d.s||{},a=d.activities||[],done=d.done||{},tasks=d.tasks||[],finished=a.filter(x=>done[x.id]).length,percent=a.length?Math.round(finished/a.length*100):0;
 const current=a.find(x=>!done[x.id])||a[0],currentIndex=current?Math.max(1,a.findIndex(x=>x.id===current.id)+1):0,level=String(s.current_level||current?.cefr_level||'A1').toUpperCase(),levelRows=a.filter(x=>x.cefr_level===level),levelDone=levelRows.filter(x=>done[x.id]).length;
 const name=(s.display_name||window.profile?.full_name||$('#userName')?.textContent||'Student').trim().split(/\s+/)[0];
 const levelsHtml=levels.map((x,i)=>'<button class="fi2-level" style="--f2-img:url(\''+photos.levels[i]+'\')" data-fi2-level="'+x[0]+'"><b>'+x[0]+'</b><span>'+x[1]+'</span></button>').join('');
 const active=a.filter(x=>!done[x.id]),cards=(active.slice(0,4).length?active.slice(0,4):a.slice(0,4)).map((x,i)=>course(x,done,i)).join('')||'<div class="fi2-panel">Seu professor ainda não publicou aulas nesta trilha.</div>';
 const recommended=(a.slice(4,10).length?a.slice(4,10):a.slice(0,6)).map((x,i)=>course(x,done,i+1)).join('');
 const upcoming=active.slice(0,3).map((x,i)=>'<button class="fi2-upcoming-row" data-fi2-activity-open="1" data-activity-id="'+esc(x.id)+'" data-activity-title="'+esc(x.title)+'" data-activity-level="'+esc(x.cefr_level||'A1')+'"><span class="fi2-upcoming-img" style="background-image:url(\''+esc(x.cover_image_url&&/^https?:/i.test(x.cover_image_url)?x.cover_image_url:photos.skills[i%4])+'\')"></span><span style="min-width:0;flex:1"><b>'+esc(x.title)+'</b><small><span class="fi2-pill" style="padding:2px 5px">'+esc(x.cefr_level||'A1')+'</span> · '+(Number(x.estimated_minutes)||15)+' min</small></span><span>›</span></button>').join('')||'<div class="fi2-plan-row">Nenhuma aula próxima.</div>';
 const games=[['🃏','Vocabulary Match','match'],['🏆','Grammar Challenge','grammar'],['🔤','Word Builder','builder'],['🎧','Listening Quest','listening'],['🔎','Reading Detective','reading'],['🚀','Word Sprint','speed']];
 const gameHtml=games.map(x=>'<button class="fi2-game" data-fi2-game="'+x[2]+'"><i>'+x[0]+'</i><span>'+x[1]+'</span></button>').join('');
 const skills=[['🎧','Listening','Real conversations',photos.skills[0],'listeningPractice'],['🎙️','Speaking','Record and practice',photos.skills[1],'speakingPractice'],['📗','Reading','Articles and texts',photos.skills[2],'studentLessons'],['✏️','Writing','Guided practice',photos.skills[3],'studentLessons']];
 const skillHtml=skills.map(x=>'<button class="fi2-skill" style="--f2-img:url(\''+x[3]+'\')" data-fi2-view="'+x[4]+'"><i>'+x[0]+'</i><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span></button>').join('');
 const pendingTasks=tasks.filter(t=>!['completed','graded','reviewed'].includes(String(t.status||'').toLowerCase()));const plan=pendingTasks.slice(0,4).map(t=>'<button class="fi2-plan-row fi2-plan-task" data-fi2-task="'+esc(t.id)+'" style="width:100%;text-align:left;cursor:pointer"><span class="fi2-check">'+(String(t.status||'pending').toLowerCase()==='submitted'?'✓':'•')+'</span><span>'+esc(t.assignment?.title||'Task')+'<small>'+esc(t.assignment?.skill||t.assignment?.cefr_level||'Atividade atribuída')+'</small></span><small>'+(t.assignment?.due_at?'Prazo '+new Date(t.assignment.due_at).toLocaleDateString('pt-BR'):'Sem prazo')+'</small></button>').join('')||'<div class="fi2-plan-row">Nenhuma tarefa atribuída pendente nos registros atuais.</div>';
 return '<div class="fi2-top"><button class="fi2-menu-toggle" id="fi2MenuToggle" type="button" aria-label="Abrir menu de abas">☰ Abas</button><label class="fi2-search"><span>⌕</span><input id="fi2Search" placeholder="Search for lessons, topics, games..." autocomplete="off"><span>⌕</span></label><span class="fi2-nav-help">Use o menu lateral para abrir as abas</span><div class="fi2-top-actions"><button class="fi2-btn" id="fi2Theme" type="button" title="Alternar modo claro/escuro">☼</button><div class="fi2-user"><span class="fi2-avatar">'+esc(name.slice(0,1).toUpperCase())+'</span><span><b>Hello, '+esc(name)+'!</b><br><small style="color:#9eb2c9">Keep learning</small></span></div></div></div>'+
 '<div class="fi2-home-grid"><div class="fi2-maincol"><section class="fi2-hero"><div class="fi2-hero-content"><div class="fi2-eyebrow">▶ CONTINUE LEARNING</div><div class="fi2-pills"><span class="fi2-pill">'+esc(current?.cefr_level||level)+'</span><span>'+(current?'Lesson '+currentIndex+' of '+a.length:'No published lessons yet')+'</span></div><h1>'+(current?esc(current.title).replace(/\b(Airports?)\b/i,'<span>$1</span>'):'Your English Journey')+'</h1><p>'+esc(current?.description||'Learn useful vocabulary, practice listening and build confidence speaking English.')+'</p><div class="fi2-actions"><button class="fi2-btn primary" data-fi2-activity-open="1" data-activity-id="'+esc(current?.id||'')+'" data-activity-title="'+esc(current?.title||'')+'" data-activity-level="'+esc(current?.cefr_level||level)+'">▶ Continue Lesson</button><button class="fi2-btn" data-fi2-go="studentLessons">▣ View Plan</button><div class="fi2-hero-progress">'+percent+'% completed<div class="fi2-bar"><i style="width:'+percent+'%"></i></div></div></div></div></section>'+
 '<section class="fi2-section"><div class="fi2-section-head"><h2>Explore by Level (CEFR)</h2><button class="fi2-link" data-fi2-go="studentCourses">See all levels →</button></div><div class="fi2-levels">'+levelsHtml+'</div></section>'+
 '<section class="fi2-section"><div class="fi2-section-head"><h2>Continue Where You Left Off</h2><button class="fi2-link" data-fi2-go="immersionPlanner">See all →</button></div><div class="fi2-courses">'+cards+'</div></section>'+
 '<section class="fi2-section"><div class="fi2-section-head"><h2>Games for You</h2><button class="fi2-link" data-fi2-go="games">See all games →</button></div><div class="fi2-games">'+gameHtml+'</div></section>'+
 '<section class="fi2-section"><div class="fi2-section-head"><h2>Skills Practice</h2><button class="fi2-link" data-fi2-go="learningHub">See all →</button></div><div class="fi2-skills">'+skillHtml+'</div></section>'+
 '<section class="fi2-section"><div class="fi2-section-head"><h2>Recommended for You</h2><button class="fi2-link" data-fi2-go="studentLessons">See all →</button></div><div class="fi2-recommend">'+recommended+'</div></section></div>'+
 '<aside class="fi2-rightcol"><section class="fi2-panel"><div class="fi2-panel-head"><h2>My Progress</h2><button class="fi2-link" data-fi2-go="studentProgress">See details →</button></div><div class="fi2-progress-overview"><div class="fi2-ring" style="--fi2-pct:'+percent+'%"><b>'+percent+'%</b></div><div><strong>'+esc(level)+' · '+(levels.find(x=>x[0]===level)?.[1]||'Learner')+'</strong><p>'+(percent>=70?'Strong consistency. Keep going!':percent>=35?'Keep building your skills.':'Every step counts. Keep practicing.')+'</p></div></div><div class="fi2-stat-grid"><div class="fi2-stat"><i>📗</i><b>'+finished+'</b><small>Activities completed</small></div><div class="fi2-stat"><i>🎯</i><b>'+a.length+'</b><small>Published activities</small></div><div class="fi2-stat"><i>🔥</i><b>'+levelDone+'</b><small>Completed in level</small></div><div class="fi2-stat"><i>📊</i><b>'+percent+'%</b><small>Completion</small></div></div></section>'+
 '<section class="fi2-panel"><div class="fi2-panel-head"><h2>My Tasks</h2><button class="fi2-link" data-fi2-go="studentTasks">View all →</button></div>'+plan+'<button class="fi2-wide-btn" data-fi2-go="immersionPlanner">▶ Continue Plan</button></section>'+
 '<section class="fi2-panel"><div class="fi2-panel-head"><h2>Next Lessons in Your Path</h2><button class="fi2-link" data-fi2-go="immersionPlanner">See all →</button></div><div class="fi2-upcoming">'+upcoming+'</div></section>'+
 '<section class="fi2-panel"><div class="fi2-panel-head"><h2>Achievements</h2><button class="fi2-link" data-fi2-go="studentProgress">See all →</button></div><div class="fi2-awards"><div class="fi2-award"><i>🌟</i><b>'+finished+'</b><small>Activities</small></div><div class="fi2-award"><i>🏅</i><b>'+levelDone+'</b><small>Level</small></div><div class="fi2-award"><i>📝</i><b>'+tasks.length+'</b><small>Tasks assigned</small></div><div class="fi2-award"><i>🚀</i><b>'+percent+'%</b><small>Progress</small></div></div></section></aside></div>';
}
async function render(){
 const root=$('#content');if(!root)return;const d=await data();if(!d.s)return;
 document.body.classList.add('fi2-home');const brand=$('.brand');if(brand)brand.innerHTML='FLUENT <span>IMMERSION</span><small>ENGLISH FOR A BRIGHTER FUTURE</small>';
 // Preserve the complete student navigation and original tab names; the redesign changes presentation only.
 root.innerHTML=home(d);
 const old=$('#fiThemeToggle'),btn=$('#fi2Theme');if(btn){btn.textContent=document.body.classList.contains('fi-light')?'☾':'☼';btn.addEventListener('click',()=>{if(old)old.click();else{document.body.classList.toggle('fi-light');try{localStorage.setItem('fiDashboardTheme',document.body.classList.contains('fi-light')?'light':'dark')}catch(_){}}btn.textContent=document.body.classList.contains('fi-light')?'☾':'☼'})}
 const search=$('#fi2Search');if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.fi2-searchable').forEach(el=>el.style.display=!q||el.dataset.search.toLowerCase().includes(q)?'':'none')});
 const menu=$('#fi2MenuToggle');if(menu)menu.addEventListener('click',()=>{if(typeof window.toggleMobile==='function')window.toggleMobile(true);else{const side=$('#sidebar'),overlay=$('#mobileOverlay');if(side)side.classList.add('open');if(overlay)overlay.classList.add('open')}});
 document.querySelectorAll('[data-fi2-activity-open]').forEach(el=>el.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();openImmersionActivity(el.dataset.activityId||'',el.dataset.activityTitle||'',el.dataset.activityLevel||'')}));
 document.querySelectorAll('[data-fi2-task]').forEach(el=>el.addEventListener('click',()=>{if(typeof window.openStudentTask==='function')window.openStudentTask(el.dataset.fi2Task);else if(typeof window.openStudentTaskViewer==='function')window.openStudentTaskViewer(el.dataset.fi2Task)}));

 document.querySelectorAll('[data-fi2-level]').forEach(b=>b.addEventListener('click',()=>window.fiOpenCourseLevel?window.fiOpenCourseLevel(b.dataset.fi2Level):window.loadView('studentCourses')));
 document.querySelectorAll('.fi2-course').forEach(card=>{
  card.addEventListener('click',ev=>{
   ev.preventDefault();ev.stopImmediatePropagation();
   const title=card.dataset.activityTitle||card.querySelector('.fi2-course-body>b')?.textContent||'';
   const level=card.dataset.activityLevel||card.querySelector('.fi2-pill')?.textContent||'';
   openImmersionActivity(card.dataset.activityId||'',title,level);
  },true);
  card.addEventListener('keydown',ev=>{
   if(ev.key==='Enter'||ev.key===' '){
    ev.preventDefault();
    const title=card.dataset.activityTitle||card.querySelector('.fi2-course-body>b')?.textContent||'';
    const level=card.dataset.activityLevel||card.querySelector('.fi2-pill')?.textContent||'';
    openImmersionActivity(card.dataset.activityId||'',title,level);
   }
  });
 });
 document.querySelectorAll('[data-fi2-game]').forEach(b=>b.addEventListener('click',()=>{try{sessionStorage.setItem('ticRequestedGame',b.dataset.fi2Game)}catch(_){}go('games')}));
 document.querySelectorAll('[data-fi2-view]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.fi2View)));
 document.querySelectorAll('[data-fi2-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.fi2Go)));
}
function init(){
 style();
 const baseLoad=window.loadView;
 if(typeof baseLoad==='function'&&!baseLoad.__fi2RouteWrapped){
  const route=async function(v){if(v!=='student')document.body.classList.remove('fi2-home');return baseLoad.apply(this,arguments)};
  route.__fi2RouteWrapped=true;window.loadView=route;
 }
 // Clear the redesigned home only when another tab is selected. The student home itself
 // is rendered before the legacy dashboard, preventing a flash of the old layout.
 document.addEventListener('click',ev=>{
  const b=ev.target.closest('#teacherNav [data-view]');
  if(!b)return;
  if(b.dataset.view!=='student')document.body.classList.remove('fi2-home');
 },true);
 const original=window.studentDashboard;
 if(typeof original==='function'&&!original.__fi2Wrapped){
  const wrapped=async function(){
   document.body.classList.remove('fi2-home');
   const root=$('#content');
   if(root)root.innerHTML='<div class="fi2-loading" role="status" style="padding:24px;color:#c3d5e8">Carregando seu painel de aprendizagem…</div>';
   try{
    await render();
    if(document.body.classList.contains('fi2-home'))return;
   }catch(e){console.warn('[Fluent dashboard]',e)}
   await original.apply(this,arguments);
   try{await render()}catch(e){console.warn('[Fluent dashboard fallback]',e)}
  };
  wrapped.__fi2Wrapped=true;
  window.studentDashboard=wrapped;
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();