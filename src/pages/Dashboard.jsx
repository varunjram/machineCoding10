import React from "react";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { inventoryData } = useAppContext();

  const dashboardStats = inventoryData.reduce(
    (acc, curr, i) => {
      const lowStock = curr.stock <= 10;
      console.log("lowStock: ", lowStock);
      return [
        {
          description: "Total Stock",
          number: acc[0]?.number + curr?.stock,
          numColor: "text-green-800",
        },
        {
          description: "Total Delivered",
          number: acc[1]?.number + curr?.delivered,
          numColor: "text-yellow-500",
        },
        {
          description: "Low Stock Items",
          number: lowStock ? acc[2].number + 1 : acc[2].number,
          numColor: "text-red-800",
        },
      ];
    },
    [
      {
        description: "Total Stock",
        number: 0,
        numColor: "text-green-800",
      },
      {
        description: "Total Delivered",
        number: 0,
        numColor: "text-green-800",
      },
      {
        description: "Low Stock Items",
        number: 0,
        numColor: "text-green-800",
      },
    ]
  );
  console.log("dashboardStats: ", dashboardStats);
  console.log("inventoryData: ", inventoryData);
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex">
        {dashboardStats.map(({ number, description, numColor }, i) => {
          return (
            <div
              className="bg-red-50 m-5 p-5 flex-grow-1 text-center border-round-md 	"
              key={`${number}-${i}`}>
              <h3 className={`${numColor}`}>{number}</h3>
              <strong>
                {" "}
                <p>{description}</p>
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
