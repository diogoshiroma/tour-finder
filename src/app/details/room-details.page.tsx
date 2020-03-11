import React from 'react';
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router-dom';
import { getResidenceById, populateTour, getTour } from '../data';
import { Residence, Tour } from '../../model';
import { RoomDetailsContainer } from './room-details.container';
import { TourDetailsContainer } from './tour-details.container';

export class RoomDetailsPage extends React.Component<RouteComponentProps> {
  
  render() {
    const values = queryString.parse(this.props.location.search);
    const tourId = values.tour;

    let tour: Tour | null;

    if (tourId && typeof tourId != 'object') {
      populateTour(tourId);
      tour = getTour();
    } else {
      tour = null;
    }

    return (
      <TourDetailsContainer tour={tour} />

    //   (!!startDate && !!endDate && !Array.isArray(startDate) && !Array.isArray(endDate)) ?
    //     <RoomDetailsContainer residence={residence} startDate={new Date(startDate)} endDate={new Date(endDate)} />
    //   :
    //     <RoomDetailsContainer residence={residence} />
    );
  }
}
