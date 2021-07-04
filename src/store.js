import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const initialState = {
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
      id: 0,
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
    case "RESET_STORE":
      return {
        state: {},
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
