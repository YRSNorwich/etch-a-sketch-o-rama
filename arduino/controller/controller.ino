#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_PWMServoDriver.h"

Adafruit_MotorShield AFMS = Adafruit_MotorShield();
Adafruit_StepperMotor *myStepper1 = AFMS.getStepper(200, 1);
Adafruit_StepperMotor *myStepper2 = AFMS.getStepper(200, 2);

int points[] = {0,0, 30,
  48,
  52,
  48,
  52,
  24,
  30,
  24,
  30,
  48,
  30,
  24,
  40,
  8,
  52,
  24,
  52,
  48,
  44,
  48,
  44,
  37,
  38,
  37,
  38,
  48,
  30,
  48,
  18,
  48,
  18,
  40,
  30,
  40,
  30,
  24,
  42,
  10,
  44,
  13,
  34,
  24,
  38,
  24,
  46,
  16,
  48,
  18,
  44,
  24,
  48,
  24,
  50,
  24,
  50,
  21,
  52,
  24,
  52,
  29,
  30,
  29,
  30,
  32,
  52,
  32,
  42,
  29,
  30,
  32,
  0,
  0
 };


void setup()
{  
  Serial.begin(9600);
  AFMS.begin();
  myStepper1->setSpeed(60);
  myStepper2->setSpeed(60);
  
  int point_len = sizeof(points) / sizeof(points[0]) / 2;

  for(int i = 1; i < point_len; i++) {
    int array_base = i * 2;
    int x0 = points[array_base-2] * 5 ;
    int y0 = points[array_base-1] * 5;

    int x1 = points[array_base] * 5;
    int y1 = points[array_base+1] * 5;

    line(x0, y0, x1, y1);
  };
}



void loop()
{
  
  
  
  
  
  
}



void line(int x0, int y0, int x1, int y1) {
  int dx = abs(x1-x0);
  int sx = x0<x1 ? 1 : -1;
  int dy = abs(y1-y0);
  int sy = y0<y1 ? 1 : -1; 
  int err = (dx>dy ? dx : -dy)/2, e2;
 
  for(;;){
    if (x0==x1 && y0==y1) break;
    e2 = err;
    if (e2 >-dx) { 
      err -= dy; 
      x0 += sx;
      //use sx from here
      
      if(sx < 0) {
       myStepper1->step(1, FORWARD, DOUBLE);
      } else {
        myStepper1->step(1, BACKWARD, DOUBLE);
      }
     }
    if (e2 < dy) { 
       err += dx; 
       y0 += sy; 
      //use sy from here.
      
      if(sy < 0) {
       myStepper2->step(1, FORWARD, DOUBLE);
      } else {
        myStepper2->step(1,BACKWARD, DOUBLE);
      }
    }
  }
}
