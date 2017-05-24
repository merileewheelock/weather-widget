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
			var currTemp = Math.floor(weatherData.main.temp);
			var maxTemp = Math.floor(weatherData.main.temp_max);
			var minTemp = Math.floor(weatherData.main.temp_min);
			

			$(".currTempText").html('curr temp: '+currTemp+'&deg;F');
			$(".maxTempText").html('max temp: '+maxTemp+'&deg;F');
			$(".minTempText").html('min temp: '+minTemp+'&deg;F');
			
			// newHTML += '<div>The temp in ' + name + ' is currently ' + currTemp + '&deg;</div>';
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;
			var newHTML = '<div><img src="http://openweathermap.org/img/w/'+icon+'"></div>' + '<div><strong>'+desc+'</strong></div>';
			$('.temp-info-icon').html(newHTML);
			currentPercent = 0;
			animateCircle(0,currTemp);	
		});
	});

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var assumedTemperature = 65;
	var currentPercent = 0;

	function animateCircle(currentArc, currentTemp){
		context.clearRect(0,0,400,400);
		// console.log(currentArc);
		// draw inner circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(200,200,150,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill();

		// draw the outter line
		// 5px wide line
		context.lineWidth = 10;
		// context.strokeStyle = "red";
		context.beginPath();
		context.arc(200,200,155,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		//Math.PI starts at 3 o'clock; 1.5*Math.PI starts at 12 o'clock
		context.stroke();
		// update the current percentage
		currentPercent++;
		// console.log(currentArc);

		if (currentTemp <= 32){
			context.strokeStyle = "darkblue";
		}else if (currentTemp < 80){
			context.strokeStyle = "yellow";
		}else if (currentTemp >= 80){
			context.strokeStyle = "red";
		}

		if (currentTemp != undefined){
			context.stroke();
			context.font = "72px Khula";
			context.fillStyle = "darkblue";
			context.textBaseline = "top";
			context.fillText(currentTemp+String.fromCharCode(176)+'F',140,160);
		}

		if (currentPercent < currentTemp){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100, currentTemp); // this will actually run the function. animateCircle without the () would run what the function returns
			});
		}
	}
	animateCircle();
});

