import { collection, addDoc } from "firebase/firestore";
import { useFirebase } from "../context/firebase";
import { useState } from "react";

const AddDrug = () =>{
    const firebase = useFirebase()
    const [ drugData, setDrugData ] = useState({
        name: "",
        type: "",
        quantity: "",
        batchId: "",
        expirationDate: "",
        supplier: ""
    })

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setDrugData({
            ...drugData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(firebase.firestoreDB, 'drugs'), drugData)
            alert('Drug added to inventory.')
            setDrugData({ name: "", type: "", quantity: "",batchId: "", expirationDate: "", supplier: "" })
        } catch (error) {
            console.error("Error adding drugs:", error. message)
        }
    }
    
    return (
        <div className="add-drug">
          <h2>Add New Drug</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={drugData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={drugData.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={drugData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="batchId">Batch ID:</label>
              <input
                type="text"
                id="batchId"
                name="batchId"
                value={drugData.batchId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={drugData.expirationDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="supplier">Supplier:</label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={drugData.supplier}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Add Drug</button>
          </form>
        </div>
      );
    };
    
    export default AddDrug;