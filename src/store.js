import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const initialState = {
  isEdit: false,
  pets: [
    {
      id: 0,
      name: "Puppy",
      breed: "Husky",
      age: 5,
      price: 5000,
      address: "hyderabad",
      phone: "9789890989",
    },
    {
      id: 1,
      name: "Maxi",
      breed: "Labdoge",
      age: 5,
      price: 5000,
      address: "hyderabad",
      phone: "9789890989",
    },
    {
      id: 2,
      name: "Puppy1",
      breed: "Husky",
      age: 5,
      price: 5000,
      address: "hyderabad",
      phone: "9789890989",
    },
  ],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedInUser: {
          ...action.payload,
        },
      };
    case "ADD_NEW_PET":
      return {
        ...state,
        pets: [...state.pets, action.newPet],
        isEdit: false,
      };
    case "EDIT_PET":
      return {
        ...state,
        isEdit: action.isEdit,
      };

    case "UPDATE_EXISTING_PET":
      const petToUpdate = action.pet;
      let pets = state.pets;
      const idx = pets.findIndex((x) => x.id === petToUpdate.id);
      pets[idx] = petToUpdate;
      return {
        ...state,
        pets: pets,
        isEdit: false,
      };
    case "RESET_STORE":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    app: AppReducer,
  }),
  applyMiddleware(ReduxThunk)
);

export default store;
