// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var done = false;
  var txt = `curl http://YOURSERVER:42088/systemstats        `;
  var output = `          

  procs&nbsp;-----------memory----------&nbsp;---swap--&nbsp;-----io----&nbsp;-system--&nbsp;------cpu-----
  r&nbsp;&nbsp;b&nbsp;&nbsp;&nbsp;swpd&nbsp;&nbsp;&nbsp;free&nbsp;&nbsp;&nbsp;buff&nbsp;&nbsp;&nbsp;cache&nbsp;&nbsp;&nbsp;si&nbsp;&nbsp;&nbsp;so&nbsp;&nbsp;&nbsp;&nbsp;bi&nbsp;&nbsp;&nbsp;&nbsp;bo&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;cs&nbsp;us&nbsp;sy&nbsp;id&nbsp;wa&nbsp;st
  0&nbsp;&nbsp;0&nbsp;246536&nbsp;233608&nbsp;105272&nbsp;1406728&nbsp;&nbsp;&nbsp;&nbsp;9&nbsp;&nbsp;&nbsp;75&nbsp;&nbsp;&nbsp;722&nbsp;&nbsp;1344&nbsp;&nbsp;473&nbsp;&nbsp;761&nbsp;10&nbsp;&nbsp;5&nbsp;85&nbsp;&nbsp;0&nbsp;&nbsp;0
  &nbsp;
  00:07:39&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CPU&nbsp;&nbsp;&nbsp;&nbsp;%usr&nbsp;&nbsp;&nbsp;%nice&nbsp;&nbsp;&nbsp;&nbsp;%sys&nbsp;%iowait&nbsp;&nbsp;&nbsp;&nbsp;%irq&nbsp;&nbsp;&nbsp;%soft&nbsp;&nbsp;%steal&nbsp;&nbsp;%guest&nbsp;&nbsp;%gnice&nbsp;&nbsp;&nbsp;%idle
  00:07:39&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all&nbsp;&nbsp;&nbsp;&nbsp;5,56&nbsp;&nbsp;&nbsp;&nbsp;3,98&nbsp;&nbsp;&nbsp;&nbsp;4,13&nbsp;&nbsp;&nbsp;&nbsp;0,39&nbsp;&nbsp;&nbsp;&nbsp;0,00&nbsp;&nbsp;&nbsp;&nbsp;0,44&nbsp;&nbsp;&nbsp;&nbsp;0,00&nbsp;&nbsp;&nbsp;&nbsp;0,00&nbsp;&nbsp;&nbsp;&nbsp;0,00&nbsp;&nbsp;&nbsp;85,49
  &nbsp;
  avg-cpu:&nbsp;&nbsp;%user&nbsp;&nbsp;&nbsp;%nice&nbsp;%system&nbsp;%iowait&nbsp;&nbsp;%steal&nbsp;&nbsp;&nbsp;%idle
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5,6%&nbsp;&nbsp;&nbsp;&nbsp;4,0%&nbsp;&nbsp;&nbsp;&nbsp;4,6%&nbsp;&nbsp;&nbsp;&nbsp;0,4%&nbsp;&nbsp;&nbsp;&nbsp;0,0%&nbsp;&nbsp;&nbsp;85,5%
  &nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tps&nbsp;&nbsp;&nbsp;&nbsp;kB_read/s&nbsp;&nbsp;&nbsp;&nbsp;kB_wrtn/s&nbsp;&nbsp;&nbsp;&nbsp;kB_dscd/s&nbsp;&nbsp;&nbsp;&nbsp;kB_read&nbsp;&nbsp;&nbsp;&nbsp;kB_wrtn&nbsp;&nbsp;&nbsp;&nbsp;kB_dscd&nbsp;Device
  &nbsp;&nbsp;&nbsp;154,68&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2,7M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5,2M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2,5G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4,8G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;sda
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,02&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4,5k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,0k&nbsp;scd0
  `;

  var speed = 60;

  function typeItOut () {
    if (i == txt.length && done == false) {
      done = true;
      document.getElementById('demo-result').style.display = 'contents';
    }
    
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }

  hljs.highlightAll();
  var elts = document.getElementsByClassName('hljs-string');
  for (var i = 0; i < elts.length; ++i) {
      if (elts[i].innerHTML.includes('tmp')) {
          elts[i].className = 'hljs-comment';
      }
  }
  var elts = document.getElementsByClassName('language-javascript');
  elts[0].innerHTML = elts[0].innerHTML.replace(' ,<span class="hljs-comment">\'cu', '<span class="hljs-comment"> ,</span><span class="hljs-comment">\'cu');
  elts[0].innerHTML = elts[0].innerHTML.replace('us\'</span> , ', 'us\'</span><span class="hljs-comment"> , </span>');

});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');
