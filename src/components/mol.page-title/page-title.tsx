import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { H1, VSeparator } from '..';
import { Strings } from '../../resources/strings';
import { PageTitleStyled } from './page-title.style';
import { BackButton } from '../../resources/images';
import { Link } from 'react-router-dom';

interface PageTitleProps {
	showButton: boolean;
}

export const PageTitle = (props: PageTitleProps) => {
	return (
		<PageTitleStyled>
			{props.showButton ?
					<>
						<Col xs={5}>
							<VSeparator half={true} />
							<Link to={'/'} style={{textDecoration: "none"}}>
								<Image
									src={BackButton}
									width={30}
									height={30}
								/>
							</Link>
						</Col>
						<Col>
							<H1>{Strings.AppName}</H1>
						</Col>
					</>
				:
					<Col xs={{offset: 5}}>
						<H1>{Strings.AppName}</H1>
					</Col>
			}
			
		</PageTitleStyled>
	);
}