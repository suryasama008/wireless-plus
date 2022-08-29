import React from "react";
// import { Icon } from "@iconify/react";
// import appleFilled from "@iconify/icons-ant-design/apple-filled";
// import androidFilled from "@iconify/icons-ant-design/android-filled";
// material

// import { Card, Typography } from "@mui/material";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
// ----------------------------------------------------------------------

export function StoreReports(props) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {props.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              $24k
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              {props.iconName}
              {/* <MoneyIcon /> */}
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
      </CardContent>
    </Card>
  );
}
