// This source code is property of the Computer Graphics and Visualization 
// chair of the TU Dresden. Do not distribute! 
// Copyright (C) CGV TU Dresden - All Rights Reserved
#version 130

in vec4 fragment_color;
in vec4 point_position;
out vec4 color;

uniform float m;
uniform vec2 c;

uniform int julia;

void main(void)
{
	
	if (julia == 1){
	//color = fragment_color + vec4(0.0);

	 /**** Begin of tasks ***
	 - 1.2.5
	 Implement the pseudo-code for calculating the julia fractal at a point.
	 To get the point you can declare a new "in" variable which contains the
	 position and just use the X- and Y- value. 

	 *** End of tasks ***/

	//vec2 c = vec2(0.5, 0.5);
	//float m = 0.6;
	int n = 200;

    vec2 z;
	z.x = m*point_position.x;
	z.y = m*point_position.y;
	int i;

    for (i=0; i<n; i++){
	    float x = (z.x * z.x - z.y * z.y) + c.x;
	    float y = (z.y * z.x + z.x * z.y) + c.y;

	    if((x * x + y * y) > 4){
	        break;
	    }
		z.x = x;
		z.y = y;
	}

	float alpha = 0.0;

	if (i < n){
	alpha = float(i)/float(n);
	}

	color = vec4(alpha, alpha, alpha, alpha) * 10.0 * fragment_color;

	} else {

	int n = 200;

    vec2 z, k;
	z.x = point_position.x;
	z.y = point_position.y;


    k.x = point_position.x * m;
    k.y = point_position.y;

    int i;
    z = k;
    for (i=0; i<n; i++){
	    float x = (z.x * z.x - z.y * z.y) + k.x + c.x;
	    float y = (z.y * z.x + z.x * z.y) + k.y;

	    if((x * x + y * y) > 4){
	        break;
	    }
		z.x = x;
		z.y = y;
	}

	float alpha = 0.0;

	if (i < n){
	alpha = float(i)/float(n);
	}

	color = vec4(alpha, alpha, alpha, alpha) * 10.0 * fragment_color;
	
	}
		
}