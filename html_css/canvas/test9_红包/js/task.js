var myNameSpace = {
    canvasWidth: 1200,
    canvasHeight: 600
}

myNameSpace.init = function(){
    let me = myNameSpace;
    let canvas = me.canvas = document.getElementById('canvas');
    me.context = canvas.getContext('2d');
    canvas.width = me.canvasWidth;
    canvas.height = me.canvasHeight;
    me.drawBackImg();
}

myNameSpace.drawBackImg = function(){
    let me = myNameSpace;
    me.context.save();

    let imgObj = new Image();
    imgObj.onload = function(){
        me.context.drawImage(imgObj, 0, 0, me.canvas.width, me.canvas.height);    
    }
    imgObj.src = "./girl.jpg";
    
    me.context.restore();
}
