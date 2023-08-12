import React from "react";
import { Link, NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="grid h-screen">
      <nav className="col-2  bg-black-alpha-90	 text-0 flex flex-column surface-0">
        {[
          { name: "Dashboard", to: "/dashboard" },
          { name: "Departments", to: "/departments" },
          { name: "Products", to: "/products" },
        ].map(({ name, to }, index) => (
          <NavLink
            key={`${name}-index`}
            to={to}
            className={({ isActive }) => (isActive ? "text-yellow-400	" : null)}>
            <p className="pt-8"> {name}</p>
          </NavLink>
        ))}
        {}
      </nav>
      <div className="col-10">{children}</div>
    </div>
  );
};
export default Layout;
