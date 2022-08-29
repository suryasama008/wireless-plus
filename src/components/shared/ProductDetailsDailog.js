import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "../Products/ProductForm";
import Grid from "@mui/material/Grid";
import ProductDetail from "../Products/ProductDetail";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProductDetailsDailog({ productId }) {
  const [open, setOpen] = React.useState(false);
  const [save, setSave] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setSave(false);
  };
  const handleClose = () => {
    setSave(true);
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          PRODUCT DETAILS
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProductDetail productId={productId} save={save} />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            autoFocus
            style={{ backgroundColor: "#3F50B5" }}
            onClick={handleClose}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
