import axios, { AxiosResponse } from 'axios';
import { Host, Bedroom } from './model';
import { mapHostDataToHost, mapBedroomDataToBedroom, mapHostAndBedroomToResidence, parseResidenceToLodginEvent, parseBedroomToBedroomData, parseResidenceToBedroom } from './mapper';
import { Residence } from '../../model/entities';
import { LodginEvent } from './model/lodginEvent';

const TRAVEL_SIMPLE_API_URL = 'http://localhost:8000';
const TRAVEL_TOUR_API_URL = 'http://localhost:8006';

export const getHosts = async (): Promise<Host[]> => {
  const url = `${TRAVEL_SIMPLE_API_URL}/api/hosts/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);
  return parseHostsArrayData(axiosResponse.data);
}

const parseHostsArrayData = (hostsData: any): Host[] => {
  return hostsData.data.map((hostData: any) => mapHostDataToHost(hostData));
};

export const getBedroomsOfHost = async (hostId: number): Promise<Bedroom[]> => {
  const url = `${TRAVEL_SIMPLE_API_URL}/api/hosts/${hostId}/bedrooms/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);
  return parseBedroomsArrayData(axiosResponse.data);
}

const parseBedroomsArrayData = (bedroomsData: any): Bedroom[] => {
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

export const updateBedroom = async (residence: Residence) => {
  const url = `${TRAVEL_SIMPLE_API_URL}/api/hosts/${residence.hotelId}/bedrooms/${residence.id}/`;
  const purchasedBedroom: Bedroom = parseResidenceToBedroom(residence);
  const data = parseBedroomToBedroomData(purchasedBedroom);
  const axiosResponse: AxiosResponse<any> = await axios.put(url, data);
  return axiosResponse.data;
};

export const addLodgingEvent = async (residence: Residence, startDate: Date, endDate: Date) => {
  const url = `${TRAVEL_TOUR_API_URL}/api/lodgingevents/`;
  const lodgingEvent: LodginEvent = parseResidenceToLodginEvent(residence, startDate, endDate);
  const axiosResponse: AxiosResponse<any> = await axios.post(url, lodgingEvent);
  return axiosResponse.data;
};
