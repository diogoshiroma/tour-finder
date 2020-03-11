import axios, { AxiosResponse } from 'axios';
import { Host, Bedroom } from './model';
import { mapHostDataToHost, mapBedroomDataToBedroom, mapHostAndBedroomToResidence, parseResidenceToLodginEvent, parseBedroomToBedroomData, parseResidenceToBedroom, mapDataToTourData, mapTourDataToTour } from './mapper';
import { Residence, Tour } from '../../model/entities';
import { LodginEvent } from './model/lodginEvent';
import { TourData } from './model/tourData';

const TRAVEL_SIMPLE_API_URL = 'http://localhost:8000';
const TRAVEL_TOUR_API_URL = 'http://localhost:8006';
const TOUR_FINDER_API_URL = 'http://localhost:8012';

const BACKEND_TOUR_FINDER_URL = 'http://localhost:8000';

let tour: Tour;

export const getHosts = async (): Promise<Host[]> => {
  const url = `${TRAVEL_SIMPLE_API_URL}/api/hosts/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);
  return parseHostsArrayData(axiosResponse.data);
};

export const getTours = async (city: string, date: string, quantity: number, type:string): Promise<Tour[]> => {
  const url = `${BACKEND_TOUR_FINDER_URL}/api/tours/`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url, {
    params: {
      city: city,
      date: date,
      quantity: quantity,
      type: type,
    }
  });
  const toursData: TourData[] = parseToursArrayData(axiosResponse.data);
  return parseToursData(toursData);
}

export const populateTour = async (id: string) => {
  const url = `${BACKEND_TOUR_FINDER_URL}/api/tours/${id}`;
  const axiosResponse: AxiosResponse<any> = await axios.get(url);

  const tourData: TourData = mapDataToTourData(axiosResponse.data);
  tour = mapTourDataToTour(tourData);
}

export const getTour = (): Tour  => {

  return tour;
}

const parseHostsArrayData = (hostsData: any): Host[] => {
  return hostsData.data.map((hostData: any) => mapHostDataToHost(hostData));
};

const parseToursArrayData = (toursData: any): TourData[] => {
  return toursData.data.map((tourData: any) => mapDataToTourData(tourData));
};

const parseToursData = (toursData: TourData[]): Tour[] => {
  return toursData.map((tourData: TourData) => mapTourDataToTour(tourData));
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

// export const getTours = async (): Promise<Tour[]> => {
//   const hosts: Host[] = await getHosts();
//   let residences: Residence[] = [];
//   const bedroomPromises: Promise<Bedroom[]>[] = hosts.map(host => getBedroomsOfHost(host.id));
//   return Promise.all(bedroomPromises).then(function(bedroomLists) {
//     const bedrooms: Bedroom[] = bedroomLists.flat();
//     const residencesFromBedrooms = bedrooms.map(bedroom => 
//       mapHostAndBedroomToResidence(bedroom, hosts.filter(host => host.id === bedroom.hostId)[0]))
//     residences.push(...residencesFromBedrooms);
//   }).then(function resolve() {
//     return residences;
//   });
// };

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
