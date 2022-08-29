import { Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "antd/dist/antd.css";
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { removeProduct, updateProduct } from "../../actions/product";
import "./invoice.css";
import wireless from "./wireless.png";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../auth/authStyles";
import "./invoice.css";

const ProductSell = (props) => {
  const [price, setPrice] = useState(0);
  const [check, setCheck] = useState(true);
  const [soldRemarks, setSoldRemarks] = useState("");
  const [saveButton, setSaveButton] = useState(true);
  const [soldDate, setSoldDate] = useState("");
  const classes = useStyles();
  const { product } = props;
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [store, setStore] = useState("");
  const componentRef = useRef();
  var today = new Date();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRemark = ({ target }) => {
    const name = target.name;
    const value = target.value.toUpperCase();
    setSoldRemarks(value);
  };

  const handleCheck = () => {
    setCheck((prevCheck) => !prevCheck);
  };

  function condition(props) {
    return props === "USED"
      ? "30 DAYS IN STORE WARRANTY WITH ORIGINAL PROOF OF PURCHASE. PLEASE NOTE THAT ANY HARDWARE RELATED ISSUES WILL NOT BE COVERED UNDER THE WARRANTY. ALL SALES ARE FINAL"
      : "1 YEAR LIMITED MANUFACTURE WARRANTY\nWARRANTIES TO CLAIMED THROUGH-\nTHE ORIGINAL MANUFACTURER\nANY HARDWARE/SOFTWARE ISSUES-\n CAN BE DIRECTED TO THE MANUFACTURER.\n ALL SALES FINAL.";
  }

  const {
    updateProduct,
    productById,
    match: { params },
  } = props;

  const update = (product) => {
    updateProduct(params.productId, product);
  };

  const [prod, setProduct] = useState({
    sell: "",
    status: "",
    soldDate: "",
  });

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      ...productById,
      updatedAt: new Date(),
    }));
    product && setStore(product.store);
  }, [productById]);

  useEffect(() => {
    switch (store) {
      case "EMTC":
        setLocation("5100 Erin Mills Pkwy,");
        setCity("Mississauga");
        setPostal("ON L5M 4Z5");
        setPhone("905-997-0700");
        break;
      case "SQUARE ONE":
        setLocation("100 City Centre Dr,");
        setCity("Mississauga");
        setPostal("ON L5B 2C9");
        setPhone("905-306-8444");
        break;
      case "BCC UL":
        setLocation("25 Peel Centre Dr,");
        setCity("Brampton");
        setPostal("ON L6T 3R5");
        setPhone("905-497-7422");
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "BCC LL":
        setLocation("25 Peel Centre Dr,");
        setCity("Brampton");
        setPostal("ON L6T 3R5");
        setPhone("905-230-8200");
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;

      default:
        console.log("");
    }
  }, [store]);

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      sell: check ? (price * 1.13).toFixed(2) : price,
      status: "SOLD",
      soldRemarks: soldRemarks,
      soldDate: soldDate,
    }));
    setSoldDate(new Date().toLocaleDateString());
  }, [price, soldRemarks, check]);

  function handleSaveButton() {
    setSaveButton(true);
  }

  const handleSubmit = (e) => {
    setSaveButton(false);
    e.preventDefault();
    const { sell } = prod;
    return update(prod);
  };

  const inputChange = ({ target }) => {
    const value = target.value;
    setPrice(value);
  };

  return (
    <div>
      {product && (
        // <Container component="main" maxWidth="sm">
        <div ref={componentRef} className="invoice">
          <div className="image-header">
            <img className="invoice-img" src={wireless} alt="" />
          </div>
          <div className="invoice-address">
            <div className="address">
              <h2>Wireless+</h2>
              <h3>{location}</h3>
              <h3>{city},</h3>
              <h3>{postal},</h3>
              <h3>Ph:{phone}</h3>
            </div>
            <div className="invoice-date">
              <>
                <b>Invoice # : </b>
                {new Date().getDate()}
                {new Date().getMonth()}
                {new Date().getHours()}
                {new Date().getMinutes()}
              </>
              <div>
                <b>Invoice Date :</b>
                {product.status === "SOLD"
                  ? product.soldDate
                  : new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <div>
            <div className="table-header">
              <h3 className="product-header">Product Description</h3>
              <h3 className="price-header">Price</h3>
            </div>
          </div>
          <div className="productDetail">
            <div className="product">
              <h4>
                <strong>Phone:</strong> {product.brand} ({product.color}){" "}
                {product.storage}
              </h4>
              <h4>
                <strong>Model:</strong> {product.model}
              </h4>
              <h4>
                <strong>Storage: </strong>
                {product.storage}
              </h4>
              <h4>
                <strong>Color:</strong> {product.color}
              </h4>
              <h4>
                <strong>Imei: </strong>
                {product.imei}
              </h4>
            </div>
            <div className="product-price">
              <span>$ {price}</span>
            </div>
          </div>
          <div className="invoice-comment">
            <div className="comment">
              <p>{condition(product.condition)}</p>
            </div>
            <div className="comment-price">
              <h4>
                Gross Total : $ {check ? price : (price / 1.13).toFixed(2)}
              </h4>
              <h4>
                <h4>HST # : 819582198</h4>
                Tax:{"$ "}
                {check
                  ? (price * 1.13 - price).toFixed(2)
                  : (price - price / 1.13).toFixed(2)}
              </h4>

              <h4>Net Total : $ {check ? (price * 1.13).toFixed(2) : price}</h4>
            </div>
          </div>
          <div className="remarks-sign">
            <TextField
              className="remarks"
              variant="outlined"
              margin="normal"
              fullWidth
              id="remarks"
              label="Remarks"
              name="remarks"
              autoComplete="remarks"
              onChange={handleRemark}
              // value={product.remarks}
              multiline
              rows={4}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Sign"
              variant="outlined"
              multiline
              rows={4}
              // defaultValue="Default Value"
            />
          </div>
        </div>
        // </Container>
      )}

      {saveButton ? (
        <div className="check-box">
          <div>
            <input type="text" onChange={inputChange} />
          </div>
          <div>
            <Checkbox style={{ color: "black" }} onClick={handleCheck} />
            Tax-in
          </div>
        </div>
      ) : null}

      <div className="buttons">
        <div className="save-edit">
          <span>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: saveButton ? "green" : "grey" }}
              // onClick={handlePrint}
              // disabled
              onClick={saveButton ? handleSubmit : null}
            >
              Save
            </Button>
          </span>
          <span className="printButton">
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: saveButton ? "grey" : null }}
              onClick={saveButton ? null : handlePrint}
              // onSubmit={handleSubmit}
            >
              print
            </Button>
          </span>
        </div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{ backgroundColor: saveButton ? "grey" : "green" }}
          onClick={!saveButton ? handleSaveButton : null}
          // onSubmit={handleSubmit}
        >
          edit
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    firestore: {
      ordered: { products },
    },
  } = state;
  const productId = ownProps.match.params.productId;
  const product = products && products.find((item) => item.id === productId);
  const productById =
    products && products.find((item) => item.id === productId);
  return { product, productById };
};

export default connect(mapStateToProps, { removeProduct, updateProduct })(
  ProductSell
);
