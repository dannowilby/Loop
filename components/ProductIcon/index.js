import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import { set_item } from '../../state/store';
import { cn } from '../../util/util';

import styles from './styles.scss';

const onClick = () => {
	Router.push('/item-view');
};

const ProductIcon = ({ item, setItem }) => (

	<div 
		className={styles.content} 
		onClick={() => { 
			setItem(item); 
			onClick(); 
		}}
	>
		
		<div className={styles.image_holder}><img className={styles.image} src={`/static/images/${item.user}_${item.id}.jpeg`} /></div>
		
		<div className={cn(styles.info, 'row', 'mx-0', 'px-0', 'py-2')}>
			<p className={cn('col', 'my-auto')}>{item.name}</p>
			<p className={cn('col', 'text-right', 'my-auto')}>$ {item.price}</p>
		</div>
	</div>

);

const mstp = state => ({

});

const mdtp = dispatch => ({
	setItem: (item) => {
		dispatch(set_item(item));
	}
});

export default connect(mstp, mdtp)(ProductIcon);