import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../context/firebase";
import { useState } from "react";

const CreateOrder = () => {
    const firebase = useFirebase()
    const [ orderData, setOrderData ] = useState({
        customerId: '',
        items: [],
        totalAmount: 0,
        status: "Pending",
        shippingDetails: ''
    })
    const [ item, setItem ] = useState({ name: '', quantity: 0, price: 0})
    const [ error, setError ] = useState("")

    const handleItemChange = (e) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        }) 
    }
    const handleAddItem = () =>{
        setOrderData({
            ...orderData,
            items: [...orderData.items, item],
            totalAmount: orderData.totalAmount + item.quantity * item.price,
        })
        setItem({ name: '', quantity: 0, price: 0})
    }

    const handleInputChange = (e) =>{
        const { name, value} = e.target
        setOrderData({
            ...orderData,
            [name]: value
        })
    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        if(orderData.items.length === 0){
            setError("You must add at least one item to the order.")
            return
        }

        try{
            await addDoc(collection(firebase.firestoreDB, 'orders'), {
                ...orderData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            alert("Order created Successfully.")
            setOrderData({
                customerId: "",
                items: [],
                totalAmount: 0,
                status: "Pending",
                shippingDetails: ""
            })
        } catch (error) {
            setError("Error creating order: " + error.message)
        }
    }

    return (
        <div className="create-order">
      <h2>Create Order</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={orderData.customerId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingDetails">Shipping Details:</label>
          <textarea
            id="shippingDetails"
            name="shippingDetails"
            value={orderData.shippingDetails}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <h3>Add Item</h3>
          <label htmlFor="itemName">Name:</label>
          <input
            type="text"
            id="itemName"
            name="name"
            value={item.name}
            onChange={handleItemChange}
          />
          <label htmlFor="itemQuantity">Quantity:</label>
          <input
            type="number"
            id="itemQuantity"
            name="quantity"
            value={item.quantity}
            onChange={handleItemChange}
          />
          <label htmlFor="itemPrice">Price:</label>
          <input
            type="number"
            id="itemPrice"
            name="price"
            value={item.price}
            onChange={handleItemChange}
          />
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>

        <div className="order-items">
          <h3>Order Items</h3>
          <ul>
            {orderData.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount:</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={orderData.totalAmount}
            readOnly
          />
        </div>

        <button type="submit">Create Order</button>
      </form>
    </div>
    )
}

export default CreateOrder