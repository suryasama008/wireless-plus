import wireless from "./logo.ico"
export default function IndexPage({product,price,invoiceNumber,date}) {
  // const price = 11.3;
  // const product = {
  //   store: "BCC UL",
  //   brand: "APPLE",
  //   model: "IPHONE 12 PRO MAX",
  //   color: "GOLD",
  //   storage: "256GB",
  //   imei: "123456789012345",
  //   condition: "NEW",
  // }
  const stores = [
    {
      store: 'SQUARE ONE',
      mall: 'Square One,',
      address: '100 City Centre Dr,',
      phone: '(905) 275-5911',
      city: 'Mississauga, ON L5B 2C9',
    },
    {
      store: 'BCC UL',
      mall: 'Bramalea City Center (Upper Level), ',
      address: '25 Peel Centre Dr,',
      phone: '(905)306-8444',
      city: 'Brampton, ON L6T 3R5',
    },
    {
      store: 'BCC LL',
      mall: 'Bramalea City Center (Lower Level), ',
      address: '25 Peel Centre Dr,',
      phone: '(905)230-8200',
      city: 'Brampton, ON L6T 3R5',
    },
    {
      store: 'EMTC',
      mall: 'Erin Mills Town Centre, ',
      address: '5100 Erin Mills Pkwy,',
      phone: '(905)997-0700',
      city: 'Mississauga, ON L5M 4Z5',
    },
  ]
  function condition(props) {
    return props === 'USED'
      ? '30 DAYS IN STORE WARRANTY WITH ORIGINAL PROOF OF PURCHASE. PLEASE NOTE THAT ANY HARDWARE RELATED ISSUES WILL NOT BE COVERED UNDER THE WARRANTY. ALL SALES ARE FINAL.NO REFUNDS OR RETURNS.'
      : '1 YEAR LIMITED MANUFACTURE WARRANTY. WARRANTIES TO CLAIMED THROUGH THE ORIGINAL MANUFACTURER ANY HARDWARE/SOFTWARE ISSUES CAN BE DIRECTED TO THE MANUFACTURER. ALL SALES FINAL. NO REFUNDS OR RETURNS.'
  }
  const store = stores.filter((item) => item.store === product.store)
  

  return (
    <div className='m-6 mt-10'>
      <section className='flex relative justify-between'>
        <div className='w-1/3'>
          <img className='invoice-img' src={wireless} alt='' />
        </div>
        <div>
          <h3 className=' text-lg font-bold text-white bg-gray-900 px-5 py-1 my-8 drop-shadow-lg tracking-wider'>
            INVOICE
          </h3>
        </div>
      </section>
      <section className='flex justify-between'>
        <div className=' m-6'>
          <p className='text-sm italic capitalize'>{store[0].mall}</p>
          <p className='text-sm italic capitalize'>{store[0].address}</p>
          <p className='text-sm italic capitalize'>{store[0].city},</p>
          <div className='flex flex-col items center italic text-sm '>
            <p>
              <span className='font-semibold'>Ph:</span> {store[0].phone},
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 text-sm m-6 space-x-3'>
          <div className='font-semibold '>
            <p>Invoice Number#</p>
            <p>Date</p>
          </div>
          <div>
            <p>{invoiceNumber} </p>
            <p>{date}</p>
          </div>
        </div>
      </section>
      <section className=''>
        <div className='bg-gray-700 text-white border-1 shadow-md shadow-gray-200  px-4 tracking-wide text-sm font-semibold py-1 flex justify-between'>
          <h4 className='pl-4'>Product Description</h4>
          <h4 className='pr-4'>Product Price</h4>
        </div>
        <div className='flex justify-between '>
          <div className=' m-6 grid grid-cols-2 gap-4'>
            <div className='font-semibold text-sm '>
              <p>Brand</p>
              <p>Model</p>
              <p>Color</p>
              <p>Storage</p>
              <p>Imei</p>
            </div>
            <div className='text-sm '>
              <p> {product?.brand}</p>
              <p> { product?.model}</p>
              <p> {product?.color}</p>
              <p> {product?.storage}</p>
              <p> { product?.imei}</p>
            </div>
          </div>
          <div>
            <p className='text-sm font-bold p-6'>${price}</p>
          </div>
        </div>
      </section>
      <section className='border-t'>
        <div className='text-sm m-6  '>
          <div className='flex justify-between'>
            <p className='font-semibold'>Gross Total:</p>
            <p>$ {(price / 1.13).toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>HST #:</p>
            <p>819582198</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Tax:</p>
            <p>$ {(price * 1.13 - price).toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Net Total:</p>
            <p>$ {price}</p>
          </div>
        </div>
      </section>
      <section className='grid grid-cols-4 border-t border-gray-300'>
        <div className='col-span-3 my-6 mx-3'>
          <p className='text-sm'>
            Warranty:<span> {condition(product.condition)}</span>
          </p>
        </div>
      </section>
      <section className='flex justify-between border-t pt-14'>
        <div></div>
        <div className='py-6'>
          <span>signature :</span>
          <span>____________________________________</span>
        </div>
      </section>

      <footer className='mt-auto'>
        <div className='bg-gray-700 text-white border-1 text-sm font-bold text-center py-1'>
          Our Branches
        </div>
        <div className='grid grid-cols-4 gap text-xs italic font-semibold text-center my-4'>
          <div>
            <p>25 Peel Centre Dr</p>
            <p>Bramalea City Center</p>
            <p>(Lower Level)</p>
            <p>Brampton, ON L6T 3R5</p>
            <p>(905)230-8200</p>
          </div>
          <div>
            <p>25 Peel Centre Dr</p>
            <p>Bramalea City Center</p>
            <p>(Upper Level)</p>
            <p>Brampton, ON L6T 3R5</p>
            <p>(905)306-8444</p>
          </div>
          <div>
            <p>5100 Erin Mills Pkwy, </p>
            <p>Erin Mills Town Center</p>
            <p>Mississauga</p>
            <p>ON L5M 4Z5</p>
            <p>(905)997-0700</p>
          </div>
          <div>
            <p>100 City Centre Dr </p>
            <p>Square One Shopping Mall</p>
            <p>Mississauga</p>
            <p>ON L5B 2C9</p>
            <p>(905) 275-5911</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
