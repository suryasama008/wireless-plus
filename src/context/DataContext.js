import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const DataContext = createContext()

export function DataContextProvider({ children }) {
  const [productData, setProductData] = useState(null)
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, 'users')
  const productCollectionRef = collection(db, 'products')
  const testCollectionRef = collection(db, 'test')

  const addProduct = async (product) => {
    await addDoc(productCollectionRef, product)
  }

  const updateProduct = async (product,id) => {
    const userDoc = doc(productCollectionRef, id)
    // const newFields = { age: age + 1 }
    await updateDoc(userDoc, product)
  }

  const deleteProduct = async (id) => {
    const userDoc = doc(productCollectionRef, id)
    await deleteDoc(userDoc)
  }
  
  const loadProductData = async () => {
 const getUsers = async () => {
     const data = await getDocs(usersCollectionRef)
     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   }
     getUsers()
     
     const getProducts = async () => {
         const data = await getDocs(productCollectionRef)
         setProductData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
     }
    getProducts()
  }

 useEffect(() => {
  loadProductData()
 }, [])

  return (
    <DataContext.Provider
      value={{
        addProduct,
        updateProduct,
        deleteProduct,
        users,
        productData,
        loadProductData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function Data() {
  return useContext(DataContext)
}
