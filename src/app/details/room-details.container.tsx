import React from 'react';
import { Residence, addBusyDates, containsBusyDay, hasBusyDates } from '../../model';
import { RoomDetails } from './room-details.component';
import { addLodgingEvent, updateBedroom } from '../data/requests';
import { Strings } from '../../resources';

interface RoomDetailsContainerProps {
  residence: Residence | null;
  startDate?: Date;
  endDate?: Date;
}

export const RoomDetailsContainer = (props: RoomDetailsContainerProps) => {
  const [showDialogBuyConfirmation, setShowDialogBuyConfirmation] = React.useState(false);
  const [showDialogBuyStatus, setShowDialogBuyStatus] = React.useState(false);
  const [textDialogBuyStatus, setTextDialogBuyStatus] = React.useState('');
  const [enableAddToTour, setEnableAddToTour] = React.useState(true);

  const handleClickBuy = () => {
    setShowDialogBuyConfirmation(true);
  };

  const handleClickBuyConfirm = () => {
    try {
      setShowDialogBuyConfirmation(false);
      if (props.residence && props.startDate && props.endDate) {
        addBusyDates(props.residence, props.startDate, props.endDate);
        updateBedroom(props.residence);
      }
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
    if (props.residence && props.startDate && props.endDate) {
      addLodgingEvent(props.residence, props.startDate, props.endDate);
      setEnableAddToTour(false);
    }
  };

  const handleOpenTravelTour = () => {
    window.open('http://localhost:3006/trip-planner', '_blank');
  };

  const purchasedRoom = () => {
    if (props.residence && props.startDate && props.endDate) {
      return containsBusyDay(props.residence, props.startDate, props.endDate);
    } else if (props.residence && !props.startDate && !props.endDate) {
      return hasBusyDates(props.residence);
    } else {
      return false;
    }
  };

  return (
    <RoomDetails
      residence={props.residence}
      showDialogBuyConfirmation={showDialogBuyConfirmation}
      showDialogBuyStatus={showDialogBuyStatus}
      textDialogBuyStatus={textDialogBuyStatus}
      enablePurchase={!purchasedRoom()}
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