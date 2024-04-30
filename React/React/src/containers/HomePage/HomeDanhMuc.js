import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions'
import Slider from 'react-slick'
import './HomeDanhMuc.css'
import { withRouter } from 'react-router'

class TaiLieuMoiNhat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allChuyenMuc: []
        }
    }

    async componentDidMount() {
        this.props.fetchChuyenMucStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            // this.props.fetchChuyenMucStart()
            this.setState({
                allChuyenMuc: this.props.chuyenMuc,

            })
        }
    }

    

    render() {
        console.log('check huhu: ', this.state);
        let { allChuyenMuc } = this.state;
        return (
                <div className="home-contaner">
                    <div className="grid">
                        <div className="grid__row">
                            <div className="contaner-category">
                                <p className="contaner-category__text">DANH MỤC</p>
                                <div className="contaner-category__content">
                                    <ul className="contaner-category__items">
                                        {allChuyenMuc.map(chuyenMuc => {
                                            let imageBase64 = '';
                                            if (chuyenMuc.anh) {
                                                imageBase64 = new Buffer(chuyenMuc.anh, 'base64').toString('binary')
                                            }
                                            return (
                                                <li key={chuyenMuc.id} className="contaner-category__list">
                                                    <div  className="contaner-category__link">
                                                        <a href={chuyenMuc.url}>
                                                            {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                                            <div className="contaner-category__items-text">{chuyenMuc.tenDanhMuc}</div>
                                                        </a>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
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
        chuyenMuc: state.admin.chuyenMuc
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaiLieuMoiNhat));
