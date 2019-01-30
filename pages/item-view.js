import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';

import { cn } from '../util/util';

import styles from './item-view.scss';

const rent = () => {
	Router.push('/rent');
};

const ItemView = ({ item }) => (
	<div className={cn("container")}>

		<Link prefetch href="/"><a className={cn(styles.title, 'd-block', 'my-4')}>loop</a></Link>

	
		<div className={cn('row')}>

			<div className={cn('col-lg-7')}>
				<div className={cn(styles.left)}>
					<img className={cn(styles.image, 'my-4')} src={`/static/images/${item.user}_${item.id}.jpeg`} />
				</div>
			</div>
		
			<div className={cn('col-lg-5', 'p-3')}>
				<p className={cn('h1')}>{item.name}</p>
				<p className={cn('h3')}>${item.price} {item.payment_type}</p>
				
				<div className={cn('my-4')}>
					<button className={cn('btn', 'btn-danger', 'my-4')} onClick={() => { rent(); }}>Rent Now</button>
				</div>

				<div className={cn('my-4')}>
					<p className={cn('d-inline')}><strong>Posted</strong></p> 
					<p className={cn('d-inline', 'mx-4')}>{moment(item.createdAt).format('LL')}</p>
				</div>

				<div className={cn('my-4')}>
					<p className={cn('my-0', 'py-0')}><strong>Description</strong></p>
					<p className={cn('my-0', 'py-0')}>{item.description}</p>
				</div>

				<div className={cn()}>
					<p className={cn('d-inline')}><strong>Posted by</strong></p>
					<p className={cn('d-inline', 'mx-4')}>{item.user.split('@')[0]}</p>
				</div>
			</div>

		</div>

	</div>
);

const mstp = state => ({
	item: state.item
});

const mdtp = dispatch => ({

});

export default connect(mstp, mdtp)(ItemView);