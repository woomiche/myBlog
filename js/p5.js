jQuery(document).ready(function() {
    landingPage.initialize();
});


var p5 = {

	initialize: function () {
		p5.setup();
		p5.draw();
		p5.keyReleased();
	},

	NUMSINES = 20, // how many of these things can we do at once?
	sines = new Array(NUMSINES), // an array to hold all the current angles
	rad, // an initial radius value for the central sine
	i, // a counter variable

	// play with these to get a sense of what's going on:
	fund = 0.005, // the speed of the central sine
	ratio = 1, // what multiplier for speed is each additional sine?
	alpha = 50, // how opaque is the tracing system

	trace = false, // are we tracing?

	setup: function() {
	  createCanvas(710, 400);

	  rad = height/4; // compute radius for central circle
	  background(204); // clear the screen

	  for (var i = 0; i<sines.length; i++) {
	    sines[i] = PI; // start EVERYBODY facing NORTH
	  }
	},

	draw: function() {
	  if (!trace) {
	    background(204); // clear screen if showing geometry
	    stroke(0, 255); // black pen
	    noFill(); // don't fill
	  }

	  // MAIN ACTION
	  push(); // start a transformation matrix
	  translate(width/2, height/2); // move to middle of screen

	  for (var i = 0; i<sines.length; i++) {
	  	var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
	    // setup for tracing
	    if (trace) {
	      stroke(0, 0, 255*(float(i)/sines.length), alpha); // blue
	      fill(0, 0, 255, alpha/2); // also, um, blue
	      erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
	    }
	    var radius = rad/(i+1); // radius for circle itself
	    rotate(sines[i]); // rotate circle
	    if (!trace) ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
	    push(); // go up one level
	    translate(0, radius); // move to sine edge
	    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
	    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
	    pop(); // go down one level
	    translate(0, radius); // move into position for next sine
	    sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
	  }
	  
	  pop(); // pop down final transformation
	  
	},

	keyReleased: function() {
	  if (key==' ') {
	    trace = !trace; 
	    background(255);
	  }
	}
}