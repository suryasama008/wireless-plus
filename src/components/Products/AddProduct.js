import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createProduct } from "../../actions/product";
import ProductForm from "./ProductForm";

const AddProduct = (props) => {
  const { createProduct, save } = props;

  const addProduct = (product) => {
    createProduct(product);
  };

  return (
    <div>
      <ProductForm addProduct={addProduct} save={save} />
    </div>
  );
};

AddProduct.propTypes = {
  createProduct: PropTypes.func,
  history: PropTypes.shape({ shape: PropTypes.string }),
  location: PropTypes.shape({ push: PropTypes.func }),
};

export default connect(null, { createProduct })(AddProduct);
