import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function PaymentApp() {
  const [amount, setAmount] = useState(0);
  const [paymentCode, setPaymentCode] = useState('');

  const generatePaymentCode = () => {
    // Ở đây, bạn có thể thực hiện logic để tạo mã thanh toán, ví dụ: mã QR có chứa thông tin về số tiền cần thanh toán và thông tin khác.
    const paymentInfo = {
      amount: amount,
      // Thêm thông tin khác nếu cần
    };
    const paymentString = JSON.stringify(paymentInfo);
    setPaymentCode(paymentString);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <h1>Thanh toán bằng mã QR</h1>
      <div>
        <label>
          Số tiền cần thanh toán:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <button onClick={generatePaymentCode}>Tạo mã thanh toán</button>
      </div>
      {paymentCode && (
        <div>
          <h2>Mã QR thanh toán:</h2>
          <QRCode value={paymentCode} />
          <p>Quét mã QR này để thực hiện thanh toán.</p>
        </div>
      )}
    </div>
  );
}

export default PaymentApp;
