import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductDisplay = () => {
  const { id } = useParams();
  console.log("id: ", Number(id));
  const { inventoryData } = useAppContext();
  console.log("inventoryData: ", inventoryData);

  const find = inventoryData.find((ele) => {
    console.log("ele: ", ele.id);

    return ele.id === 10;
  });
  console.log("find: ", find);

  return (
    <div>
      <h1>productDisplay</h1>
      <div className="w-10rem">
        <img
          src={find?.imageUrl}
          alt=""
          className="w-full"
        />
      </div>
      {find?.id && <pre>{JSON.stringify(find, null, 2)}</pre>}
    </div>
  );
};

export default ProductDisplay;
