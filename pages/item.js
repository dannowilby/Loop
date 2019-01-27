import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Button } from 'reactstrap';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null
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

		axios.post(
			'/api/upload-item',
			formData, 
			{ headers: { 'content-type': 'multipart/form-data' }
		}).then(resp => {
			console.log(resp.data);
		});
	}

	render() {
		return (
			<Container>
				<input className="d-block my-4" id="name" placeholder="Item Name" />
				<input className="d-block my-4" type="file" name="recfile" onChange={(e) => { this.onFileChange(e) }} />
				<Button onClick={() => { this.submitFile() }} outline color="primary">Submit Item</Button>
			</Container>
		);
	}
}

Item.propTypes = {
	token: PropTypes.string,
};

const mapStateToProps = (state) => ({
	token: state.token
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Item);