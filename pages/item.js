import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Link from 'next/link';
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

		console.log(document.getElementById('price').value);

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
			console.log(resp.data);
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
				<Container className="w-25">

					<Link prefetch href="/"><a className={cn(styles.title, 'text-center', 'd-block')}>loop</a></Link>

					<FormGroup>
						<Label>Item Name</Label>
						<Input type="text" id="name" placeholder="item" />
					</FormGroup>

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

				     <InputGroup>
			          <Input id="payment" type="select">
			          	<option>per Week</option>
			          	<option>per Month</option>
			          	<option>per Semester</option>
			          	<option disabled>to Buy</option>
			          </Input>
			        </InputGroup>

					<Input className="d-block my-4 px-1" type="textarea" id="description" placeholder="Description" />
					<Input className="d-block my-4" type="file" name="recfile" onChange={(e) => { this.onFileChange(e) }} />
					<Button onClick={() => { this.submitFile() }} outline color="primary">Submit Item</Button>
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