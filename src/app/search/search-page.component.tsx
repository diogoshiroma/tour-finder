import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Residence } from '../../model/entities';
import { ResidencesListComponent } from '../../components/mol.residences-list/residences-list.component';
import { SearchForm } from '../../components/org.search-form';
import { VSeparator } from '../../components/atm.separators';
import { ErrorMessage, H2 } from '../../components/typography.style';
import { Strings } from '../../resources';
import { PageTitle } from '../../components/mol.page-title';

interface SearchPageInterface {
  onChangeCity: (event: any) => void;
  onChangeCheckinDate: (event: any) => void;
  onChangeCheckoutDate: (event: any) => void;
  onSubmit: () => void;
  onBlurCheckinDate: () => void;
  onBlurCheckoutDate: () => void;
  onBlurCity: () => void;
  availableResidences: Residence[];
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
      />
      {props.availableResidences.length > 0 ?
          <ResidencesListComponent residences={props.availableResidences} />
        :
          dirtyForm && (
            <>
              <VSeparator />
              <ErrorMessage>{Strings.Error.ResidencesForm.NoResFound}</ErrorMessage>
            </>
          )
      }
      {props.purchasedResidences.length > 0 &&
        <>
          <VSeparator />
          <H2>{Strings.Components.ResidencesForm.PurchasedResidences}</H2>
          <ResidencesListComponent residences={props.purchasedResidences} />
        </>
      }
    </>
  );
};
