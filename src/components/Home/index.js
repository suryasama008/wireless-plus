import React from "react";

import ProductsTable from "../shared/ProductsTable";

const Home = ({ state }) => {
  return (
    <div>
      <h2> Phone Inventory </h2>
      <ProductsTable state={state} />
    </div>
  );
};

export default Home;
