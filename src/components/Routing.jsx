import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Products from "../pages/Products";
import AddProductForm from "../pages/AddProductForm";
import ProductDisplay from "../pages/ProductDisplay";

export default function Routing() {
  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            <Layout>
              <InventoryDashboard />
            </Layout>
          }
        /> */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/departments"
          element={
            <Layout>
              <Departments />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/add-new-product"
          element={
            <Layout>
              <AddProductForm />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDisplay />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
