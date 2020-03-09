import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { HotelIcon, Strings } from '../../resources';
import { H2, H3, VSeparator, H1, PageTitle, ErrorMessage, Dialog, Greeting } from '../../components';
import Button from 'react-bootstrap/Button';
import { Residence } from '../../model';

interface RoomDetailsProps {
  residence: Residence | null;
  showDialogBuyConfirmation: boolean;
  showDialogBuyStatus: boolean;
  textDialogBuyStatus: string;
  enablePurchase: boolean;
  enableAddToTour: boolean;
  onClickBuy: () => void;
  onClickBuyConfirm: () => void;
  onClickBuyCancel: () => void;
  onClickBuyStatus: () => void;
  onClickAddToTour: () => void;
  onOpenTravelTour: () => void;
}

export const RoomDetails = (props: RoomDetailsProps) => {
  const getDialogBuyConfirmationMessage = () => {
    if (props.residence) {
      return `${Strings.Components.Dialog.Confirmation.MessagePrefix} ${props.residence.bedroomName} (${props.residence.hotel})?`;
    } else {
      return '';
    }
  };

  return (
    <>
      <PageTitle showButton={true} />
      <VSeparator />
      {!!props.residence ?
        <Row>
          <Col sm={6}>
            <Image src={HotelIcon} rounded />
          </Col>
          <Col sm={6}>
            <VSeparator />
            <VSeparator />
            <VSeparator />
            <Row noGutters={true}>
              <H1>{props.residence.hotel}</H1>
            </Row>
            <Row noGutters={true}>
              <H3>{props.residence.address + ' - ' + props.residence.city}</H3>
            </Row>
            <VSeparator />
            <Row noGutters={true}>
              <H2>{props.residence.bedroomName}</H2>
            </Row>
            <VSeparator />
            <Row noGutters={true}>
              <H2>{Strings.Components.ResidenceDetail.AvailablePlacesLbl + props.residence.availablePlaces}</H2>
            </Row>
            
            <VSeparator />
            <VSeparator />
            <VSeparator />
            <VSeparator />

            {props.enablePurchase ?
              <>
                <H3>{Strings.Components.ResidenceDetail.BookNowYourRoom}</H3>
                <VSeparator />
                <Button variant="primary" onClick={props.onClickBuy} block>{Strings.Components.ResidenceDetail.BuyRoom}</Button>
              </>
            :
              <>
                <Greeting>{Strings.Components.ResidenceDetail.Thanks}</Greeting>
                <VSeparator />
                <H3>{Strings.Components.ResidenceDetail.AddToTour}</H3>
                <VSeparator />
                {props.enableAddToTour ?
                    <Button variant="info" onClick={props.onClickAddToTour} block>
                      {Strings.Components.ResidenceDetail.AddToTourBtn}
                    </Button>
                  :
                    <Button variant="info" onClick={props.onOpenTravelTour} block>
                      {Strings.Components.ResidenceDetail.OpenTravelTour}
                    </Button>
                }
              </>
            }
          </Col>
          <Dialog
            show={props.showDialogBuyConfirmation}
            title={Strings.Components.Dialog.Confirmation.Title}
            message={getDialogBuyConfirmationMessage()}
            btnCancelLbl={Strings.Components.Dialog.Confirmation.Cancel}
            btnConfirmLbl={Strings.Components.Dialog.Confirmation.Confirm}
            onConfirmClick={props.onClickBuyConfirm}
            onCancelClick={props.onClickBuyCancel}
            onHideClick={props.onClickBuyCancel}
          />
          <Dialog
            show={props.showDialogBuyStatus}
            title={Strings.Components.Dialog.Status.Title}
            message={props.textDialogBuyStatus}
            btnConfirmLbl={Strings.Components.Dialog.Status.Confirm}
            onConfirmClick={props.onClickBuyStatus}
            onHideClick={props.onClickBuyStatus}
          />
        </Row>
      :
        <Row noGutters={true}>
          <ErrorMessage>{Strings.Error.ResidenceDetail.NoResFound}</ErrorMessage>
        </Row>
      }
    </>
  );
};
