(function(){
'use strict';
const $=s=>document.querySelector(s);
const escFI=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function addStyle(){
 if($('#fiPremiumDashboardStyle'))return;
 const st=document.createElement('style');st.id='fiPremiumDashboardStyle';
 st.textContent=String.raw`
 :root{--fi-bg:#071321;--fi-panel:#0d1d30;--fi-panel2:#11263d;--fi-line:#21364e;--fi-text:#f4f7ff;--fi-muted:#a8b8cc;--fi-pink:#ff2878;--fi-purple:#8554ff;--fi-blue:#20b7ff;--fi-green:#28d6a2}
 body.fi-premium{background:var(--fi-bg)!important;color:var(--fi-text)!important}
 body.fi-premium .sidebar{background:#081525!important;border-right:1px solid var(--fi-line)!important}
 body.fi-premium .brand{color:#fff!important}body.fi-premium .brand span{color:#a879ff}
 body.fi-premium .user,body.fi-premium .topbar{background:#0a1929!important;border-color:var(--fi-line)!important;color:var(--fi-text)!important}
 body.fi-premium .nav button{color:#bdc9d9!important;border-radius:11px!important;margin:2px 0}
 body.fi-premium .nav button.active,body.fi-premium .nav button:hover{background:linear-gradient(100deg,#5534d8,#8b4be9)!important;color:white!important}
 body.fi-premium .nav-label,body.fi-premium .crumb,body.fi-premium .page-head p{color:#91a5bc!important}
 body.fi-premium .main,body.fi-premium .container{background:var(--fi-bg)!important}
 body.fi-premium .page-head h1{color:#f8faff!important;font-size:clamp(25px,3vw,34px)!important;letter-spacing:-.8px}
 body.fi-premium .card,body.fi-premium .stat,body.fi-premium .quick,body.fi-premium .modal-card,body.fi-premium .table-wrap,body.fi-premium .empty{background:var(--fi-panel)!important;border-color:var(--fi-line)!important;color:var(--fi-text)!important;box-shadow:0 10px 28px #0002}
 body.fi-premium .card h2,body.fi-premium .card h3,body.fi-premium .card b,body.fi-premium .row b,body.fi-premium .stat-value{color:#f7f9ff}
 body.fi-premium .card p,body.fi-premium .card small,body.fi-premium .stat-note,body.fi-premium .row small{color:var(--fi-muted)!important}
 body.fi-premium .hero,body.fi-premium .student-banner{background:linear-gradient(110deg,#152c4b 0%,#38256d 52%,#842b77 100%)!important;border:1px solid #3d477b!important;border-radius:20px!important;color:#fff!important;box-shadow:0 18px 40px #0003}
 body.fi-premium .hero h2,body.fi-premium .student-banner h2{font-size:clamp(26px,3vw,38px)!important;color:#fff!important;letter-spacing:-1px}
 body.fi-premium .progress{background:#24354b!important;border-radius:99px!important;overflow:hidden}
 body.fi-premium .progress i{background:linear-gradient(90deg,#18c8ff,#8159ff,#ff3e93)!important;border-radius:99px!important}
 body.fi-premium .btn.primary,body.fi-premium .btn:not(.secondary):not(.ghost){background:linear-gradient(100deg,#ff2878,#c32fff)!important;border:0!important;color:#fff!important}
 body.fi-premium .btn.secondary,body.fi-premium .btn.ghost{background:#142a42!important;border:1px solid #314967!important;color:#e7efff!important}
 body.fi-premium input,body.fi-premium select,body.fi-premium textarea{background:#0b1b2c!important;border-color:#2b4058!important;color:#f4f7ff!important}
 body.fi-premium .row,body.fi-premium .section-head{border-color:var(--fi-line)!important}
 body.fi-premium .badge{background:#283b59!important;color:#e9e9ff!important}
 body.fi-premium .fi-student-hero{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:18px;align-items:center;position:relative;overflow:hidden;margin-bottom:18px;padding:26px;border-radius:22px;background:radial-gradient(circle at 80% 20%,#304f91 0,transparent 35%),linear-gradient(115deg,#102642,#211c4b 58%,#482153);border:1px solid #35466c;min-height:190px}
 body.fi-premium .fi-kicker{font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#62d9ff;font-weight:900}
 body.fi-premium .fi-student-hero h2{font-size:clamp(25px,3vw,39px);line-height:1.1;letter-spacing:-1px;margin:10px 0;color:white}
 body.fi-premium .fi-student-hero p{color:#c4d4ea;max-width:600px;margin:0 0 14px}
 body.fi-premium .fi-hero-art{font-size:100px;text-align:center;filter:drop-shadow(0 12px 22px #0005)}
 body.fi-premium .fi-action{border:0;border-radius:11px;padding:11px 16px;background:linear-gradient(100deg,#ff2878,#a947ff);color:white;font-weight:800}
 body.fi-premium .fi-home-section{margin:20px 0}
 body.fi-premium .fi-section-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:0 0 10px}
 body.fi-premium .fi-section-head h3{margin:0;color:#f6f8ff;font-size:17px}
 body.fi-premium .fi-level-row,body.fi-premium .fi-shortcut-row{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}
 body.fi-premium .fi-level-card{min-height:112px;border:1px solid #31486a;border-radius:13px;padding:13px;color:white;text-align:left;background:linear-gradient(145deg,#172d49,#101e32);cursor:pointer;transition:transform .18s,border-color .18s;overflow:hidden}
 body.fi-premium .fi-level-card:nth-child(3n+1){background:linear-gradient(145deg,#173b58,#15223d)}body.fi-premium .fi-level-card:nth-child(3n+2){background:linear-gradient(145deg,#32255f,#17233e)}body.fi-premium .fi-level-card:nth-child(3n){background:linear-gradient(145deg,#4b2454,#19223d)}
 body.fi-premium .fi-level-card:hover,body.fi-premium .fi-shortcut:hover{transform:translateY(-3px);border-color:#9b78ff}
 body.fi-premium .fi-level-card b{display:block;font-size:26px;color:white}body.fi-premium .fi-level-card span{display:block;font-size:11px;color:#c1cde0}
 body.fi-premium .fi-shortcut-row{grid-template-columns:repeat(4,minmax(0,1fr))}
 body.fi-premium .fi-shortcut{display:flex;align-items:center;gap:11px;padding:15px;border:1px solid var(--fi-line);border-radius:13px;background:var(--fi-panel);color:white;text-align:left;cursor:pointer;min-width:0}
 body.fi-premium .fi-shortcut i{font-style:normal;font-size:24px}body.fi-premium .fi-shortcut b{display:block;font-size:13px}body.fi-premium .fi-shortcut small{display:block;color:var(--fi-muted);font-size:11px}
 body.fi-premium .fi-note{padding:15px;border:1px solid #29435d;border-radius:14px;background:#0c2032;color:#aebed1;font-size:12px}
 body.fi-premium .fi-existing-dashboard{margin-top:18px}
 body.fi-premium .quick-grid .quick{border-top:3px solid #8458ff!important}
 body.fi-premium .grid.stats .card:nth-child(4n+1){border-top:3px solid #28bfff!important}body.fi-premium .grid.stats .card:nth-child(4n+2){border-top:3px solid #8d61ff!important}body.fi-premium .grid.stats .card:nth-child(4n+3){border-top:3px solid #26d7a1!important}body.fi-premium .grid.stats .card:nth-child(4n){border-top:3px solid #ff4c91!important}
 @media(max-width:1050px){body.fi-premium .fi-level-row{grid-template-columns:repeat(4,minmax(0,1fr))}body.fi-premium .fi-student-hero{grid-template-columns:1fr 130px}}
 @media(max-width:700px){body.fi-premium .fi-student-hero{grid-template-columns:1fr;padding:20px}body.fi-premium .fi-hero-art{display:none}body.fi-premium .fi-level-row{grid-template-columns:repeat(2,minmax(0,1fr))}body.fi-premium .fi-shortcut-row{grid-template-columns:repeat(2,minmax(0,1fr))}body.fi-premium .fi-level-card{min-height:92px}}
 /* Light mode: user-controlled theme, retaining the same premium identity */
 body.fi-premium.fi-light{--fi-bg:#f3f5fb;--fi-panel:#ffffff;--fi-panel2:#f8f9ff;--fi-line:#e0e5f0;--fi-text:#17233a;--fi-muted:#64748b;color:var(--fi-text)!important;background:var(--fi-bg)!important}
 body.fi-premium.fi-light .sidebar,body.fi-premium.fi-light .topbar{background:#fff!important;border-color:#e2e6f0!important;color:#17233a!important}
 body.fi-premium.fi-light .brand,body.fi-premium.fi-light .page-head h1,body.fi-premium.fi-light .card h2,body.fi-premium.fi-light .card h3,body.fi-premium.fi-light .card b,body.fi-premium.fi-light .row b{color:#17233a!important}
 body.fi-premium.fi-light .main,body.fi-premium.fi-light .container{background:#f3f5fb!important}
 body.fi-premium.fi-light .user,body.fi-premium.fi-light .card,body.fi-premium.fi-light .stat,body.fi-premium.fi-light .quick,body.fi-premium.fi-light .table-wrap,body.fi-premium.fi-light .empty{background:#fff!important;border-color:#e0e5f0!important;color:#17233a!important;box-shadow:0 8px 24px #23395b0b}
 body.fi-premium.fi-light .nav button{color:#53627a!important}body.fi-premium.fi-light .nav button.active,body.fi-premium.fi-light .nav button:hover{color:#fff!important}
 body.fi-premium.fi-light .nav-label,body.fi-premium.fi-light .crumb,body.fi-premium.fi-light .page-head p,body.fi-premium.fi-light .card p,body.fi-premium.fi-light .card small,body.fi-premium.fi-light .row small{color:#64748b!important}
 body.fi-premium.fi-light input,body.fi-premium.fi-light select,body.fi-premium.fi-light textarea{background:#fff!important;border-color:#d8dfeb!important;color:#17233a!important}
 body.fi-premium.fi-light .fi-level-card{background:linear-gradient(145deg,#fff,#edf2ff)!important;border-color:#dce3f3;color:#17233a}
 body.fi-premium.fi-light .fi-level-card b{color:#31245f}body.fi-premium.fi-light .fi-level-card span{color:#58657c}
 body.fi-premium.fi-light .fi-shortcut{background:#fff!important;border-color:#e0e5f0!important;color:#17233a!important}
 body.fi-premium.fi-light .fi-shortcut small{color:#64748b!important}
 body.fi-premium.fi-light .fi-note{background:#fff;border-color:#e0e5f0;color:#53627a}
 body.fi-premium .fi-theme-toggle{border:1px solid #49617e;border-radius:999px;background:#10243a;color:#fff;padding:8px 12px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap}
 body.fi-premium.fi-light .fi-theme-toggle{background:#f0edff;border-color:#d8cdfc;color:#5630b7}
 
 /* Accessibility + page flow refinement for the student Lessons view. */
 body.fi-premium:not(.fi-light) .main>.container>.page-head{
   position:static!important;top:auto!important;z-index:auto!important;
   background:transparent!important;background-color:transparent!important;
   backdrop-filter:none!important;-webkit-backdrop-filter:none!important;
   color:#f4f7ff!important;border-radius:0!important;
   box-shadow:none!important;margin:0 0 18px!important;
 }
 body.fi-premium:not(.fi-light) .main>.container>.page-head h1,
 body.fi-premium:not(.fi-light) .main>.container>.page-head h2{color:#f7faff!important}
 body.fi-premium:not(.fi-light) .main>.container>.page-head p{color:#b7c7dc!important}
 body.fi-premium:not(.fi-light) .main>.container .card,
 body.fi-premium:not(.fi-light) .main>.container article.card,
 body.fi-premium:not(.fi-light) .main>.container .empty{
   background-color:#0d1d30!important;border-color:#2a4059!important;color:#f2f6ff!important
 }
 body.fi-premium:not(.fi-light) .main>.container button.row,
 body.fi-premium:not(.fi-light) .main>.container .row[style*="background:#fff"],
 body.fi-premium:not(.fi-light) .main>.container .row[style*="background: #fff"]{
   background:#12263c!important;border-color:#304761!important;color:#f2f6ff!important
 }
 body.fi-premium:not(.fi-light) .main>.container .row b,
 body.fi-premium:not(.fi-light) .main>.container .card h1,
 body.fi-premium:not(.fi-light) .main>.container .card h2,
 body.fi-premium:not(.fi-light) .main>.container .card h3,
 body.fi-premium:not(.fi-light) .main>.container .row strong{color:#f7faff!important}
 body.fi-premium:not(.fi-light) .main>.container .card p,
 body.fi-premium:not(.fi-light) .main>.container .card small,
 body.fi-premium:not(.fi-light) .main>.container .row small,
 body.fi-premium:not(.fi-light) .main>.container .card label{color:#c0cfe2!important}
 body.fi-premium:not(.fi-light) .main>.container .notice.success{
   background:#10372f!important;border-color:#1e806c!important;color:#d7fff3!important
 }
 body.fi-premium:not(.fi-light) .main>.container .badge.gray{
   background:#253b55!important;color:#edf4ff!important
 }
 body.fi-premium.fi-light .main>.container>.page-head{
   position:static!important;top:auto!important;background:transparent!important;
   backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important
 }
 body.fi-premium.fi-light .main>.container>.page-head h1{color:#17233a!important}
 body.fi-premium.fi-light .main>.container>.page-head p{color:#64748b!important}

 /* Consistent, accessible styling for ALL student and teacher tabs. */
 html,body{height:auto!important;min-height:100%!important;overflow-y:auto!important}
 body.fi-premium,body.fi-premium .app,body.fi-premium .main,body.fi-premium .main>.container{height:auto!important;max-height:none!important;overflow:visible!important}
 body.fi-premium .main>.container>.page-head{position:static!important;top:auto!important;z-index:auto!important;background:transparent!important;background-color:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;border:0!important;border-radius:0!important;padding:0!important;margin:0 0 20px!important}
 body.fi-premium .main>.container>.page-head h1{font-size:clamp(27px,3vw,36px)!important;font-weight:850!important;letter-spacing:-.8px!important}
 body.fi-premium:not(.fi-light) .main>.container>.page-head h1{color:#f7faff!important}
 body.fi-premium:not(.fi-light) .main>.container>.page-head p{color:#b9c9dc!important}
 body.fi-premium:not(.fi-light) #content .card,
 body.fi-premium:not(.fi-light) #content .stat,
 body.fi-premium:not(.fi-light) #content .quick,
 body.fi-premium:not(.fi-light) #content .row,
 body.fi-premium:not(.fi-light) #content .table-wrap,
 body.fi-premium:not(.fi-light) #content .empty,
 body.fi-premium:not(.fi-light) #content .section-head,
 body.fi-premium:not(.fi-light) #content .attention{background-color:#0d2034!important;border-color:#29445f!important;color:#f4f7ff!important;box-shadow:0 10px 28px #0002}
 body.fi-premium:not(.fi-light) #content .card *,
 body.fi-premium:not(.fi-light) #content .quick *,
 body.fi-premium:not(.fi-light) #content .row *,
 body.fi-premium:not(.fi-light) #content .section-head *,
 body.fi-premium:not(.fi-light) #content .empty *{color:#f0f6ff!important}
 body.fi-premium:not(.fi-light) #content .card p,
 body.fi-premium:not(.fi-light) #content .card small,
 body.fi-premium:not(.fi-light) #content .quick small,
 body.fi-premium:not(.fi-light) #content .row small,
 body.fi-premium:not(.fi-light) #content .stat-label,
 body.fi-premium:not(.fi-light) #content .stat-note{color:#b9c9dc!important}
 body.fi-premium:not(.fi-light) #content .progress{background:#2b4057!important}
 body.fi-premium:not(.fi-light) #content .hero{background:linear-gradient(115deg,#102944 0%,#1b3c65 52%,#43245f 100%)!important;border:1px solid #36577b!important;color:#fff!important}
 body.fi-premium:not(.fi-light) #content .hero *{color:#f7faff!important}
 body.fi-premium:not(.fi-light) #content .quick{border-top:3px solid #8554ff!important;border-radius:15px!important;transition:transform .18s,border-color .18s}
 body.fi-premium:not(.fi-light) #content .quick:hover{transform:translateY(-2px);border-color:#20b7ff!important}
 body.fi-premium:not(.fi-light) #content .table th{color:#a8bdd3!important;border-color:#29445f!important}
 body.fi-premium:not(.fi-light) #content .table td{color:#edf4ff!important;border-color:#29445f!important}
 body.fi-premium:not(.fi-light) #content input,
 body.fi-premium:not(.fi-light) #content select,
 body.fi-premium:not(.fi-light) #content textarea{background:#081a2b!important;color:#f4f7ff!important;border-color:#38516b!important}
 body.fi-premium.fi-light .main>.container>.page-head h1{color:#17233a!important} body.fi-premium.fi-light .main>.container>.page-head p{color:#64748b!important}
 body.fi-premium.fi-light #content .card,
 body.fi-premium.fi-light #content .stat,
 body.fi-premium.fi-light #content .quick,
 body.fi-premium.fi-light #content .row,
 body.fi-premium.fi-light #content .table-wrap,
 body.fi-premium.fi-light #content .empty,
 body.fi-premium.fi-light #content .section-head,
 body.fi-premium.fi-light #content .attention{background-color:#fff!important;border-color:#dce4ef!important;color:#17233a!important;box-shadow:0 8px 24px #23395b0b}
 body.fi-premium.fi-light #content .card *,
 body.fi-premium.fi-light #content .quick *,
 body.fi-premium.fi-light #content .row *,
 body.fi-premium.fi-light #content .section-head *,
 body.fi-premium.fi-light #content .empty *{color:#17233a!important}
 body.fi-premium.fi-light #content .card p,
 body.fi-premium.fi-light #content .card small,
 body.fi-premium.fi-light #content .quick small,
 body.fi-premium.fi-light #content .row small,
 body.fi-premium.fi-light #content .stat-label,
 body.fi-premium.fi-light #content .stat-note{color:#586a80!important}
 body.fi-premium.fi-light #content .hero{background:linear-gradient(115deg,#4d2bad 0%,#6840d0 55%,#8b3f9e 100%)!important;border:1px solid #7556d5!important;color:#fff!important}
 body.fi-premium.fi-light #content .hero *{color:#fff!important}
 body.fi-premium.fi-light #content .table th{color:#64748b!important}
 body.fi-premium.fi-light #content .table td{color:#24334a!important}
 body.fi-premium.fi-light #content input,
 body.fi-premium.fi-light #content select,
 body.fi-premium.fi-light #content textarea{background:#fff!important;color:#17233a!important;border-color:#d3ddeb!important}
 body.fi-premium .topbar{position:relative!important;top:auto!important}
 @media(max-width:700px){body.fi-premium .main{margin-left:0!important}body.fi-premium .main>.container{padding:18px 12px 38px!important}body.fi-premium .topbar{padding:0 12px!important}}


 /* Deep contrast fixes for lesson curriculum rows and inline-styled cards. */
 body.fi-premium:not(.fi-light) #content .curriculum-panel,
 body.fi-premium:not(.fi-light) #content .curriculum-lesson,
 body.fi-premium:not(.fi-light) #content .module-block,
 body.fi-premium:not(.fi-light) #content .module-title,
 body.fi-premium:not(.fi-light) #content .course-top,
 body.fi-premium:not(.fi-light) #content .course-empty,
 body.fi-premium:not(.fi-light) #content .lesson-copy,
 body.fi-premium:not(.fi-light) #content .lesson-number,
 body.fi-premium:not(.fi-light) #content .module-lessons,
 body.fi-premium:not(.fi-light) #content .notice,
 body.fi-premium:not(.fi-light) #content .resource-row,
 body.fi-premium:not(.fi-light) #content .resource-card{
   background:#10263b!important;background-color:#10263b!important;color:#f4f7ff!important;border-color:#2b4966!important
 }
 body.fi-premium:not(.fi-light) #content .curriculum-panel *,
 body.fi-premium:not(.fi-light) #content .curriculum-lesson *,
 body.fi-premium:not(.fi-light) #content .module-block *,
 body.fi-premium:not(.fi-light) #content .module-title *,
 body.fi-premium:not(.fi-light) #content .course-top *,
 body.fi-premium:not(.fi-light) #content .course-empty *,
 body.fi-premium:not(.fi-light) #content .lesson-copy *,
 body.fi-premium:not(.fi-light) #content .module-lessons *,
 body.fi-premium:not(.fi-light) #content .notice *,
 body.fi-premium:not(.fi-light) #content .resource-row *,
 body.fi-premium:not(.fi-light) #content .resource-card *{color:#f2f7ff!important}
 body.fi-premium:not(.fi-light) #content .curriculum-lesson small,
 body.fi-premium:not(.fi-light) #content .lesson-copy small,
 body.fi-premium:not(.fi-light) #content .module-title small,
 body.fi-premium:not(.fi-light) #content .course-top p,
 body.fi-premium:not(.fi-light) #content .notice{color:#c3d2e4!important}
 body.fi-premium:not(.fi-light) #content .curriculum-lesson .lesson-number{background:#273d63!important;color:#d8caff!important;border:1px solid #4c4383!important}
 body.fi-premium:not(.fi-light) #content .curriculum-lesson button,
 body.fi-premium:not(.fi-light) #content .curriculum-lesson .btn{background:#6845d8!important;color:#fff!important;border-color:#8b6af1!important}
 body.fi-premium.fi-light #content .curriculum-panel,
 body.fi-premium.fi-light #content .curriculum-lesson,
 body.fi-premium.fi-light #content .module-block,
 body.fi-premium.fi-light #content .module-title,
 body.fi-premium.fi-light #content .course-top,
 body.fi-premium.fi-light #content .course-empty,
 body.fi-premium.fi-light #content .lesson-copy,
 body.fi-premium.fi-light #content .lesson-number,
 body.fi-premium.fi-light #content .module-lessons,
 body.fi-premium.fi-light #content .notice,
 body.fi-premium.fi-light #content .resource-row,
 body.fi-premium.fi-light #content .resource-card{background:#fff!important;background-color:#fff!important;color:#17233a!important;border-color:#dce4ef!important}
 body.fi-premium.fi-light #content .curriculum-panel *,
 body.fi-premium.fi-light #content .curriculum-lesson *,
 body.fi-premium.fi-light #content .module-block *,
 body.fi-premium.fi-light #content .module-title *,
 body.fi-premium.fi-light #content .course-top *,
 body.fi-premium.fi-light #content .course-empty *,
 body.fi-premium.fi-light #content .lesson-copy *,
 body.fi-premium.fi-light #content .module-lessons *,
 body.fi-premium.fi-light #content .notice *,
 body.fi-premium.fi-light #content .resource-row *,
 body.fi-premium.fi-light #content .resource-card *{color:#17233a!important}
 body.fi-premium.fi-light #content .curriculum-lesson small,
 body.fi-premium.fi-light #content .lesson-copy small,
 body.fi-premium.fi-light #content .module-title small,
 body.fi-premium.fi-light #content .course-top p{color:#596b81!important}
 body.fi-premium.fi-light #content .curriculum-lesson .lesson-number{background:#eee8ff!important;color:#5634b6!important}
 body.fi-premium.fi-light #content .curriculum-lesson button,
 body.fi-premium.fi-light #content .curriculum-lesson .btn{background:#6845d8!important;color:#fff!important;border-color:#6845d8!important}
 /* Remove floating controls that cover content; keep Teacher IA available in the top bar. */
 #ticTaskFab,#tpInstallAppBtn{display:none!important;visibility:hidden!important;pointer-events:none!important}
 #teacherIAFab{position:static!important;inset:auto!important;margin:0 0 0 8px!important;padding:9px 12px!important;font-size:12px!important;box-shadow:none!important;white-space:nowrap!important;flex:none!important}
 @media(max-width:700px){#teacherIAFab{padding:8px!important;font-size:11px!important}}

 

 /* Readability patch for student curriculum cards and action buttons in both themes. */
 body.fi-premium #content .student-curriculum-item {
   background:#ffffff!important;
   color:#17233a!important;
   border-bottom-color:#e1e7f0!important;
 }
 body.fi-premium #content .student-curriculum-item .lesson-copy b,
 body.fi-premium #content .student-curriculum-item .lesson-copy strong {
   color:#17233a!important;
   -webkit-text-fill-color:#17233a!important;
   font-weight:800!important;
 }
 body.fi-premium #content .student-curriculum-item .lesson-copy small {
   color:#52647b!important;
   -webkit-text-fill-color:#52647b!important;
 }
 body.fi-premium #content .student-curriculum-item .lesson-number {
   background:#eee8ff!important;
   color:#5634b6!important;
   -webkit-text-fill-color:#5634b6!important;
 }
 body.fi-premium #content button.btn.primary,
 body.fi-premium #content a.btn.primary,
 body.fi-premium #content .btn.primary,
 body.fi-premium #content button[class~="primary"] {
   background:#5634c8!important;
   background-image:linear-gradient(120deg,#6845d8,#5634c8)!important;
   color:#ffffff!important;
   -webkit-text-fill-color:#ffffff!important;
   border:1px solid #5634c8!important;
   font-weight:800!important;
 }
 body.fi-premium #content button.btn.secondary,
 body.fi-premium #content a.btn.secondary,
 body.fi-premium #content .btn.secondary {
   background:#eee9ff!important;
   color:#49318f!important;
   -webkit-text-fill-color:#49318f!important;
   border:1px solid #d4c8ff!important;
   font-weight:800!important;
 }
 body.fi-premium #content button.btn.ghost,
 body.fi-premium #content a.btn.ghost,
 body.fi-premium #content .btn.ghost {
   background:#edf2f8!important;
   color:#26374d!important;
   -webkit-text-fill-color:#26374d!important;
   border:1px solid #cbd6e5!important;   font-weight:800!important;
 }
 body.fi-premium #content button.btn.danger,
 body.fi-premium #content .btn.danger {
   background:#b42342!important;
   color:#ffffff!important;
   -webkit-text-fill-color:#ffffff!important;
   border:1px solid #b42342!important;
 }
 body.fi-premium:not(.fi-light) #content .student-curriculum-item {
   background:#10263b!important;
   color:#f4f7ff!important;
   border-bottom-color:#2b4966!important;
 }
 body.fi-premium:not(.fi-light) #content .student-curriculum-item .lesson-copy b,
 body.fi-premium:not(.fi-light) #content .student-curriculum-item .lesson-copy strong {
   color:#ffffff!important;
   -webkit-text-fill-color:#ffffff!important;
 }
 body.fi-premium:not(.fi-light) #content .student-curriculum-item .lesson-copy small {
   color:#c1d0e2!important;
   -webkit-text-fill-color:#c1d0e2!important;
 }
 body.fi-premium:not(.fi-light) #content button.btn.ghost,
 body.fi-premium:not(.fi-light) #content a.btn.ghost,
 body.fi-premium:not(.fi-light) #content .btn.ghost {
   background:#1a3049!important;
   color:#f4f7ff!important;
   -webkit-text-fill-color:#f4f7ff!important;
   border-color:#49617b!important;
 }


 /* Mobile/tablet navigation drawer and high-contrast shared theme */
 body.fi-premium #fiMobileNavToggle{display:none}
 @media(max-width:760px){
   body.fi-premium #fiMobileNavToggle{
     display:inline-flex!important;align-items:center;justify-content:center;gap:7px;
     min-width:44px;height:42px;padding:0 12px;border-radius:12px;
     border:1px solid #6b50d9;background:#5b3bd1;color:#fff!important;
     -webkit-text-fill-color:#fff!important;font-size:20px;font-weight:900;
     box-shadow:0 4px 14px #3921a52b;flex-shrink:0;cursor:pointer
   }
   body.fi-premium .topbar>div:first-child{min-width:0;gap:8px!important}
   body.fi-premium .topbar .crumb{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
   body.fi-premium #sidebar{z-index:60!important;width:min(300px,86vw)!important;max-width:86vw!important;box-shadow:12px 0 35px #0004}
   body.fi-premium #mobileOverlay{z-index:55!important;background:rgba(3,10,22,.62)!important;backdrop-filter:blur(2px)}
   body.fi-premium #fiSidebarClose{display:flex!important}
   body.fi-premium .main{margin-left:0!important;width:100%!important;min-width:0!important}
   body.fi-premium .topbar{gap:8px!important;padding:0 10px!important}
   body.fi-premium .container{padding:16px 12px 40px!important}
   body.fi-premium .top-right{gap:5px!important}
   body.fi-premium .fi-theme-toggle{padding:8px!important;font-size:11px!important}
 }
 /* Strong, consistent contrast for buttons and text in both themes */
 body.fi-premium #content .btn.primary,
 body.fi-premium #content button.primary,
 body.fi-premium #content button[type="submit"]{
   background:#5634c8!important;background-image:linear-gradient(120deg,#6845d8,#5634c8)!important;
   color:#fff!important;-webkit-text-fill-color:#fff!important;border:1px solid #5634c8!important;
   font-weight:800!important;text-shadow:none!important
 }
 body.fi-premium #content .btn.secondary{
   background:#eee9ff!important;color:#402582!important;-webkit-text-fill-color:#402582!important;
   border:1px solid #cbbaff!important;font-weight:800!important
 }
 body.fi-premium #content .btn.ghost{
   background:#edf2f8!important;color:#26374d!important;-webkit-text-fill-color:#26374d!important;
   border:1px solid #c5d2e2!important;font-weight:800!important
 }
 body.fi-premium #content .btn.danger{
   background:#b42342!important;color:#fff!important;-webkit-text-fill-color:#fff!important;
   border:1px solid #b42342!important;font-weight:800!important
 }
 body.fi-premium.fi-light #content .card,
 body.fi-premium.fi-light #content .row,
 body.fi-premium.fi-light #content .table-wrap,
 body.fi-premium.fi-light #content article{
   color:#17233a!important
 }
 body.fi-premium.fi-light #content .card p,
 body.fi-premium.fi-light #content .card small,
 body.fi-premium.fi-light #content .row small,
 body.fi-premium.fi-light #content .stat-note{color:#53647b!important}
 body.fi-premium:not(.fi-light) #content .btn.ghost{
   background:#1b3049!important;color:#f7faff!important;-webkit-text-fill-color:#f7faff!important;
   border-color:#49617b!important
 }
 body.fi-premium:not(.fi-light) #content .btn.secondary{
   background:#30245a!important;color:#eee8ff!important;-webkit-text-fill-color:#eee8ff!important;
   border-color:#7660c9!important
 }
 body.fi-premium:not(.fi-light) #content .card p,
 body.fi-premium:not(.fi-light) #content .card small,
 body.fi-premium:not(.fi-light) #content .row small,
 body.fi-premium:not(.fi-light) #content .stat-note{color:#c4d2e4!important}


 /* Mobile navigation tabs handle: always visible on small screens. */
 #fiMobileTabsHandle{display:none}
 @media(max-width:760px){body.fi-premium #fiMobileTabsHandle{display:flex!important;position:fixed!important;top:calc(env(safe-area-inset-top,0px) + 82px)!important;left:10px!important;z-index:80!important;align-items:center!important;justify-content:center!important;gap:6px!important;min-width:58px!important;height:42px!important;padding:0 11px!important;border:1px solid #a99aff!important;border-radius:13px!important;background:#603de0!important;color:#fff!important;font-size:12px!important;font-weight:900!important;box-shadow:0 5px 18px #0005!important;cursor:pointer!important}body.fi-premium #fiMobileTabsHandle .fi-tabs-bars{font-size:20px!important;color:#fff!important}body.fi-premium #sidebar{padding-top:64px!important}}




 /* Hard fix: constrain the full dashboard content width, and show a real horizontal scrollbar. */
 body.fi-premium .main{width:calc(100% - 255px)!important;min-width:0!important;box-sizing:border-box!important}
 body.fi-premium .main>.container{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
 body.fi-premium #content{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
 body.fi-premium #content .card{min-width:0!important;max-width:100%!important;box-sizing:border-box!important}
 body.fi-premium #content .table-wrap{
   display:block!important;position:relative!important;
   width:100%!important;max-width:100%!important;min-width:0!important;
   box-sizing:border-box!important;overflow-x:scroll!important;overflow-y:hidden!important;
   overscroll-behavior-x:contain!important;-webkit-overflow-scrolling:touch!important;
   scrollbar-width:thin!important;scrollbar-color:#6845d8 #dce4ef!important;
   padding-bottom:4px!important
 }
 body.fi-premium #content .table-wrap>.table{
   display:table!important;width:max-content!important;min-width:1000px!important;
   max-width:none!important;table-layout:auto!important
 }
 body.fi-premium #content .table-wrap::-webkit-scrollbar{height:14px!important;display:block!important}
 body.fi-premium #content .table-wrap::-webkit-scrollbar-track{background:#dce4ef!important;border-radius:99px!important}
 body.fi-premium #content .table-wrap::-webkit-scrollbar-thumb{background:#6845d8!important;border:3px solid #dce4ef!important;border-radius:99px!important}
 body.fi-premium:not(.fi-light) .main{width:calc(100% - 255px)!important}
 body.fi-premium:not(.fi-light) #content .table-wrap{scrollbar-color:#9b83ff #203953!important}
 body.fi-premium:not(.fi-light) #content .table-wrap::-webkit-scrollbar-track{background:#203953!important}
 body.fi-premium:not(.fi-light) #content .table-wrap::-webkit-scrollbar-thumb{background:#9b83ff!important;border-color:#203953!important}
 @media(max-width:760px){
   body.fi-premium .main{width:100%!important;margin-left:0!important}
   body.fi-premium .main>.container{width:100%!important;max-width:100%!important;padding-left:12px!important;padding-right:12px!important}
   body.fi-premium #content .table-wrap{overflow-x:scroll!important;max-width:calc(100vw - 24px)!important}
   body.fi-premium #content .table-wrap>.table{min-width:1000px!important}
 }

 /* Force the actual Lessons table wrapper to become a usable horizontal scroller. */
 body.fi-premium #content .table-wrap{
   display:block!important;width:100%!important;max-width:100%!important;
   min-width:0!important;overflow-x:auto!important;overflow-y:visible!important;
   box-sizing:border-box!important;scrollbar-width:thin!important;
   -webkit-overflow-scrolling:touch!important;touch-action:pan-x pan-y!important;
 }
 body.fi-premium #content .table-wrap > table{
   width:max-content!important;min-width:900px!important;max-width:none!important;
   table-layout:auto!important;
 }
 body.fi-premium #content .table-wrap::-webkit-scrollbar{height:12px!important}
 body.fi-premium #content .table-wrap::-webkit-scrollbar-track{background:#dfe5ef!important;border-radius:99px!important}
 body.fi-premium #content .table-wrap::-webkit-scrollbar-thumb{background:#7253d6!important;border-radius:99px!important;border:2px solid #dfe5ef!important} body.fi-premium:not(.fi-light) #content .table-wrap::-webkit-scrollbar-track{background:#142941!important}
 body.fi-premium:not(.fi-light) #content .table-wrap::-webkit-scrollbar-thumb{background:#9a83ff!important;border-color:#142941!important}
 @media(max-width:900px){
   body.fi-premium #content .table-wrap:before{
     content:'← Deslize a tabela para ver Curso, Módulo e Ações →';
     display:block!important;position:sticky!important;left:0!important;width:max-content!important;
     max-width:100%!important;box-sizing:border-box!important;padding:7px 10px!important;
     margin-bottom:4px!important;border-radius:8px!important;font-size:11px!important;
     font-weight:900!important;letter-spacing:.1px!important
   }
   body.fi-premium.fi-light #content .table-wrap:before{background:#eee9ff!important;color:#39247c!important;border:1px solid #cfc4ff!important}
   body.fi-premium:not(.fi-light) #content .table-wrap:before{background:#263e59!important;color:#fff!important;border:1px solid #496784!important}
 }

 /* Responsive table viewport: keep all columns reachable on narrow screens. */
 body.fi-premium #content{min-width:0!important;max-width:100%!important}
 body.fi-premium #content .table-wrap,
 body.fi-premium #content .table-responsive,
 body.fi-premium #content .table-container,
 body.fi-premium #content .card:has(> table),
 body.fi-premium #content .card:has(> div > table){
   max-width:100%!important;min-width:0!important;overflow-x:auto!important;
   overscroll-behavior-x:contain!important;scrollbar-width:thin!important;
   scrollbar-color:#7659db #dfe5ef!important
 }
 body.fi-premium #content table{
   max-width:100%!important
 }
 @media(max-width:900px){
   body.fi-premium #content table{min-width:900px!important}
   body.fi-premium #content .table-wrap,
   body.fi-premium #content .table-responsive,
   body.fi-premium #content .table-container{
     border:1px solid #c9d4e4!important;border-radius:12px!important;
     position:relative!important
   }
   body.fi-premium.fi-light #content .table-wrap:after,
   body.fi-premium.fi-light #content .table-responsive:after,
   body.fi-premium.fi-light #content .table-container:after{
     content:'Deslize para ver todas as colunas →';display:block;position:sticky;left:0;
     width:max-content;padding:7px 10px;font-size:11px;font-weight:800;color:#49318f;
     background:#eee9ff;border-top:1px solid #d4c8ff
   }
   body.fi-premium:not(.fi-light) #content .table-wrap:after,
   body.fi-premium:not(.fi-light) #content .table-responsive:after,
   body.fi-premium:not(.fi-light) #content .table-container:after{
     content:'Deslize para ver todas as colunas →';display:block;position:sticky;left:0;
     width:max-content;padding:7px 10px;font-size:11px;font-weight:800;color:#fff;
     background:#263e59;border-top:1px solid #496784
   }
 }

 /* Final contrast pass for Lessons/Courses tables: every pill and action readable in both themes. */
 body.fi-premium #content table{border-collapse:separate!important;border-spacing:0!important}
 body.fi-premium #content table thead th{font-weight:800!important;letter-spacing:.35px!important}
 body.fi-premium #content table tbody td{vertical-align:middle!important}
 body.fi-premium.fi-light #content table thead th{background:#f2f5fb!important;color:#43536b!important;border-color:#dce4ef!important}
 body.fi-premium.fi-light #content table tbody tr td{background:#fff!important;color:#24334a!important;border-color:#e1e7f0!important}
 body.fi-premium.fi-light #content table tbody tr:hover td{background:#f7f5ff!important}
 body.fi-premium:not(.fi-light) #content table thead th{background:#142941!important;color:#dceaff!important;border-color:#35506d!important}
 body.fi-premium:not(.fi-light) #content table tbody tr td{background:#0e2034!important;color:#f0f5ff!important;border-color:#2b4560!important}
 body.fi-premium:not(.fi-light) #content table tbody tr:hover td{background:#142b43!important}
 /* Metadata chips such as "Sem curso", "Sem módulo", and level tags */
 body.fi-premium #content table tbody td .badge,
 body.fi-premium #content table tbody td .pill,
 body.fi-premium #content table tbody td .tag,
 body.fi-premium #content table tbody td span[class*="badge"],
 body.fi-premium #content table tbody td span[class*="pill"]{
   display:inline-flex!important;align-items:center!important;justify-content:center!important;
   min-height:26px!important;padding:5px 10px!important;border-radius:999px!important;
   font-size:11px!important;font-weight:800!important;line-height:1.2!important;text-shadow:none!important
 }
 body.fi-premium.fi-light #content table tbody td .badge,
 body.fi-premium.fi-light #content table tbody td .pill,
 body.fi-premium.fi-light #content table tbody td .tag,
 body.fi-premium.fi-light #content table tbody td span[class*="badge"],
 body.fi-premium.fi-light #content table tbody td span[class*="pill"]{
   background:#e9e5ff!important;color:#39247c!important;-webkit-text-fill-color:#39247c!important;border:1px solid #cfc4ff!important
 }
 body.fi-premium:not(.fi-light) #content table tbody td .badge,
 body.fi-premium:not(.fi-light) #content table tbody td .pill,
 body.fi-premium:not(.fi-light) #content table tbody td .tag,
 body.fi-premium:not(.fi-light) #content table tbody td span[class*="badge"],
 body.fi-premium:not(.fi-light) #content table tbody td span[class*="pill"]{
   background:#29425e!important;color:#f4f8ff!important;-webkit-text-fill-color:#f4f8ff!important;border:1px solid #496784!important
 }
 /* Action buttons inside tables: distinct purpose colors and readable labels */
 body.fi-premium #content table tbody td button,
 body.fi-premium #content table tbody td a.btn{
   min-height:34px!important;padding:7px 11px!important;border-radius:10px!important;
   font-size:11px!important;font-weight:800!important;line-height:1.2!important;
   opacity:1!important;text-shadow:none!important
 }
 body.fi-premium.fi-light #content table tbody td button:not(:first-child),
 body.fi-premium.fi-light #content table tbody td a.btn:not(:first-child){
   color:#273750!important;-webkit-text-fill-color:#273750!important;
   background:#edf2f8!important;border:1px solid #c9d5e5!important
 }
 body.fi-premium.fi-light #content table tbody td button[onclick*="edit"],
 body.fi-premium.fi-light #content table tbody td button[onclick*="Edit"],
 body.fi-premium.fi-light #content table tbody td button[onclick*="openLessonForm"]{
   background:#e7efff!important;color:#174a9b!important;-webkit-text-fill-color:#174a9b!important;border-color:#b9cef5!important
 }
 body.fi-premium.fi-light #content table tbody td button[onclick*="assign"],
 body.fi-premium.fi-light #content table tbody td button[onclick*="Assign"]{
   background:#eee8ff!important;color:#4c2ba4!important;-webkit-text-fill-color:#4c2ba4!important;border-color:#cfc0ff!important
 }
 body.fi-premium #content table tbody td button[onclick*="delete"],
 body.fi-premium #content table tbody td button[onclick*="Delete"],
 body.fi-premium #content table tbody td button.danger{
   background:#b42342!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:1px solid #b42342!important
 }
 body.fi-premium:not(.fi-light) #content table tbody td button:not(:first-child),
 body.fi-premium:not(.fi-light) #content table tbody td a.btn:not(:first-child){
   background:#203953!important;color:#f4f8ff!important;-webkit-text-fill-color:#f4f8ff!important;border:1px solid #496784!important
 }
 body.fi-premium:not(.fi-light) #content table tbody td button[onclick*="edit"],
 body.fi-premium:not(.fi-light) #content table tbody td button[onclick*="Edit"],
 body.fi-premium:not(.fi-light) #content table tbody td button[onclick*="openLessonForm"]{
   background:#203953!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;border-color:#587795!important
 }
 body.fi-premium:not(.fi-light) #content table tbody td button[onclick*="assign"],
 body.fi-premium:not(.fi-light) #content table tbody td button[onclick*="Assign"]{
   background:#443080!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;border-color:#8b74d7!important
 }
 body.fi-premium #content table tbody td:first-child button,
 body.fi-premium #content table tbody td:first-child .btn,
 body.fi-premium #content table tbody td:first-child a,
 body.fi-premium #content table tbody td:first-child [role="button"]{
   background:#eee9ff!important;background-color:#eee9ff!important;color:#39247c!important;
   -webkit-text-fill-color:#39247c!important;border:1px solid #cfc4ff!important;font-weight:800!important
 }
 body.fi-premium #content table tbody td:first-child button *,
 body.fi-premium #content table tbody td:first-child .btn *,
 body.fi-premium #content table tbody td:first-child a *,
 body.fi-premium #content table tbody td:first-child [role="button"] *{
   color:#39247c!important;-webkit-text-fill-color:#39247c!important
 }

 /* FIX live Lessons table: ensure lesson-name pills have readable text on pale background. */
 body.fi-premium #content table tbody td:first-child button,
 body.fi-premium #content table tbody td:first-child .btn,
 body.fi-premium #content table tbody td:first-child a,
 body.fi-premium #content table tbody td:first-child [role="button"] {
   background:#eee9ff!important;
   background-color:#eee9ff!important;
   color:#49318f!important;
   -webkit-text-fill-color:#49318f!important;
   border:1px solid #d4c8ff!important;
   font-weight:800!important; }
 body.fi-premium #content table tbody td:first-child button *,
 body.fi-premium #content table tbody td:first-child .btn *,
 body.fi-premium #content table tbody td:first-child a *,
 body.fi-premium #content table tbody td:first-child [role="button"] * {
   color:#49318f!important;
   -webkit-text-fill-color:#49318f!important;
 }
 body.fi-premium #content table tbody td:first-child button svg,
 body.fi-premium #content table tbody td:first-child .btn svg,
 body.fi-premium #content table tbody td:first-child a svg { color:#49318f!important; }

/* Platform-wide contrast baseline: every workspace follows the selected theme */
body.fi-premium:not(.fi-light) #content .v41-class-card,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card),
body.fi-premium:not(.fi-light) #content [class*="-kpi"],
body.fi-premium:not(.fi-light) #content [class*="-stat"],
body.fi-premium:not(.fi-light) #content [class*="-panel"]:not(.hero):not(.hubHero),
body.fi-premium:not(.fi-light) #content .card,
body.fi-premium:not(.fi-light) #content .stat,
body.fi-premium:not(.fi-light) #content .quick,
body.fi-premium:not(.fi-light) #content .table-wrap,
body.fi-premium:not(.fi-light) #content .empty {
 background-color:#142238!important;border-color:#34445e!important;color:#f4f7ff!important;
}
body.fi-premium:not(.fi-light) #content .v41-class-card h1,
body.fi-premium:not(.fi-light) #content .v41-class-card h2,
body.fi-premium:not(.fi-light) #content .v41-class-card h3,
body.fi-premium:not(.fi-light) #content .v41-class-card b,
body.fi-premium:not(.fi-light) #content .v41-class-card strong,
body.fi-premium:not(.fi-light) #content .v41-class-card label,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h1,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h2,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h3,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) b,
body.fi-premium:not(.fi-light) #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) strong{color:#f8fafc!important;-webkit-text-fill-color:#f8fafc!important}
body.fi-premium:not(.fi-light) #content .v41-class-card p,
body.fi-premium:not(.fi-light) #content .v41-class-card small,
body.fi-premium:not(.fi-light) #content .v41-class-card .v41-meta span,
body.fi-premium:not(.fi-light) #content [class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) p,
body.fi-premium:not(.fi-light) #content [class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) small{color:#c2cfe0!important;-webkit-text-fill-color:#c2cfe0!important}
body.fi-premium:not(.fi-light) #content .v41-class-card .v41-meta>div{background:#1b2a42!important;border-color:#34445e!important;color:#f4f7ff!important}
body.fi-premium:not(.fi-light) #content .v41-class-card .v41-meta b{color:#f8fafc!important;-webkit-text-fill-color:#f8fafc!important}
body.fi-premium:not(.fi-light) #content .v41-class-card .badge{background:#2a3d5c!important;color:#f4f7ff!important;-webkit-text-fill-color:#f4f7ff!important}
body.fi-premium:not(.fi-light) #content .v41-class-card .btn.secondary,
body.fi-premium:not(.fi-light) #content .v41-class-card .btn.ghost{background:#243650!important;border:1px solid #465a76!important;color:#f4f7ff!important;-webkit-text-fill-color:#f4f7ff!important}
body.fi-premium.fi-light #content .v41-class-card,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card),
body.fi-premium.fi-light #content [class*="-kpi"],
body.fi-premium.fi-light #content [class*="-stat"],
body.fi-premium.fi-light #content [class*="-panel"]:not(.hero):not(.hubHero),
body.fi-premium.fi-light #content .card,
body.fi-premium.fi-light #content .stat,
body.fi-premium.fi-light #content .quick,
body.fi-premium.fi-light #content .table-wrap,
body.fi-premium.fi-light #content .empty{background-color:#fff!important;border-color:#dce3ef!important;color:#17233a!important}
body.fi-premium.fi-light #content .v41-class-card h1,
body.fi-premium.fi-light #content .v41-class-card h2,
body.fi-premium.fi-light #content .v41-class-card h3,
body.fi-premium.fi-light #content .v41-class-card b,
body.fi-premium.fi-light #content .v41-class-card strong,
body.fi-premium.fi-light #content .v41-class-card label,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h1,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h2,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) h3,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) b,
body.fi-premium.fi-light #content article[class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) strong{color:#17233a!important;-webkit-text-fill-color:#17233a!important}
body.fi-premium.fi-light #content .v41-class-card p,
body.fi-premium.fi-light #content .v41-class-card small,
body.fi-premium.fi-light #content .v41-class-card .v41-meta span,
body.fi-premium.fi-light #content [class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) p,
body.fi-premium.fi-light #content [class*="-card"]:not(.fi-level-card):not(.fi-shortcut):not(.fi-media-card):not(.hubCard):not(.class-center-card) small{color:#53627a!important;-webkit-text-fill-color:#53627a!important}
body.fi-premium.fi-light #content .v41-class-card .v41-meta>div{background:#f8f9ff!important;border-color:#e0e5ef!important;color:#17233a!important}
body.fi-premium.fi-light #content .v41-class-card .v41-meta b{color:#17233a!important;-webkit-text-fill-color:#17233a!important}
body.fi-premium.fi-light #content .v41-class-card .badge{background:#e8edf6!important;color:#263b5c!important;-webkit-text-fill-color:#263b5c!important}
body.fi-premium.fi-light #content .v41-class-card .btn.secondary,
body.fi-premium.fi-light #content .v41-class-card .btn.ghost{background:#eee8ff!important;border:1px solid #d8cdfc!important;color:#4c2ca5!important;-webkit-text-fill-color:#4c2ca5!important}
body.fi-premium #content .v41-class-card .btn.primary{background:linear-gradient(100deg,#6840db,#8055e8)!important;color:#fff!important;-webkit-text-fill-color:#fff!important}
body.fi-premium #content .v41-class-card .btn.primary *{color:#fff!important;-webkit-text-fill-color:#fff!important}

`;
 document.head.appendChild(st);
}
function addStudentHome(){
 const root=$('#content');if(!root||$('#fiStudentHome'))return;
 const banner=document.createElement('section');banner.id='fiStudentHome';banner.className='fi-student-hero';
 const first=(window.profile?.full_name||$('#userName')?.textContent||'Student').trim().split(/\s+/)[0];
 banner.innerHTML='<div><div class="fi-kicker">FLUENT IMMERSION · YOUR LEARNING SPACE</div><h2>Seu próximo nível começa aqui, '+escFI(first)+'!</h2><p>Continue suas aulas, pratique suas habilidades e acompanhe sua evolução em um só lugar.</p><button class="fi-action" onclick="loadView(\'immersionPlanner\')">▶ Continuar aprendendo</button> <button class="btn secondary" onclick="loadView(\'games\')">🎮 Praticar com Games</button></div><div class="fi-hero-art" aria-hidden="true">🌎🎧</div>';
 root.insertBefore(banner,root.firstChild);
 const levels=[['A0','Starter'],['A1','Elementary'],['A2','Pre-intermediate'],['B1','Intermediate'],['B2','Upper-intermediate'],['C1','Advanced'],['C2','Proficiency']];
 const levelSection=document.createElement('section');levelSection.className='fi-home-section';
 levelSection.innerHTML='<div class="fi-section-head"><h3>Explore por nível CEFR</h3><span style="font-size:11px;color:#69cfff">A0–C2</span></div><div class="fi-level-row">'+levels.map(x=>'<button class="fi-level-card" data-fi-level="'+x[0]+'"><b>'+x[0]+'</b><span>'+x[1]+'</span><span style="margin-top:12px">Explorar aulas →</span></button>').join('')+'</div>';
 banner.insertAdjacentElement('afterend',levelSection);
 levelSection.querySelectorAll('[data-fi-level]').forEach(b=>b.addEventListener('click',()=>{try{sessionStorage.setItem('fiRequestedLevel',b.dataset.fiLevel)}catch(_){}window.loadView('studentLessons')}));
 const shortcuts=document.createElement('section');shortcuts.className='fi-home-section';
 shortcuts.innerHTML='<div class="fi-section-head"><h3>Pratique suas habilidades</h3><span style="font-size:11px;color:#69cfff">Aprenda fazendo</span></div><div class="fi-shortcut-row"><button class="fi-shortcut" onclick="loadView(\'learningHub\')"><i>🎧</i><span><b>Listening Studio</b><small>Treine compreensão oral</small></span></button><button class="fi-shortcut" onclick="loadView(\'games\')"><i>🎮</i><span><b>Games & Challenges</b><small>Aprenda jogando</small></span></button><button class="fi-shortcut" onclick="loadView(\'studentTasks\')"><i>✅</i><span><b>Minhas missões</b><small>Veja tarefas atribuídas</small></span></button><button class="fi-shortcut" onclick="loadView(\'studentProgress\')"><i>📈</i><span><b>Meu progresso</b><small>Acompanhe sua evolução</small></span></button></div>';
 levelSection.insertAdjacentElement('afterend',shortcuts);
 const old=root.querySelector('.student-banner');if(old)old.classList.add('fi-existing-dashboard');
 const grids=root.querySelectorAll('.grid,.card');grids.forEach(el=>{if(el!==banner&&el!==levelSection&&el!==shortcuts)el.classList.add('fi-existing-dashboard')});
}
function applyTheme(mode){
 document.body.classList.toggle('fi-light',mode==='light');
 const b=$('#fiThemeToggle');if(b){b.textContent=mode==='light'?'☾ Modo escuro':'☀ Modo claro';b.setAttribute('aria-label',mode==='light'?'Ativar modo escuro':'Ativar modo claro');}
 try{localStorage.setItem('fiDashboardTheme',mode)}catch(_){}
}
function installThemeToggle(){
 const top=document.querySelector('.top-right');if(!top||$('#fiThemeToggle'))return;
 const b=document.createElement('button');b.id='fiThemeToggle';b.className='fi-theme-toggle';b.type='button';
 b.addEventListener('click',()=>applyTheme(document.body.classList.contains('fi-light')?'dark':'light'));
 top.insertBefore(b,top.firstChild);
}

function installMobileNavToggle(){
 const topLeft=document.querySelector('.topbar>div:first-child');
 const sidebar=$('#sidebar'),overlay=$('#mobileOverlay');
 if(!topLeft||!sidebar||!overlay)return;
 let b=$('#fiMobileNavToggle');
 if(!b){
  b=document.createElement('button');b.id='fiMobileNavToggle';b.type='button';
  b.setAttribute('aria-label','Abrir abas de navegação');b.setAttribute('aria-controls','sidebar');
  b.innerHTML='<span aria-hidden="true">☰</span><span style="font-size:11px">Abas</span>';
  const legacy=topLeft.querySelector('.mobile');
  if(legacy)legacy.style.display='none';
  b.addEventListener('click',()=>{
   const isOpen=sidebar.classList.contains('open');
   if(typeof window.toggleMobile==='function')window.toggleMobile(!isOpen);
   else{sidebar.classList.toggle('open',!isOpen);overlay.classList.toggle('open',!isOpen)}
   b.setAttribute('aria-expanded',String(!isOpen));
  });
  topLeft.insertBefore(b,topLeft.firstChild);
 }
}

function installAlwaysVisibleMobileTabs(){const sidebar=$('#sidebar'),overlay=$('#mobileOverlay');if(!sidebar||!overlay)return;let b=$('#fiMobileTabsHandle');if(!b){b=document.createElement('button');b.id='fiMobileTabsHandle';b.type='button';b.setAttribute('aria-label','Abrir abas do menu lateral');b.setAttribute('aria-controls','sidebar');b.innerHTML='<span class="fi-tabs-bars" aria-hidden="true">☰</span><span>ABAS</span>';b.addEventListener('click',()=>{const opening=!sidebar.classList.contains('open');if(typeof window.toggleMobile==='function')window.toggleMobile(opening);else{sidebar.classList.toggle('open',opening);overlay.classList.toggle('open',opening)}});document.body.appendChild(b)}}

function installRefreshPositionPersistence(){
 if(window.__fiRefreshPositionPersistence)return;
 window.__fiRefreshPositionPersistence=true;
 const KEY='ticPlatformLastViewV1',GESTURE='ticPlatformLastGestureV1';
 document.addEventListener('click',function(ev){
  if(!ev.isTrusted)return;
  try{sessionStorage.setItem(GESTURE,String(Date.now()))}catch(_){}
 },true);
 function recentUserAction(){try{return Date.now()-Number(sessionStorage.getItem(GESTURE)||0)<2500}catch(_){return false}}
 function wrapLoadView(){
  const fn=window.loadView;
  if(typeof fn!=='function'||fn.__fiRefreshPositionWrapped)return false;
  const wrapped=function(view){
   if(!window.__fiRestoringLastPosition&&recentUserAction()){
    try{     const nextView=String(view||''),previousView=sessionStorage.getItem(KEY)||'';
     if(previousView&&previousView!==nextView){sessionStorage.removeItem('ticPlatformLastClassTabV1');sessionStorage.removeItem('ticPlatformLastClassTabViewV1')}
     sessionStorage.setItem(KEY,nextView);
    }catch(_){}
   }
   return fn.apply(this,arguments);
  };
  wrapped.__fiRefreshPositionWrapped=true;
  wrapped.__fiOriginal=fn;
  window.loadView=wrapped;
  return true;
 }
 wrapLoadView();
 let tries=0;
 const watcher=setInterval(function(){tries++;if(wrapLoadView()||tries>20)clearInterval(watcher)},250);
 function restore(){
  let view='';
  try{view=sessionStorage.getItem(KEY)||''}catch(_){}
  if(!view||view==='null'||view==='undefined')return;
  window.__fiRestoringLastPosition=true;
  try{
   const fn=window.loadView;
   if(typeof fn==='function'){
    const original=fn.__fiRefreshPositionWrapped?fn.__fiOriginal:fn;
    if(typeof original==='function')original.call(window,view);
   }
  }catch(e){console.warn('Não foi possível restaurar a última tela:',e)}
  setTimeout(function(){window.__fiRestoringLastPosition=false},1800);
 }
 setTimeout(restore,1100);
}
function init(){
 installRefreshPositionPersistence();
 addStyle();
 installMobileNavToggle();
 installAlwaysVisibleMobileTabs();
 const role=window.profile?.role||$('#userRole')?.textContent||'';
 document.body.classList.add('fi-premium');
 document.body.classList.toggle('fi-teacher-mode',/teacher|admin/i.test(role));
 if(/student/i.test(role))document.body.classList.add('fi-student-mode');
 let saved='dark';try{saved=localStorage.getItem('fiDashboardTheme')||'dark'}catch(_){}
 applyTheme(saved);installThemeToggle();
 const ia=document.getElementById('teacherIAFab'),top=document.querySelector('.top-right');
 if(ia&&top&&!top.contains(ia))top.appendChild(ia);
}
const originalStudentDashboard=window.studentDashboard;
if(typeof originalStudentDashboard==='function'){
 window.studentDashboard=async function(){init();await originalStudentDashboard.apply(this,arguments);if(/student/i.test(window.profile?.role||$('#userRole')?.textContent||''))addStudentHome();};
}
document.addEventListener('DOMContentLoaded',init);
const observer=new MutationObserver(()=>{if(!document.body.classList.contains('fi-premium'))init()});
if(document.body)observer.observe(document.body,{attributes:true,attributeFilter:['class']});
function addClassCenterPremiumPolish(){if(document.getElementById('fiClassCenterPolishV2'))return;const st=document.createElement('style');st.id='fiClassCenterPolishV2';st.textContent="\n:root{--fi-radius:16px}\nbody.fi-premium .btn,body.fi-premium button{transition:background-color .18s ease,border-color .18s ease,box-shadow .18s ease,transform .18s ease}\nbody.fi-premium .btn{min-height:36px;border-radius:11px!important;font-weight:750!important;letter-spacing:.01em}\nbody.fi-premium .btn.primary,body.fi-premium .btn:not(.secondary):not(.ghost):not(.danger){box-shadow:0 5px 14px rgba(109,63,232,.18)}\nbody.fi-premium .btn:focus-visible,body.fi-premium button:focus-visible,body.fi-premium a:focus-visible{outline:3px solid #a78bfa!important;outline-offset:2px}\nbody.fi-premium .table-wrap{border-radius:14px;overflow:auto}\nbody.fi-premium .table th{font-weight:800;letter-spacing:.07em}\nbody.fi-premium .card,body.fi-premium .stat,body.fi-premium .quick{border-radius:16px}\nbody.fi-premium .class-center-page .class-center-top{border-radius:20px}\nbody.fi-premium .class-center-page .class-center-kpi,body.fi-premium .class-center-page .class-center-column,body.fi-premium .class-center-page .class-center-card,body.fi-premium .class-center-page .class-center-list-item{border-radius:15px;box-shadow:0 7px 22px rgba(15,23,42,.055);transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}\nbody.fi-premium .class-center-page .class-center-card:hover,body.fi-premium .class-center-page .class-center-list-item:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(15,23,42,.10)}\nbody.fi-premium .class-center-page .class-center-tabs{gap:7px;padding-bottom:5px}\nbody.fi-premium .class-center-page .class-center-tabs button{border-radius:11px!important;min-height:38px;font-weight:750!important;white-space:nowrap}\nbody.fi-premium .class-center-page input,body.fi-premium .class-center-page select,body.fi-premium .class-center-page textarea{border-radius:11px!important;min-height:40px}\nbody.fi-premium.fi-light .class-center-page{--cc-bg:#f4f6fb;--cc-surface:#fff;--cc-surface-2:#f8f9ff;--cc-ink:#172033;--cc-muted:#52617a;--cc-border:#dce3ef;color:#172033}\nbody.fi-premium.fi-light .class-center-page .class-center-top,body.fi-premium.fi-light .class-center-page .class-center-kpi,body.fi-premium.fi-light .class-center-page .class-center-column,body.fi-premium.fi-light .class-center-page .class-center-card,body.fi-premium.fi-light .class-center-page .class-center-list-item{background:#fff!important;border-color:#dce3ef!important;color:#172033!important}\nbody.fi-premium.fi-light .class-center-page h1,body.fi-premium.fi-light .class-center-page h2,body.fi-premium.fi-light .class-center-page h3,body.fi-premium.fi-light .class-center-page b,body.fi-premium.fi-light .class-center-page strong,body.fi-premium.fi-light .class-center-page label{color:#172033}\nbody.fi-premium.fi-light .class-center-page p,body.fi-premium.fi-light .class-center-page small,body.fi-premium.fi-light .class-center-page .muted{color:#52617a}\nbody.fi-premium.fi-light .class-center-page .class-center-tabs button{background:#f0edff!important;color:#49318b!important;border:1px solid #e2dafa!important}\nbody.fi-premium.fi-light .class-center-page .class-center-tabs button.active{background:#6d3fe8!important;color:#fff!important;border-color:#6d3fe8!important;box-shadow:0 5px 13px #6d3fe82b}\nbody.fi-premium.fi-light .class-center-page .class-center-list-item:hover,body.fi-premium.fi-light .class-center-page .class-center-card:hover{border-color:#b9a7f5!important}\nbody.fi-premium.fi-light .class-center-page input,body.fi-premium.fi-light .class-center-page select,body.fi-premium.fi-light .class-center-page textarea{background:#fff!important;color:#172033!important;border-color:#cbd5e1!important}\nbody.fi-premium.fi-light .class-center-page input::placeholder,body.fi-premium.fi-light .class-center-page textarea::placeholder{color:#64748b!important;opacity:1}\nbody.fi-premium:not(.fi-light) .class-center-page .class-center-top{background:linear-gradient(120deg,#17112c,#31205b 65%,#4b2c92)!important;border-color:#463275!important;color:#fff!important}\nbody.fi-premium:not(.fi-light) .class-center-page .class-center-kpi,body.fi-premium:not(.fi-light) .class-center-page .class-center-column,body.fi-premium:not(.fi-light) .class-center-page .class-center-card,body.fi-premium:not(.fi-light) .class-center-page .class-center-list-item{background:#171c2b!important;border-color:#303a52!important;color:#f5f7ff!important}\nbody.fi-premium:not(.fi-light) .class-center-page h1,body.fi-premium:not(.fi-light) .class-center-page h2,body.fi-premium:not(.fi-light) .class-center-page h3,body.fi-premium:not(.fi-light) .class-center-page b,body.fi-premium:not(.fi-light) .class-center-page strong,body.fi-premium:not(.fi-light) .class-center-page label{color:#f5f7ff}\nbody.fi-premium:not(.fi-light) .class-center-page p,body.fi-premium:not(.fi-light) .class-center-page small,body.fi-premium:not(.fi-light) .class-center-page .muted{color:#bac6da}\nbody.fi-premium:not(.fi-light) .class-center-page .class-center-tabs button{background:#20263a!important;color:#dce5f7!important;border:1px solid #37425b!important}\nbody.fi-premium:not(.fi-light) .class-center-page .class-center-tabs button.active{background:linear-gradient(100deg,#8b5cf6,#a855f7)!important;color:#fff!important;border-color:#a78bfa!important}\nbody.fi-premium:not(.fi-light) .class-center-page input,body.fi-premium:not(.fi-light) .class-center-page select,body.fi-premium:not(.fi-light) .class-center-page textarea{background:#111827!important;color:#f5f7ff!important;border-color:#3a465f!important}\nbody.fi-premium:not(.fi-light) .class-center-page input::placeholder,body.fi-premium:not(.fi-light) .class-center-page textarea::placeholder{color:#aab8ce!important;opacity:1}\n@media(max-width:760px){body.fi-premium .class-center-page .class-center-tabs{padding-bottom:8px}body.fi-premium .class-center-page .class-center-tabs button{min-height:40px;padding:9px 12px}body.fi-premium .btn{min-height:40px}}\n";document.head.appendChild(st);}
function addTeacherMaterialsWorkspaceV54(){if(document.getElementById('fiTeacherMaterialsWorkspaceV54'))return;const s=document.createElement('style');s.id='fiTeacherMaterialsWorkspaceV54';s.textContent="\n.fi-teacher-material-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 10px;padding:7px;background:#f0edff;border:1px solid #e2dafa;border-radius:14px}\n.fi-teacher-material-tabs button{border:1px solid transparent!important;border-radius:10px!important;padding:11px 15px!important;min-height:42px;font-weight:800!important;color:#49318b!important;background:transparent!important;cursor:pointer}\n.fi-teacher-material-tabs button.active{background:linear-gradient(100deg,#6d3fe8,#8b5cf6)!important;color:#fff!important;box-shadow:0 5px 14px #6d3fe82e}\n.fi-teacher-material-tip{padding:12px 14px;margin-bottom:14px;border:1px solid #dce3ef;border-radius:12px;background:#fff;color:#52617a;font-size:13px;line-height:1.55}\nbody.fi-premium:not(.fi-light) .fi-teacher-material-tabs{background:#151d2e;border-color:#34415c}\nbody.fi-premium:not(.fi-light) .fi-teacher-material-tabs button{color:#dce5f7!important}\nbody.fi-premium:not(.fi-light) .fi-teacher-material-tabs button.active{background:linear-gradient(100deg,#8b5cf6,#a855f7)!important;color:#fff!important}\nbody.fi-premium:not(.fi-light) .fi-teacher-material-tip{background:#151d2e;border-color:#34415c;color:#c3cee0}\n.fi-media-library .fi-media-hero{gap:18px;align-items:center}\n.fi-media-library .fi-media-hero h2{letter-spacing:-.035em}\n.fi-media-library .fi-media-filterbar{align-items:center}\n.fi-media-library .fi-media-filterbar input,.fi-media-library .fi-media-filterbar select{min-height:42px;border-radius:11px}\n.fi-media-library .fi-media-card{overflow:hidden;border-radius:16px;box-shadow:0 8px 24px rgba(24,30,52,.07)}\n.fi-media-library .fi-media-cardbody{gap:10px}\n.fi-media-library .fi-media-actions{display:flex;gap:7px;flex-wrap:wrap}\n.fi-media-library .fi-media-actions .btn{min-height:36px}\nbody.fi-premium:not(.fi-light) .fi-media-library .fi-media-card{background:#151d2e;border-color:#34415c;color:#f4f7ff}\nbody.fi-premium:not(.fi-light) .fi-media-library .fi-media-card h3{color:#fff}\nbody.fi-premium:not(.fi-light) .fi-media-library .fi-media-card p,body.fi-premium:not(.fi-light) .fi-media-library .fi-media-card small{color:#c0cce0}\nbody.fi-premium:not(.fi-light) .fi-media-library .fi-media-cover{background:linear-gradient(145deg,#251943,#332354)}\n@media(max-width:700px){.fi-teacher-material-tabs{display:grid;grid-template-columns:1fr}.fi-teacher-material-tabs button{text-align:left}.fi-media-library .fi-media-hero{align-items:flex-start;flex-direction:column}.fi-media-library .fi-media-hero .btn{width:100%}}\n";document.head.appendChild(s);}
addTeacherMaterialsWorkspaceV54();
addClassCenterPremiumPolish();

function addAccessibleContrastV65(){
 if(document.getElementById('fiContrastAccessibilityV65'))return;
 const st=document.createElement('style');st.id='fiContrastAccessibilityV65';
 st.textContent=String.raw`
 /* Accessible contrast pass: shared controls, cards, labels, tables and status colors */
 body.fi-premium:not(.fi-light){--fi-bg:#0b1220;--fi-panel:#111c2d;--fi-panel2:#17253a;--fi-line:#34445c;--fi-text:#f8fafc;--fi-muted:#c0ccdc}
 body.fi-premium:not(.fi-light) #content label,
 body.fi-premium:not(.fi-light) #content .field label,
 body.fi-premium:not(.fi-light) #content .mini span,
 body.fi-premium:not(.fi-light) #content .section-head,
 body.fi-premium:not(.fi-light) #content .section-head small{color:#d8e2f0!important}
 body.fi-premium:not(.fi-light) #content input,
 body.fi-premium:not(.fi-light) #content select,
 body.fi-premium:not(.fi-light) #content textarea,
 body.fi-premium:not(.fi-light) .modal-card input,
 body.fi-premium:not(.fi-light) .modal-card select,
 body.fi-premium:not(.fi-light) .modal-card textarea{background:#0b1728!important;color:#f8fafc!important;border-color:#465873!important}
 body.fi-premium:not(.fi-light) #content input::placeholder,
 body.fi-premium:not(.fi-light) #content textarea::placeholder{color:#aabbd0!important;opacity:1}
 body.fi-premium:not(.fi-light) #content .badge,
 body.fi-premium:not(.fi-light) #content .badge.gray{background:#2a3a52!important;color:#f4f7fb!important}
 body.fi-premium:not(.fi-light) #content .btn.secondary,
 body.fi-premium:not(.fi-light) #content .btn.ghost{background:#1c2b40!important;color:#f3f6fc!important;border-color:#465873!important}
 body.fi-premium:not(.fi-light) #content .btn.danger{background:#4a1e2b!important;color:#ffe5e8!important;border-color:#9e3c52!important}
 body.fi-premium:not(.fi-light) #content .table th{background:#17263a!important;color:#e6eef9!important}
 body.fi-premium:not(.fi-light) #content .table td{color:#edf3fb!important}
 body.fi-premium.fi-light{--fi-bg:#f4f6fb;--fi-panel:#fff;--fi-panel2:#f8faff;--fi-line:#d4ddea;--fi-text:#172033;--fi-muted:#52627a}
 body.fi-premium.fi-light #content .card,
 body.fi-premium.fi-light #content .stat,
 body.fi-premium.fi-light #content .quick,
 body.fi-premium.fi-light #content .table-wrap,
 body.fi-premium.fi-light #content .empty,
 body.fi-premium.fi-light #content .attention{background:#fff!important;color:#172033!important;border-color:#d4ddea!important}
 body.fi-premium.fi-light #content .card h1,
 body.fi-premium.fi-light #content .card h2,
 body.fi-premium.fi-light #content .card h3,
 body.fi-premium.fi-light #content .card b,
 body.fi-premium.fi-light #content .card strong,
 body.fi-premium.fi-light #content .section-head,
 body.fi-premium.fi-light #content label,
 body.fi-premium.fi-light #content .mini span{color:#172033!important}
 body.fi-premium.fi-light #content .card p,
 body.fi-premium.fi-light #content .card small,
 body.fi-premium.fi-light #content .row small,
 body.fi-premium.fi-light #content .stat-note,
 body.fi-premium.fi-light #content .page-head p{color:#52627a!important}
 body.fi-premium.fi-light #content input,
 body.fi-premium.fi-light #content select,
 body.fi-premium.fi-light #content textarea,
 body.fi-premium.fi-light .modal-card input,
 body.fi-premium.fi-light .modal-card select,
 body.fi-premium.fi-light .modal-card textarea{background:#fff!important;color:#172033!important;border-color:#b9c7d9!important}
 body.fi-premium.fi-light #content input::placeholder,
 body.fi-premium.fi-light #content textarea::placeholder{color:#64748b!important;opacity:1}
 body.fi-premium.fi-light #content .badge.gray{background:#e8edf5!important;color:#334155!important}
 body.fi-premium.fi-light #content .btn.secondary,
 body.fi-premium.fi-light #content .btn.ghost{background:#f1edff!important;color:#4c2e91!important;border-color:#d4c7fb!important}
 body.fi-premium.fi-light #content .btn.danger{background:#fff0f1!important;color:#a61b35!important;border-color:#efb7bf!important}
 body.fi-premium.fi-light #content .table th{background:#eef2f8!important;color:#334155!important}
 body.fi-premium.fi-light #content .table td{color:#243247!important}
 /* The class overview keeps semantic colors readable in either theme. */
 body.fi-premium:not(.fi-light) .tic-class-overview-card{background:#111c2d!important;border-color:#34445c!important;color:#f8fafc!important}
 body.fi-premium:not(.fi-light) .tic-class-name,
 body.fi-premium:not(.fi-light) .tic-class-overview-card .section-head,
 body.fi-premium:not(.fi-light) .tic-class-overview-card .section-head h2{color:#f8fafc!important}
 body.fi-premium:not(.fi-light) .tic-class-schedule{color:#c0ccdc!important}
 body.fi-premium:not(.fi-light) .tic-kpi-taught{background:#12372d!important;border-color:#237b5a!important;color:#baf7d5!important}
 body.fi-premium:not(.fi-light) .tic-kpi-planned{background:#172f50!important;border-color:#3b6cb0!important;color:#d7e8ff!important}
 body.fi-premium:not(.fi-light) .tic-next-active{background:#3a2b12!important;border-color:#9a6b20!important}
 body.fi-premium:not(.fi-light) .tic-next-empty{background:#202a3a!important;border-color:#3e4b61!important}
 body.fi-premium:not(.fi-light) .tic-next-content b{color:#fff!important}
 body.fi-premium:not(.fi-light) .tic-next-content small{color:#d0d9e7!important}
 body.fi-premium:not(.fi-light) .tic-next-content>span{color:#ffd479!important}
 body.fi-premium:not(.fi-light) .tic-class-info-grid .mini{background:#17253a!important;border-color:#34445c!important}
 body.fi-premium:not(.fi-light) .tic-class-info-grid .mini span,
 body.fi-premium:not(.fi-light) .tic-class-info-grid .mini b{color:#e6edf7!important}
 body.fi-premium.fi-light .tic-class-overview-card{background:#fff!important;border-color:#d4ddea!important;color:#172033!important}
 body.fi-premium.fi-light .tic-class-name,
 body.fi-premium.fi-light .tic-class-overview-card .section-head h2{color:#172033!important}
 body.fi-premium.fi-light .tic-class-schedule{color:#52627a!important}
 body.fi-premium.fi-light .tic-kpi-taught{background:#e6f8ed!important;border-color:#9bdcb6!important;color:#14532d!important}
 body.fi-premium.fi-light .tic-kpi-planned{background:#eaf2ff!important;border-color:#b4cefa!important;color:#1e40af!important}
 body.fi-premium.fi-light .tic-next-active{background:#fff5dc!important;border-color:#e7c56c!important}
 body.fi-premium.fi-light .tic-next-empty{background:#f1f4f9!important;border-color:#d4ddea!important}
 body.fi-premium.fi-light .tic-next-content b{color:#172033!important}
 body.fi-premium.fi-light .tic-next-content small{color:#52627a!important}
 body.fi-premium.fi-light .tic-next-content>span{color:#855400!important}
 body.fi-premium.fi-light .tic-class-info-grid .mini{background:#f5f8fc!important;border-color:#d4ddea!important}
 body.fi-premium.fi-light .tic-class-info-grid .mini span,
 body.fi-premium.fi-light .tic-class-info-grid .mini b{color:#334155!important}
 body.fi-premium.fi-light .tic-overview-eyebrow{color:#5b36b8!important}
 body.fi-premium:not(.fi-light) .tic-class-overview-head{background:linear-gradient(115deg,#17172e,#202a43)!important;border-color:#3d4560!important}
 body.fi-premium:not(.fi-light) .tic-class-overview-head h2{color:#f8fafc!important} body.fi-premium:not(.fi-light) .tic-class-overview-head p{color:#c5d0df!important}
 body.fi-premium:not(.fi-light) .tic-overview-total{background:#202a43!important;border-color:#51427d!important;color:#e8ddff!important}
 body.fi-premium.fi-light .tic-class-overview-head{background:linear-gradient(115deg,#f0eaff,#fff)!important;border-color:#d8cdf6!important}
 @media(prefers-reduced-motion:reduce){body.fi-premium *{transition:none!important;animation:none!important}}
 `;
 document.head.appendChild(st);
}
addAccessibleContrastV65();
addAccessibleContrastV65();

/* Global legibility repair: prevent dark-on-dark labels, pills and card metadata. */
function addGlobalReadableContrastV66(){
 if(document.getElementById('fiGlobalReadableContrastV66'))return;
 const st=document.createElement('style');
 st.id='fiGlobalReadableContrastV66';
 st.textContent=`
 body.fi-premium #content .v41-class-card,
 body.fi-premium #content .v41-class-card *{text-shadow:none}
 body.fi-premium #content .v41-class-card .badge,
 body.fi-premium #content .v41-class-card [class*="status"],
 body.fi-premium #content .v41-class-card [class*="pill"],
 body.fi-premium #content .v41-class-card .level,
 body.fi-premium #content .v41-class-card .tag{
   background:#e8edf6!important;color:#263b5c!important;
   -webkit-text-fill-color:#263b5c!important;border-color:#cbd5e1!important;
 }
 body.fi-premium #content .v41-class-card .badge *,
 body.fi-premium #content .v41-class-card [class*="status"] *,
 body.fi-premium #content .v41-class-card [class*="pill"] *,
 body.fi-premium #content .v41-class-card .level *,
 body.fi-premium #content .v41-class-card .tag *{color:inherit!important;-webkit-text-fill-color:inherit!important}
 body.fi-premium #content .v41-class-card h1,
 body.fi-premium #content .v41-class-card h2,
 body.fi-premium #content .v41-class-card h3,
 body.fi-premium #content .v41-class-card .student-name{color:#172033!important;-webkit-text-fill-color:#172033!important}
 body.fi-premium #content .v41-class-card p,
 body.fi-premium #content .v41-class-card small,
 body.fi-premium #content .v41-class-card .muted,
 body.fi-premium #content .v41-class-card .meta{color:#52617a!important;-webkit-text-fill-color:#52617a!important}
 body.fi-premium:not(.fi-light) #content .v41-class-card .badge,
 body.fi-premium:not(.fi-light) #content .v41-class-card [class*="status"],
 body.fi-premium:not(.fi-light) #content .v41-class-card [class*="pill"],
 body.fi-premium:not(.fi-light) #content .v41-class-card .level,
 body.fi-premium:not(.fi-light) #content .v41-class-card .tag{background:#e8edf6!important;color:#263b5c!important;-webkit-text-fill-color:#263b5c!important}
 body.fi-premium:not(.fi-light) #content .v41-class-card h1,
 body.fi-premium:not(.fi-light) #content .v41-class-card h2,
 body.fi-premium:not(.fi-light) #content .v41-class-card h3,
 body.fi-premium:not(.fi-light) #content .v41-class-card .student-name{color:#f8fafc!important;-webkit-text-fill-color:#f8fafc!important}
 body.fi-premium:not(.fi-light) #content .v41-class-card p,
 body.fi-premium:not(.fi-light) #content .v41-class-card small,
 body.fi-premium:not(.fi-light) #content .v41-class-card .muted,
 body.fi-premium:not(.fi-light) #content .v41-class-card .meta{color:#cbd5e1!important;-webkit-text-fill-color:#cbd5e1!important}
 `;
 document.head.appendChild(st);
}
addGlobalReadableContrastV66();


/* Platform-wide accessibility/stability pass: visible focus, readable status pills and safe responsive controls. */
function addPlatformQualityPassV67(){
 if(document.getElementById('fiPlatformQualityPassV67'))return;
 const st=document.createElement('style');st.id='fiPlatformQualityPassV67';
 st.textContent=`
 body.fi-premium :is(button,a,[role="button"],input,select,textarea):focus-visible{outline:3px solid #8b5cf6!important;outline-offset:2px!important}
 body.fi-premium #content :is(.badge,[class*="status"],[class*="pill"],[class*="tag"]){max-width:100%;overflow-wrap:anywhere}
 body.fi-premium #content :is(input,select,textarea){max-width:100%}
 body.fi-premium #content button{min-height:34px}
 body.fi-premium.fi-light #content :is(.badge,[class*="status"],[class*="pill"],[class*="tag"]){text-shadow:none!important}
 body.fi-premium.fi-light #content :is(.badge,[class*="status"],[class*="pill"],[class*="tag"]):not(.btn){border-color:#cbd5e1}
 body.fi-premium:not(.fi-light) #content :is(input,select,textarea){color:#f8fafc}
 body.fi-premium:not(.fi-light) #content input::placeholder,
 body.fi-premium:not(.fi-light) #content textarea::placeholder{color:#aab8ce!important;opacity:1}
 body.fi-premium #content :is(.v41-class-card,.tic-class-info-grid,.class-center-page){min-width:0}
 @media(max-width:760px){
   body.fi-premium #content :is(.table-wrap,.table-responsive){max-width:100%;overflow-x:auto}
   body.fi-premium #content :is(input,select,textarea){font-size:16px}
 }
 @media(prefers-reduced-motion:reduce){body.fi-premium *,body.fi-premium *::before,body.fi-premium *::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
 `;
 document.head.appendChild(st);
}
addPlatformQualityPassV67();

window.fiPremiumRefresh=init;

/* Additive teacher analytics dashboard. Does not replace existing views or mutate records. */
function loadFITeacherAnalytics(){
 try{
  if(document.querySelector('script[data-fi-teacher-analytics]'))return;
  var script=document.createElement('script');
  script.src='teacher-analytics-dashboard-v1.js?v=17';
  script.async=true;
  script.setAttribute('data-fi-teacher-analytics','true');
  script.onerror=function(){console.warn('[Fluent Immersion] Teacher Analytics não carregou; as funções existentes foram mantidas.')};
  document.head.appendChild(script);
 }catch(e){console.warn('[Fluent Immersion] Analytics loader:',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadFITeacherAnalytics,{once:true});
else loadFITeacherAnalytics();

})();