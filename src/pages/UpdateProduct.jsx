import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ProductForm from '../components/ProductForm/ProductForm'

const UpdateProduct = (props) => {
  const [product, setProduct] = React.useState({})
  const location = useLocation()
  
  const setValues = async () => {
    const updateProduct = await location.state
    setProduct(updateProduct)
  }

  React.useEffect(() => {
    setValues()
  }, [])
console.log(product)
  return (
    <div>
      <ProductForm udpate={product} />
    </div>
  )
}

export default UpdateProduct