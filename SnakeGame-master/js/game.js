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
})()


