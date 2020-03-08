import { Residence } from "../entities";

export const addBusyDates = (residence: Residence, startDate: Date, endDate: Date) => {
  const dates: Date[] =  [];
  for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  residence.busyDays.push(...dates);
  residence.busyDays.sort(function(dateA, dateB) {
    return dateA.getTime() - dateB.getTime();
  });
};

export const hasBusyDates = (residence: Residence) => {
  return residence.busyDays.length > 0;
};

export const containsBusyDay = (residence: Residence, checkinDate: Date, checkoutDate: Date): boolean => {
  let hasBusyDaysInInterval = false;
  residence.busyDays.forEach(busyDate => {
    if (busyDate.getTime() >= checkinDate.getTime() &&
        busyDate.getTime() <= checkoutDate.getTime()) {
      hasBusyDaysInInterval = true;
      return;
    }
  });
  return hasBusyDaysInInterval;
};
