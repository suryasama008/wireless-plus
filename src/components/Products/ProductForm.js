import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storage, brandNames, colour } from "../shared/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Dropdown from '@material-ui/core/Dropdown';
import { useStyles } from "../auth/authStyles";
import FormButton from "../shared/FormButton";
//import SerialsList from '../shared/SerialsList';
import Dropdown from "react-bootstrap/Dropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SerialsList from "./SerialsList";
import "./productForm.css";
const ProductForm = (props) => {
  const classes = useStyles();
  const { update, addProduct, uid, productById, isLoading, users, save } =
    props;

  const [product, setProduct] = useState({
    store: "",
    brand: "",
    model: "",
    color: "",
    storage: "",
    imei: "",
    condition: "",
    status: "",
    price: "",
    purchase: "",
    PhoneNo: "",
    remarks: "",
    sell: "",
  });
  const [serial, setSerial] = useState("");
  const [serialList, setSerialList] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      ...productById,
      updatedAt: new Date(),
    }));
  }, [productById]);
  const [store, setStore] = useState("");
  const [showStore, setShowStore] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState(true);
  const [productType, setProductType] = useState("PHONES");

  useEffect(() => {
    for (var user in users) {
      if (users[user].admin) {
        // setStore("BCC LL");
        setShowStore(true);
      } else if (uid === users[user].id) {
        setStore(users[user].firstName);
        setShowStore(false);
      }
    }
  }, []);

  const chooseFormAction = () => {
    if (!props.update) {
      addProduct(product);
    } else {
      update(product);
      // setShowStore(true)
    }
  };

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      store: store,
    }));
  }, [store]);
  useEffect(() => {
    save && handleSubmit();
  }, [save]);
  const inputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    console.log(store);
    setProduct((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
      status:
        name === "status" ? (!props.update ? "IN STOCK" : value) : "IN STOCK",
      // store:store
    }));
  };
  const storeChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setStore(value);
  };
  const handleType = (e) => {
    const value = e.target.value;
    setProductType(value);
    value === "PHONES" ? setType(true) : setType(false);
  };

  const handleSubmit = () => {
    const formIsValid =
      product.model.trim() && product.imei.trim() && product.store.trim();
    if (formIsValid) {
      setError("");
      setProduct((prev) => ({
        ...prev,
        imei: "",
      }));
      setSerialList([...serialList, product.imei]);
      return chooseFormAction();
    }
  };
  useEffect(() => {
    console.log(store);
  }, [store]);

  const test = () => {
    console.log(serialList.count);
  };
  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} onSubmit={test} noValidate>
        {error && <p>{error}</p>}

        <div className={classes.items}>
          <div className="store-type">
            <TextField
              onChange={storeChange}
              style={{
                display: props.update ? "" : showStore ? "" : "none",
              }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="store"
              label="Store Name"
              name="store"
              autoComplete="store"
              value={product.store}
              select
            >
              <MenuItem value="BCC LL">BCC LL</MenuItem>
              <MenuItem value="BCC UL">BCC UL</MenuItem>
              <MenuItem value="EMTC">EMTC</MenuItem>
              <MenuItem value="SQUARE ONE">SQUARE ONE</MenuItem>
            </TextField>

            <TextField
              onChange={handleType}
              fullWidth
              variant="outlined"
              margin="normal"
              id="Catergory"
              label="Catergory"
              name="Catergory"
              value={productType}
              select
            >
              <MenuItem value="PHONES">PHONES</MenuItem>
              <MenuItem value="ACCESSORIES">ACCESSORIES</MenuItem>
            </TextField>
          </div>
          <div className="brand-model">
            <TextField
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
              fullWidth
              id="model"
              label="Model"
              name="model"
              autoComplete="model"
              onChange={inputChange}
              value={product.model}
            />
          </div>
          <div className="color-storage-condition">
            <TextField
              onChange={inputChange}
              style={{ display: !type ? "none" : "" }}
              fullWidth
              variant="outlined"
              margin="normal"
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

            <TextField
              onChange={inputChange}
              style={{ display: !type ? "none" : "" }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="storage"
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
            <TextField
              onChange={inputChange}
              style={{ display: !type ? "none" : "" }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="condition"
              label="condition"
              name="condition"
              value={product.condition}
              select
            >
              <MenuItem value="NEW">NEW</MenuItem>
              <MenuItem value="USED">USED</MenuItem>
            </TextField>
          </div>
        </div>
        <div className={classes.items}>
          <TextField
            onChange={inputChange}
            style={{ display: props.update ? "" : "none" }}
            fullWidth
            variant="outlined"
            margin="normal"
            id="store"
            label="status "
            name="status"
            autoComplete="status"
            value={product.status}
            select
          >
            <MenuItem value="IN STOCK">IN STOCK</MenuItem>
            <MenuItem value="SOLD">SOLD</MenuItem>
          </TextField>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="remarks"
            label="Remarks"
            name="remarks"
            autoComplete="remarks"
            onChange={inputChange}
            value={product.remarks}
            multiline
            rows={5}
          />

          <div className="price-imei">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="price"
              label="price"
              name="price"
              autoComplete="price"
              type="number"
              style={{ width: "40%" }}
              onChange={inputChange}
              value={product.price}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="imei"
              label={productType === "PHONES" ? "IMEI Number" : "Serial Number"}
              name="imei"
              value={product.imei}
              onChange={inputChange}
            />
          </div>
          <Grid container justify="flex-end" style={{ paddingTop: "20px" }}>
            {!props.update ? (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                style={{ color: "#3F50B5" }}
                onClick={handleSubmit}
              >
                +Add Serial
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="primary"
                // style={{ color: "#3F50B5" }}
                onClick={handleSubmit}
              >
                Update Changes
              </Button>
            )}
          </Grid>
          {!props.update && serialList !== 0 ? (
            <SerialsList serials={serialList} />
          ) : null}
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.isLoading,
    uid: state.firebase.auth.uid,
    users: state.firestore.ordered.users,
  };
};

export default connect(mapStateToProps, {})(ProductForm);
