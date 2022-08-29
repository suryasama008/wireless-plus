import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Fuse from "fuse.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Title from "../Title";
import ProductsTable from "../shared/ProductsTable";

const Search = ({ products, uid }) => {
  const [displayProducts, setDisplayProducts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 50,
    maxPatternLength: 12,
    minMatchCharLength: 5,
    keys: [
      "brand",
      "color",
      "price",
      "model",
      "store",
      "imei",
      "condition",
      "status",
    ],
  };

  const fuse = new Fuse(products, fuseOptions);
  const data = searchTerm ? fuse.search(searchTerm).reverse() : [];
  const [stores, setStore] = useState("admin");

  useEffect(
    (e) => {
      switch (uid) {
        case "EVB5ZwucBYMwV9RadiapRVYAKyr2":
          setStore("EMTC");
          break;
        case "rkK4qNpEIQUNu020xVNoa1k79Vk1":
          setStore("SQUARE ONE");
          break;
        case "SHg4TkzE8HUdsdIzkFPsutQUAT03":
          setStore("BCC UL");
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        case "nfWXXxHY3RObUopdFwTmG5dnf3L2":
          setStore("BCC LL");
          break;
        case "YtcKrpUxMrSq31O9HuQkFnemeVX2":
          // setStore("BCC LL");
          setStore("admin");
          break;
        case "Ekmjv82V4TgFRvMWMxIPjlaMoBI3":
          setStore("admin");
          break;
        case "GKzest4yyJT5RYXFlzOWJ1XfoXk2":
          setStore("admin");
          break;
        default:
        //  console.log(`Sorry, we are out of ${users}.`);
      }
      //  console.log(props.update);
    },
    [uid]
  );

  return (
    <div>
      <Title title="Search Inventory" />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="searchTerm"
        label="Search"
        name="searchTerm"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div>
        {data.length > 0 ? (
          <ProductsTable products={data} searchShow={true} stores={stores} />
        ) : searchTerm.length > 0 && data.length < 1 ? (
          <Typography variant="body2" color="secondary" component="p">
            {`No Item "${searchTerm}" found`}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            Enter a search (brand, price, model, color, store)
          </Typography>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  products: PropTypes.array,
  users: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    products: state.firestore.ordered.products,
    users: state.firestore.ordered.users,
    invoice: state.firestore.ordered.invoice,
    isLoading: state.products.isLoading,
  };
};

export default connect(mapStateToProps, {})(Search);
