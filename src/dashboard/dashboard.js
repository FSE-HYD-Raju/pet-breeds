import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import AddPet from "../addPet/addPet";
import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
    };
  }

  render() {
    const { pets } = this.props;
    let pBreeds = [];
    const groupByBreeds = (breeds, key) =>
      breeds.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
      );
    const breeds = groupByBreeds(pets, "breed");
    Object.keys(breeds).forEach((key, i) => {
      pBreeds.push({
        id: i,
        breedName: key,
        noOfPetsAvailable: breeds[key].length,
        pets: breeds[key],
      });
    });
    return (
      <div className="breed-table">
        <AddPet history={this.props.history} />
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Breed Name</th>
              <th># of pets available</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {pBreeds &&
              pBreeds.map((breed, index) => {
                return (
                  <tr key={index}>
                    <td>{breed.id}</td>
                    <td>{breed.breedName}</td>
                    <td>{breed.noOfPetsAvailable}</td>
                    <td>
                      <a href="#">show pets</a>
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
  };
};

export default connect(mapStateToProps)(Dashboard);
