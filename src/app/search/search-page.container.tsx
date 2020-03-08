import React from 'react';
import { Residence } from '../../model/entities';
import { SearchPage } from './search-page.component';
import { datasourceResidences, populateResidences } from '../data';
import { parseDate, matchShortDate, isValidDate } from '../../model';

export const SearchPageContainer = () => {
  const [populatedResidences, setPopulatedResidences] = React.useState(false);
  const [availableResList, setAvailableResList] = React.useState<Residence[]>([]);
  const [purchasedResList, setPurchasedResList] = React.useState<Residence[]>([]);
  const [showPurchasedList, setShowPurchasedList] = React.useState(true);

  const [city, setCity] = React.useState('');
  const [checkinDateText, setCheckinDateText] = React.useState('');
  const [checkoutDateText, setCheckoutDateText] = React.useState('');

  const [checkinInvalidDateFormat, setCheckinInvalidDateFormat] = React.useState(true);
  const [checkinNonExistingDate, setCheckinNonExistingDate] = React.useState(true);
  const [checkoutInvalidDateFormat, setCheckoutInvalidDateFormat] = React.useState(true);
  const [checkoutNonExistingDate, setCheckoutNonExistingDate] = React.useState(true);

  const [dirtyCheckin, setDirtyCheckin] = React.useState(false);
  const [dirtyCheckout, setDirtyCheckout] = React.useState(false);
  const [dirtyCity, setDirtyCity] = React.useState(false);

    React.useEffect(() => {
      if (!populatedResidences) {
        setPopulatedResidences(true);
        populateResidences().then(function resolve() {
          const list = filterPurchasedResidences();
          if (showPurchasedList) {
            setPurchasedResList(list);
            setShowPurchasedList(false);
          }
        });
      }
    });
  
  const handleChangeCity = (event: any) => {
    setCity(event.target.value);
  };

  const handleChangeCheckinDate = (event: any) => {
    setCheckinDateText(event.target.value);
  };

  const handleChangeCheckoutDate = (event: any) => {
    setCheckoutDateText(event.target.value);
  };

  const handleBlurCheckinDate = () => {
    const matchCheckin: boolean = matchShortDate(checkinDateText);
    setCheckinInvalidDateFormat(!matchCheckin);
    if (matchCheckin) {
      const date: Date = parseDate(checkinDateText);
      const isValid = isValidDate(date);
      setCheckinNonExistingDate(!isValid);
    }
    setDirtyCheckin(true);
  };
  
  const handleBlurCheckoutDate = () => {
    const matchCheckout: boolean = matchShortDate(checkoutDateText);
    setCheckoutInvalidDateFormat(!matchCheckout);
    if (matchCheckout) {
      const date: Date = parseDate(checkoutDateText);
      const isValid = isValidDate(date);
      setCheckoutNonExistingDate(!isValid);
    }
    setDirtyCheckout(true);
  };

  const handleBlurCity = () => {
    setDirtyCity(true);
  };

  const isCheckinAfterCheckout = (checkinDate: Date, checkoutDate: Date) => {
    return checkinDate.getTime() >= checkoutDate.getTime();
  };

  const disableButton = (): boolean => {
    return (
      city === '' ||
      checkinInvalidDateFormat ||
      checkinNonExistingDate ||
      checkoutInvalidDateFormat ||
      checkoutNonExistingDate ||
      isCheckinAfterCheckout(parseDate(checkinDateText), parseDate(checkoutDateText))
    );
  };

  const containsBusyDay = (residence: Residence, checkinDate: Date, checkoutDate: Date): boolean => {
    let hasBusyDays = false;
    residence.busyDays.forEach(busyDate => {
      if (busyDate.getTime() >= checkinDate.getTime() &&
          busyDate.getTime() <= checkoutDate.getTime()) {
        hasBusyDays = true;
        return;
      }
    });
    return hasBusyDays;
  };

  const handleSubmit = () => {
    const list: Residence[] = filterAvailableResidences();
    setAvailableResList(list);
  };

  const filterAvailableResidences = (): Residence[] => {
    const checkinDate = parseDate(checkinDateText);
    const checkoutDate = parseDate(checkoutDateText);

    return datasourceResidences.filter(
      residence => !residence.purchased && residence.city == city && !containsBusyDay(residence, checkinDate, checkoutDate)
    );
  };

  const filterPurchasedResidences = (): Residence[] => {
    return datasourceResidences.filter(residence => residence.purchased);
  };

  return (
    <SearchPage
      onChangeCity={handleChangeCity}
      onChangeCheckinDate={handleChangeCheckinDate}
      onChangeCheckoutDate={handleChangeCheckoutDate}
      onSubmit={handleSubmit}
      onBlurCheckinDate={handleBlurCheckinDate}
      onBlurCheckoutDate={handleBlurCheckoutDate}
      onBlurCity={handleBlurCity}
      availableResidences={availableResList}
      purchasedResidences={purchasedResList}
      disabled={disableButton()}
      checkinInvalidDateFormat={checkinInvalidDateFormat}
      checkinNonExistingDate={checkinNonExistingDate}
      checkoutInvalidDateFormat={checkoutInvalidDateFormat}
      checkoutNonExistingDate={checkoutNonExistingDate}
      checkinAfterCheckout={isCheckinAfterCheckout(parseDate(checkinDateText), parseDate(checkoutDateText))}
      emptyCity={city === ''}
      dirtyCheckin={dirtyCheckin}
      dirtyCheckout={dirtyCheckout}
      dirtyCity={dirtyCity}
    />
  );
};
