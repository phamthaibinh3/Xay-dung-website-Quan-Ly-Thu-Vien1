// Thêm import cho hàm thongKeSoLuongSachTraTheoThang từ API vào
import { thongKeSoLuongSachTraTheoThang } from '../../../services/userService';

// Chart.js
import React, { Component } from 'react';
import Chartjs from 'chart.js/dist/Chart.js';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            monthlyData: []
        };
    }

    async componentDidMount() {
        await this.fetchData();
        this.renderChart();
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.fetchData();
            this.renderChart();
        }
    }

    async fetchData() {
        const { startMonth, startYear, endMonth, endYear } = this.props;
        try {
            const response = await thongKeSoLuongSachTraTheoThang();
            if (response.errCode === 0) {
                this.setState({ monthlyData: response.thongKe });
            } else {
                console.error(response.errMessage);
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi lấy dữ liệu thống kê:', error);
        }
    }

    renderChart() {
        const ctx = this.canvasRef.current.getContext('2d');
        const { monthlyData } = this.state;

        if (!monthlyData || monthlyData.length === 0) {
            console.log("Không có dữ liệu để vẽ biểu đồ.");
            return;
        }

        const labels = monthlyData.map(item => item.month);
        const soLuongSachTra = monthlyData.map(item => item.soLuongSachTra);

        new Chartjs(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Số lượng sách trả',
                    data: soLuongSachTra,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Màu nền của cột
                    borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return <canvas ref={this.canvasRef} />;
    }
}

export default Chart;
