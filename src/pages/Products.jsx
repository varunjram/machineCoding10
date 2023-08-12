import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { FilterProducts, ShowLowStock, SortProducts } from "../reducers/AppReducer";
import { useNavigate } from "react-router-dom";
import DepartmentsDropDown from "../components/DepartmentsDropDown";

const Products = () => {
  const { filterBy, sortBy, showLowStock, dispatch, inventoryData } = useAppContext();

  const sortByOptions = ["Name", "Price", "Stock"];

  const filterSortProducts = (inventoryData) => {
    const filter = inventoryData.filter((ele) =>
      filterBy === "All Departments" ? true : ele.department === filterBy
    );
    let sort;
    if (sortBy === "Name") {
      sort = filter.sort((a, b) => a.name?.localeCompare(b.name));
    } else {
      const type = sortBy.charAt(0).toLowerCase() + sortBy.slice(1);
      sort = filter.sort((a, b) => a[type] - b[type]);
    }

    const stockType = showLowStock ? sort.filter((ele, i) => ele.stock <= 10) : sort;

    return stockType;
  };
  const navigate = useNavigate();

  const displayProducts = filterSortProducts(inventoryData);
  return (
    <div>
      <h1>Products</h1>
      <div className="header flex  justify-content-between   align-items-center mb-3">
        <DepartmentsDropDown label="Department" />

        <div className="flex align-items-center">
          <Checkbox
            onChange={(e) => dispatch({ type: ShowLowStock, payload: e.checked })}
            checked={showLowStock}
          />
          <label
            htmlFor="lowStock"
            className="ml-2">
            Low Stock Item
          </label>
        </div>
        <div className="flex flex-column">
          <label
            htmlFor="Category"
            className="ml-2">
            Sort by
          </label>
          <Dropdown
            value={sortBy}
            onChange={(e) => dispatch({ type: SortProducts, payload: e.value })}
            options={sortByOptions}
            placeholder="Select a Category"
            className="w-full md:w-14rem"
          />
        </div>

        <div>
          <Button
            label="Add-New"
            onClick={() => navigate("/add-new-product")}
          />
        </div>
      </div>

      <DataTable
        value={displayProducts}
        tableStyle={{ minWidth: "50rem" }}>
        <Column
          field="code"
          header="Image"
          body={({ imageUrl, name }) => {
            return (
              <div className="w-4rem	">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full"
                />
              </div>
            );
          }}
        />

        <Column
          field="name"
          header="Name"
        />
        <Column
          field="description"
          header="Description"
        />
        <Column
          field="price"
          header="Price"
        />
        <Column
          field="stock"
          header="Stock"
        />
        <Column
          field="supplier"
          header="Supplier"
        />
      </DataTable>
    </div>
  );
};

export default Products;
