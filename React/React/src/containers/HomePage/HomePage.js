import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import TaiLieuMoiNhat from './Section/TaiLieuMoiNhat';
import TaiLieuNoiBat from './Section/TaiLieuNoiBat';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NhanVien from './Section/NhanVien';
import CamNang from './Section/CamNang';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import HomeDanhMuc from './HomeDanhMuc';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '' // Khởi tạo trạng thái searchQuery trong HomePage
        };
    }

    updateSearchQuery = (query) => {
        this.setState({ searchQuery: query }); // Cập nhật giá trị tìm kiếm khi người dùng nhập vào ô tìm kiếm
        // console.log('New search query on HomePage:', query);
    };

    
    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        // console.log('Current props:', this.state.searchQuery);
        return (
            <div>
                <HomeHeader isShowBanner={true} updateSearchQuery={this.updateSearchQuery} />
                <TaiLieuMoiNhat
                    settings={settings}
                />
                <TaiLieuNoiBat
                    settings={settings}
                />
                <NhanVien
                    settings={settings}
                />
                <CamNang
                    searchQuery={this.state.searchQuery}
                    settings={settings}
                />
                <About />
                <HomeDanhMuc />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
