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

const TOURS_PER_ROW = 4;

export const ToursListComponent = (props: ToursListProps) => {
  const getQueryString = (tour: Tour) => {
    const url = `/details?id=${tour.id}&tour=${tour.tour}&city=${tour.city}&type=${tour.type}&meetingPoint=${tour.meetingPoint}&tickets=${tour.availableTickets}`;
    return url;
  };

  return (
    <>
      <VSeparator />
      <Row>
        {props.tours.map((tour, index) => {
            const key: string = "" + index;
            return (
              <Col md={12 / TOURS_PER_ROW} key={key}>
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
