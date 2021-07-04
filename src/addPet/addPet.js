import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import "./addPet.css";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm, formValueSelector } from "redux-form";

class AddPet extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
    };
  }

  handleChange = (e) => {
    this.setState({
     [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    const { name, breed, age, price, address, phone } = this.state;
    const newPet = {
      id: this.props && this.props.pets && this.props.pets.length,
      name: name,
      breed: breed,
      age: age,
      price: price,
      address: address,
      phone: phone,
    }
    this.props.dispatch({
      type: 'ADD_NEW_PET',
      newPet: newPet
    })
    this.setState({ showHide: !this.state.showHide });
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  render() {
    const { user } = this.props;
    const logout = (e) => {
      e.preventDefault();
      this.props.history.push("/");
      this.props.dispatch({
        type: "RESET_STORE",
      });
    };
    return (
      <div>
        <h4 className="add-pet">
          Hello, {user && user.userName}
          <br />
          <a
            href="javascript:void(0)"
            className="logout"
            onClick={(e) => logout(e)}
          >
            Logout
          </a>
        </h4>
        <div className="dashoard-heading">
          <h5 className="title">Pets Dashboard</h5>
          <Button variant="primary" onClick={() => this.handleModalShowHide()}>
            Add new pet
          </Button>
        </div>
        <Form>
          <Modal show={this.state.showHide}>
            <Modal.Header>
              <Modal.Title>Add Pet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Pet Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Name" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Breed Name</Form.Label>
                <Form.Control type="text" name="breed" placeholder="Breed" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age:</Form.Label>
                <Form.Control type="text" name="age" placeholder="Age"  onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price:</Form.Label>
                <Form.Control type="number" name="price" placeholder="Price"  onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" name="address" placeholder="Address"  onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone:</Form.Label>
                <Form.Control type="number" name="phone" placeholder="contact number"  onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModalShowHide()}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => this.handleSubmit()}
              >
                Save Pet
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.app.loggedInUser,
    pets: state.app.pets,
  };
};

export default connect(mapStateToProps)(AddPet);
