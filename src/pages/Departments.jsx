import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FilterProducts } from "../reducers/AppReducer";

const Departments = () => {
  const navigate = useNavigate();

  const { inventoryData, dispatch } = useAppContext();

  return (
    <div>
      <h1>Departments</h1>
      <div className="flex">
        {["Kitchen", "Clothing", "Toys"].map((ele, i) => {
          return (
            <div
              className="bg-red-50 m-5 p-5 flex-grow-1 text-center border-round-md	cursor-pointer	"
              key={`${ele}-${i}`}
              onClick={() => {
                dispatch({ type: FilterProducts, payload: ele });
                navigate("/products");
              }}>
              {/* <Link to={`${ele}`}> */}
              <h3>{ele}</h3>
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Departments;
