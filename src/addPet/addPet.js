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

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="add-pet">
        <div>
          <h3>Hello, {user.userName}</h3>
        </div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Add new pet
        </Button>
        <Form>
          <Modal show={this.state.showHide}>
            <Modal.Header>
              <Modal.Title>Add Pet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Breed Name</Form.Label>
                <Form.Control type="text" placeholder="Pet name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type="number" placeholder="Quantity" />
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
                type="submit"
                onClick={() => this.handleModalShowHide()}
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
  };
};

export default connect(mapStateToProps)(AddPet);
