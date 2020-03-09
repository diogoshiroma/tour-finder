import React from 'react';
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router-dom';
import { getResidenceById } from '../data';
import { Residence } from '../../model';
import { RoomDetailsContainer } from './room-details.container';

export class RoomDetailsPage extends React.Component<RouteComponentProps> {
  render() {
    const values = queryString.parse(this.props.location.search);
    const roomId = values.room;
    const startDate = values.startDate;
    const endDate = values.endDate;
    let residence: Residence | null;

    if (roomId && typeof roomId != 'object') {
      residence = getResidenceById(parseInt(roomId));
    } else {
      residence = null;
    }

    return (
      (!!startDate && !!endDate && !Array.isArray(startDate) && !Array.isArray(endDate)) ?
        <RoomDetailsContainer residence={residence} startDate={new Date(startDate)} endDate={new Date(endDate)} />
      :
        <RoomDetailsContainer residence={residence} />
    );
  }
}
