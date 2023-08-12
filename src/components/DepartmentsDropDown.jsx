import React from "react";
import { useAppContext } from "../context/AppContext";
import { Dropdown } from "primereact/dropdown";
import { FilterProducts } from "../reducers/AppReducer";

const DepartmentsDropDown = ({ label }) => {
  const { filterBy, dispatch, inventoryData } = useAppContext();

  const departMentOptions = inventoryData.reduce(
    (acc, curr) => (acc.includes(curr.department) ? acc : [...acc, curr.department]),
    ["All Departments"]
  );
  return (
    <div className="flex flex-column">
      <label
        htmlFor="Department"
        className="ml-2">
        {label}
      </label>
      <Dropdown
        value={filterBy}
        onChange={(e) => dispatch({ type: FilterProducts, payload: e.value })}
        options={departMentOptions}
        placeholder="Select a Department"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default DepartmentsDropDown;
