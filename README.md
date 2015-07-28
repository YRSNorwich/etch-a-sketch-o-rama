# etch-a-sketch-o-rama
A rad project for drawing totally tubular things on an Etch A Sketch. To the max!

## stack

- Data Formatter		Node

	V Draw instructions V
- Canvas Implementation		Node

	V Point array (proportional floats) V
- Arduino Driver		Node

	V Step array (int) V
- Arduino Enacter		Arduino C

	V Movement V

## todo

### data formatter
1. [ ] Find interesting data sources
1. [ ] Write code to fetch data from sources
1. [ ] Cache data
1. [ ] Layout data with canvas
1. [ ] Test functions with HTML5 canvas
1. [ ] Work out way of switching between data (in a pleasing manner)
1. [ ] Work on demo screens

### canvas implementation
1. [X] Implement functions using only lineTo
1. [X] Test functions
1. [ ] Text generation
1. [ ] Black and white image drawing

### arduino driver
1. [ ] Create Arduino protocol
1. [ ] Convert given points to 2D relative step array
1. [ ] Work on calibration routine to hardcode values
1. [ ] Pass values to the Arduino
1. [ ] Add checks to ensure values do not exceed bounds

### arduino enacter
1. [ ] Move motors by given amount of steps
1. [ ] Implement Arduino protocol (relies on #1 of arduino driver)

###Useful Links
Array passing
http://forum.arduino.cc/index.php?topic=44451.0
Node serial communication
http://danialk.github.io/blog/2014/04/12/arduino-and-nodejs-communication-with-serial-ports/
--
https://github.com/voodootikigod/node-serialport
