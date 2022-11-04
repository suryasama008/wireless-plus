import React, { useRef, useState, useEffect } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import Invoice from '../components/Invoice/Invoice'
import { useReactToPrint } from 'react-to-print'
import { Link } from 'react-router-dom'
import { Data } from '../context/DataContext'
import moment from 'moment'
const ProductDetails = ({ product, invoiceNumber }) => {
  console.log(invoiceNumber)
   const {  updateProduct } = Data()
  const [sellingRemarks, setSellingRemarks] = React.useState('')
  const [check, setCheck] = React.useState(true)
  const [sellingPrice, setSellingPrice] = React.useState(0)
  const [showInvoice, setShowInvoice] = React.useState(true)
  const [sell, setSell] = React.useState(false)
  const [sold, setSold] = React.useState(false)
  const [setSellProduct, setSetSellProduct] = React.useState(null)
  const [date,setDate] = React.useState(null)
  const componentRef = useRef()
  function condition(props) {
    return props === 'USED'
      ? '30 DAYS IN STORE WARRANTY WITH ORIGINAL PROOF OF PURCHASE. PLEASE NOTE THAT ANY HARDWARE RELATED ISSUES WILL NOT BE COVERED UNDER THE WARRANTY. ALL SALES ARE FINAL.NO REFUNDS OR RETURNS.'
      : '1 YEAR LIMITED MANUFACTURE WARRANTY. WARRANTIES TO CLAIMED THROUGH THE ORIGINAL MANUFACTURER ANY HARDWARE/SOFTWARE ISSUES CAN BE DIRECTED TO THE MANUFACTURER. ALL SALES FINAL. NO REFUNDS OR RETURNS.'
  }
  const todaysDate = moment().format('DD/MM/YYYY')
   let dateFormat = 'DD/MM/YYYY'
   const handleDate = (data) => {
     var seconds = data.seconds
     var formatted = moment.utc(seconds * 1000).format(dateFormat)
     return formatted
   }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  function handleSave() {
    handleSell()
    setSold(!sold)
    sold ? console.log('sold') : console.log('not sold')
  }
  function handleSell() {
    const updatedProduct =  { ...product, status: 'SOLD', sell: (sellingPrice * 1.13).toFixed(2), invoiceNumber: invoiceNumber,soldRemarks: sellingRemarks, soldDate: todaysDate }
    console.log(updatedProduct)
    updateProduct(updatedProduct,product.id)
  }
  console.log(product?.soldDate)
  useEffect(() => {
    if (product?.status === 'SOLD') {
      setDate(product?.soldDate)
    }
    if(product?.status === "IN STOCK"){
       setDate(todaysDate)
    }
     
  }, [])
    
  useEffect(() => {
    !showInvoice && handlePrint()
  }, [showInvoice])
  return (
    <div className=''>
      <Link to='/updateProduct' state={product}>
        <h1>Reports</h1>
      </Link>
      {sell && (
        <IoMdArrowBack
          onClick={() => {
            setSell(false)
            setSold(false)
            setSellingPrice(0)
          }}
          className='w-8 h-8 mb-4 text hover: border-2 rounded-3xl hover:bg-indigo-800 hover:text-white'
        />
      )}
      <div className='grid grid-cols-2 border divide-x'>
        <div className='space-y-2 divide-y text-lg'>
          <p className=' px-4'>Store</p>
          <p className=' px-4'>Brand</p>
          <p className=' px-4'>Model</p>
          {product.color && <p className=' px-4'> Color</p>}
          {product.storage && (
            <p className=' px-4'>{product.storage && 'Storage'}</p>
          )}
          <p className=' px-4'>
            {product.storage === '' ? 'Serial No' : 'IMEI'}
          </p>
          {product.condition && <p className='px-4 '>Condition</p>}
          <p className=' px-4'>Status</p>
          <p className=' px-4'>Selling Price</p>
        </div>
        <div className='divide-y space-y-2 text-lg  capitalize'>
          <p className=' px-4'>{product.store.toLowerCase()}</p>
          <p className=' px-4'>{product.brand.toLowerCase()}</p>
          <p className=' px-4'>{product.model.toLowerCase()}</p>
          {product.color && (
            <p className=' px-4'>{product?.color.toLowerCase()}</p>
          )}
          {product.storage && <p className=' px-4'>{product?.storage}</p>}
          <p className=' px-4'>{product.imei}</p>
          {product.condition && (
            <p className=' px-4'>{product.condition.toLowerCase()}</p>
          )}
          <p className=' px-4'>{product.status.toLowerCase()}</p>
          <p className=' px-4'>
            $ {product?.sellingPrice}
          </p>
        </div>
      </div>
      {sell && (
        <section className='transition ease-in-out delay-150  m-2 text-lg space-y-3 duration-300'>
          <div className='mt-6 flex items-center'>
            <h3>Sell Price:</h3>
            <input
              type='text'
              onChange={(e) => setSellingPrice(e.target.value)}
              className='block border-2 px-4 rounded-md mx-4 border-blue-700 w-20'
            />
            <input
              id='default-checkbox'
              type='checkbox'
              onChange={() => setCheck(!check)}
              value=''
              class='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 '
            />
            <label
              for='default-checkbox'
              class='ml-2 block text-sm text-gray-900'
            >
              Tax-in
            </label>
          </div>
          <h4>
            Net Total : ${' '}
            {check ? (sellingPrice * 1.13).toFixed(2) : sellingPrice}
          </h4>
          <p className=' text-md'>
            {condition(product.condition).toLowerCase()}
          </p>
          <textarea
            id='message'
            rows='3'
            onChange={(e) => setSellingRemarks(e.target.value)}
            value={sellingRemarks}
            className='block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Your Remarks...'
          />
        </section>
      )}
      <section className='mt-6 text-sm'>
        {!sell && (
          <div className='flex justify-between '>
            <button
              hidden={sell}
              onClick={() => setSell(!sell)}
              className='px-5 py-2 shadow-sm shadow-gray-400 bg-blue-700 rounded text-white tracking-widest'
            >
              SELL
            </button>
            <div className='space-x-2'>
              <Link to='/updateProduct' state={product}>
                <button className='px-6 py-2 shadow-sm shadow-gray-400 bg-blue-700 rounded text-white tracking-widest '>
                  EDIT
                </button>
              </Link>
            </div>
          </div>
        )}
        {sell && (
          <div className='flex justify-between '>
            <button
              onClick={() => handleSave()}
              className='px-5 py-2 shadow-sm shadow-gray-400 bg-blue-700 rounded text-white tracking-widest'
            >
              {!sold ? 'SAVE' : 'EDIT'}
            </button>
            <button
              onClick={() => {
                setShowInvoice(false)
                setTimeout(() => {
                  setShowInvoice(true)
                }, 3000)
              }}
              disabled={!sold}
              className={`px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest ${
                !sold ? 'bg-gray-500' : 'bg-blue-700'
              }`}
            >
              PRINT
            </button>
          </div>
        )}
        <div ref={componentRef} className={showInvoice ? 'hidden' : ''}>
          <Invoice
            product={product}
            date={date}
            invoiceNumber={invoiceNumber}
            price={check ? (sellingPrice * 1.13).toFixed(2) : sellingPrice}
          />
        </div>
      </section>
    </div>
  )
}
export default ProductDetails
