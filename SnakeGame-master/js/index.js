//----------------------------------------tool-----------------------------------

(function() {
	var Tools = {
	getRandom: function (min, max) {
		//min = Math.ceil(min);
		//max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
 window.Tools = Tools;
})();


//----------------------------------------food-------------------------------------
(function (){
var position = 'absolute';
var elements = [];
function Food(options) {

	//动态创建变量
	options = options || {};
	this.backgroundColor = options.backgroundColor || 'green';
	this.width = options.width || 20;
	this.height = options.height || 20;
	this.x = options.x || 0;
	this.y = options.y || 0;
}
Food.prototype.render = function(map) {
	//删除食物
	remove();
	this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
	this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
	

	var div = document.createElement('div');
	map.appendChild(div);
	elements.push(div);
	div.style.position = position;
	div.style.left = this.x + 'px';
	div.style.top = this.y + 'px';
	div.style.width = this.width + 'px';
	div.style.height = this.height + 'px';
	div.style.backgroundColor = this.backgroundColor;
} 
function remove() {
	for (var i = elements.length - 1; i >= 0; i--){
		elements[i].parentNode.removeChild(elements[i]);
		elements.splice(i, 1);
	}
}
	window.Food = Food;
})();

//-------------------------------------------snake------------------------------------
(function(){
var position = 'absolute';
var elements = [];
function Snake(options) {
	options = options || {};
	this.width = options.width || 20;
	this.height = options.height || 20;
	this.direction = options.direction || 'right';
	this.body = [
	   {x: 3, y: 2, color:'red'},
	   {x: 2, y: 2, color:'blue'},
	   {x: 1, y: 2, color:'blue'}
	]
}

Snake.prototype.render = function(map) {
	//删除创建的蛇
	remove();
	for (var i = 0, len = this.body.length; i < len; i++){
		var object = this.body[i];
		var div = document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = object.color;
		div.style.position = position;
		div.style.left = object.x * this.width + 'px';
		div.style.top = object.y * this.height + 'px';
	}

  function remove() {
	for(var i = elements.length - 1; i >=0; i--){
		elements[i].parentNode.removeChild(elements[i]);
		elements.splice(i, 1);
	}

}
}

Snake.prototype.move = function(food, map) {
	//蛇身的位置
	for (var i = this.body.length - 1; i > 0; i--){
		this.body[i].x =this.body[i - 1].x;
		this.body[i].y =this.body[i - 1].y;
	}	
	//蛇头的位置
	var head = this.body[0];
	switch (this.direction) {
		case 'right':
			head.x += 1;
			break;
		case 'left':
			head.x -= 1;
			break;
		case 'top':
			head.y -= 1;
			break;
		case 'bottom':
			head.y += 1; 
			break;
	}
	//判断蛇头的的坐标是否与食物重合；
	 var headX = head.x * this.width;
	 var headY = head.y * this.height;
	 if(headX === food.x && headY === food.y){
	 	//让蛇增加一节
	 	var last = this.body[this.body.length - 1];
	 	this.body.push({
	 		x: last.x,
	 		y: last.y,
	 		color: last.color
	 	})
	 	//渲染到地图上
	 	food.render(map);
	 	

	 }
	 
}
window.Snake = Snake;
})();

//---------------------------------------------------game--------------------------------
(function () {
	var that;
	function Game(map) {
	this.food = new Food();
	this.snake = new Snake();
	this.map = map;
	that = this;
}
Game.prototype.start = function() {

	this.food.render(this.map);
	this.snake.render(this.map);
	this.snake.move(this.map);
	
	runSnake();
	bindkey();
}
function bindkey(){ 
	document.addEventListener('keydown',function(e){
		//console.log(e.keyCode);
		//37-left 38-top 39-right 40-bottom
		switch(e.keyCode){
			case 37:
			that.snake.direction = 'left';
			break;
			case 38:
			that.snake.direction = 'top';
			break;
			case 39:
			that.snake.direction = 'right';
			break;
			case 40:
			that.snake.direction = 'bottom';
			break;
		}
	},false);
}
function runSnake() {

	var timerId = setInterval(function(){
		that.snake.move(that.food,that.map);
		that.snake.render(that.map);

		var maxX = that.map.offsetWidth / that.snake.width;
		var maxY = that.map.offsetHeight / that.snake.height;
		var headX = that.snake.body[0].x;
		var headY = that.snake.body[0].y;
		if (headX < 0 || headX >= maxX) {
            alert('Game Over');
            clearInterval(timerId);
		}
		if (headY < 0 || headY >= maxY) {
            alert('Game Over');
            clearInterval(timerId);
		}
	},150); 


}

window.Game = Game;
})();

//---------------------------------------------main-----------------------------------
(function () {
	var map = document.getElementById('map');
	var game = new Game(map);
	game.start();
})();