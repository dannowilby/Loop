import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label
 } from 'reactstrap';

import { cn } from '../util/util';
import styles from './item.scss';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null,
  		    dropdownOpen: false,
  		    dropdownName: 'Pricing'
		};
	}
	
	onFileChange (e) {
		this.setState({ file: e.target.files[0] });
	}

	submitFile () {
		axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;

		const formData = new FormData();
		formData.append('recfile', this.state.file);
		formData.append('item_name', document.getElementById('name').value);
		formData.append('price', document.getElementById('price').value);
		formData.append('payment', document.getElementById('payment').value);
		formData.append('description', document.getElementById('description').value);

		axios.post(
			'/api/upload-item',
			formData, 
			{ headers: { 'content-type': 'multipart/form-data' }
		}).then(resp => {
			
			if(resp.data.message == 'success');
				Router.push('/');
		});
	}

	toggleDropDown () {
	    this.setState({
	      dropdownOpen: !this.state.dropdownOpen
	    });
	}

	setOption (op) {
		this.setState({ dropdownName: op });
	}

	render() {
		return (
			<div className={cn(styles.back)}>
				<Container className="w-50">

					<Link prefetch href="/"><a className={cn(styles.title, 'text-center', 'd-block','py-4')}>loop</a></Link>

					<div className={cn(styles.image_insert, 'p-4')}>
						<p>Image</p>
						<Input className="my-4 mx-auto" type="file" name="recfile" onChange={(e) => { this.onFileChange(e) }} />
					</div>

					<div className={cn(styles.card, 'p-4', 'my-4')}>
						
						<FormGroup>
							<Label>Name of Item</Label>
							<Input type="text" id="name" placeholder="Give your item a name" />
						</FormGroup>

						<FormGroup>
							<Label>Description</Label>
							<Input type="text" id="description" placeholder="Describe your item" />
						</FormGroup>
						
					</div>

					<div className={cn(styles.card, 'p-4','my-4')}>

			          <FormGroup>
				          <Label for="exampleNumber">Price</Label>
				          <Input
				            type="number"
				            name="price"
				            min="0.00"
				            max="10000.00"
				            step="0.01"
				            id="price"
				            placeholder="0.00"
				          />
				        </FormGroup>

					     <InputGroup className={cn("my-3")}>
				          <Input id="payment" type="select">
				          	<option>per Week</option>
				          	<option>per Month</option>
				          	<option>per Semester</option>
				          	<option disabled>to Buy</option>
				          </Input>
				        </InputGroup>
				        <p className={cn("my-0", "d-block", "text-right", "text-muted")}>+10% service fee</p>
			        </div>

					<Button className={cn(styles.list, "mx-auto", "d-block", "text-center")} onClick={() => { this.submitFile() }} outline color="danger">List</Button>
				</Container>
			</div>
		);
	}
}

Item.propTypes = {
	token: PropTypes.string,
};

const mapStateToProps = (state) => ({
	token: state.login.token
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Item);