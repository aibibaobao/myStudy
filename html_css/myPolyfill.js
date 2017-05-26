// 动画API 根据浏览器设备性能调用其参数函数，相当于setTimeOut(callback,time) time由浏览器自己定
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            var timer = window.setTimeout(callback, 1000 / 60);
            return timer;
          };
})();
window.cancelAnimationFrame = (function(){
    return  window.cancelAnimationFrame       ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame    ||
            function( timer ){
                window.clearTimeout(timer);
            };
})();