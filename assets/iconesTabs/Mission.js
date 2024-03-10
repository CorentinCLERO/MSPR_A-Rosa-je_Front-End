import React from "react";
import Svg, { G, Path } from "react-native-svg";

export const MissionSVG = (props) => {
  const { width = "23.000000pt", height = "23.000000pt", fill = "#000" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 35.000000 35.000000"
      fill={fill}
    >
      <G transform="translate(0.000000,35.000000) scale(0.100000,-0.100000)" stroke="none">
        <Path d="M120 315 l0 -36 58 3 c56 3 57 3 57 33 0 30 -1 30 -57 33 l-58 3 0 -36z m90 0 c0 -16 -55 -22 -64 -6 -8 13 5 21 36 21 18 0 28 -5 28 -15z"/>
        <Path d="M68 319 c-16 -9 -18 -27 -18 -152 0 -98 4 -147 12 -155 8 -8 49 -12 120 -12 96 0 108 2 118 19 5 11 10 78 10 150 0 104 -3 133 -16 145 -23 24 -42 19 -46 -11 -3 -27 -5 -28 -68 -28 -60 0 -64 2 -70 24 -7 29 -18 34 -42 20z m97 -144 c0 -5 -15 -11 -32 -13 -25 -3 -33 1 -33 13 0 12 8 16 33 13 17 -2 32 -7 32 -13z m85 -45 c0 -6 -32 -10 -75 -10 -43 0 -75 4 -75 10 0 6 32 10 75 10 43 0 75 -4 75 -10z m0 -50 c0 -6 -32 -10 -75 -10 -43 0 -75 4 -75 10 0 6 32 10 75 10 43 0 75 -4 75 -10z"/>
      </G>
    </Svg>
  );
};