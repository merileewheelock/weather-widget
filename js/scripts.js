$(document).ready(function(){
	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');

	var assumedTemperature = 65;

	var currentPercent = 0;

	function animateCircle(currentArc){
		// console.log(currentArc);
		// draw inner circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(155,100,70,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill();

		// draw the outter line
		// 5px wide line
		context.lineWidth = 5;
		context.strokeColor = "#ffff00";
		context.beginPath();
		context.arc(155,100,75,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		//Math.PI starts at 3 o'clock; 1.5*Math.PI starts at 12 o'clock
		context.stroke();
		// update the current percentage
		currentPercent++;
		if (currentPercent < assumedTemperature){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100); // this will actually run the function. animateCircle without the () would run what the function returns
			});
		}
	}
	animateCircle();
});

