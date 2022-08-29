import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "../Routes/routes";
import MUIDataTable from "mui-datatables";
import CustomizedDialogs from "./Dialog";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    height: 600,
    overflow: "scroll",
    flexDirection: "column",
  },
  filter: {
    //  overflow: "scroll"
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
    height: 50,
  },
  link: {
    textDecoration: "none",
    color: "dodgerblue",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductsTable = ({ state, products }) => {
  const [store, setStore] = useState("");
  const [id, setId] = useState("");
  const [showStore, setShowStore] = useState(false);
  const dateFormat = "DD/MM/YYYY";
  const { users, uid } = state;

  const [date, setDate] = useState(moment().format(dateFormat));
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    for (var user in users) {
      if (uid === users[user].id) {
        // console.log(users[user].store);
        setStore(users[user].store);
      }
      if (users[user].admin && uid === users[user].id) {
        setShowStore(true);
      }
    }
  }, [users]);

  function handleChange(newValue) {
    setDate(moment(newValue).format(dateFormat));
  }

  const handleDate = (data) => {
    var seconds = data.seconds;
    var formatted = moment.utc(seconds * 1000).format(dateFormat);

    return formatted;
  };
  const columns = [
    {
      name: "store",
      label: "STORE",
      options: {
        filter: true,
        sort: true,
        filterList: [store],
        // options: { sortDirection: "asc" },
      },
    },
    {
      name: "brand",
      label: "BRAND",

      options: {
        filter: true,
        sort: true,

        options: { sortDirection: "desc" },
      },
    },
    {
      name: "model",
      label: "MODEL",
      options: {
        filter: false,
        sort: true,
        // options: { sortDirection: "asc" },
      },
    },
    {
      name: "color",
      label: "COLOR",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "storage",
      label: "STORAGE",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "imei",
      label: "IMEI",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "condition",
      label: "CONDITION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
        filterList: ["IN STOCK"],
      },
    },
    {
      name: "price",
      label: "COST PRICE",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "sell",
      label: "SOLD PRICE",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "purchase",
      label: "PURCHASE",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "phoneNo",
      label: "PHONE NUMBER",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },

    {
      name: "updatedAt",
      label: "UPDATED AT",
      options: {
        // display: false,
        filter: false,
        sort: true,
        sortOrder: { direction: "asc" },
        customBodyRender: (data, dataIndex, rowIndex) => {
          var date = handleDate(data);

          return <>{date}</>;
        },
      },
    },
    {
      name: "remarks",
      label: "REMARKS",
      options: {
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: "soldRemarks",
      label: "SOLD REMARKS",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },

    {
      name: "soldDate",
      label: "SOLD DATE",
      options: {
        display: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: "id",
      label: "N/A",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
  ];

  let history = useHistory();
  useEffect(() => {
    if (id !== "") {
      history.push(`${DASHBOARD}/${id}`);
    }
  });
  const handleRowClick = (rowData) => {
    if (store === rowData[0] || showStore === true) {
      setId(rowData[columns.length - 1]);
    }
  };
  const options = {
    selectableRows: "none",
    onRowClick: handleRowClick,
    filterType: "dropdown",
    sortOrder: { name: "updatedAt", direction: "desc" },
  };

  return (
    <>
      <CustomizedDialogs />

      <MUIDataTable
        SX={{ width: "100%" }}
        // title={"Employee List"}
        data={products}
        columns={columns}
        options={options}
      />
    </>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};
const mapStateToProps = ({ firestore: { ordered } }) => ({
  products: ordered.products,
});

const date = moment().format("DD/MM/YYYY");
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "products",
    },
  ])
)(ProductsTable);
