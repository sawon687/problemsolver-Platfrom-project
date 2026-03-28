import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const PaymentModal = ({ isOpen, setOpen, item }) => {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: "bkash",
      name: "bKash",
      color: "from-pink-500 to-rose-500",
      desc: "Pay securely using bKash",
    },
    {
      id: "nagad",
      name: "Nagad",
      color: "from-orange-500 to-amber-500",
      desc: "Fast payment via Nagad",
    },
    {
      id: "stripe",
      name: "Stripe",
      color: "from-indigo-500 to-purple-600",
      desc: "Pay with card globally",
    },
  ];

  // 🔥 Payment handler
  const handlePay = async () => {
    if (!method) return;

    setLoading(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          projectId: item?._id,
          method,
        }),
      });

      const data = await res.json();

      // 👉 redirect to payment gateway
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 w-[420px] p-6 rounded-3xl shadow-2xl border dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold">Payment</h2>
            <p className="text-sm text-gray-500">
              Choose your payment method
            </p>
          </div>
          <X
            className="cursor-pointer hover:text-red-500"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Amount */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4">
          <p className="text-sm text-gray-500">Amount</p>
          <h3 className="text-2xl font-bold text-green-600">
            ৳ {item?.budget || 0}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {paymentMethods.map((pay) => (
            <div
              key={pay.id}
              onClick={() => setMethod(pay.id)}
              className={`p-4 rounded-xl cursor-pointer border transition-all
              ${
                method === pay.id
                  ? "border-blue-500 bg-blue-50 dark:bg-gray-800 scale-[1.02]"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{pay.name}</p>
                  <p className="text-xs text-gray-500">{pay.desc}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${
                    method === pay.id ? pay.color : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pay Button */}
        <button
          disabled={!method || loading}
          onClick={handlePay}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition-all
          ${
            method
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentModal;