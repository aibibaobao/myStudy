window.onload = function(){
    myNameSpace.initCanvas();
    
    debugger
}
var myNameSpace = {
    WINDOW_WIDTH : 300, // 画布宽高
    WINDOW_HEIGHT : 300,
    outerLineWidth : 10,  // 时钟外边框宽度
    numSize : 18  // 面盘数字刻度的宽度
};
myNameSpace.initCanvas = function(){
    var canvas = document.getElementById('canvas');
    canvas.width = this.WINDOW_WIDTH;
    canvas.height = this.WINDOW_HEIGHT;

    // 时钟半径为短边一半的五分之四
    var shorter = this.WINDOW_HEIGHT > this.WINDOW_WIDTH ? this.WINDOW_WIDTH : this.WINDOW_HEIGHT;
    this.outRadius = parseInt(shorter*0.4);
    this.innerRadius = this.outRadius - 15;
    this.context = canvas.getContext('2d');

    setInterval(this.initClock.bind(this), 1000); //每隔一秒，更新一次画布
}
myNameSpace.initClock = function(){
    var context = this.context;
    context.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
    context.save(); // 保存画布还没移动中心点的状态

    // 将画布坐标原点移动到画布中心
    context.translate(parseInt(this.WINDOW_WIDTH/2), parseInt(this.WINDOW_HEIGHT/2));
    
    // 画外圈，
    context.beginPath();
    context.lineWidth = this.outerLineWidth;
    context.strokeStyle = '#000';
    context.arc(0, 0, this.outRadius, 0, 2*Math.PI);
    context.stroke();
    context.closePath();

    // 画数字
    var num = 3;
    context.beginPath();
    context.strokeStyle = '#000';
    context.font = this.numSize+'px Verdana';
    context.textBaseline = 'middle';  //设置文本中心的对齐
    context.textAlign = 'center';
    for(let i=0; i<12; i++){
        if(num > 12) num = 1;
        let x = (this.outRadius-30) * Math.cos(i*Math.PI/6);
        let y = (this.outRadius-30) * Math.sin(i*Math.PI/6);
        context.fillText(num, x, y);
        num++;
    }
    context.closePath();

    // 画刻度
    for(let i=0; i<60; i++){
        context.beginPath();
        var r = 2;
        if (i%5 == 0) {
            context.fillStyle = '#000';
            r = 3;
        } else {
            context.fillStyle = '#888';
        }
        let x = this.innerRadius * Math.cos(i*Math.PI / 30);
        let y = this.innerRadius * Math.sin(i*Math.PI / 30);
        context.arc(x, y, r, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }
    
    myNameSpace.updateTime();

    context.restore(); // 还原到还没有改变画布中心的状态
}
myNameSpace.updateTime = function(){
    var context = this.context;
    var now = new Date();
    var hour = now.getHours()%12;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    document.getElementsByTagName('p')[0].innerHTML = now.getFullYear() + '.' + (now.getMonth()+1) + '.' + now.getDay() + '  ' + hour + ':' + minute + ':' + second;
    // 画时针
    context.save();
    context.beginPath();
    context.rotate(2*Math.PI*hour/12+minute*Math.PI/6/60);
    context.strokeStyle = '#000'; //线条倾斜时，有锯齿状
    context.lineWidth = 6;
    context.lineCap = 'round';
    context.moveTo(0, parseInt(0.1*this.innerRadius));
    context.lineTo(0, -parseInt(0.6*this.innerRadius));
    context.stroke();

    // context.fillRect(-3, -parseInt(0.5*this.innerRadius), 6, parseInt(this.innerRadius*0.6));
    

    context.closePath();
    context.restore();

    // 画分针
    context.save();
    context.beginPath();
    context.rotate(minute*2*Math.PI/60);
    context.strokeStyle = '#000';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.moveTo(0, parseInt(0.1*this.innerRadius));
    context.lineTo(0, -parseInt(this.innerRadius*0.8));
    context.stroke();
    context.closePath();
    context.restore();

    // 画秒针
    context.save();
    context.rotate(second*Math.PI*2/60);
    context.beginPath();
    context.fillStyle = '#d00';
    context.moveTo(-2, parseInt(0.1*this.innerRadius));
    context.lineTo(2, parseInt(0.1*this.innerRadius));
    context.lineTo(1, -this.innerRadius);
    context.lineTo(-1, -this.innerRadius);
    // context.fillRect(-1, -this.innerRadius, 2, parseInt(this.innerRadius*1.1));
    context.fill();
    context.closePath();
    context.restore();

    // 画中心圆
    context.beginPath();
    context.fillStyle = '#fff';
    context.strokeStyle = '#000';
    context.lineWidth = 1;
    context.arc(0, 0, 3, 0, 2*Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}
