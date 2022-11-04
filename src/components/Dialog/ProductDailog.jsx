import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ProductDetails from "../ProductDetails"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(6),
  },

  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function ProductDailog(props) {
  const { setProductId, product, content, loadProductData, invoiceNumber } =
    props
  const [open, setOpen] = React.useState(true)
  const [save, setSave] = React.useState(null)

  const handleClickOpen = () => {
    setOpen(true)
    setSave(false)
  }
  const handleClose = () => {
    setProductId('')
    setSave(true)
    setOpen(false)
    loadProductData()
  }
 
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          sx={{ backgroundColor: '#1d4ed8', color: 'white' }}
        >
          Product Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {content === 'dashboard' && (
            <ProductDetails
              save={save}
              product={product}
              invoiceNumber={invoiceNumber}
            />
          )}
        </DialogContent>
        <DialogActions>{product.price}</DialogActions>
      </BootstrapDialog>
    </div>
  )
}
