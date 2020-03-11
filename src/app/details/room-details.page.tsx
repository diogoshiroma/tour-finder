import React from 'react';
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router-dom';
import { getResidenceById, populateTour, getTour } from '../data';
import { Residence, Tour } from '../../model';
import { RoomDetailsContainer } from './room-details.container';
import { TourDetailsContainer } from './tour-details.container';

interface RoomDetailsPageState {
  tour: Tour | null,
}
export class RoomDetailsPage extends React.Component<RouteComponentProps, RoomDetailsPageState> {
  state: RoomDetailsPageState = {
    tour: null,
  }



  render() {
    const values = queryString.parse(this.props.location.search);
    const tourId = values.id;
    const tourName = values.tour;
    const meetingPoint = values.meetingPoint;
    const tourType = values.tourType;
    const tourCity = values.tourCity;
    const availableTickets = values.tickets;

    let tour: Tour | null;

  //   const tour: Tour = {
  //     id: tourId ?? 0,
  // tour: string,
  // tourId: number,
  // meetingPoint: string,
  // type: string,
  // city: string,
  // availableTickets: number,
  // date: Date[],
  //   };

    if (tourId && typeof tourId != 'object') {
      populateTour(tourId);
      tour = getTour();
      console.log(tour)
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
