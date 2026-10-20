/* 外链池：主题切换 + 表格过滤 */
(function(){
 var root=document.documentElement,KEY='zr-theme',order=['auto','dark','light'];
 var mq=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
 function mode(){var m=root.getAttribute('data-theme-mode');return order.indexOf(m)>-1?m:'auto';}
 function dark(m){return m==='dark'||(m==='auto'&&mq&&mq.matches);}
 function apply(m,p){
  if(order.indexOf(m)<0)m='auto';
  root.setAttribute('data-theme',dark(m)?'dark':'light');
  root.setAttribute('data-theme-mode',m);
  var mt=document.querySelector('meta[name="theme-color"]');if(mt)mt.content=dark(m)?'#0b1120':'#4f46e5';
  try{if(p)localStorage.setItem(KEY,m);}catch(e){}
 }
 apply(mode(),false);
 document.addEventListener('DOMContentLoaded',function(){
  apply(mode(),false);
  var b=document.getElementById('themeBtn');
  if(b)b.onclick=function(){apply(order[(order.indexOf(mode())+1)%order.length],true);};
  if(mq){var f=function(){if(mode()==='auto')apply('auto',false);};if(mq.addEventListener)mq.addEventListener('change',f);else if(mq.addListener)mq.addListener(f);}
  var input=document.getElementById('filter'),count=document.getElementById('count');
  if(input){
   var rows=[].slice.call(document.querySelectorAll('tbody tr[data-k]'));
   input.addEventListener('input',function(){
    var q=input.value.trim().toLowerCase(),n=0;
    rows.forEach(function(tr){var hit=!q||tr.getAttribute('data-k').toLowerCase().indexOf(q)>-1;tr.style.display=hit?'':'none';if(hit)n++;});
    if(count)count.textContent=n+' 条';
    document.querySelectorAll('.empty').forEach(function(x){x.style.display=n?'none':'block';});
   });
  }
 });
})();
