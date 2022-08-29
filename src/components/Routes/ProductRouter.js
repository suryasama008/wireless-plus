import React from "react";
import { Switch, Route } from "react-router-dom";

import * as routes from "./routes";
import Home from "../Home";
import AddProduct from "../Products/AddProduct";
// import CategoryList from "../CategoryList";
import ProductList from "../Products/ProductList";
import UpdateProduct from "../Products/UpdateProduct";
import Search from "../Search";
import ProductDetail from "../Products/ProductDetail";

import ProductSell from "../Products/ProductSell";

import Reports from "../../Reports/Reports";
const ProductRouter = ({ state }) => {
  return (
    <Switch>
      <Route exact path={routes.HOME} render={() => <Home state={state} />} />
      <Route path={routes.ADDPRODUCT} component={AddProduct} />

      <Route path={routes.SEARCH} component={Search} />
      <Route path={routes.REPORTS} component={Reports} />
      <Route exact path={`${routes.DASHBOARD}/`} component={ProductList} />
      <Route
        exact
        path={`${routes.DASHBOARD}/:productId`}
        component={ProductDetail}
      />
      <Route
        exact
        path={`${routes.DASHBOARD}/:productId/edit`}
        component={UpdateProduct}
      />
      <Route
        exact
        path={`${routes.DASHBOARD}/:productId/sell`}
        component={ProductSell}
      />
    </Switch>
  );
};

export default ProductRouter;
