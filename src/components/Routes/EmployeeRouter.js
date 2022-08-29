import React from "react";
import { Switch, Route } from "react-router-dom";

import * as routes from "./routes";
import Employee from "../Employee/employee";
import EmployeeAttendance from "../Employee/EmployeeAttendance";
import EmployeeLoginDetails from "../Employee/EmployeeLoginDetails";
const EmployeeRouter = () => {
  return (
    <Switch>
      <Route path={routes.EMPLOYEE} component={Employee} />
      <Route exact path="/:id" component={EmployeeLoginDetails} />
    </Switch>
  );
};

export default EmployeeRouter;
