(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)};
var yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();

// mobile menu
var links=$('#links'),burger=$('#burger');
if(burger&&links){burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)})}

// reveal + counters
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
 document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
 document.querySelectorAll('[data-count]').forEach(function(el){var end=+el.dataset.count,done=false;
  new IntersectionObserver(function(es,o){if(es[0].isIntersecting&&!done){done=true;var t0=performance.now();(function tick(t){var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)})(t0);o.disconnect()}}).observe(el)});
}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}

// test filter chips
var chips=document.querySelectorAll('#chips .chip');
chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');var f=c.dataset.f;
 document.querySelectorAll('#listAll .job').forEach(function(j){j.style.display=(f==='all'||j.dataset.t===f)?'':'none'})})});

// screenshot slider (home)
(function(){
 var sc=$('#slider'),tr=$('#strack');if(!sc||!tr)return;
 var n=tr.children.length;
 [].slice.call(tr.children).forEach(function(k){var c=k.cloneNode(true);c.setAttribute('aria-hidden','true');tr.appendChild(c)});
 var all=[].slice.call(tr.children);all.forEach(function(k){var c=k.cloneNode(true);c.setAttribute('aria-hidden','true');tr.appendChild(c)});
 function H(){return tr.children[n].offsetLeft-tr.children[0].offsetLeft}
 var pos=0,last=0,hold=false,drag=false,sx=0,ss=0,timer=null,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function start(){sc.scrollLeft=H();pos=sc.scrollLeft}
 window.addEventListener('load',start);start();
 function wrap(){var h=H();if(sc.scrollLeft>=2*h){sc.scrollLeft-=h}else if(sc.scrollLeft<h*0.5){sc.scrollLeft+=h}pos=sc.scrollLeft}
 sc.addEventListener('scroll',function(){if(Math.abs(sc.scrollLeft-pos)>2){pos=sc.scrollLeft}wrap()},{passive:true});
 function pause(ms){hold=true;clearTimeout(timer);timer=setTimeout(function(){hold=false},ms)}
 sc.addEventListener('mouseenter',function(){hold=true;clearTimeout(timer)});
 sc.addEventListener('mouseleave',function(){if(!drag)pause(600)});
 sc.addEventListener('touchstart',function(){hold=true;clearTimeout(timer)},{passive:true});
 sc.addEventListener('touchend',function(){pause(2500)},{passive:true});
 sc.addEventListener('wheel',function(){pause(2000)},{passive:true});
 sc.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;drag=true;sx=e.clientX;ss=sc.scrollLeft;sc.classList.add('drag');sc.setPointerCapture(e.pointerId)});
 sc.addEventListener('pointermove',function(e){if(!drag)return;sc.scrollLeft=ss-(e.clientX-sx);pos=sc.scrollLeft});
 function up(){if(!drag)return;drag=false;sc.classList.remove('drag');pause(1500)}
 sc.addEventListener('pointerup',up);sc.addEventListener('pointercancel',up);
 function step(t){var dt=Math.min((t-last)/1000,0.1);last=t;if(!reduce&&!hold&&!drag){pos+=45*dt;sc.scrollLeft=pos;wrap()}requestAnimationFrame(step)}
 requestAnimationFrame(function(t){last=t;step(t)});
 function by(d){pause(3000);sc.scrollBy({left:d,behavior:'smooth'})}
 var pv=$('#prev'),nx=$('#next');if(pv)pv.onclick=function(){by(-258)};if(nx)nx.onclick=function(){by(258)};
})();

// sticky download bar + back to top
var st=$('#sticky'),tt=$('#totop'),tgt=$('#download')||$('.pcta');
function onScroll(){
 var y=window.scrollY||0;
 if(st){var d=tgt?tgt.getBoundingClientRect().top:1e9;st.classList.toggle('show',y>600&&d>innerHeight*0.8)}
 if(tt)tt.classList.toggle('show',y>900);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(tt)tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
})();
