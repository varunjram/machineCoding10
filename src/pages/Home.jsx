import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { test } = useAppContext();
  return (
    <div>
      <h1>Home</h1>
      <h1>{test}</h1>
    </div>
  );
}
