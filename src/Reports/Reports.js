import React from "react";
// import { Icon } from "@iconify/react";
// import appleFilled from "@iconify/icons-ant-design/apple-filled";
// import androidFilled from "@iconify/icons-ant-design/android-filled";
// material
import { alpha, styled } from "@mui/material/styles";
// import { Card, Typography } from "@mui/material";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
import { StoreReports } from "./StoreReports";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { ReportTable } from "./ReportTable";

// ----------------------------------------------------------------------

export default function Reports() {
  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StoreReports name="BCC LL" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StoreReports name="BCC UL" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StoreReports name="EMTC" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StoreReports name="Square One" />
            </Grid>
          </Grid>
          <Grid item lg={7} sm={6} xl={10} xs={12}>
            <ReportTable />
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
