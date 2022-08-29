import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import Dropdown from '@material-ui/core/Dropdown';
import { useStyles } from "../auth/authStyles";
import { brandNames, colour, storage } from "../shared/Constants";
import FormButton from "../shared/FormButton";
import "./invoice.css";
const ProductSellForm = (props) => {
  const classes = useStyles();
  const { update, productById, isLoading, price } = props;

  const [product, setProduct] = useState({
    store: "",
    brand: "",
    model: "",
    color: "",
    storage: "",
    imei: "",
    condition: "",
    status: "",

    purchase: "",
    contactNo: "",
    price: "",
    sell: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      ...productById,
      updatedAt: new Date(),
    }));
  }, [productById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      store,
      brand,
      model,
      color,
      imei,
      storage,
      condition,
      price,
      status,
      purchase,
      contactNo,
      sell,
    } = product;
    const formIsValid =
      store.trim() &&
      brand.trim() &&
      model.trim() &&
      color.trim() &&
      imei.trim() &&
      storage.trim() &&
      condition.trim() &&
      price.trim() &&
      status.trim() &&
      purchase.trim() &&
      sell.trim() &&
      contactNo.trim();

    if (formIsValid) {
      setError("");
      return update(product);
    }
    return setError("All Form Fields are Required");
  };
  const handleChange = (e) => {
    e.preventDefault();
    // setPrice(e.target.value);
  };
  const inputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setProduct((prev) => ({ ...prev, sell: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        {error && <p>{error}</p>}
        <div className="mydiv hidden">
          <div className={classes.items}>
            <TextField
              type="hidden"
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              id="brand"
              label="Brand"
              name="brand"
              value={product.brand}
              select
            >
              {brandNames?.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value ?? item.value}
                  </MenuItem>
                );
              })}
            </TextField>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="model"
              label="Phone Model"
              name="model"
              autoComplete="model"
              onChange={inputChange}
              value={product.model}
            />
            {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="color"
          label="Color"
          name="color"
          onChange={inputChange}
          value={product.color}
        /> */}
            <TextField
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="color"
              label="Colour"
              name="color"
              value={product.color}
              select
            >
              {colour?.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value ?? item.value}
                  </MenuItem>
                );
              })}
            </TextField>

            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="storage"
            label="Storage"
            name="storage"
            autoComplete="Storage"
            onChange={inputChange}
            value={product.storage}
        /> */}

            <TextField
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              id="storage"
              required
              label="Storage"
              name="storage"
              value={product.storage}
              select
            >
              {storage?.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value ?? item.value}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
          <div className={classes.items}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="imei"
              label="IMEI Number"
              name="imei"
              onChange={inputChange}
              value={product.imei}
            />
            <TextField
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="condition"
              label="condition"
              name="condition"
              value={product.condition}
              select
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </TextField>
            {/* <div className = 'DropDownMenu' onChange={inputChange} >
        <input type="radio" value="New" name="condition" /> New
        <input type="radio" value="Used" name="condition"/> Used
    </div> */}
            <TextField
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="status"
              label="Status"
              name="status"
              value={product.status}
              select
            >
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="price"
              name="price"
              autoComplete="price"
              onChange={inputChange}
              value={product.price}
            />
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="purchase"
            label="purchase"
            name="purchase"
            autoComplete="purchase"
            onChange={inputChange}
            value={product.purchase}
            select
            >
            <MenuItem value="Dealer">In Stock</MenuItem>
            <MenuItem value="Walk-In">Sold</MenuItem>
        </TextField> */}
            <TextField
              onChange={inputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="purchase"
              label="Purchase"
              name="purchase"
              value={product.purchase}
              select
            >
              <MenuItem value="Dealer">Dealer</MenuItem>
              <MenuItem value="Walk-In">Walk-In</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contactNo"
              label="Contact Number"
              name="contactNo"
              autoComplete="contactNo"
              onChange={inputChange}
              value={product.contactNo}
            />
          </div>
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="sell"
          label="Amount"
          name="sell"
          autoComplete="sell"
          onChange={inputChange}
          value={product.sell}
        />
        <FormButton
          isLoading={isLoading}
          text={
            update
              ? "Save Changes"
              : productById
              ? `Add New to ${productById}`
              : "Add New"
          }
        />
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.isLoading,
  };
};

export default connect(mapStateToProps, {})(ProductSellForm);
