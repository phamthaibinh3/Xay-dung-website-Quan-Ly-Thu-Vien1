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

class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div>
                <HomeHeader />
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
                    settings={settings}
                />
                <About />
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
