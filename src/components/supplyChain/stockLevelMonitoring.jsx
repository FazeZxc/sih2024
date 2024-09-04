import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../../context/firebase';

const StockMonitoring = () => {
  const firebase = useFirebase();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockLevels = async () => {
      const querySnapshot = await getDocs(collection(firebase.firestoreDB, 'stockLevels'));
      const stockList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStocks(stockList);
    };

    fetchStockLevels();
  }, [firebase.firestoreDB]);

  const handleReorderThresholdChange = async (productId, newThreshold) => {
    try {
      const stockRef = doc(firebase.firestoreDB, 'stockLevels', productId);
      await updateDoc(stockRef, { reorderThreshold: newThreshold });
      setStocks(stocks.map(stock =>
        stock.id === productId ? { ...stock, reorderThreshold: newThreshold } : stock
      ));
    } catch (error) {
      console.error('Error updating reorder threshold:', error.message);
    }
  };

  return (
    <div className="stock-monitoring">
      <h2>Stock Monitoring</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <div>
              <strong>Product ID:</strong> {stock.id}
            </div>
            <div>
              <strong>Quantity:</strong> {stock.quantity}
            </div>
            <div>
              <strong>Reorder Threshold:</strong> {stock.reorderThreshold}
              <input
                type="number"
                value={stock.reorderThreshold}
                onChange={(e) => handleReorderThresholdChange(stock.id, e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockMonitoring;
