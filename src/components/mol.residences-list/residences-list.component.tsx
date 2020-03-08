import * as React from 'react';
import { Residence } from '../../model/entities';
import { ResidenceCard, VSeparator } from '..';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ResidencesListProps {
  residences: Residence[];
}

const RESIDENCES_PER_ROW = 4;

export const ResidencesListComponent = (props: ResidencesListProps) => {
  return (
    <>
      <VSeparator />
      <Row>
        {props.residences.map((res, index) => {
            const key: string = "" + index;
            return (
              <Col md={12 / RESIDENCES_PER_ROW} key={key}>
                <ResidenceCard residence={res} />
              </Col>
            );
          })
        }
      </Row>
    </>
  );
}
