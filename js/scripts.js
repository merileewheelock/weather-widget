// apiKey is included in config.js
// .gitignore is ignoring file from git

$(document).ready(function(){

	const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';

	$('#weather-form').submit(function(){
		event.preventDefault();
		// console.log("User submitted the form");
		// Don't need a click listener because the type=submit
		var zipCode = $('#zip-code').val();
		// console.log(zipCode);
		// Below is dynamically building the URL
		var weatherUrl = `${weatherApi}?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
		// console.log(weatherUrl);
		$.getJSON(weatherUrl, (weatherData)=>{
			// console.log(weatherUrl);
			var currTemp = weatherData.main.temp;
			// var temps = {
			// 	curr: weatherData.main.temp,
			// 	max: weatherData.main.temp_max,
			// 	min: weatherData.main.temp_min,
			// }
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;
			var newHTML = '<img src="http://openweathermap.org/img/w/'+icon+'">' + desc;
			newHTML += '<div>The temp in ' + name + ' is currently ' + currTemp + '&deg;</div>';
			// console.log(newHTML);
			$('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0,currTemp);
		});
	});

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var assumedTemperature = 65;
	var currentPercent = 0;

	function animateCircle(currentArc, currentTemp){
		// console.log(currentArc);
		// draw inner circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(250,250,150,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill();

		// draw the outter line
		// 5px wide line
		context.lineWidth = 10;
		context.strokeColor = "black";
		context.beginPath();
		context.arc(250,250,155,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		//Math.PI starts at 3 o'clock; 1.5*Math.PI starts at 12 o'clock
		context.stroke();
		// update the current percentage
		currentPercent++;
		if (currentPercent < assumedTemperature){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100, currentTemp); // this will actually run the function. animateCircle without the () would run what the function returns
			});
		}
	}
	animateCircle();
});

