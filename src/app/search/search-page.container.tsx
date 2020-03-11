import React from 'react';
import { Residence, Tour } from '../../model/entities';
import { SearchPage } from './search-page.component';
import { datasourceResidences, populateResidences, getTours } from '../data';
import { parseDate, matchShortDate, isValidDate, hasBusyDates, containsBusyDay } from '../../model';
import { Strings } from '../../resources';

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

  const [tourQuantity, setTourQuantity] = React.useState(0);
  const [availableTours, setAvailableTours] = React.useState<Tour[]>([]);
  const [tourType, setTourType] = React.useState('');
  const [tourTypeTitle, setTourTypeTitle] = React.useState(Strings.Components.TourForm.Placeholder.Type);

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

  const handleChangeTourQuantity = (event: any) => {
    setTourQuantity(event.target.value);
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

  const handleTypeSelect = (event:any) => {
    setTourTypeTitle(handleTourTypeTitle(event));
    setTourType(event);
    console.log(event);
  };

  const handleTourTypeTitle = (selected:string): string => {
    switch(selected){
      case 'adventure':
        return Strings.Components.TourForm.Types.Adventure
      case 'culture':
        return Strings.Components.TourForm.Types.Culture
      case 'nature':
        return Strings.Components.TourForm.Types.Nature
      default:
        return Strings.Components.TourForm.Placeholder.Type
    }
  }

  const handleSubmit = async () => {
    const list: Tour[] = await getTours(
      city, checkinDateText, tourQuantity, tourType
    );
    setAvailableTours(list);
    console.log(list)
  };

  const filterAvailableResidences = (): Residence[] => {
    const checkinDate = parseDate(checkinDateText);
    const checkoutDate = parseDate(checkoutDateText);

    return datasourceResidences.filter(
      residence => residence.city == city && !containsBusyDay(residence, checkinDate, checkoutDate)
    );
  };

  const filterPurchasedResidences = (): Residence[] => {
    return datasourceResidences.filter(residence => hasBusyDates(residence));
  };

  return (
    <SearchPage
      onChangeCity={handleChangeCity}
      onChangeCheckinDate={handleChangeCheckinDate}
      onChangeCheckoutDate={handleChangeCheckoutDate}
      onChangeTourQuantity={handleChangeTourQuantity}
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
      startDate={parseDate(checkinDateText)}
      endDate={parseDate(checkoutDateText)}
      onTypeSelect={handleTypeSelect}
      tourType={tourTypeTitle}
      availableTours={availableTours}
    />
  );
};
