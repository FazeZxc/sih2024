/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirebase } from '../context/firebase';

const UpdateDrug = ({ drugId }) => {
  const firebase = useFirebase()

  const [drugData, setDrugData] = useState({
    name: '',
    type: '',
    quantity: '',
    batchId: '',
    expirationDate: '',
    supplier: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const drugDoc = await getDoc(doc(firebase.firestoreDB, 'drugs', drugId));
        if (drugDoc.exists()) {
          setDrugData(drugDoc.data());
        }
      } catch (error) {
        console.error('Error fetching drug:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [firebase.firestoreDB, drugId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugData({
      ...drugData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(firebase.firestoreDB, 'drugs', drugId), drugData, { merge: true });
      alert('Drug updated successfully.');
    } catch (error) {
      console.error('Error updating drug:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-drug">
      <h2>Update Drug</h2>
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
        <button type="submit">Update Drug</button>
      </form>
    </div>
  );
};

export default UpdateDrug;