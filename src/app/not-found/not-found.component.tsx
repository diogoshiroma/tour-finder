import React from 'react';
import Row from 'react-bootstrap/Row';
import { PageTitle } from '../../components/mol.page-title';
import { VSeparator, ErrorMessage } from '../../components';
import { Strings } from '../../resources';

export const NotFoundComponent = () => {
  return (
      <>
        <PageTitle showButton={true} />
        <VSeparator />
        <Row noGutters={true}>
          <ErrorMessage>{Strings.Pages.NotFound}</ErrorMessage>
        </Row>
      </>
  );
};
