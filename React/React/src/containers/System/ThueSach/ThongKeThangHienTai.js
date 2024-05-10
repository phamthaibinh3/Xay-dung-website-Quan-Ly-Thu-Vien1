// ThongKeThangHienTai.js
import React, { Component } from 'react';
import moment from 'moment';
import { thongKeSoLuongSachTraTrongThang } from '../../../services/userService';
import './ThongKeThangHienTai.scss';

class ThongKeThangHienTai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: moment().month() + 1, // Mặc định là tháng hiện tại
            selectedYear: moment().year(), // Mặc định là năm hiện tại
            soLuongSachTra: null,
            error: null
        };
    }

    async handleMonthChange(event) {
        const selectedMonth = parseInt(event.target.value);
        await this.setState({ selectedMonth }); // Cập nhật state tháng
        this.fetchSoLuongSachTra(); // Gọi hàm để thực hiện thống kê lại số lượng sách trả
    }

    async handleYearChange(event) {
        const selectedYear = parseInt(event.target.value);
        await this.setState({ selectedYear }); // Cập nhật state năm
        this.fetchSoLuongSachTra(); // Gọi hàm để thực hiện thống kê lại số lượng sách trả
    }

    async fetchSoLuongSachTra() {
        try {
            const { selectedMonth, selectedYear } = this.state;
            // Gọi hàm thống kê số lượng sách đã trả trong tháng từ userService
            const response = await thongKeSoLuongSachTraTrongThang({ selectedMonth, selectedYear });
            if (response.errCode === 0) {
                // Nếu không có lỗi, cập nhật state với số lượng sách đã trả
                this.setState({ soLuongSachTra: response.soLuongSachTra });
            } else {
                // Nếu có lỗi, cập nhật state với thông báo lỗi
                this.setState({ error: response.errMessage });
            }
        } catch (error) {
            // Nếu có lỗi trong quá trình gọi API, cập nhật state với thông báo lỗi
            this.setState({ error: 'Đã xảy ra lỗi khi lấy dữ liệu.', loading: false });
        } finally {
            // Đánh dấu quá trình tải dữ liệu đã hoàn thành
            this.setState({ loading: false });
        }
    }

    render() {
        const { selectedMonth, selectedYear, soLuongSachTra, loading, error } = this.state;

        const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo một mảng chứa các số từ 1 đến 12
        const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); // Tạo một mảng chứa 10 năm từ năm hiện tại đến 9 năm trước đó

        if (loading) {
            return <div>Đang tải...</div>;
        }

        if (error) {
            return <div>Có lỗi xảy ra: {error}</div>;
        }

        return (
            <div className="thong-ke-container">
                <div className="select-container">
                    <label htmlFor="month">Chọn tháng:</label>
                    <select id="month" value={selectedMonth} onChange={this.handleMonthChange.bind(this)}>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>

                    <label htmlFor="year">năm:</label>
                    {/* <select id="year" value={selectedYear} onChange={this.handleYearChange.bind(this)}>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select> */}
                    <label>{selectedYear}</label>
                </div>

                <h2>Số lượng sách đã trả trong tháng {selectedMonth} là : {soLuongSachTra}</h2>
            </div>
        );
    }
}

export default ThongKeThangHienTai;
