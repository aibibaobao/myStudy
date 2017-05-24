var myNameSpace = {}

myNameSpace.init = function (canvasWidth, canvasHeight) {
    let me = this;
    me.canvasHeight = canvasHeight || 600;
    me.canvasWidth = canvasWidth || 600;
    let canvas = me.canvas = document.getElementById('canvas');
    me.canvas.width = me.canvasWidth;
    me.canvas.height = me.canvasHeight;
    me.context = me.canvas.getContext('2d');
    me.isMouseDown = false; // 记录鼠标按下
    me.lastLoc = {x:0, y:0}; // 记录上一次的点
    me.lastTimestamp = 0; // 记录上一次的时间戳
    me.lastLinewidth = 0; //上一次线条宽
    me.strokeStyle = '#000';

    // pc端
    canvas.onmousedown = function (event) {
        event.preventDefault();
        me.beginStroke({x: event.clientX, y: event.clientY});
    };
    
    canvas.onmousemove = function (event) {
        event.preventDefault();
        me.moveStroke({x: event.clientX, y: event.clientY});
    };
    canvas.onmouseout = function (event) {
        event.preventDefault();
        me.endStroke();
    };
    canvas.onmouseup = function (event) {
        event.preventDefault();
        me.endStroke();
    };

    // 移动端
    canvas.addEventListener('touchstart', function (event) {
        event.preventDefault();
        let touch = event.touches[0];
        console.log(touch)
        // clienY 相对于浏览器左上角
        // pageY 相当于文档的左上角，若有滚动条会算上滚动条向上滚动的距离
        me.beginStroke({x: touch.clientX, y: touch.clientY}); 
    });
    canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        let touch = event.touches[0];
        me.moveStroke({x: touch.clientX, y: touch.clientY}); 
    });
    canvas.addEventListener('touchend', function (event) {
        event.preventDefault();
        me.endStroke(); 
    });

    // 画笔颜色选择
    let colors = $('#container>.color-choose');
    $.each(colors, function (index, elem) {
        $(elem).click(function (event) {
            colors.removeClass('color-has-choosed');
            me.strokeStyle = $(this).css('background-color');
            $(this).addClass('color-has-choosed');
        });
    });

    // 画布清除
    $('#container').find('.clear-btn').click(function () {
        me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);
        // me.drawGrid();
        me.drawDashGrid();
    });
}

myNameSpace.drawGrid = function () {
    let me = this, context = me.context, canvas = me.canvas;
    context.save();
    context.lineWidth = 6;
    context.strokeStyle = 'red';
    context.strokeRect(3, 3, canvas.width-6, canvas.height-6);
    
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);

    context.moveTo(canvas.width, 0);
    context.lineTo(0, canvas.height);

    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2, canvas.height);

    context.moveTo(0, canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.closePath();

    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();
    context.restore();
}
myNameSpace.drawDashGrid = function () {
    let me = this, context = me.context, canvas = me.canvas;
    context.save();
    context.lineWidth = 6;
    context.strokeStyle = 'red';
    context.strokeRect(3, 3, canvas.width-6, canvas.height-6);
    let step = 8;
    context.beginPath();
    me.drawDashedLine({x:0, y:0}, {x:canvas.width, y:canvas.height}, step);
    me.drawDashedLine({x:canvas.width, y:0}, {x:0, y:canvas.height}, step);
    me.drawDashedLine({x:canvas.width/2, y:0}, {x:canvas.width/2, y:canvas.height}, step);
    me.drawDashedLine({x: 0, y:canvas.height/2}, {x:canvas.width, y:canvas.height/2}, step);
    context.closePath();

    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();
    context.restore();
}
myNameSpace.drawDashedLine = function (begin, end, length) {
    let context = myNameSpace.context;
    let stepX, stepY, count;
    if (begin.x == end.x) {
        stepX = 0;
        stepY = end.y > begin.y ? length : -length;
        count = (end.y - begin.y) / length;
    } else {
        let angle = Math.atan((begin.y-end.y)/(begin.x-end.x));
        stepY = Math.abs(length * Math.sin(angle));
        stepX = Math.abs(length * Math.cos(angle));
        count = Math.floor(Math.abs(end.x - begin.x) / stepX);
        stepX = end.x > begin.x ? stepX : -stepX;
        stepY = end.y > begin.y ? stepY : -stepY;
    }
    for (let i=0; i<count; i++) {
        if (i%2 == 0) {
            context.moveTo(begin.x + i*stepX, begin.y + i*stepY);
        } else {
            context.lineTo(begin.x + i*stepX, begin.y + i*stepY);
        }
    }
}
myNameSpace.windowToCanvas = function (clientX, clientY) {
    let box = myNameSpace.canvas.getBoundingClientRect();
    return {x: clientX-box.left, y: clientY-box.top};
}

myNameSpace.beginStroke = function (point) {
    myNameSpace.isMouseDown = true;
    myNameSpace.lastLoc = myNameSpace.windowToCanvas(point.x, point.y);
    myNameSpace.lastTimestamp = new Date().getTime();
}
myNameSpace.endStroke = function () {
    myNameSpace.isMouseDown = false;
}

myNameSpace.moveStroke = function (point) {
    
    if(!myNameSpace.isMouseDown){
        return;
    }
    let curLoc = myNameSpace.windowToCanvas(point.x, point.y);
    let curTimestamp = new Date().getTime();
    let t = curTimestamp - myNameSpace.lastTimestamp; //距离上次所用的时间
    let s = myNameSpace.calcDistance(curLoc, myNameSpace.lastLoc);
    let lineWidth = myNameSpace.calcLineWidth(t, s);

    // 绘制
    let context = myNameSpace.context;
    context.beginPath();
    context.moveTo(myNameSpace.lastLoc.x, myNameSpace.lastLoc.y);
    context.lineTo(curLoc.x, curLoc.y);

    context.lineCap = 'round';
    context.lineJoin= 'round';
    context.lineWidth = lineWidth;
    context.strokeStyle = myNameSpace.strokeStyle;
    context.stroke();

    myNameSpace.lastLoc = curLoc;
    myNameSpace.lastTimestamp = curTimestamp;
    myNameSpace.lastLinewidth = lineWidth;
}

myNameSpace.maxLinewidth = 25;
myNameSpace.minLinewidth = 2;
myNameSpace.maxV = 10;
myNameSpace.minV = 0.1;
myNameSpace.calcLineWidth = function (t, s) {
    let me = myNameSpace;
    let v = s/t, result;
    if(v <= me.minV) result = me.maxLinewidth;
    else if(v >= me.maxV) result = me.minLinewidth;
    else result = me.maxLinewidth - (v-me.minV)/(me.maxV-me.minV)*(me.maxLinewidth-me.minLinewidth);
    if(!myNameSpace.lastLinewidth) return result;
    return result*1/3 + myNameSpace.lastLinewidth*2/3;
}
myNameSpace.calcDistance = function (loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))  ;
}

