//              x, y   x, y    x, y
int points[] = {0,0, 100,100, 0,100, 100,0, 0,0, 300,200};

int from[2];
int to[2];

int dx = 0;
int dy = 0;
int sx = 0;
int sy = 0;
int err = 0;

int toIndex = 0;

int sizeArray = 6;

boolean linedone = true;

void line(int x0, int y0, int x1, int y1) {
 
  int dx = abs(x1-x0), sx = x0<x1 ? 1 : -1;
  int dy = abs(y1-y0), sy = y0<y1 ? 1 : -1; 
  int err = (dx>dy ? dx : -dy)/2, e2;
 
  for(;;){
    moveUD(sy);
    moveLR(sx);
    if (x0==x1 && y0==y1) break;
    e2 = err;
    if (e2 > -dx) { 
      err -= dy; x0 += sx; 
    }
    if (e2 < dy) {
     err += dx; y0 += sy; 
    }
  }
}

int moveUD(int sy) {
  Serial.print(sy);
}

int moveLR(int sx) {
  Serial.print(sx);

}

// the setup routine runs once when you press reset:
void setup() {                
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
int ticker = 0;
void loop() {
 
  delay(25);
  
  
  if(ticker < sizeArray) {
    line(points[ticker], points[ticker+1], points[ticker+2], points[ticker+3]);
  }

  ticker++;
  
 
  
  
}

