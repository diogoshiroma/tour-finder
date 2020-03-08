import styled from 'styled-components';
import { ScreenUnit, GUTTER } from '../../resources/constants';
import Row from 'react-bootstrap/Row';

interface VSeparatorProps {
  half?: boolean;
}

export const VSeparator = styled(Row)`
  margin-top: ${(props: VSeparatorProps) => props.half ? GUTTER + ScreenUnit.Pixels : 2 * GUTTER + ScreenUnit.Pixels};
`;
