import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions'
import Slider from 'react-slick'
import './Danhmuctest.scss'
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
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://d3.violet.vn/uploads/previews/document/0/859/116/1books1med.jpg.jpg" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Văn Học</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href="http://127.0.0.1:5500/computer.html">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRBHCDnDKCPEjyQZ0xrKnqhWr12JOMvxKxqReNHvUv7Q&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Sách Thiếu Nhi</div>
                            </a>
                            </div>
                        </li>
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKN7kTRobN3liVEYCuDyMIKNqvpopUdKcdBA4vonaFHw&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Kinh Tế</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLLtGKdJtpCOyrCN4tTHmzVZJAm2cHUaRGN8sKhzRDQ&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Tâm Lý</div>
                            </a>
                            </div>                  
                        </li>                
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://play-lh.googleusercontent.com/swSB6DTW_gFEz6slnw7oeWIoxMafNRtPuA8wZ7eQJb6Mw87ni_3o9rEnP-1A1fusUA" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Giáo Khoa</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdkwsT8j7hQsbtU0Di0qgFY5MwDCUqgOpi0wlPY-yvcQ&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Tham Khảo</div>
                            </a>
                            </div>
                        </li>
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://img.websosanh.vn/v10/users/review/images/kipe71afi551g/2.jpg?compress=85" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Nuôi Dạy Con</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-books-of-foreign-languages-icon-circle-png-image_2054838.jpg" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Ngoại Ngữ</div>
                            </a>
                            </div>
                        </li>                
                        <li className="contaner-category__list">  
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNrObyKb0dpoEuUkbNy16NrKdJVbGsVpUtK9GJMUjoLQ&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Luyện Thi</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9W6JXwyLmbHJciaJ5xoMmqDEk5hslWasP65Nn83V-w&s" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Thời Trang Trẻ Em</div>
                            </a>
                            </div>
                        </li>
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://png.pngtree.com/png-clipart/20230207/original/pngtree-beauty-logo-design-png-image_8947095.png" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Làm Đẹp</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://img.lovepik.com/element/45004/5381.png_860.png" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Sức Khỏe</div>
                            </a>
                            </div>                  
                        </li>
                        <li className="contaner-category__list">
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://d3.violet.vn/uploads/previews/document/0/859/130/2mpeoaa.jpg.jpg" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Tiểu Sử</div>
                            </a>
                            </div>
                            <div className="contaner-category__link">
                            <a href>
                                <img src="https://poki.vn/ImageUpload/ImageDisplay/[POKI]%20Icon%20Publication-05-2018-12-27-01-32-34.png" alt="" className="contaner-category__items-img" />
                                <div className="contaner-category__items-text">Kĩ Năng Sống</div>
                            </a>
                            </div>
                        </li>               
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