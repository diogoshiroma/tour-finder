import axios, { AxiosResponse } from 'axios';
import { Host, Bedroom } from './model';
import { mapHostDataToHost, mapBedroomDataToBedroom, mapHostAndBedroomToResidence } from './mapper';
import { Residence } from '../../model/entities';

const API_URL = 'http://localhost:8000';

export const getHosts = async (): Promise<Host[]> => {
  const url = `${API_URL}/api/hosts/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);
  return parseHostsData(axiosResponse.data);
}

const parseHostsData = (hostsData: any): Host[] => {
  return hostsData.data.map((hostData: any) => mapHostDataToHost(hostData));
};

export const getBedroomsOfHost = async (hostId: number): Promise<Bedroom[]> => {
  const url = `${API_URL}/api/hosts/${hostId}/bedrooms/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);
  return parseBedroomsData(axiosResponse.data);
}

const parseBedroomsData = (bedroomsData: any): Bedroom[] => {
  return bedroomsData.data.map((bedroomData: any) => mapBedroomDataToBedroom(bedroomData));
};

export const getResidences = async (): Promise<Residence[]> => {
  const hosts: Host[] = await getHosts();
  let residences: Residence[] = [];
  const bedroomPromises: Promise<Bedroom[]>[] = hosts.map(host => getBedroomsOfHost(host.id));
  return Promise.all(bedroomPromises).then(function(bedroomLists) {
    const bedrooms: Bedroom[] = bedroomLists.flat();
    const residencesFromBedrooms = bedrooms.map(bedroom => 
      mapHostAndBedroomToResidence(bedroom, hosts.filter(host => host.id === bedroom.hostId)[0]))
    residences.push(...residencesFromBedrooms);
  }).then(function resolve() {
    return residences;
  });
};

const parseResidenceToBedroom = (residence: Residence) => {
  const bedroom: Bedroom = {
    id: residence.id,
    busyDates: residence.busyDays.map(date => date.toISOString().split('T')[0]).join(';'),
    hostId: residence.hotelId,
    maximumGuests: residence.availablePlaces,
    name: residence.bedroomName,
    purchased: residence.purchased,
  };
  return bedroom;
};

const getHostOfResidence = (residence: Residence) => {
  const host: Host = {
    id: residence.hotelId,
    address: residence.address,
    city: residence.city,
    name: residence.hotel,
  };
  return host;
};

export const setBedroomAsPurchased = async (residence: Residence) => {
  const url = `${API_URL}/api/hosts/${residence.hotelId}/bedrooms/${residence.id}/`;
  residence.purchased = true;
  const purchasedBedroom: Bedroom = parseResidenceToBedroom(residence);
  const data = {
    pk: purchasedBedroom.id,
    name: purchasedBedroom.name,
    host: purchasedBedroom.hostId,
    maximum_guests: purchasedBedroom.maximumGuests,
    busy_dates: purchasedBedroom.busyDates,
    purchased: purchasedBedroom.purchased,  
  };
  const axiosResponse: AxiosResponse<any> = await axios.put(url, data);
  return axiosResponse.data;
};
