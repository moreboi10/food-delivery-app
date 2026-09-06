import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/constants";
import axios from "axios";
// import Razorpay from 'razorpay';

const PlaceOrder = () => {
  const { quantities, foodList, token, setQuantities } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const uniqueItems = Object.values(quantities).filter(
    (qty) => qty > 0
  ).length;

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const { Subtotal, shipping, tax, grandtotal } = calculateCartTotals(
    cartItems,
    quantities
  );

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100,
      currency: "INR",
      name: "Food Land",
      description: "Food order payment",
      order_id: order.razorpayOrderId,

      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },

      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },

      theme: {
        color: "#3399cc",
      },

      modal: {
        ondismiss: async function () {
          toast.error("payment cancelled");
          await deleteOrder(order.id);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
  
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };

    // "http://localhost:8080/api/orders/verify",
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/verify`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("payment successfull !!");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed . Please try again");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed . Please try again");
      console.trace(error);
    }
  };

  // "http://localhost:8080/api/orders/" + orderId,
  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/orders/`+orderId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong . contact support");
      console.log(error);
    }
  };

  // "http://localhost:8080/api/cart",
  const clearCart = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuantities({});
    } catch (error) {
      toast.error("Error while clearing the cart.");
      console.log(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = {
      userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.state} ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,

      // LEFT UNCHANGED
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),

      amount: grandtotal.toFixed(2),
      orderStatus: "Preparing",
    };

    // "http://localhost:8080/api/orders/create",
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 && response.data.razorpayOrderId) {
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("unable to place order please try again");
      }
    } catch (error) {
      toast.error("unable to place order please try again");
      console.log(error);
    }
  };

    return (
    <div className="bg-body-tertiary min-vh-100">
      <div className="container py-5">
        <div className="row g-5">
          {/* Order Summary */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your Cart</span>
              <span className="badge bg-primary rounded-pill">
                {uniqueItems}
              </span>
            </h4>

            <ul className="list-group mb-3">
              {cartItems.map((food) => (
                <li
                  id={food.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0">{food.name}</h6>
                    <small className="text-body-secondary">
                      Quantity: {quantities[food.id]}
                    </small>
                  </div>
                  <span className="text-body-secondary">
                    &#8377;{food.price * quantities[food.id]}
                  </span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>&#8377;{Subtotal === 0 ? 0.0 : Subtotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>&#8377;{shipping.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax (10%)</span>
                <span>&#8377;{tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{grandtotal.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* Delivery Details */}
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Delivery Address</h4>

            <form required onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstname" className="form-label">
                    First name
                  </label>

                  <input
                    id="firstname"
                    type="text"
                    className="form-control"
                    placeholder="Sanket"
                    required
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                  />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastform" className="form-label">
                    Last name
                  </label>

                  <input
                    id="lastform"
                    type="text"
                    className="form-control"
                    placeholder="More"
                    required
                    name="lastName"
                    onChange={onChangeHandler}
                    value={data.lastName}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    required
                    name="phoneNumber"
                    onChange={onChangeHandler}
                    value={data.phoneNumber}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="House no, street, area"
                    required
                    name="address"
                    onChange={onChangeHandler}
                    value={data.address}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>

                  <select
                    name="city"
                    className="form-control"
                    id="city"
                    onChange={onChangeHandler}
                    value={data.city}
                  >
                    <option value="city">city</option>
                    <option value="pune">Pune</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="nashik">Nashik</option>
                  </select>
                </div>

                <div className="col-md-5 ">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>

                  <select
                    name="state"
                    onChange={onChangeHandler}
                    value={data.state}
                    className="form-control"
                    id="state"
                  >
                    <option value="state">state</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="keralam">Keralam</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label">zip code</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="411001"
                    required
                    name="zip"
                    onChange={onChangeHandler}
                    value={data.zip}
                  />
                </div>
              </div>

              <hr className="my-4" />

            
              <button
                className="w-100 btn btn-primary btn-lg"
                disabled={uniqueItems === 0 ? true : false}
                type="submit"
              >
                Proceed to payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

