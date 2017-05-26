var starObj = function(){
	this.x;
	this.y;

	this.imgNo;
	this.timer;

	this.vx;
	this.vy;
}

// 定义星星的活动范围
starObj.prototype.minX = 100;
starObj.prototype.maxX = 700;
starObj.prototype.minY = 150;
starObj.prototype.maxY = 450;

starObj.prototype.init = function(){
	// 初始化最初显示的位置
	this.x = Math.random()*600 + 100;
	this.y = Math.random()*300 + 150;
	this.imgNo = Math.floor(Math.random()*7);
	this.timer = 0;

	// 移动速度
	this.vx = (Math.random()*3 - 1.5) * 0.04;
	this.vy = (Math.random()*3 - 1.5) * 0.04;
}
starObj.prototype.update = function(){
	this.timer += myNamespace.deltaTime;
	if (this.timer > 50) {
		this.imgNo = (++this.imgNo)%7;
		this.timer = 0;
	}
	this.x += this.vx;
	this.y += this.vy;
	if (this.x < this.minX || this.x > this.maxX-7 || this.y < this.minY || this.y > this.maxY-7) {
		this.init();
	}
}
starObj.prototype.draw = function(){
	myNamespace.context.drawImage(myNamespace.starImg, 7*this.imgNo, 0, 7, 7, this.x, this.y, 7, 7);
	this.update();
}


