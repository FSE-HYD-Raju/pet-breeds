import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import "./addPet.css";
import { connect } from "react-redux";

class AddPet extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
    };
  }

  componentWillMount() {
    const { id, name, breed, age, address, price, phone } = this.props && this.props.pet || {};
    if(this.props.isEdit) {
      this.setState({
        ...this.state,
        showHide: this.props.isEdit,
       id: id,
       name: name,
       breed: breed, 
       age: age,
       address: address,
       price: price,
       phone: phone
      })
    } else {
      this.setState({
        showHide: false,
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit() {
    const { name, breed, age, price, address, phone } = this.state;
    if (name && breed) {
      const newPet = {
        id: !this.props.isEdit ? this.props.pets.length : this.state.id,
        name: name,
        breed: breed,
        age: age,
        price: price,
        address: address,
        phone: phone,
      };
      if (!this.props.isEdit) {
        this.props.dispatch({
          type: "ADD_NEW_PET",
          newPet: newPet,
        });
      } else {
        this.props.dispatch({
          type: "UPDATE_EXISTING_PET",
          pet: newPet,
        });
      }
      
      this.handleModalShowHide();
    } else {
      alert("Required fields are missing!");
    }
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
    this.props.dispatch({
      type: 'EDIT_PET',
      isEdit: false,
  })
  }

  render() {
    const { user, isEdit } = this.props;
    const { name, breed, age, price, address, phone } = this.state;
    const logout = () => {
      this.props.history.push("/");
      this.props.dispatch({
        type: "RESET_STORE",
      });
    };
    return (
      <div>
        {!isEdit && (
          <>
            <h4 className="add-pet">
              Hello, {user && user.userName}
              <br />
              <a href="/login" className="logout" onClick={() => logout()}>
                Logout
              </a>
            </h4>
            <div className="dashoard-heading">
              <h5 className="title">Pets Dashboard</h5>
              <Button
                variant="primary"
                onClick={() => this.handleModalShowHide()}
              >
                Add new pet
              </Button>
            </div>
          </>
        )}

        <Form>
          <Modal show={this.state.showHide}>
            <Modal.Header>
              <Modal.Title>Add Pet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Pet Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Breed Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="breed"
                  value={breed}
                  placeholder="Breed"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={age}
                  placeholder="Age"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  placeholder="Address"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  value={phone}
                  placeholder="contact number"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModalShowHide()}
              >
                Close
              </Button>
              <Button variant="primary" onClick={() => this.handleSubmit()}>
                {this.props.isEdit ? 'Update Pet' : 'Save Pet'}
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
    isEdit: state.app.isEdit,
  };
};

export default connect(mapStateToProps)(AddPet);
