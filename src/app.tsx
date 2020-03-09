import React from 'react';
import Container from 'react-bootstrap/Container';
import { SearchPageContainer } from './app/search/search-page.container';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RoomDetailsPage } from './app/details/room-details.page';
import { NotFoundComponent } from './app/not-found/not-found.component';

export const TourFinderApp = () => {
	return (
		<BrowserRouter>
			<Container fluid={true}>
				<Switch>
					<Route exact path='/' component={SearchPageContainer} />
					<Route exact path='/details' component={RoomDetailsPage} />
					<Route component={NotFoundComponent} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
};
