import { Residence } from "../entities";

export const setResidenceAsPurchased = (residence: Residence) => {
  residence.purchased = true;
}