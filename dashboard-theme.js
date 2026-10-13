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
 body.fi-premium.fi-light .main>.container>.page-head h1{color:#17233a!important}
 body.fi-premium.fi-light .main>.container>.page-head p{color:#64748b!important}
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
   border:1px solid #cbd6e5!important;
   font-weight:800!important;
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
   font-weight:800!important;
 }
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
function init(){
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
window.fiPremiumRefresh=init;
})();