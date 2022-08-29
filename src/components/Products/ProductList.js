import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import * as routes from "../Routes/routes";
import { removeCategory } from "../../actions/product";
import Box from "@material-ui/core/Box";
import Title from "../Title";
import ProductCard from "./ProductCard";

import ConfirmDialog from "../shared/ConfirmDialog";
import { removeProduct, updateProduct } from "../../actions/product";
import Typography from "@material-ui/core/Typography";

import { DASHBOARD } from "../Routes/routes";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "initial",
  },
}));

const ProductList = (props) => {
  const classes = useStyles();
  const { products } = props;

  return (
    <div>
      <Title title={`All  Products`} />

      <Grid container alignItems="center">
        <Link
          to={{
            pathname: routes.ADDPRODUCT,
          }}
          className={classes.link}
        >
          <Button
            size="small"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Add New
          </Button>
        </Link>
        <div></div>
      </Grid>

      <Box display="flex" flexwrap="wrap"></Box>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    firestore: {
      ordered: { products },
    },
  } = state;
};

export default connect(mapStateToProps, { updateProduct })(ProductList);
