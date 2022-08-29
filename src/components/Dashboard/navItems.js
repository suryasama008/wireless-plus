import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import Ballot from "@material-ui/icons/Ballot";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import BarChartIcon from "@material-ui/icons/BarChart";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Search from "@material-ui/icons/Search";

import * as routes from "../Routes/routes";

const link = { textDecoration: "none", color: "initial" };

export const mainNavItems = (
  <div>
    <Link to={routes.HOME} style={link}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to={routes.EMPLOYEE} style={link}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Employee" />
      </ListItem>
    </Link>
  </div>
);
