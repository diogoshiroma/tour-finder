import * as React from 'react';
import { Residence, Tour } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { HotelIcon, Strings } from '../../resources';
import { VSeparator } from '../atm.separators';

export interface TourCardProps {
  tour: Tour;
}

const IMG_WIDTH: number = 200;

export const TourCard = (props: TourCardProps) => {
  return (
    <Card className={"text-center"}>
      <Card.Img style={{ width: IMG_WIDTH, position: "relative", alignSelf: "center" }} variant={'top'} src={HotelIcon} />
      <Card.Body>
        <Card.Title>{props.tour.tour}</Card.Title>
        <Card.Text>{props.tour.meetingPoint + " - " + props.tour.city}</Card.Text>
        <Card.Subtitle>{props.tour.type}</Card.Subtitle>
        <VSeparator />
        <Card.Text>{Strings.Components.Tour.Available + props.tour.availableTickets}</Card.Text>
      </Card.Body>
    </Card>
  );
};
