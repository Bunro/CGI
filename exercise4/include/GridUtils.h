// This source code is property of the Computer Graphics and Visualization 
// chair of the TU Dresden. Do not distribute! 
// Copyright (C) CGV TU Dresden - All Rights Reserved

#pragma once

#include <array>
#include <Eigen/Core>

//converts 3d floating point position pos into 3d integer grid cell index
inline Eigen::Vector3i PositionToCellIndex(const Eigen::Vector3f& pos, const Eigen::Vector3f& cellExtents) 
{
	Eigen::Vector3i idx;
	for(int d = 0; d < 3; ++d)
	{
		idx[d] = int(pos[d]/cellExtents[d]);
			if (pos[d] < 0)
				--idx[d];
	}
	return idx;	
}

//returns true if the two Interval [lb1,ub2] and [lb2,ub2] overlap 
inline bool OverlapIntervals(float lb1, float ub1, float lb2, float ub2)
{
	if(lb1 > ub1) 
			std::swap(lb1,ub1);
	if(lb2 > ub2) 
			std::swap(lb2,ub2);
	if(ub1 < lb2|| lb1 >ub2)
		return false;
	return true;	
}

