var display = document.getElementById('display');
var precision = 20;

display.addEventListener('mousedown', function () {
	clicked = true;
});

display.addEventListener('mousemove', function (event) {
	mouseX = event.pageX - display.offsetLeft;
	mouseY = event.pageY - display.offsetTop;

	mouseX = Math.round(mouseX / precision) * precision;
	mouseY = Math.round(mouseY / precision) * precision;
});

var exportButton = document.getElementById('export');
exportButton.addEventListener('click', function (event) {
	var toExport = [];
	for (var pointIndex = 0; pointIndex < points.length; pointIndex++)
	{
		var point = points[pointIndex];
		var relativePoint = [point[0] / display.width, point[1] / display.height];
		toExport.push(relativePoint);
	}
	window.open('data:json,' + JSON.stringify(toExport));
});

var undoButton = document.getElementById('undo');
undoButton.addEventListener('click', function (event) {
	points = points.splice(0, points.length - 1);
});

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function (event) {
	points = [];
});

var context = display.getContext('2d');

var mouseX = 0;
var mouseY = 0;

var clicked = false;;

var points = [];

function update()
{
	if (clicked)
	{
		points.push([mouseX, mouseY]);
		clicked = false;
	}
}

function render()
{
	context.clearRect(0, 0, display.width, display.height);
	context.beginPath();
	context.strokeStyle = 'black';
	for (var pointIndex = 0; pointIndex < points.length; pointIndex++)
	{
		var point = points[pointIndex];
		if (pointIndex == 0)
		{
			context.moveTo(point[0], point[1]);
			continue;
		}
		context.lineTo(point[0], point[1]);
	}
	context.stroke();
	context.beginPath();
	context.strokeStyle = 'red';
	if (point)
		context.moveTo(point[0], point[1]);
	context.lineTo(mouseX, mouseY);
	context.stroke();
}

function tick()
{
	update();
	render();
	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
