import React from 'react';

import styles from './styles.scss';

const ProductIcon = ({ name, image }) => (

	<div>
		<div className={styles.image_holder}><img className={styles.image} src={image} /></div>
		<p>{name}</p>
	</div>

);

export default ProductIcon;