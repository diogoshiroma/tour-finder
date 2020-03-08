import styled from "styled-components";
import { FontSize, DefaultColor, Color } from "../resources";

export const H1 = styled.h1`
  font-size: ${FontSize.XLarge};
  color: ${DefaultColor.Black};
`;

export const H2 = styled.h2`
  font-size: ${FontSize.Large};
  color: ${DefaultColor.Black};
`;

export const H3 = styled.h3`
  font-size: ${FontSize.Medium};
  color: ${DefaultColor.Black};
`;

export const Greeting = styled.h2`
  font-size: ${FontSize.Large};
  font-weight: bold;
  color: ${DefaultColor.Black};
`;

export const ErrorMessage = styled.div`
  font-size: ${FontSize.XLarge};
  font-weight: bold;
  color: ${Color.Alert};
  text-align: center;
`;

export const FieldErrorMessage = styled.div`
  font-size: ${FontSize.Large};
  font-weight: bold;
  color: ${Color.Alert};
`;
