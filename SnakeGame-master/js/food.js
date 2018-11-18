//x,y,width,height
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


// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);
