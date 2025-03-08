import React from "react";
import styled from "styled-components/native";

type FontWeight = 400 | 500 | 600 | 700;

const resolveFont = (w?: FontWeight) => {
  switch (w) {
    case 400:
      return "InterRegular";
    case 500:
      return "InterMedium";
    case 600:
      return "InterSemiBold";
    case 700:
      return "InterBold";
    default:
      return "InterRegular";
  }
};

const Text = styled.Text<{ $weight?: FontWeight }>`
  font-family: ${(props) => resolveFont(props?.$weight)};
  font-weight: 400;
  color: #fff;
  text-rendering: optimizeLegibility;
`;

export { Text };
