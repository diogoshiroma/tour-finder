import * as React from 'react';
import { Residence, Tour } from '../../model/entities';
import { ResidenceCard, VSeparator, TourCard } from '..';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { dateToString } from '../../model/dates/date-parser';

interface ToursListProps {
  tours: Tour[];
}

const RESIDENCES_PER_ROW = 4;

export const ToursListComponent = (props: ToursListProps) => {
  const getQueryString = (tour: Tour) => {
    const url = `/details?room=${tour.id}`;
    return url;
  };

  return (
    <>
      <VSeparator />
      <Row>
        {props.tours.map((tour, index) => {
            const key: string = "" + index;
            return (
              <Col md={12 / RESIDENCES_PER_ROW} key={key}>
                <Link to={getQueryString(tour)} style={{textDecoration: "none"}}>
                  <TourCard tour={tour} />
                </Link>
              </Col>
            );
          })
        }
      </Row>
    </>
  );
};
