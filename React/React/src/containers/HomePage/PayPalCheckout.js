import React, { useRef, useEffect, useState } from "react";
import PaymentFailure from "./PaymentFailure";
import PaymentSuccess from "./PaymentSuccess";

function PayPalCheckout() {
    const paypal = useRef();
    const [transactionStatus, setTransactionStatus] = useState(null);

    useEffect(() => {
            window.paypal
              .Buttons({
                createOrder: (data, actions, err) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: "MacBook Laptop",
                        amount: {
                          currency_code: "USD",
                          value: 350.00,
                        },
                      },
                    ],
                  });
                },
                onApprove: async (data, actions) => {
                  const order = await actions.order.capture();
        
                  console.log("success", order);
                  setTransactionStatus("success");
                },
                onError: (err) => {
                  console.log(err);
                  setTransactionStatus("failure");
                },
              })
              .render(paypal.current);
          }, []);

    return (
        <div>
            <div ref={paypal}></div>
            {transactionStatus === "success" && <PaymentSuccess />}
            {transactionStatus === "failure" && <PaymentFailure />}
        </div>
    );
}

export default PayPalCheckout;
