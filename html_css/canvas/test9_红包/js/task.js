var myNameSpace = {
    canvasWidth: 960,
    canvasHeight: 540,
    timer: null
}
myNameSpace.clipArea = {x: 400, y:300, r:50};
myNameSpace.init = function(){
    let me = myNameSpace;
    let canvas = me.canvas = document.getElementById('canvas');
    me.context = canvas.getContext('2d');
    canvas.width = me.canvasWidth;
    canvas.height = me.canvasHeight;

    let imgObj = me.imgObj = new Image();
    imgObj.onload = function(){
        me.drawImg()
    }
    imgObj.src = "./pic2.jpg";

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