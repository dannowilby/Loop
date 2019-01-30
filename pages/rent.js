import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Link from 'next/link';

import { cn } from '../util/util';

import styles from './rent.scss';

const onClick = () => {
	Router.push('/');
}

const Rent = ({ item }) => (
	<div onClick={() => { onClick(); }} className={cn(styles.content)}>
		{
			/*
		<Container className="w-50">

			<Link prefetch href="/"><a className={cn(styles.title, 'text-center', 'd-block','py-4')}>loop</a></Link>

			<div className={cn(styles.card)}>

				<div className={cn(styles.image_holder)}>
					<img className={cn(styles.image, 'my-4')} src={`/static/images/${item.user}_${item.id}.jpeg`} />
				</div>
				
				<hr />
				
				<hr />
			</div>

		</Container>
			*/
		}
	</div>
);

const mstp = (state) => ({
	item: state.item
});

const mdtp = (dispatch) => ({

});

export default connect(mstp, mdtp)(Rent);
