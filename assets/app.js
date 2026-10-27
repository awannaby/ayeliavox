(function(){'use strict';
var C=window.AYV||{},reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
/* links */
document.querySelectorAll('[data-go]').forEach(function(a){var u=C[a.getAttribute('data-go')];if(u)a.href=u;});
document.getElementById('yr').textContent=new Date().getFullYear();
/* waving title */
var h=document.getElementById('wave'),k=0;
(function split(node){Array.prototype.slice.call(node.childNodes).forEach(function(c){
  if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){
    if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return;}
    var w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
    t.split('').forEach(function(ch){var s=document.createElement('span');s.className='hw';s.style.setProperty('--i',k++);s.textContent=ch;w.appendChild(s);});f.appendChild(w);});c.parentNode.replaceChild(f,c);}
  else if(c.nodeName!=='BR')split(c);});})(h);
/* reveal */
var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});rv.forEach(function(e){io.observe(e);});}else rv.forEach(function(e){e.classList.add('in');});
/* cursor glow */
var g=document.getElementById('glow');
if(!reduce&&matchMedia('(pointer:fine)').matches){addEventListener('mousemove',function(e){g.style.opacity=1;g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';},{passive:true});}
/* video facade */
var pb=document.getElementById('playBtn');
if(pb)pb.addEventListener('click',function(){var p=document.getElementById('player'),f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/'+C.videoId+'?autoplay=1&rel=0';f.title='AYELIAVOX demo video';
  f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';p.innerHTML='';p.appendChild(f);});
/* waves */
function wave(cv,opt){var x=cv.getContext('2d'),vis=true,t=0,dpr=Math.min(2,devicePixelRatio||1);
  function size(){var r=cv.getBoundingClientRect();if(!opt.fixed){cv.width=r.width*dpr;cv.height=r.height*dpr;}}
  size();addEventListener('resize',size);
  if('IntersectionObserver' in window&&!opt.always)new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(cv);
  function draw(){requestAnimationFrame(draw);if(!vis)return;var W=cv.width,H=cv.height;x.clearRect(0,0,W,H);t+=.012;
    opt.lines.forEach(function(L,i){x.beginPath();for(var px=0;px<=W;px+=4){var u=px/W,y=H*L.y+Math.sin(u*L.f*6.283+t*L.s+i)*H*L.a*(.55+.45*Math.sin(u*3+t*.7));px?x.lineTo(px,y):x.moveTo(px,y);}
      var gr=x.createLinearGradient(0,0,W,0);gr.addColorStop(0,'rgba(143,116,56,0)');gr.addColorStop(.5,'rgba(232,208,155,'+L.o+')');gr.addColorStop(1,'rgba(143,116,56,0)');x.strokeStyle=gr;x.lineWidth=L.w*dpr;x.stroke();});
    if(opt.bars){var n=opt.bars,bw=W/n;for(var b=0;b<n;b++){var hh=H*(.18+.62*Math.abs(Math.sin(b*.55+t*2.2)*Math.cos(b*.21+t)));x.fillStyle='rgba(214,183,122,.85)';x.fillRect(b*bw+bw*.2,(H-hh)/2,bw*.6,hh);}}
    if(reduce)vis=false;}
  draw();}
wave(document.getElementById('bgwave'),{always:true,lines:[{y:.55,f:1.1,s:1.2,a:.12,o:.5,w:1.6},{y:.6,f:.8,s:-.9,a:.16,o:.3,w:1.4},{y:.5,f:1.6,s:.7,a:.09,o:.22,w:1.1}]});
wave(document.getElementById('clwave'),{lines:[],bars:40});
/* cloning counter */
var cl=document.getElementById('cloning'),ring=document.getElementById('ringb'),cnt=document.getElementById('cnt'),run=false;
function count(){var st=null;(function f(ts){if(st===null)st=ts;var p=Math.min(1,(ts-st)/2800);ring.style.strokeDashoffset=(326.7*(1-p)).toFixed(1);cnt.textContent=Math.round(30*p)+' s';if(p<1)requestAnimationFrame(f);else setTimeout(function(){run=false;},2500);})(performance.now());}
function go(){if(run)return;run=true;if(reduce){ring.style.strokeDashoffset=0;cnt.textContent='30 s';return;}count();}
if('IntersectionObserver' in window){new IntersectionObserver(function(e){if(e[0].isIntersecting)go();else ring.style.strokeDashoffset=326.7;},{threshold:.4}).observe(cl);}else{ring.style.strokeDashoffset=0;cnt.textContent='30 s';}
})();
