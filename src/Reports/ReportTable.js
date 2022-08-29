import React from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";

export const ReportTable = (props) => (
  <Card {...props}>
    <CardHeader title="ReportTable" />
    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Store</TableCell>
            <TableCell>Phones</TableCell>
            <TableCell sortDirection="desc">
              <Tooltip enterDelay={300} title="Sort">
                <TableSortLabel active direction="desc">
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>sadfdsf</TableCell>
            <TableCell>asdfsadf</TableCell>
            <TableCell>fghdjfg</TableCell>
            <TableCell>asdfasdf</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button color="primary" size="small" variant="text">
        View all
      </Button>
    </Box>
  </Card>
);
