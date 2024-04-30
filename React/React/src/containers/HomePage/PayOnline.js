import React, { Component } from 'react';
import axios from 'axios';
import { random } from 'lodash';

export default class PayOnline extends Component {
  async execPostRequest(url, data) {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(data).length
        },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async online_checkout() {
    try {
      if (this.props.payUrl) {
        const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        const { partnerCode, accessKey, secretKey } = this.props;
        const orderInfo = "Thanh toán qua MoMo";
        const amount = "10000";
        const orderId = random(0,9999);
        const redirectUrl = "http://localhost:3000/payonline";
        const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
        const extraData = "";

        const rawHash = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${Date.now()}&requestType=payWithATM`;
        const signature = await this.generateSignature(rawHash, secretKey);

        const requestData = {
          partnerCode,
          partnerName: "Test",
          storeId: "MomoTestStore",
          requestId: Date.now().toString(),
          amount,
          orderId,
          orderInfo,
          redirectUrl,
          ipnUrl,
          lang: 'vi',
          extraData,
          requestType: 'payWithATM',
          signature
        };

        const result = await this.execPostRequest(endpoint, requestData);
        window.location.href = result.payUrl; // Redirect to payment URL
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async generateSignature(rawHash, secretKey) {
    const signature = await axios.post('/generate-signature', { rawHash, secretKey });
    return signature.data;
  }

  componentDidMount() {
    this.online_checkout();
  }

  render() {
    return (
      <div>
        {/* Your React UI components */}
      </div>
    );
  }
}
