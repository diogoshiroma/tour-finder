import React from 'react';
import { Residence, addBusyDates, containsBusyDay, hasBusyDates, Tour } from '../../model';
import { RoomDetails } from './room-details.component';
import { addLodgingEvent, updateBedroom } from '../data/requests';
import { Strings } from '../../resources';
import { TourDetails } from './tour-details.component';

interface TourDetailsContainerProps {
  tour: Tour | null;
}

export const TourDetailsContainer = (props: TourDetailsContainerProps) => {
  const [showDialogBuyConfirmation, setShowDialogBuyConfirmation] = React.useState(false);
  const [showDialogBuyStatus, setShowDialogBuyStatus] = React.useState(false);
  const [textDialogBuyStatus, setTextDialogBuyStatus] = React.useState('');
  const [enableAddToTour, setEnableAddToTour] = React.useState(true);

   // React.useEffect(() => {
    //   if (!populatedResidences) {
    //     setPopulatedResidences(true);
    //     populateResidences().then(function resolve() {
    //       const list = filterPurchasedResidences();
    //       if (showPurchasedList) {
    //         setPurchasedResList(list);
    //         setShowPurchasedList(false);
    //       }
    //     });
    //   }
    // });

  const handleClickBuy = () => {
    setShowDialogBuyConfirmation(true);
  };

  const handleClickBuyConfirm = () => {
    try {
      setShowDialogBuyConfirmation(false);
      // if (props.tour && props.startDate && props.endDate) {
      //   addBusyDates(props.tour, props.startDate, props.endDate);
      //   updateBedroom(props.tour);
      // }
      setTextDialogBuyStatus(Strings.Components.Dialog.Status.MessageSuccess);  
    } catch (err) {
      setTextDialogBuyStatus(Strings.Components.Dialog.Status.MessageFailPrefix + err);
    } finally {
      setShowDialogBuyStatus(true);
    }
  };

  const handleClickBuyCancel = () => {
    setShowDialogBuyConfirmation(false);
  };

  const handleClickBuyStatus = () => {
    setShowDialogBuyStatus(false);
  };

  const handleClickAddToTour = () => {
    // if (props.residence && props.startDate && props.endDate) {
    //   addLodgingEvent(props.residence, props.startDate, props.endDate);
    //   setEnableAddToTour(false);
    // }
  };

  const handleOpenTravelTour = () => {
    window.open('http://localhost:3006/trip-planner', '_blank');
  };

  const purchasedRoom = () => {
    // if (props.residence && props.startDate && props.endDate) {
    //   return containsBusyDay(props.residence, props.startDate, props.endDate);
    // } else if (props.residence && !props.startDate && !props.endDate) {
    //   return hasBusyDates(props.residence);
    // } else {
    //   return false;
    // }
    console.log('purchased')
  };

  return (
    <TourDetails
      tour={props.tour}
      showDialogBuyConfirmation={showDialogBuyConfirmation}
      showDialogBuyStatus={showDialogBuyStatus}
      textDialogBuyStatus={textDialogBuyStatus}
      // enablePurchase={!purchasedRoom()}
      enableAddToTour={enableAddToTour}
      onClickBuy={handleClickBuy}
      onClickBuyConfirm={handleClickBuyConfirm}
      onClickBuyCancel={handleClickBuyCancel}
      onClickBuyStatus={handleClickBuyStatus}
      onClickAddToTour={handleClickAddToTour}
      onOpenTravelTour={handleOpenTravelTour}
    />
  )
}