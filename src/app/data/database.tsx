import { Residence } from "../../model/entities";
import { getResidences } from "./requests";

export const getResidenceById = (id: number): Residence | null  => {
  const residences = datasourceResidences.filter(res => res.id === id);
  return residences.length > 0 ? residences[0] : null;
}

export const populateResidences = async () => {
  const res: Residence[] = await getResidences();
  datasourceResidences = res;
  console.log(datasourceResidences);
  if (datasourceResidences.length > 0) {
    console.log('Dados carregados corretamente: ' + datasourceResidences.length + ' carregadas.');
  } else {
    datasourceResidences = placeholder;
    console.log('Usando placeholder');
  }
}

export let datasourceResidences: Residence[] = [];

const placeholder: Residence[] = [
  // Campos do Jordão
  {
    id: 1,
    hotel: "Hotel Golden Park",
    hotelId: 1,
    address: "Rodovia Floriano Rodrigues Pinheiro, 2000",
    bedroomName: "Quarto Duplo Standard",
    city: "Campos do Jordão",
    availablePlaces: 2,
    busyDays: [new Date('2020-02-17'), new Date('2020-02-18'), new Date('2020-02-19'), new Date('2020-02-20')],
    purchased: false,
  },
  {
    id: 4,
    hotel: "Hotel Golden Park",
    hotelId: 1,
    address: "Rodovia Floriano Rodrigues Pinheiro, 2000",
    bedroomName: "Quarto Duplo Superior",
    city: "Campos do Jordão",
    availablePlaces: 2,
    busyDays: [new Date('2020-02-25'), new Date('2020-02-26')],
    purchased: false,
  },

  // São Paulo
  {
    id: 5,
    hotel: "North Palace Hotel",
    hotelId: 4,
    address: "R. Santa Teresa de Jesus, 339 - Vila Santa Terezinha (Zona Norte)",
    bedroomName: "Quarto Triplo Superior",
    city: "São Paulo",
    availablePlaces: 3,
    busyDays: [new Date('2020-02-19'), new Date('2020-02-20')],
    purchased: false,
  },
  {
    id: 6,
    hotel: "North Palace Hotel",
    hotelId: 4,
    address: "R. Santa Teresa de Jesus, 339 - Vila Santa Terezinha (Zona Norte)",
    bedroomName: "Quarto Duplo Standard",
    city: "São Paulo",
    availablePlaces: 2,
    busyDays: [new Date('2020-02-19'), new Date('2020-02-20')],
    purchased: false,
  },
];