import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Checkout() {
  const history = useHistory();

  const handleClick = () => {
    // Chuyển hướng sang router khác khi button được nhấn
    history.push('/payonline');
  };
  return (
    <div>
      <button type='submit' className='btn-default'>Thanh toán COD</button>
      <button onClick={handleClick} name='payUrl' type='submit' className='btn-default'>Thanh toán momo</button>
      <button type='submit' className='btn-default'>Xác nhận thanh toán </button>
    </div>
  )
}
