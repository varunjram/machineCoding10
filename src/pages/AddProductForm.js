import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";
import DepartmentsDropDown from "../components/DepartmentsDropDown";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddProductForm = () => {
  const { inventoryData, filterBy } = useAppContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      sku: "",
      supplier: "",
      delivered: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("*Required"),
      price: Yup.number().required("*Required"),
      stock: Yup.number().required("*Required"),
      sku: Yup.string().required("*Required"),
      supplier: Yup.string().required("*Required"),
      // grn_desc: Yup.string().required("*Required").typeError("*Required"),
    }),
    onSubmit: (data) => {
      console.log("data: ", data);
      const { delivered, description, name, price, stock, sku, supplier, url } = data;

      const newProduct = {
        id: inventoryData.length + 1,
        department: filterBy,
        name,
        description: description,
        price,
        stock,
        sku,
        supplier,
        delivered,
        imageUrl: url,
      };
      const existingProducts = JSON.parse(localStorage.getItem("newProducts"));
      console.log("existingProducts: ", existingProducts);

      if (existingProducts) {
        localStorage.setItem("newProducts", JSON.stringify([...existingProducts, newProduct]));
      } else {
        localStorage.setItem("newProducts", JSON.stringify([newProduct]));
      }

      console.log("newProduct: ", newProduct);

      formik.resetForm();
      navigate("/products");
    },
  });

  console.log("formikerr: ", formik.errors);

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
  const HandleFormChange = async (e, type) => {
    let value;
    let fieldIdentifier;

    switch (type) {
      case "number":
        value = e.value;
        fieldIdentifier = e.originalEvent?.target.name;
        break;
      default:
        value = e?.target?.value;
        fieldIdentifier = e?.target?.id;
        break;
    }
    await formik.setFieldValue(fieldIdentifier, value);
  };

  console.log("formik.values: ", formik.values);

  return (
    <div>
      <h1>Add New Product </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="p-fluid grid">
        <div className="col-12">
          <DepartmentsDropDown label="Department" />
        </div>
        {[
          { field: "name", label: "Name", type: "text" },
          { field: "price", label: "Price", type: "number" },
          { field: "stock", label: "Stock", type: "number" },
          { field: "sku", label: "SKU", type: "text" },
          { field: "supplier", label: "Supplier", type: "text" },
          { field: "delivered", label: "Delivered", type: "number" },
          { field: "url", label: "Image Url", type: "text" },
          { field: "description", label: "Description" },
        ].map((ele, i) => {
          const { field, label } = ele;
          let inputElement;
          switch (ele.type) {
            case "text":
              inputElement = (
                <InputText
                  type="text"
                  id={field}
                  name={field}
                  value={formik?.values?.[field] ?? ""}
                  onChange={(e) => HandleFormChange(e)}
                  className={classNames({ "p-invalid": isFormFieldValid(field) })}
                />
              );
              break;
            case "number":
              inputElement = (
                <InputNumber
                  id={field}
                  name={field}
                  value={formik?.values?.[field] ?? undefined}
                  onChange={(e) => HandleFormChange(e, "number")}
                  className={classNames({ "p-invalid": isFormFieldValid(field) })}
                />
              );
              break;
            default:
              inputElement = (
                <InputTextarea
                  id={field}
                  name={field}
                  value={formik?.values?.[field] ?? ""}
                  onChange={(e) => HandleFormChange(e)}
                  autoFocus
                  className={classNames({ "p-invalid": isFormFieldValid(field) })}
                />
              );
          }

          return (
            <div
              className="field col-6"
              key={`${i} - ${field}`}>
              <label
                htmlFor="name"
                className={classNames({ "p-error": isFormFieldValid(field) })}>
                {label}
              </label>
              {inputElement}
              {getFormErrorMessage(field)}
            </div>
          );
        })}

        <Button
          type="submit"
          label="Submit"
          className="mt-2"
        />
      </form>
    </div>
  );
};

export default AddProductForm;
