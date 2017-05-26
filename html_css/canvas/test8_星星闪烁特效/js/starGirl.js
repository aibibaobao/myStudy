var myNamespace = {};
myNamespace.init = function(canvasWidth, canvasHeight){
    let me = this;
    let canvas = me.canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 600;
    me.context = canvas.getContext('2d');

    // 先加载所有的图片资源
    let girlImg = me.girlImg = new Image(); 
    girlImg.src = 'img/girl.jpg';
    let starImg = me.starImg = new Image();
    starImg.src = 'img/star.png';

    // 初始化60个星星
    me.stars = [];
    for(let i=0; i<60; i++){
        let obj = new starObj();
        me.stars.push(obj);
        obj.init();
    }

    // 记录上一次的时间
    me.lastTime = Date.now();
    // 两帧之间的时差，在做动画即属性变化的时候可以参考这个值
    me.deltaTime = 0;
    // 标识鼠标是否移动到图片上
    me.isShowStar = false;
    // 绘制星星的透明度
    me.opacity = 0;

    let box = me.canvas.getBoundingClientRect();
    me.range = {minX:box.left+100, maxX:box.left+100+600, minY:box.top+150, maxY:box.top+150+300};
    console.log(me.range)
    me.canvas.addEventListener('mousemove', function(event){
        if (event.clientX > me.range.minX && event.clientX < me.range.maxX && event.clientY > me.range.minY && event.clientY < me.range.maxY) {
            me.isShowStar = true;
        } else {
            me.isShowStar = false;
        }
    });
    me.gameloop();
    
}
// 画背景
myNamespace.drawBackground = function(){
    let me = this;
    let context = me.context, canvas = me.canvas;
    context.fillStyle = '#393550';
    context.fillRect(0, 0, canvas.width, canvas.height);
};

// 画女孩
myNamespace.drawGirl = function(){
    let me = myNamespace;
    me.context.drawImage(me.girlImg, 100, 150, 600, 300);
}

// 画所有星星
myNamespace.drawAllStars = function(stars){
    let context = myNamespace.context;
    context.save();
    context.globalAlpha = myNamespace.opacity;
    for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
    context.restore();
}

// 星星的透明度，是否显示星星
myNamespace.liveUpdate = function(){
    let me = myNamespace;
    if (me.isShowStar) {
        me.opacity += 0.03;
        me.opacity = me.opacity > 1 ? 1 : me.opacity;
    } else {
        me.opacity -= 0.03;
        me.opacity = me.opacity < 0 ? 0 : me.opacity;
    }
}
// 重绘
myNamespace.gameloop = function(){  // 这里面不能用this，因为该函数作为回调函数传给requestAnimFrame，此时this并不是myNamespace,而是windows
    let now = Date.now();
    myNamespace.deltaTime = now - myNamespace.lastTime;
    myNamespace.lastTime = now;
    myNamespace.drawBackground();
    myNamespace.drawGirl();
    myNamespace.liveUpdate();
    myNamespace.drawAllStars(myNamespace.stars);
    requestAnimFrame(myNamespace.gameloop);
};


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