import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useFirebase } from '../../context/firebase';

const SupplierManagement = () => {
  const firebase = useFirebase();
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    products: [],
  });
  const [newProduct, setNewProduct] = useState('');
  
  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'suppliers'));
      const supplierList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSuppliers(supplierList);
    };

    fetchSuppliers();
  }, [firebase.firestoreDB]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    setSupplierData({
      ...supplierData,
      products: [...supplierData.products, newProduct],
    });
    setNewProduct('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firebase.firestoreDB, 'suppliers'), supplierData);
      alert('Supplier added successfully.');
      setSupplierData({ name: '', contactInfo: '', address: '', products: [] });
    } catch (error) {
      console.error('Error adding supplier:', error.message);
    }
  };

  return (
    <div className="supplier-management">
      <h2>Manage Suppliers</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={supplierData.contactInfo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={supplierData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Products:</label>
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <ul>
            {supplierData.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Supplier</button>
      </form>

      <h3>Supplier List</h3>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;
