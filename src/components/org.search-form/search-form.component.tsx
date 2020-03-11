import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Strings } from "../../resources";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { VSeparator } from "../atm.separators";
import { FieldErrorMessage } from "../typography.style";

interface SearchFormInterface {
  onChangeCity: (event: any) => void;
  onChangeCheckinDate: (event: any) => void;
  onChangeCheckoutDate: (event: any) => void;
  onChangeTourQuantity: (event: any) => void;
  onTypeSelect: (event: any) => void;
  onBlurCheckinDate: () => void;
  onBlurCheckoutDate: () => void;
  onBlurCity: () => void;
  onSubmit: () => void;
  disabled: boolean;
  checkinInvalidDateFormat: boolean;
  checkinNonExistingDate: boolean;
  checkoutInvalidDateFormat: boolean;
  checkoutNonExistingDate: boolean;
  checkinAfterCheckout: boolean;
  emptyCity: boolean;
  dirtyCheckin: boolean;
  dirtyCheckout: boolean;
  dirtyCity: boolean;
  tourType: string;
}

export const SearchForm = (props: SearchFormInterface) => {
  return (
    <Form>
      <Container>
        <Row noGutters={true}>
          <Col sm={12}>
            <Form.Group controlId="formCity">
              <Form.Label>{Strings.Components.TourForm.City}</Form.Label>
              <Form.Control
                type="input"
                placeholder={Strings.Components.TourForm.Placeholder.City}
                onChange={props.onChangeCity}
                onBlur={props.onBlurCity}
              />
              {props.emptyCity && props.dirtyCity && (
                <FieldErrorMessage>
                  {Strings.Error.TourForm.EmptyCity}
                </FieldErrorMessage>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row noGutters={true}>
          <Col sm={5}>
            <Form.Group controlId="formCheckinDate">
              <Form.Label>{Strings.Components.TourForm.Date}</Form.Label>
              <Form.Control
                type="input"
                placeholder={Strings.Components.TourForm.Placeholder.Date}
                onChange={props.onChangeCheckinDate}
                onBlur={props.onBlurCheckinDate}
              />
              <Form.Text className="text-muted" style={{ fontStyle: "italic" }}>
                {Strings.Components.TourForm.DateFormat}
              </Form.Text>
              {props.checkinInvalidDateFormat && props.dirtyCheckin && (
                <FieldErrorMessage>
                  {Strings.Error.TourForm.InvalidDateFormat}
                </FieldErrorMessage>
              )}
              {props.checkinNonExistingDate && props.dirtyCheckin && (
                <FieldErrorMessage>
                  {Strings.Error.TourForm.NonExistingDate}
                </FieldErrorMessage>
              )}
              {props.checkinAfterCheckout && (
                <FieldErrorMessage>
                  {Strings.Error.TourForm.CheckingAfterCheckout}
                </FieldErrorMessage>
              )}
            </Form.Group>
          </Col>

          <Col sm={{ span: 3, offset: 1 }}>
            <Form.Group controlId="formQuantity">
              <Form.Label>{Strings.Components.TourForm.Quantity}</Form.Label>
              <Form.Control
                type="input"
                placeholder={Strings.Components.TourForm.Placeholder.Quantity}
                onChange={props.onChangeTourQuantity}
                // onBlur={props.onBlurCheckinDate}
              />
            </Form.Group>
          </Col>

          <Col sm={{ span: 2, offset: 1 }}>
            <div style={{marginTop: '30px'}}>
            </div>
          <DropdownButton
            id="dropdown-tour-type"
            title={props.tourType}
            variant="success"
            onSelect={props.onTypeSelect}
          >
            <Dropdown.Item eventKey={"Aventura"}>
              {Strings.Components.TourForm.Types.Adventure}
            </Dropdown.Item>
            <Dropdown.Item eventKey={"culture"}>
              {Strings.Components.TourForm.Types.Culture}
            </Dropdown.Item>
            <Dropdown.Item eventKey={"nature"}>
              {Strings.Components.TourForm.Types.Nature}
            </Dropdown.Item>
          </DropdownButton>
          </Col>
        </Row>
        <VSeparator half={true} />
        <Row noGutters={true}>
          <Col>
            <Button
              // disabled={props.disabled}
              variant="success"
              onClick={props.onSubmit}
              // block
              style={{ opacity: 1 }}
            >
              {Strings.Components.TourForm.Submit}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
