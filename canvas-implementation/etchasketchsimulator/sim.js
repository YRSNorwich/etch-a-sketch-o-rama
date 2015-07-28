var points = [[75,25],[61,26],[48,32],[37,41],[30,53],[25,66],[25,125],[25,125],[26,138],[32,151],[41,162],[53,169],[66,174],[425,175],[425,175],[438,173],[451,167],[462,158],[469,146],[474,133],[475,75],[475,75],[473,61],[467,48],[458,37],[446,30],[433,25],[75,25],[80,130],[93,128],[106,122],[117,113],[124,101],[129,88],[129,74],[126,61],[119,49],[109,39],[97,33],[83,30],[69,31],[56,35],[45,44],[36,54],[31,67],[30,81],[32,95],[38,107],[47,118],[59,125],[73,129],[86,129],[0,0],[500,0],[500,200],[0,200],[0,0]];

points.reverse();

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;

var currEle = null;

var pointerX = 0;
var pointerY = 0;
var currI = 1;
var vX = 0;
var vY = 0;

var toIndex = 0;
var lineDone = true;

var from;
var to;

var dx;
var dy;
var err;
var sx;
var sy;
var i = 0;

function update() {
   //uses naive line drawing algorithm
   //naive();
 
  //Uses the breshnan algorithm

  runBreshnan()
  
}

function naive() {
   var currEle = (points[currI])

   var dX = (currEle[0] - pointerX);
   var dY = (currEle[1] - pointerY);
  
   var dist = Math.sqrt(dX * dX + dY * dY);


   if(dist < 1) {
     currI++;
     return;
   }
  
   if(dX > 0) {
     pointerX += 1;
   } else if(dX < 0) {
     pointerX -= 1;
   }
  
   if(dY > 0) {
     pointerY += 1;
   } else if(dY < 0) {
     pointerY -= 1;
   }


}

function runBreshnan() {
  var nextDir = [];
  if (lineDone)
  {
    if (toIndex > points.length)
    {
      return nextDir;
    }
    toIndex += 1;
    from = points[toIndex - 1];
    to = points[toIndex];
    dx = Math.abs(to[0] - from[0]);
    sx = from[0] < to[0] ? 1 : -1;
    dy = Math.abs(to[1] - from[1]);
    sy = from[1] < to[1] ? 1 : -1; 
    err = (dx>dy ? dx : -dy)/2;
    lineDone = false;
  }
 
  nextDir = ([from[0], from[1]]);
  if (from[0] === to[0] && from[1] === to[1])  {
    lineDone = true;
    return nextDir;
  }
  
  var e2 = err;
  
  if (e2 > -dx) { 
    err -= dy; 
    from[0] += sx;
    pointerX += sx;
  }
  if (e2 < dy) { 
    err += dx; 
    from[1] += sy; 
    pointerY += sy;
  }
  
  
  return nextDir;
}

function render() {
  update();
  context.fillRect(pointerX, pointerY, 1, 1);
  requestAnimationFrame(render);
}


render();













