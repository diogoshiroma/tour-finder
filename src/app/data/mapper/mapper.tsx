import { Host, Bedroom } from "../model";
import { Residence } from "../../../model";

export const mapHostDataToHost = (hostData: any): Host => {
  return {
    id: hostData.pk,
    name: hostData.name,
    address: hostData.address,
    city: hostData.city,
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
  const strDates = dates.split(';');
  const busyDays: Date[] = strDates.map(str => new Date(str));
  return busyDays;
};
