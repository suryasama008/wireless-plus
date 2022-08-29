import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CheckIcon from "@mui/icons-material/Check";
const SerialsList = ({ serials }) => {
  // const serials = ["afsd", "asefasd", "234123412", "23452345"];
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>IMEI LIST</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {serials.map((serial, index) => (
          <TableRow key={index}>
            <TableCell
              style={{ display: "flex", justifyContent: "space-between" }}
              component="th"
              scope="row"
            >
              {serial}{" "}
              <span style={{ fontStyle: "italic" }}>
                updated <CheckIcon fontSize="small" sx={{ color: "green" }} />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SerialsList;
