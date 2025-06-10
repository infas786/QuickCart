import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" }, // Changed to 'User'
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      }, // Changed type
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  }, // Changed type
  status: { type: String, required: true, default: "Order Placed" },
  date: { type: Date, default: Date.now }, // Better to use Date type
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
