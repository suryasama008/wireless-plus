import PreviousMap from 'postcss/lib/previous-map'
import React, { useEffect } from 'react'
import { FcCheckmark } from 'react-icons/fc'
import { UserAuth } from '../../context/AuthContext'
import { Data } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'
const ProductForm = () => {
  const location = useLocation()
   const navigate = useNavigate()
  const { users, addProduct ,updateProduct,deleteProduct} = Data()
  const { user } = UserAuth()
    const [save, setSave] = React.useState(false)
    const [store, setStore] = React.useState('')
    const [showStore, setShowStore] = React.useState(false)
  const [err, setError] = React.useState("")
  const [updateState, setUpdateState] = React.useState(false)
  const [serialNumbers, setSerialNumbers] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false)
  const [alert, setAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState("")
  const [alertBgColor, setAlertBgColor] = React.useState(true)
  const [product, setProduct] = React.useState({
    store: '',
    category: '',
    brand: '',
    model: '',
    color: '',
    storage: '',
    imei: '',
    condition: '',
    status: '',
    price: '',
    battery: '',
    sellingPrice: '',
    supplier: '',
    remarks: '',
    contact: '',
    createdAt: '',
    updatedAt: '',
  })
  const setProductValues = async () => {
    const updateProduct = await location.state
    if (updateProduct) {
      setUpdateState(true)
      setProduct(updateProduct)
      setSerialNumbers([...serialNumbers, { imei: product.imei , model:product.model , category:product.category,}])
      setShowStore(true)
      setSerialNumbers([
        {
          imei: updateProduct.imei,
          model: updateProduct.model,
          category: updateProduct?.category,
        },
      ])
    }
  }
  useEffect(() => {
    setProductValues()
    setStore(users.filter((item) => item?.id === user?.uid)[0]?.store)  
    setShowStore(users.filter((item) => item?.id === user?.uid)[0]?.admin)
     setProduct({
       ...product,
       store: users.filter((item) => item?.id === user?.uid)[0]?.store,
     })
    }, [users,user])

    const handleSubmit = (e) => {
        e.preventDefault()
      if (product.imei !== '' && product.model !== '' && product.brand !== '' && product.color !== '' && product.storage !== '' && product.condition !== '' && product.status !== '' && product.supplier !== '') {
        if (updateState) {
          updateProduct(product, product.id)
            setAlert(true)
            setTimeout(() => {
              setAlert(false)
            }, 3000)
          setError('')
          return
        }
           setAlert(true)
           setTimeout(() => {
             setAlert(false)
           }, 3000)
        addProduct(product)
        setSave(true)
        setError('')
        setSerialNumbers([...serialNumbers, { imei: product.imei, model: product.model, category: product.category, }])
      
      } else {
          setError('* Please fill all the fields')
      }
    }
  const handleDelete = () => {
const id = product.id
    deleteProduct(id)
  }

    const handleReset = () => {
        if (product) {
            setProduct({
                store: '',
                category: '',
                brand: '',
                model: '',
                color: '',
                storage: '',
                imei: '',
                condition: '',
                status: '',
                price: '',
                battery: '',
                sellingPrice: '',
                supplier: '',
                remarks: '',
              contact: '',
              createdAt: '',
              updatedAt: '',
            })
            setSave(false)
            setError('')
        }
    }
    console.log(product)
  return (
    <div className=' mx-5'>
      <Link to='/'>
        <IoMdArrowBack className='text-2xl my-3 rounded-2xl w-8 h-8 hover:bg-blue-800 hover:text-white' />
      </Link>
      <h1 className='text-xl font-semibold'>Add Product</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-9 m-6'>
        <div className='col-span-3 space-y-6'>
          <div className='w-full md:w-3/4 px-3 mb-2 '>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Store
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                name='Store'
                value={product?.store}
                disabled={!showStore}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    store: e.target.value,
                  })
                }
              >
                <option disabled value=''>
                  Store
                </option>
                <option>BCC UL</option>
                <option>BCC LL</option>
                <option>EMTC</option>
                <option>SQUARE ONE</option>
              </select>
            </div>
          </div>
          <div className='w-full md:w-3/4 px-3 mb-2 '>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Category
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                name='category'
                value={product?.category}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value,
                  })
                }
              >
                <option disabled value=''>
                  Category
                </option>
                <option>Mobiles</option>
                <option>Tablets</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
          <div className='w-3/4 flex justify-between '>
            <div className='w-full md:w-1/2 px-3 mb-2 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Condition
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                  name='condition'
                  value={product?.condition}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      condition: e.target.value,
                    })
                  }
                >
                  <option disabled value=''>
                    Condition
                  </option>
                  <option>NEW</option>
                  <option>USED</option>
                </select>
              </div>
            </div>
            <div className='w-full md:w-1/2 px-3 mb-2 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Product Brand
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                  name='brand'
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      brand: e.target.value,
                    })
                  }
                >
                  <option value='' disabled>
                    Brand
                  </option>
                  <option>APPLE</option>
                  <option>SAMSUNG</option>
                  <option>GOOGLE</option>
                  <option>MOTOROLA</option>
                  <option>ZTE</option>
                  <option>OTHERS</option>
                </select>
              </div>
            </div>
          </div>
          <div className=' px-3 md:w-3/4'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Product Model
            </label>
            <input
              className='appearance-none autofill:!bg-yellow-200 capitalize block w-full text-gray-700 border rounded py-3 px-4 3 leading-tight outline-none bg-white border-gray-500'
              placeholder='eg. 14 pro max'
              name='model'
              value={product.model}
              onChange={(e) =>
                setProduct({ ...product, model: e.target.value.toUpperCase() })
              }
            />
          </div>
          <div className='flex w-3/4'>
            <div className='w-full md:w-1/2 px-3 my-2 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Color
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                  name='color'
                  value={product.color}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      color: e.target.value,
                    })
                  }
                >
                  <option value='' disabled>
                    Color
                  </option>
                  <option>Black</option>
                  <option>Blue</option>
                  <option>Red</option>
                  <option>White</option>
                  <option>Green</option>
                  <option>Gold</option>
                  <option>Purple</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className='w-full md:w-1/2 px-3 my-2 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Product Storage
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                  name='storage'
                  value={product.storage}
                  onChange={(e) =>
                    setProduct({ ...product, storage: e.target.value })
                  }
                >
                  <option value='' disabled>
                    Storage
                  </option>
                  <option>16 GB</option>
                  <option>32 GB</option>
                  <option>64 GB</option>
                  <option>128 GB</option>
                  <option>256 GB</option>
                  <option>512 GB</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap mb-2'>
            <div className='w-3/4 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                {product.category === 'Accessories'
                  ? 'Product Serial Number'
                  : 'Product Imei'}
              </label>
              <input
                className={`appearance-none capitalize block w-full text-gray-700 border  rounded py-3 px-4 3 leading-tight outline-none bg-white border-gray-500 ${
                  !product.imei && 'border-blue-500 border-2'
                }`}
                placeholder='eg. 123456789012345'
                name='imei'
                value={product.imei}
                onChange={(e) =>
                  setProduct({ ...product, imei: e.target.value.toUpperCase() })
                }
              />
            </div>
          </div>
          <p className='text-red-600'>{err}</p>
        </div>

        <div className='col-span-3 space-y-6'>
          <div className='w-full md:w-3/4 px-3 my-2 '>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Supplier / Customer
            </label>
            <div className='relative'>
              <input
                className='appearance-none capitalize border-gray-500 block w-full text-gray-700 border  rounded py-3 px-4 3 leading-tight outline-none bg-white '
                placeholder='Name'
                name='supplier'
                value={product.supplier}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    supplier: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className='w-full md:w-3/4 px-3 my-2 '>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Contact Number
            </label>
            <div className='relative'>
              <input
                className='appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 3 leading-tight outline-none bg-white '
                placeholder='Contact Number'
                type='number'
                name='contact'
                value={product.contact}
                onChange={(e) =>
                  setProduct({ ...product, contact: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex justify-between w-3/4'>
            <div className='w-full md:w-1/3 px-3 mb-2 md:0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Purchase Price
              </label>
              <div className='flex border border-gray-400 rounded-md'>
                <span className='inline-flex items-center px-3 border-r bg-gray-300 border-gray-400 font-bold  text-gray-500 '>
                  $
                </span>
                <input
                  className='appearance-none block w-full text-gray-700 rounded py-3 px-3 3 leading-tight outline-none bg-white'
                  placeholder='0.00'
                  name='price'
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='w-full md:w-1/3 px-3 mb-2 md:0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Selling Price
              </label>
              <div className='flex border border-gray-400 rounded-md'>
                <span className='inline-flex items-center px-3 border-r bg-gray-300 border-gray-400 font-bold  text-gray-500 '>
                  $
                </span>
                <input
                  className='appearance-none block w-full text-gray-700 rounded py-3 px-3 3 leading-tight outline-none bg-white '
                  placeholder='0.00'
                  name='sellingPrice'
                  value={product.sellingPrice}
                  onChange={(e) =>
                    setProduct({ ...product, sellingPrice: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='w-3/4 flex justify-between px-3 my-2 md:0'>
            <div className='md:w-1/3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                Battery %
              </label>
              <div className='flex border border-gray-400 rounded-md'>
                <input
                  disabled={product.condition !== 'USED'}
                  type='number'
                  className='appearance-none block w-full text-gray-700  rounded py-3 px-4 3 leading-tight outline-none bg-white justify-center'
                  placeholder='100'
                  name='battery'
                  value={product.battery}
                  onChange={(e) =>
                    setProduct({ ...product, battery: e.target.value })
                  }
                />
                <span className='inline-flex pl-2 items-center px-2 border-l bg-gray-300 border-gray-400 font-bold  text-gray-500 '>
                  %
                </span>
              </div>
            </div>
            {showStore && (
              <div className='md:w-1/3 '>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
                  status
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500'
                    name='status'
                    value={product?.status}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        status: e.target.value,
                      })
                    }
                  >
                    <option disabled value=''>
                      status
                    </option>
                    <option>IN STOCK</option>
                    <option>SOLD</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className='w-3/4 px-3 my-2 md:0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
              Remarks
            </label>
            <textarea
              id='message'
              rows='4'
              name='remarks'
              className='block my-2 p-2.5 w-full text-md text-gray-900 border-gray-300  rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Your Remarks...'
              onChange={(e) =>
                setProduct({
                  ...product,
                  remarks: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          {!updateState ? (
            <div className='flex w-3/4 justify-between '>
              <button
                disabled={save}
                type='submit'
                onClick={(e) => {
                  setProduct({
                    ...product,
                    status: 'IN STOCK',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                  setAlertMessage('Product Added Successfully')
                  setAlertBgColor('true')
                  handleSubmit()
                }}
                className={`px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest ${
                  save ? 'bg-gray-500' : 'bg-blue-700'
                }`}
              >
                Save
              </button>
              <div className='space-x-2'>
                <button
                  onClick={() => {
                    setSave(false)
                    handleReset()
                  }}
                  className={`px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest ${
                    !save ? 'bg-gray-500' : 'bg-blue-700'
                  }`}
                >
                  Add New
                </button>
                <button
                  onClick={() => {
                    setSave(false)
                    setProduct({ ...product, imei: '' })
                  }}
                  className={`px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest ${
                    !save ? 'bg-gray-500' : 'bg-blue-700'
                  }`}
                >
                  Add Multiple
                </button>
              </div>
            </div>
          ) : (
            <div className='flex w-3/4 justify-between '>
              <button
                // disabled={save}
                // type='submit'
                onClick={(e) => {
                  setProduct({
                    ...product,
                    updatedAt: new Date(),
                  })
                  setAlertMessage('Product Updated Successfully')
                  setAlertBgColor('true')
                  handleSubmit()
                }}
                className='px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest bg-blue-700'
              >
                Update
              </button>

              <button
                disabled={save}
                onClick={(e) => {
                  setAlertMessage('')
                  setAlertBgColor()
                  setOpenModal(true)
                }}
                className='px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest  bg-red-600'
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className='col-span-3 '>
          <h1 className='text-md font-semibold'>Product List</h1>
          <div className='w-full h-3/4 border border-gray-200 rounded-md m-4 '>
            <SerialNumber serialNumbers={serialNumbers} />
          </div>
        </div>
      </form>
      {openModal && (
        <div class='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
          <div class='bg-white px-16 py-14 rounded-md text-center'>
            <h1 class='text-xl mb-4 font-bold text-slate-500 space-y-5'>
              Are you sure you want to delete this product?
            </h1>
            <div className='flex justify-between space-x-10'>
              <button
                onClick={() => setOpenModal(false)}
                className='px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest bg-blue-700'
              >
                No, Cancel
              </button>
              <Link to='/'>
                <button
                  onClick={() => handleDelete()}
                  className='px-6 py-2 shadow-sm shadow-gray-400  rounded text-white tracking-widest bg-red-600'
                >
                  yes, Delete
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {alert && <Alert bgColor={alertBgColor} message={alertMessage} />}
    </div>
  )
}

export default ProductForm

const SerialNumber = ({ serialNumbers }) => {
  return (
    <div className='w-full'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-2 text-left'>Category</th>
              <th className='px-4 py-2 text-left'>Model</th>
              <th className='px-4 py-2 text-left'>IMEI</th>   
            </tr>
          </thead>
          <tbody>
            {serialNumbers.map((serialNumber) => (
              <tr key={serialNumber.id}>
                <td className='border px-4 py-2'>{serialNumber.category}</td>
                <td className='border px-4 py-2'>{serialNumber.model}</td>
                <td className='border px-4 py-2'>{serialNumber.imei}</td>
              </tr>
            ))}
          </tbody>
        </table>
     
    </div>
  )
}

const Alert = ({ bgColor, message }) => {
  return (
    <div
      class={`relative py-3 pl-4 pr-4 leading-normal rounded-lg max-w-xl flex justify-between ${bgColor ? 'bg-green-100 text-green-600' :'text-white'}`}
      role='alert'
    >
      <p>{message}</p>
      <p>X</p>
    </div>
  )
}