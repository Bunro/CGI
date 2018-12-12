// This source code is property of the Computer Graphics and Visualization 
// chair of the TU Dresden. Do not distribute! 
// Copyright (C) CGV TU Dresden - All Rights Reserved
#version 330

in vec3 normal;
in vec2 frag_pos;

out vec4 color;

uniform vec3 cameraPos;

uniform sampler2D background;
uniform sampler2D grassTexture;
uniform sampler2D rockTexture;
uniform sampler2D alphaMap;
uniform sampler2D roadColorTexture;
uniform sampler2D roadSpecularMap;

uniform vec2 screenSize;

const vec3 dirToLight = normalize(vec3(1, 3, 1));	

//Calculates the visible surface color based on the Blinn-Phong illumination model
vec4 calculateLighting(vec4 materialColor, float specularIntensity, vec3 normalizedNormal, vec3 directionToViewer)
{
	vec4 color = materialColor;
	vec3 h = normalize(dirToLight + directionToViewer);
	color.xyz *= 0.9 * max(dot(normalizedNormal, dirToLight), 0) + 0.1;
	color.xyz += specularIntensity * pow(max(dot(h, normalizedNormal), 0), 50);
	return color;
}

vec4 getTextureColor()
{
	vec4 grass = texture(grassTexture, frag_pos / (255/10));
	vec4 rock = texture(rockTexture, frag_pos / (255/10));
	
	float slope = 1.0f - normal.y;

	// Determine which texture to use based on height.
    if(slope < 0.2)
    {
        float blendAmount = slope / 0.2f;
        return mix(grass, rock, blendAmount);
    }
	
    if((slope < 0.5) && (slope >= 0.2f))
    {
        float blendAmount = (slope - 0.2f) / (0.5f - 0.2f);
        return mix(grass, rock, blendAmount);
    }

    if(slope >= 0.5) 
    {
        return rock;
    }
}

vec4 getBackgroundColor()
{
	return texture(background, gl_FragCoord.xy / screenSize);
}

void main()
{

	/* Start 2.2.2b*/
	vec3 n = normalize(normal);
	/* End 2.2.2b*/

	vec3 dirToViewer = vec3(0, 1, 0);

	//material properties	
	color = vec4(0.6, 0.6, 0.6, 1);
	float specular = 0;
	vec4 specularRoadColor = texture(roadSpecularMap, frag_pos / (255));
	float roadIntensity = (specularRoadColor.x+specularRoadColor.y+specularRoadColor.z)/3;


	/* Start 2.2.3*/
	//Calculate light and color
	vec4 alpha = texture(alphaMap, frag_pos / 255);
	vec4 road = texture(roadColorTexture, frag_pos / (255/10));
	if ((alpha.x==0) && (alpha.y==0) && (alpha.z==0)){
	color = calculateLighting(color, specular, n, dirToViewer) * getTextureColor();
	} else if ((alpha.x>0.9) && (alpha.y>0.9) && (alpha.z>0.9)) {
	color = calculateLighting(color, roadIntensity, n, dirToViewer)*road;
	} else {
	color = mix(calculateLighting(color, specular, n, dirToViewer) * getTextureColor(), calculateLighting(color, roadIntensity, n, dirToViewer) * road, 0.7);
	}
	
}