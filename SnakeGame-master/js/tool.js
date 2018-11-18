//工具对象
(function() {
	var Tools = {
	getRandom: function (min, max) {
		//min = Math.ceil(min);
		//max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
 window.Tools = Tools;
})()


