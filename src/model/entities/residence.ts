export interface Residence {
  id: number;
  hotel: string;
  hotelId: number;
  address: string;
  bedroomName: string;
  city: string;
  availablePlaces: number;
  busyDays: Date[];
  purchased: boolean;
}