import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuNoiBat.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router'
import { getTaiLieuNoiBat } from '../../../services/userService'
import { MdOutlineMenuBook } from "react-icons/md";

class TaiLieuNoiBat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            arrBook: [],
        }
    }
    async componentDidUpdate() {
        let res = await getTaiLieuNoiBat('');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    handleDetailTLNB = async(item) => {
        this.props.history.push(`/chi-tiet-tai-lieu-noi-bat/${item.id}`)
    }

    render() {
        let { arrBook } = this.state;
        return (
            <div className='home_contaner'>
                <div className='grid'>
                    <div className='grid__row'>
                        <div className='home-product'>
                            <div className='title'>
                            <MdOutlineMenuBook className='icon'/>
                            <h2>Tài liệu nổi bật</h2>
                            </div>
                                <div className='section-body'>
                                    <Slider {...this.props.settings}>
                                        {arrBook && arrBook.length > 0 &&
                                            arrBook.map((item, index) => {
                                                let imageBase64 = '';
                                                if (item.anh) {
                                                    imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                                }
                                                return (
                                                    <div onClick={() => this.handleDetailBook(item)} className='section-customize'>
                                                        <div className="grid__column-2-4">
                                                            <div className="home-product-item">
                                                                <div className="home-product-item__img" style={{ backgroundImage: `url(${imageBase64})` }} />
                                                                <div className="home-product-item-child">
                                                                <span className="home-product-item__name">{item.tieuDe}</span> 
                                                                <p className="home-product-item__hastag">Mua để nhận quà</p>
                                                                <div className="home-product-item__price">
                                                                    <span className="home-product-item__price--new">139.000 đ</span>
                                                                    <span class="discount-percent">-9%</span>
                                                                </div>
                                                               
                                                                <div>
                                                                <span className="home-product-item__price--old">{item.gia} đ</span>
                                                                </div>
                                                                <div className="home-product-item__adress">
                                                                    <span className="home-product-item__brand">Tác giả : {item.tacGia}</span>
                                                                    <span className="home-product-item__adress-name">Việt Nam</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        

                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaiLieuNoiBat));
