import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Container, Row, Button } from 'reactstrap';

import ProductIcon from '../components/ProductIcon/index';
import { cn } from '../util/util';

import styles from './styles.scss';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};
	}

	componentDidMount() {
		
		axios.get('/item/home').then(resp => {
			this.setState({ items: resp.data });
			console.log(resp.data);
		});
	}

	render() {
		return (
		  <Container className={cn("container", "text-center", "my-4")}>
		    <h3><Link prefetch href="/item"><a>Loop</a></Link></h3>

		    <Row>
		    	{
		    		this.state.items.map((i, k) => (
		    		<div key={k} className={cn("col-4")}>
		    			<ProductIcon name={i.name} image={`/static/images/${i.user}_${i.id}.jpeg`} />
		    		</div>
		    	))}
		    </Row>

		  </Container>
		);
	}
}

export default Index;
