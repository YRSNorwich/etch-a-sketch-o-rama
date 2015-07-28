'use strict';

function Line2DContext(lineTo) {
	this.lineTo = lineTo;
};

Line2DContext.prototype.rect = function (x, y, width, height) {
    this.lineTo(x, y); // top-left
    this.lineTo(x + width, y); // top-right
    this.lineTo(x + width, y + height); // bottom-right
    this.lineTo(x, y + height);
    this.lineTo(x, y); // top-left
}

Line2DContext.prototype.arc = function(x, y, radius) {
    var xx = 0;
    var yy = 0;
    for(var i = 0; i < 360; i++) {
      xx = Math.sin(i * (Math.PI / 180)) * radius;
      yy = Math.cos(i * (Math.PI / 180)) * radius;
      this.lineTo(x + xx, y + yy);
    };
};

Line2DContext.prototype.roundedRect = function(x, y, radius, width, height) {
      this.roundedCorner(x, y, 0,0,radius, "tl");
      this.lineTo(x - radius, y  + height);
      
      this.roundedCorner(x, y + height, 0, 0, radius, "bl")
      this.lineTo(x + width, y + height + radius);
  
      this.roundedCorner(x + width, y + height, 0, 0, radius, "br")
      this.lineTo(x + width + radius, y);
  
      this.roundedCorner(x + width, y, 0,0,radius,"tr")
      this.lineTo(x, y - radius)
};

Line2DContext.prototype.drawArrayOfPoints = function(x, y, array) {
  for(var i = 0; i < array.length; i++) {
    this.lineTo(array[i][0], array[i][1]);
  }
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
  };   
};


module.exports = Line2DContext;
