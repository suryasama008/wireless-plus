import React, { createContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import Navigation from "./Navigation";
import ProductRouter from "../Routes/ProductRouter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Dashboard = (props) => {
  const Context = createContext("Default Value");
  const classes = useStyles();
  const { products, uid, users, employees, isLoading, empLoading } = props;
  const state = {
    uid: uid,
    users: users,
    products: products,
    employees: employees,
    isLoading: isLoading,
    empLoading: empLoading,
  };
  // console.log(state.users);

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {(!products || isLoading) && <LinearProgress color="secondary" />}
        <Container maxWidth="lg" className={classes.container}>
          <ProductRouter {...state} state={state} />
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    products: state.firestore.ordered.products,
    users: state.firestore.ordered.users,
    isLoading: state.products.isLoading,
    empLoading: state.employees.isLoading,
    employees: state.firestore.ordered.employees,
  };
};

Dashboard.propTypes = {
  products: PropTypes.array,
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  // employees: PropTypes.array,
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.uid) return [];
    return [
      {
        collection: "products",
        // where: [["userId", "==", props.uid]],
      },
      {
        collection: "users",
      },
      {
        collection: "employees",
      },
      {
        collection: "attendance",
      },
    ];
  })
)(Dashboard);
