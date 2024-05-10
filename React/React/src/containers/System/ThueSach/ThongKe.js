// ThongKe.js
import React, { Component } from 'react';
// import '../ThueSach/ThongKe.scss'
import Chart from './Chart'
import './ThongKet.scss'

class ThongKe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startMonth: 1,
            startYear: 2024,
            endMonth: 6,
            endYear: 2024
        };
    }

    handleStartMonthChange = (e) => {
        this.setState({ startMonth: parseInt(e.target.value) });
    };

    handleStartYearChange = (e) => {
        this.setState({ startYear: parseInt(e.target.value) });
    };

    handleEndMonthChange = (e) => {
        this.setState({ endMonth: parseInt(e.target.value) });
    };

    handleEndYearChange = (e) => {
        this.setState({ endYear: parseInt(e.target.value) });
    };

    handleSubmit = () => {
        // Gọi hàm thống kê doanh thu ở đây (nếu cần)
    };

    render() {
        const { startMonth, startYear, endMonth, endYear } = this.state;

        return (
            <div className="container">
                <h1>Thống kê doanh thu mỗi tháng</h1>
                <div className="form-container">
                    <label htmlFor="start-month">Tháng bắt đầu:</label>
                    <select id="start-month" value={startMonth} onChange={this.handleStartMonthChange}>
                        <option value="1">Tháng 1</option>
                        <option value="2">Tháng 2</option>
                        {/* Thêm các option cho các tháng khác */}
                    </select>
                    <label htmlFor="start-year">Năm bắt đầu:</label>
                    <input type="number" id="start-year" min="2000" max="2100" value={startYear} onChange={this.handleStartYearChange} />

                    <label htmlFor="end-month">Tháng kết thúc:</label>
                    <select id="end-month" value={endMonth} onChange={this.handleEndMonthChange}>
                        <option value="1">Tháng 1</option>
                        <option value="2">Tháng 2</option>
                        {/* Thêm các option cho các tháng khác */}
                    </select>
                    <label htmlFor="end-year">Năm kết thúc:</label>
                    <input type="number" id="end-year" min="2000" max="2100" value={endYear} onChange={this.handleEndYearChange} />

                    <button onClick={this.handleSubmit}>Thực hiện thống kê</button>
                </div>

                <Chart startMonth={startMonth} startYear={startYear} endMonth={endMonth} endYear={endYear} />
            </div>
        );
    }
}

export default ThongKe;
