import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Residence, Tour } from '../../model/entities';
import { ResidencesListComponent } from '../../components/mol.residences-list/residences-list.component';
import { SearchForm } from '../../components/org.search-form';
import { VSeparator } from '../../components/atm.separators';
import { ErrorMessage, H2 } from '../../components/typography.style';
import { Strings } from '../../resources';
import { PageTitle } from '../../components/mol.page-title';
import { ToursListComponent } from '../../components';

interface SearchPageInterface {
  onChangeCity: (event: any) => void;
  onChangeCheckinDate: (event: any) => void;
  onChangeCheckoutDate: (event: any) => void;
  onChangeTourQuantity: (event: any) => void;
  onTypeSelect: (event:any) => void;
  onSubmit: () => void;
  onBlurCheckinDate: () => void;
  onBlurCheckoutDate: () => void;
  onBlurCity: () => void;
  availableResidences: Residence[];
  availableTours: Tour[];
  purchasedResidences: Residence[];
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
  startDate: Date;
  endDate: Date;
  tourType: string;
}

export const SearchPage = (props: SearchPageInterface) => {
  const [dirtyForm, setDirtyForm] = React.useState(false);
  
  const handleSubmit = () => {
    props.onSubmit();
    setDirtyForm(true);
  };

  return (
    <>
      <PageTitle showButton={false} />
      <VSeparator />
      <SearchForm
        onChangeCity={props.onChangeCity}
        onChangeCheckinDate={props.onChangeCheckinDate}
        onChangeCheckoutDate={props.onChangeCheckoutDate}
        onSubmit={handleSubmit}
        onBlurCheckinDate={props.onBlurCheckinDate}
        onBlurCheckoutDate={props.onBlurCheckoutDate}
        onBlurCity={props.onBlurCity}
        onTypeSelect={props.onTypeSelect}
        disabled={props.disabled}
        checkinInvalidDateFormat={props.checkinInvalidDateFormat}
        checkinNonExistingDate={props.checkinNonExistingDate}
        checkoutInvalidDateFormat={props.checkoutInvalidDateFormat}
        checkoutNonExistingDate={props.checkoutNonExistingDate}
        checkinAfterCheckout={props.checkinAfterCheckout}
        emptyCity={props.emptyCity}
        dirtyCheckin={props.dirtyCheckin}
        dirtyCheckout={props.dirtyCheckout}
        dirtyCity={props.dirtyCity}
        tourType={props.tourType}
        onChangeTourQuantity={props.onChangeTourQuantity}
      />
      {props.availableTours.length > 0 ?
          <ToursListComponent tours={props.availableTours} />
        :
          dirtyForm && (
            <>
              <VSeparator />
              <ErrorMessage>{Strings.Error.ResidencesForm.NoResFound}</ErrorMessage>
            </>
          )
      }
      {/* {props.purchasedResidences.length > 0 &&
        <>
          <VSeparator />
          <H2>{Strings.Components.ResidencesForm.PurchasedResidences}</H2>
          <ResidencesListComponent residences={props.purchasedResidences} />
        </>
      } */}
    </>
  );
};
