import moment from "moment";

const appInitialState = {
  test: "Test",
};

const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "Test":
      return { ...state, users: payload };

    default:
      throw new Error("Not a reducer function");
  }
};

const TEST = "TEST";

export { appInitialState, TEST };

export default AppReducer;
