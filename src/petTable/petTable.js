import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class PetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pets, user } = this.props;
    const breed = this.props.match.params.id;
    const filteredPets = pets && pets.filter((pet) => pet.breed === breed);
    const logout = () => {
      this.props.history.push("/");
      this.props.dispatch({
        type: "RESET_STORE",
      });
    };
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
        </div>
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
                      <button>Edit</button>
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
  };
};

export default connect(mapStateToProps)(PetTable);
