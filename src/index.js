import React from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

toast.configure();

function App() {

  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 70000.32,
    description: "Yolların , yılların arabası..."
  })

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://g0ttg.sse.codesandbox.io/",
      { token, product }
    );

    const { status } = response.data;
    console.log("Response : ", response.data);

    if (status === "success") {
      toast("Tebrikler ödeme başarılı mail adresinizi kontrol edin ! ...", { type: "success" });
    } else {
      toast("Ödeme de hata var ...", { type: "error" });
    }

    console.log({token,addresses});
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>Şimdi indirimde : {product.price} TL</h3>
        <h4>{product.description}</h4>
      </div>
    <StripeCheckout 
      stripeKey="pk_test_iWBxCebLCsZ7qP3GIgmEPZdS00vBbMvHsC"
      token={handleToken}
      amount={product.price * 100}
      name={product.name}
      billingAddress
      shippingAddress
    />
    </div>
  )
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
