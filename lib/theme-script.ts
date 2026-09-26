// Pre-paint theme bootstrap (prototype). Inlined at the top of <body> so
// <html data-theme / data-home> is correct before the first paint.
//
// Modes (DEFAULT below is 'light' while we design the bright site; production/main is unaffected until merged):
//   ?theme=light | dark | auto   -> remembered in localStorage
//   ?theme=reset                 -> forget it, back to the default
// "auto" follows the visitor's local clock with an approximate seasonal
// sunrise/sunset (northern-hemisphere, ~47°N) and a short dawn/dusk blend.
//
// data-theme = "light" | "dark"  -> ink/colour switch (hard flip at daylight 0.5)
// data-home  = present on the homepage only (never on sync.* or other routes)
// --wash-a   = opacity of the cream wash over the background media. Light theme only:
//              explicit light = 0.62; auto ramps 0.30 -> 0.62 through the morning.
//              It is 0 in the dark half so white ink never sits on a half-washed photo.
//
// Exposes window.__applyTheme so ThemeController can re-run it on client-side
// navigation and on a slow timer.
export const THEME_SCRIPT = `(function(){
  var d=document.documentElement;
  var KEY='theme-preview';
  var DEFAULT='light'; // design phase: bright by default. Later: 'auto'.
  function fromUrl(){try{var m=/[?&]theme=(light|dark|auto|reset)\\b/.exec(location.search);return m&&m[1]}catch(e){}return null}
  function get(){try{return localStorage.getItem(KEY)}catch(e){}return null}
  function put(v){try{if(v==='reset')localStorage.removeItem(KEY);else localStorage.setItem(KEY,v)}catch(e){}}
  function ss(x,a,b){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)}
  function daylight(n){
    var h=n.getHours()+n.getMinutes()/60;
    var doy=Math.floor((n-new Date(n.getFullYear(),0,0))/864e5);
    var w=Math.cos(2*Math.PI*(doy-355)/365);
    var rise=6.75+1.25*w, set=19-2.5*w, k=0.4;
    return ss(h,rise-k,rise+k)*(1-ss(h,set-k,set+k));
  }
  function apply(){
    var u=fromUrl(); if(u)put(u);
    var mode=u&&u!=='reset'?u:(u==='reset'?DEFAULT:(get()||DEFAULT));
    var theme='dark', wash=0;
    if(mode==='light'){theme='light';wash=0.62}
    else if(mode==='auto'){var dl=daylight(new Date());theme=dl>=0.5?'light':'dark';wash=theme==='light'?0.3+0.32*((dl-0.5)/0.5):0}
    d.setAttribute('data-theme',theme);
    d.setAttribute('data-theme-mode',mode);
    d.style.setProperty('--wash-a',wash.toFixed(3));
    var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}
    m.setAttribute('content',theme==='light'?'#F7F3EE':'#0D0B09');
    var sub=/^(sync)\\./.test(location.hostname);
    var home=!sub&&/^\\/([a-z]{2})?\\/?$/.test(location.pathname);
    if(home)d.setAttribute('data-home','');else d.removeAttribute('data-home');
  }
  window.__applyTheme=apply;
  apply();
})();`;
