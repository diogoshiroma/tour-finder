import styled from 'styled-components';
import { Color, Spacing } from '../../resources/constants';
import Row from 'react-bootstrap/Row';

export const PageTitleStyled = styled(Row)`
  background-color: ${Color.Primary};
  padding-top: ${Spacing.Gutter}px;
`;