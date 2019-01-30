import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Container, Row, Button } from 'reactstrap';

import ProductIcon from '../components/ProductIcon/index';
import { cn } from '../util/util';

import styles from './index.scss';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			user: 'Log In'
		};
	}

	componentDidMount() {
		if(Object.keys(this.props.user).length !== 0) {
			console.log(this.props.user.user)
			this.setState({ user: this.props.user.user.email})
		}
		
		axios.get('/item/home').then(resp => {
			this.setState({ items: resp.data });
			console.log(resp.data);
		});
	}

	render() {
		return (
		  <Container className={cn("container", "my-4")}>
		 	
		 	<div className={cn('row', 'my-auto')}>
		 		<Link prefetch href="/"><a className={cn(styles.title, 'col', 'my-auto')}>loop</a></Link>
		 		
		 		<div className={cn('col-4', 'my-auto')}>
		 			<Link prefetch href="/item"><a className={cn(styles.button)}>Sell or Rent</a></Link>
		 			<Link prefetch href="/signin"><a className={cn(styles.link)}>{this.state.user}</a></Link>
		 		</div>
		 	</div>

		 	<div className={cn(styles.search, 'w-50')}>
			 	<p className={cn('h1')}>@ Cal State Monterey Bay</p>
			 </div>

		    <Row>
		    	{
		    		this.state.items.slice().reverse().map((i, k) => (
		    		<div key={k} className={cn("col-3")}>
		    			<ProductIcon item={i} />
		    		</div>
		    	))}
		    </Row>

		  </Container>
		);
	}
}

Index.propTypes = {
	user: PropTypes.object
};

const mstp = (state) => ({
	user: state.user
});

const mdtp = (dispatch) => ({

});

export default connect(mstp, mdtp)(Index);
