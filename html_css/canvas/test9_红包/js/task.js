var myNameSpace = {}
// 初始化各数据
myNameSpace.init = function(){
    let me = myNameSpace;
    // 计算画布宽高
    let w = document.body.clientWidth, h = document.body.clientHeight;
    me.w = w > 960 ? 960 : w;
    me.h = h > 540 ? 540 : h;

    let canvas = me.canvas = document.getElementById('canvas');
    me.context = canvas.getContext('2d');
    canvas.width = me.w;
    canvas.height = me.h;

    let box = document.getElementById('blur-box');
    box.style.width = me.w + 'px';
    box.style.height = me.h + 'px';
    box.style.marginTop = (h - me.h)/2+'px';

    // 清晰区域半径
    me.radius = 50;
    // 最大半径
    me.maxRadius = Math.ceil(Math.sqrt(me.w*me.w+me.h*me.h));
    // 可视区域
    me.clipArea = {x: 0, y: 0, r:me.radius};

    let imgObj = me.imgObj = new Image();
    imgObj.onload = function(){
        
    }
    imgObj.src = "./pic2.jpg";

}
myNameSpace.initCanvas = function(){

}
myNameSpace.drawImg = function(){
    let me = myNameSpace;
    let clipArea = me.clipArea;
    me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);
    me.context.save();
    me.context.beginPath();
    me.context.arc(clipArea.x, clipArea.y, clipArea.r, 0, 2*Math.PI);
    me.context.clip();
    me.context.drawImage(me.imgObj, 0, 0, me.canvas.width, me.canvas.height);    
    me.context.restore();
}

myNameSpace.reset = function(){
    let me = myNameSpace;
    me.clipArea.r = 50;
    let clipArea = me.clipArea;
    let x = (me.canvas.width - 2*clipArea.r) * Math.random() + clipArea.r;
    let y = (me.canvas.height - 2*clipArea.r) * Math.random() + clipArea.r;
    clipArea.x = x;
    clipArea.y = y;
    me.drawImg();
}

myNameSpace.show = function(){
    let me = myNameSpace;
    me.showImg();
}
myNameSpace.showImg = function(){
    let me = myNameSpace;
    me.clipArea.r += 10;
    me.drawImg();
    if (me.clipArea.r < 2000) {
        requestAnimFrame(me.showImg);
    }
}
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

