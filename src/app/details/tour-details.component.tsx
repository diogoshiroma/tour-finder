import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { HotelIcon, Strings } from '../../resources';
import { H2, H3, VSeparator, H1, PageTitle, ErrorMessage, Dialog, Greeting } from '../../components';
import Button from 'react-bootstrap/Button';
import { Residence, Tour } from '../../model';

interface TourDetailsProps {
  tour: Tour | null;
  showDialogBuyConfirmation: boolean;
  showDialogBuyStatus: boolean;
  textDialogBuyStatus: string;
  // enablePurchase: boolean;
  enableAddToTour: boolean;
  onClickBuy: () => void;
  onClickBuyConfirm: () => void;
  onClickBuyCancel: () => void;
  onClickBuyStatus: () => void;
  onClickAddToTour: () => void;
  onOpenTravelTour: () => void;
}

export const TourDetails = (props: TourDetailsProps) => {
  const getDialogBuyConfirmationMessage = () => {
    if (props.tour) {
      return `${Strings.Components.Dialog.Confirmation.MessagePrefix} ${props.tour.type} (${props.tour.tour})?`;
    } else {
      return '';
    }
  };

  return (
    <>
      <PageTitle showButton={true} />
      <VSeparator />
      {!!props.tour ?
        <Row>
          <Col sm={6}>
            <Image src={HotelIcon} rounded />
          </Col>
          <Col sm={6}>
            <VSeparator />
            <VSeparator />
            <VSeparator />
            <Row noGutters={true}>
              <H1>{props.tour.tour}</H1>
            </Row>
            <Row noGutters={true}>
              <H3>{props.tour.meetingPoint + ' - ' + props.tour.city}</H3>
            </Row>
            <VSeparator />
            <Row noGutters={true}>
              <H2>{props.tour.type}</H2>
            </Row>
            <VSeparator />
            <Row noGutters={true}>
              <H2>{Strings.Components.TourDetail.AvailablePlacesLbl + props.tour.availableTickets}</H2>
            </Row>
            
            <VSeparator />
            <VSeparator />
            <VSeparator />
            <VSeparator />

            {/* {props.enablePurchase ?
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
            } */}
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
