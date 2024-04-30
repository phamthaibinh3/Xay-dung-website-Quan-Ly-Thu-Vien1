import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuMoiNhat.scss';
import { FormattedMessage } from 'react-intl';
import { getBookNew } from '../../../services/bookService';
import { withRouter } from 'react-router'
import { MdOutlineMenuBook } from "react-icons/md";

import Slider from 'react-slick'


class TaiLieuMoiNhat extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            arrBook: [],
        }
    }

    async componentDidUpdate() {
        let res = await getBookNew('');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    handleDetailBook = (item) => {
        // alert('check hehe: '+item.id)
        this.props.history.push(`/chi-tiet-tai-lieu-moi-nhat/${item.id}`)
    }

    render() {
        let { arrBook } = this.state;
        // console.log('check state11: ', this.state.arrBook);
        return (
            <div className='app_contaner'>
                <div className='grid'>
                    <div className='grid__row'>
                        <div className='home-product'>
                            <div className='title'>
                                <MdOutlineMenuBook className='icon'/>
                                <h2>Tài liệu mới nhất</h2>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaiLieuMoiNhat));
