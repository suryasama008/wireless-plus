import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Item from "@material-ui/core/Item";
import { DASHBOARD } from "../Routes/routes";
import { removeProduct, updateProduct } from "../../actions/product";
import { Col, Divider, Row, Table } from "antd";
import ConfirmDialog from "../shared/ConfirmDialog";
import "./App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 5),
  },
}));

const ProductDetail = (props) => {
  const classes = useStyles();
  const { product, removeProduct, history } = props;

  const removeHandler = (id) => {
    removeProduct(id).then((res) => {
      if (res) {
        history.push(`${DASHBOARD}/home`);
      }
    });
  };

  return (
    <div>
      {product && (
        <Container component="main" maxWidth="sm">
          <Paper className={classes.root} style={{ spacing: 52 }}>
            <Typography
              variant="h5"
              component="h3"
              style={{ padding: 10, textAlign: "center" }}
            >
              <b>
                <u>Phone details</u>
              </b>
            </Typography>
            <div className="product-Details">
              <div className="product-Heading">
                <h3>
                  <strong>Store: </strong>
                </h3>
                <h3>
                  <strong>Brand: </strong>
                </h3>
                <h3>
                  <strong>Model: </strong>
                </h3>
                <h3>
                  <strong>Color: </strong>
                </h3>
                <h3>
                  <strong>Storage: </strong>
                </h3>
                <h3>
                  <strong>Imei: </strong>
                </h3>
                <h3>Condition: </h3>
                <h3>
                  <strong>Cost Price: </strong>
                </h3>
                <h3>{product.status === "SOLD" ? "Sold Price" : null}</h3>
                <h3>
                  <strong>Status: </strong>
                </h3>
                <h3>
                  <strong>Updated At: </strong>
                </h3>
              </div>
              <div className="details">
                <h3>{product.store}</h3>
                <h3>{product.brand}</h3>
                <h3>{product.model}</h3>
                <h3>{product.color}</h3>
                <h3>{product.storage}</h3>
                <h3>{product.imei}</h3>
                <h3>{product.condition}</h3>
                <h3>$ {product.price}</h3>
                <h3>{product.status ? product.sell : null}</h3>
                <h3>{product.status}</h3>
                <h3>{new Date(product.updatedAt.toDate()).toUTCString()}</h3>
              </div>
            </div>

            {/* <Typography component="p">
              <b>Date:</b>{" "}
              {moment(product.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm a"
              )}
            </Typography>{" "} */}
            <Divider />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                // style={{
                //   backgroundColor: "green",
                //   color: "white",
                // }}
                onClick={() => history.push(`${DASHBOARD}/${product.id}/sell`)}
                item
                xs={5}
              >
                {product.status === "IN STOCK" ? "SELL" : "INVOICE"}
              </Button>

              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  style={{ marginRight: "10px" }}
                  color="primary"
                  onClick={() =>
                    history.push(`${DASHBOARD}/${product.id}/edit`)
                  }
                  item
                >
                  Edit
                </Button>
                <ConfirmDialog
                  confirmAction={() => removeHandler(product.id)}
                />
              </div>
            </div>
          </Paper>
        </Container>
      )}
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
  return { product };
};

export default connect(mapStateToProps, { removeProduct, updateProduct })(
  ProductDetail
);
