// This source code is property of the Computer Graphics and Visualization 
// chair of the TU Dresden. Do not distribute! 
// Copyright (C) CGV TU Dresden - All Rights Reserved
#version 330

in vec4 position;
out vec3 normal;

uniform mat4 mvp;
out vec2 frag_pos;

//Returns the height of the procedural terrain at a given xz position
float getTerrainHeight(vec2 p);

void main()
{
    /*Start 2.2.2a*/
	vec4 newPosition =vec4(position.x, getTerrainHeight(position.xz), position.z, 1);
	gl_Position = mvp * newPosition;
	frag_pos = position.xz;
	/*End 2.2.2a*/

  /*Start 2.2.2b*/
   vec3 dz = vec3(0, getTerrainHeight(vec2(position.x, (position.z)+1)) - getTerrainHeight(vec2(position.x, (position.z)-1)), 2);
   vec3 dx = vec3(2, getTerrainHeight(vec2((position.x)+0.1, position.z)) - getTerrainHeight(vec2((position.x)-0.1, position.z)), 0);

	vec3 dx1;
	vec3 dz1;
	dx1 = normalize(dx);
	dz1 = normalize(dz);

	normal = cross(dz1, dx1);
	/*End 2.2.2b*/
  
}

//source: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float rand(vec2 c)
{
	return 2 * fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453) - 1;
}

float perlinNoise(vec2 p )
{
	vec2 ij = floor(p);
	vec2 xy = p - ij;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(3.1415926 * xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

//based on https://www.seedofandromeda.com/blogs/58-procedural-heightmap-terrain-generation
float getTerrainHeight(vec2 p)
{
	float total = 0.0;
	float maxAmplitude = 0.0;
	float amplitude = 1.0;
	float frequency = 0.02;
	for (int i = 0; i < 11; i++) 
	{
		total +=  ((1.0 - abs(perlinNoise(p * frequency))) * 2.0 - 1.0) * amplitude;
		frequency *= 2.0;
		maxAmplitude += amplitude;
		amplitude *= 0.45;
	}
	return 15 * total / maxAmplitude;
}