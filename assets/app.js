/* 主题切换 + 工具索引过滤（原生 JS，无依赖） */
(function(){
  var root=document.documentElement, KEY='zr-theme', order=['auto','dark','light'];
  var mq=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
  function mode(){var m=root.getAttribute('data-theme-mode');return order.indexOf(m)>-1?m:'auto';}
  function isDark(m){return m==='dark'||(m==='auto'&&mq&&mq.matches);}
  function apply(m,p){
    if(order.indexOf(m)<0)m='auto';
    root.setAttribute('data-theme',isDark(m)?'dark':'light');
    root.setAttribute('data-theme-mode',m);
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',isDark(m)?'#0b1120':'#4f46e5');
    try{if(p)localStorage.setItem(KEY,m);}catch(e){}
    var b=document.getElementById('themeBtn');
    if(b)b.title={auto:'主题：跟随系统',dark:'主题：深色',light:'主题：浅色'}[m]+'（点击切换）';
  }
  apply(mode(),false);
  document.addEventListener('DOMContentLoaded',function(){
    apply(mode(),false);
    var b=document.getElementById('themeBtn');
    if(b)b.addEventListener('click',function(){apply(order[(order.indexOf(mode())+1)%order.length],true);});
    if(mq){
      var f=function(){if(mode()==='auto')apply('auto',false);};
      if(mq.addEventListener)mq.addEventListener('change',f);else if(mq.addListener)mq.addListener(f);
    }
    var fi=document.getElementById('toolFilter');
    if(fi){
      var items=[].slice.call(document.querySelectorAll('.link-grid a[data-name]'));
      var cnt=document.getElementById('filterCount');
      var empty=document.getElementById('filterEmpty');
      var secs=[].slice.call(document.querySelectorAll('.cat-section'));
      fi.addEventListener('input',function(){
        var q=fi.value.trim().toLowerCase(),n=0;
        items.forEach(function(a){
          var hit=!q||a.getAttribute('data-name').toLowerCase().indexOf(q)>-1||(a.getAttribute('data-cat')||'').toLowerCase().indexOf(q)>-1;
          a.style.display=hit?'':'none';if(hit)n++;
        });
        secs.forEach(function(s){
          var any=[].slice.call(s.querySelectorAll('.link-grid a')).some(function(a){return a.style.display!=='none';});
          s.style.display=any?'':'none';
        });
        if(cnt)cnt.textContent=n+' 个工具';
        if(empty)empty.style.display=n?'none':'block';
      });
      if(cnt)cnt.textContent=items.length+' 个工具';
    }
  });
})();
