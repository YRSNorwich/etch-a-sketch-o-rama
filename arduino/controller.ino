//              x, y   x, y    x, y
int points[] = {0,0, 100,100, 200,200, 10,300};

int from[] = {0,0};
int to[] = {0,0};

int dx = 0;
int dy = 0;
int sx = 0;
int sy = 0;
int err = 0;
int toIndex = 1;

boolean linedone = true;
void doBreshnan() {
  if(linedone == true) {
        if(toIndex > 4) {
          return;  
        }
          toIndex++;
          from[0] = points[toIndex - 1];
          from[1] = points[toIndex];
          to[0] = points[toIndex + 1];
          to[1] = points[toIndex + 2];
          dx = abs(to[0] - from[0]);
          dy = abs(to[1] - from[1]);

          if(from[0] < to[0]) {
            sx = 1;
          } else {
            sx = -1;
          }
          
          if(from[1] < to[1]) {
            sy = 1;  
          } else {
            sy = -1;
          }
          //err = (dx > dy ? dx : -dy)/2;
          if(dx > dy) {
           err = dx / 2; 
            
          } else {
            err = dy / 2;
          
          }
          linedone = false;
         }
        
        
        if(from[0] == to[0] && from[1] == to[1]) {
            linedone = true;
            return;    
        }
        
        int e2 = err;
        
        if(e2 > -dx) {
          err -= dy;
          from[0] += sx;
          
          moveLR(sx);
        }
    
        if(e2 < dy) {
          err += dx;
          from[1] += sy;
          
          moveUD(sy);        
        }
        return;
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
void loop() {
 
  delay(25);
  doBreshnan();
  
  
}

