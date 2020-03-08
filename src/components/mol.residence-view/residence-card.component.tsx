import * as React from 'react';
import { Residence } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { HotelIcon, Strings } from '../../resources';
import { VSeparator } from '../atm.separators';

export interface ResidenceCardProps {
  residence: Residence;
}

const IMG_WIDTH: number = 200;

export const ResidenceCard = (props: ResidenceCardProps) => {
  return (
    <Card className={"text-center"}>
      <Card.Img style={{ width: IMG_WIDTH, position: "relative", alignSelf: "center" }} variant={'top'} src={HotelIcon} />
      <Card.Body>
        <Card.Title>{props.residence.hotel}</Card.Title>
        <Card.Text>{props.residence.address + " - " + props.residence.city}</Card.Text>
        <Card.Subtitle>{props.residence.bedroomName}</Card.Subtitle>
        <VSeparator />
        <Card.Text>{Strings.Components.Residence.AvailablePlaces + props.residence.availablePlaces}</Card.Text>
      </Card.Body>
    </Card>
  );
};
