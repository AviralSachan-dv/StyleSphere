import React, { useEffect, useState } from "react";

const PaymentComponent = ({ amount, onSuccess }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!razorpayLoaded) {
      alert("Razorpay is still loading. Please wait.");
      return;
    }

    const options = {
      key: "rzp_live_96hXwgILvQq9Mc", // Replace with your Razorpay Test Key
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "Style-Sphere",
      description: "Product Purchase",
      handler: (response) => {
        console.log("Payment successful:", response);
        alert("Payment Successful!");
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <button 
      onClick={handlePayment} 
      style={{ padding: "10px 20px", background: "#F37254", color: "#fff", border: "none", cursor: "pointer" }}
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentComponent;
