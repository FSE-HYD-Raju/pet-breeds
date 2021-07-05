import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import AddPet from "../addPet/addPet";

class PetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pet: {},
    };
  }

  render() {
    const { pets, user, isEdit } = this.props;
    const { pet } = this.state;
    const breed = this.props.match.params.id;
    const filteredPets = pets && pets.filter((pet) => pet.breed === breed);
    const logout = () => {
      this.props.history.push("/");
      this.props.dispatch({
        type: "RESET_STORE",
      });
    };
    const backToDashBoard = () => {
      this.props.history.push("/dashboard");
    }
    const editPet = (pet) => {
        this.setState({
            pet: pet,
        })
        this.props.dispatch({
            type: 'EDIT_PET',
            isEdit: true,
        })
    }
    return (
      <div className="breed-table">
        <h4 className="add-pet">
          Hello, {user && user.userName}
          <br />
          <a href="/login" className="logout" onClick={() => logout()}>
            Logout
          </a>
        </h4>
        <div className="dashoard-heading">
          <h5 className="title">
            Pets in category: <b>{breed}</b>{" "}
          </h5>
          <a className="show-pets-link"  onClick={() => backToDashBoard()}>Back to Dashboard</a>
        </div>
        {isEdit && <AddPet isEdit={true} pet={pet}/>}
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Price</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets &&
              filteredPets.map((pet, index) => {
                return (
                  <tr key={index}>
                    <td>{pet.name}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>{pet.price}</td>
                    <td>{pet.address}</td>
                    <td>{pet.phone}</td>
                    <td>
                      <button onClick={() => editPet(pet)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.app.pets,
    user: state.app.loggedInUser,
    isEdit: state.app.isEdit,
  };
};

export default connect(mapStateToProps)(PetTable);
