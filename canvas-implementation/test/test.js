var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

var accuracy = 16;

context.moveTo(0,0);

function Line2DContext(lineTo)
{
  this.lineTo = lineTo;
}

Line2DContext.prototype.rect = function (x, y, width, height) {
  context.beginPath()
    this.lineTo(x, y); // top-left
    this.lineTo(x + width, y); // top-right
    this.lineTo(x + width, y + height); // bottom-right
    this.lineTo(x, y + height);
    this.lineTo(x, y); // top-left
  context.stroke();
}

Line2DContext.prototype.arc = function(x, y, radius) {
  x += radius;
  y += radius;
  context.beginPath()
    var xx = 0;
    var yy = 0;
    var rat = 360 / accuracy;
    for(var i = 0; i < 360 + rat; i+=accuracy) {
      xx = Math.sin(i * (Math.PI / 180)) * radius;
      yy = Math.cos(i * (Math.PI / 180)) * radius;
      this.lineTo(x + xx, y + yy);
    };
  context.stroke();
};

Line2DContext.prototype.roundedRect = function(x, y, radius, width, height) {
    y += radius
    height -= radius;
    context.beginPath()
      this.roundedCorner(x + radius, y, 0,0,radius, "tl");
      this.lineTo(x, y  + height - radius);
      
      this.roundedCorner(x + radius, y + height - radius, 0, 0, radius, "bl")
      this.lineTo(x + width - radius, y + height);
  
      this.roundedCorner(x + width - radius, y + height - radius, 0, 0, radius, "br")
      this.lineTo(x + width, y);
  
      this.roundedCorner(x + width - radius, y, 0,0,radius,"tr")
      this.lineTo(x + radius, y - radius)
    context.stroke();
};

Line2DContext.prototype.drawArrayOfPoints = function(x, y, array) {
  context.beginPath();
  for(var i = 0; i < array.length; i++) {
    this.lineTo(array[i][0], array[i][1]);
  }
  context.stroke();
}

Line2DContext.prototype.roundedCorner = function(x, y, x1, y1, radius, dir) {
  var modifierX = 1;
  var modifierY = 1;
  if(dir == "br") {
    modifierX = 1;
    modifierY = 1;
  } else if(dir == "bl") {
    modifierX = -1;
    modifierY = 1;
  } else if(dir == "tr") {
    modifierX = 1;
    modifierY = -1;
  } else if(dir == "tl") {
    modifierX = -1;
    modifierY = -1;
  }
 
    var xx = 0;
    var yy = 0;
  if(dir == "bl" || dir =="tr") {
    for(var i = 90; i > 0; i -= accuracy) {
      xx = modifierX * Math.sin(i * (Math.PI / 180)) * radius;
      yy = modifierY * Math.cos(i * (Math.PI / 180)) * radius;
      this.lineTo(x + xx, y + yy);
    };
  } else {
    for(var i = 0; i < 90; i += accuracy) {
      xx = modifierX * Math.sin(i * (Math.PI / 180)) * radius;
      yy = modifierY * Math.cos(i * (Math.PI / 180)) * radius;
      this.lineTo(x + xx, y + yy);
    };
  }
    
}



var rad_context = new Line2DContext(function(x, y) {
    context.lineTo(x, y);
});

rad_context.roundedRect(25,25, 50, 450, 150);
rad_context.arc(30,30,50);
rad_context.rect(0,0,500,200);
//rad_context.drawArrayOfPoints(100,100,roundedRect)

// //main
// var floatPoints = [];
// var rad_context = new Line2DContext(function(x, y) {
//   floatPoints.push([x, y]);
// })

// rad_context.roundedRect(100,100,50, 100, 100);







