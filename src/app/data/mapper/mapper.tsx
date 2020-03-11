import { Host, Bedroom } from "../model";
import { Residence, dateToString, dateArrayToString, Tour } from "../../../model";
import { BedroomData } from "../model/bedroomData";
import { LodginEvent } from "../model/lodginEvent";
import { TourData } from "../model/tourData";

export const mapHostDataToHost = (hostData: any): Host => {
  return {
    id: hostData.pk,
    name: hostData.name,
    address: hostData.address,
    city: hostData.city,
  };
};

export const mapDataToTourData = (tourData: any): TourData => {
  return {
    id: tourData.pk,
    tour: tourData.name,
    tourId: tourData.tourId,
    meetingPoint: tourData.meeting_point,
    type: tourData.tour_type,
    city: tourData.city,
    availableTickets: tourData.available,
    date: tourData.date,
  };
};

export const mapTourDataToTour = (tourData: TourData): Tour => {
  return {
    id: tourData.id,
    tour: tourData.tour,
    tourId: tourData.tourId,
    meetingPoint: tourData.meetingPoint,
    type: tourData.type,
    city: tourData.city,
    availableTickets: tourData.availableTickets,
    date: tourData.date,
  };
};

export const mapBedroomDataToBedroom = (bedroomData: any): Bedroom => {
  return {
    id: bedroomData.pk,
    name: bedroomData.name,
    maximumGuests: bedroomData.maximum_guests,
    busyDates: bedroomData.busy_dates,
    purchased: bedroomData.purchased,
    hostId: bedroomData.host,
  };
};

export const mapHostAndBedroomToResidence = (bedroom: Bedroom, host: Host): Residence => {
  return {
    id: bedroom.id,
    hotel: host.name,
    hotelId: host.id,
    address: host.address,
    city: host.city,
    bedroomName: bedroom.name,
    availablePlaces: bedroom.maximumGuests,
    busyDays: parseStringDates(bedroom.busyDates),
    purchased: bedroom.purchased,
  };
};


const parseStringDates = (dates: string): Date[] => {
  if (dates === '') {
    return [];
  } else {
    const strDates = dates.split(';');
    const busyDays: Date[] = strDates.map(str => new Date(str));
    return busyDays;
  }
};

export const parseResidenceToBedroom = (residence: Residence) => {
  const bedroom: Bedroom = {
    id: residence.id,
    busyDates: dateArrayToString(residence.busyDays),
    hostId: residence.hotelId,
    maximumGuests: residence.availablePlaces,
    name: residence.bedroomName,
    purchased: residence.purchased,
  };
  return bedroom;
};

export const parseResidenceToLodginEvent = (residence: Residence, startDate: Date, endDate: Date): LodginEvent => {
  return {
    bedroom_id: residence.id,
    host_id: residence.hotelId,
    bedroom_name: residence.bedroomName,
    host_name: residence.hotel,
    start_date: dateToString(startDate),
    end_date: dateToString(endDate),
  };
};

export const parseBedroomToBedroomData = (bedroom: Bedroom): BedroomData => {
  return {
    pk: bedroom.id,
    name: bedroom.name,
    host: bedroom.hostId,
    maximum_guests: bedroom.maximumGuests,
    busy_dates: bedroom.busyDates,
    purchased: bedroom.purchased,  
  };
};
