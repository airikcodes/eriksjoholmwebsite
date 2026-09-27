// Pre-paint sun/moon visibility bootstrap. Inlined at the top of <body>, right next to
// THEME_SCRIPT, so the orb (and its water reflection) is already hidden on a phone with
// no stored preference *before* the first paint — otherwise it flashes on for a frame and
// then disappears once SunOrb's own client state (which can't run this early) corrects it.
//
// Mirrors components/SunOrb.tsx's readHidden(): an explicit "1"/"0" in localStorage
// (set by the visibility toggle) always wins; with nothing stored yet, phones default
// to hidden. Exposes window.__applySunVisibility so it can be re-checked (e.g. after the
// toggle button runs) without waiting on React.
export const SUN_VISIBILITY_SCRIPT = `(function(){
  var d=document.documentElement;
  var KEY='sun-orb-hidden';
  function apply(){
    var hidden=false;
    try{
      var v=localStorage.getItem(KEY);
      if(v==='1')hidden=true;
      else if(v==='0')hidden=false;
      else hidden=matchMedia('(max-width: 640px)').matches;
    }catch(e){}
    d.classList.toggle('sun-off',hidden);
  }
  window.__applySunVisibility=apply;
  apply();
})();`;
