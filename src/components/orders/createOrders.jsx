import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../context/firebase";
import { useState } from "react";

const createOrder = () => {
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

    const
}