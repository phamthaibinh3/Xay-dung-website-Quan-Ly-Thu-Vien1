import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import HomeHeader from '../../HomePage/HomeHeader';
import './ChiTietTLNB.scss'
import * as actions from '../../../store/actions';
import ThueSach from "./ThueSach";

class ChiTietTLNB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: [],
            quantity: 1,
            liked: false,
            isOpenModalbook: false,
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getBookID(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.SachID !== this.props.SachID) {
            this.setState({
                book: this.props.SachID
            })
        }
    }

    handleLikeBook = () => {
        alert('toi kick dc roi ');
        this.setState(prevState => ({
            liked: !prevState.liked // Đảo ngược giá trị của liked khi bấm vào
        }));
    }

    handleDecreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState(prevState => ({
                quantity: prevState.quantity - 1
            }));
        }
    };

    handleIncreaseQuantity = () => {
        if (this.state.quantity < this.state.book.soLuong) {
            this.setState(prevState => ({
                quantity: prevState.quantity + 1
            }));
        }
    };

    handleBuyBook = () => {
        // this.setState({
        //     isOpenModalbook: true
        // })
        this.props.history.push(`/gio-hang/${this.props.match.params.id}`)
    }
    togglebookModal = () => {
        this.setState({
            isOpenModalbook: !this.state.isOpenModalbook
        })
    }

    handleThemGioHang = () => {
        let { book } = this.state;
        this.props.createHoaDonTT({
            tieuDe: book.tieuDe,
            soLuong: book.soLuong,
            tacGia: book.tacGia,
            maDanhMuc: book.maDanhMuc,
            gia: book.gia,
            anh: book.anh.data,
            maLoaiSach: book.loaiSach,
            moTa: book.moTa
        })
    }

    render() {
        console.log('check state: ', this.state);
        let { book, quantity, liked, showModal } = this.state;
        let imageBase64 = '';
        if (book.anh) {
            imageBase64 = new Buffer(book.anh, 'base64').toString('binary')
        }
        return (
            <>
                {/* <ThueSach
                    isOpen={this.state.isOpenModalbook}
                    togglebookModal={this.togglebookModal}
                    bookid={this.props.match.params.id}
                    // createbook={this.createbook}
                /> */}

                <HomeHeader isShowBanner={false} />
                <div>
                    <button onClick={() => this.handleBuyBook()}>Giỏ hàng nè</button>
                </div>
                <div className="app">
                    <div className="product_contaner">
                        <div className="grid">
                            <div className="grid__row">
                                {/* content */}
                                <div className="product_contaner-content">
                                    <div className="product_introduce">
                                        <div className="product_introduce-slider">
                                            <div className="introduce-slider--big">

                                                {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                            </div>

                                            <div className="product_introduce-slider--media">

                                                <div className="product_introduce-slider--liked">
                                                    <i onClick={() => this.handleLikeBook()} className={liked ? "fas fa-heart liked" : "fas fa-heart"}></i>
                                                    <span>   Đã thích {book.luotThich}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product_introduce-right">
                                            <div className="product_introduce-header">
                                                <span className="introduce-header-iuthich">Yêu thích+</span>
                                                <span className="introduce-header--name">{book.tieuDe}</span>
                                            </div>
                                            <div className="product_introduce-vote">
                                                <div className="product_introduce-vote-list">

                                                </div>
                                            </div>
                                            <div className="product_introduce-price">
                                                <div className="product_introduce-price-content">
                                                    <div className="product_introduce-price-sale">
                                                        <span className="introduce-price__new">₫{book.gia}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_introduce-buy">
                                                <div className="introduce-deal">
                                                    <span className="introduce__name">Tác Giả</span>
                                                    <span className="introduce__title">{book.tacGia}</span>
                                                </div>
                                                <div className="introduce-deal">
                                                    <span className="introduce__name">Danh Mục</span>
                                                    <span className="introduce__title">{book.maDanhMuc}</span>
                                                </div>
                                                <div className="introduce-deal">
                                                    <span className="introduce__name">Loại Sách</span>
                                                    <span className="introduce__title">{book.maLoaiSach}</span>
                                                </div>
                                                <div className="introduce-sl">
                                                    <span className="introduce__name">Số lượng</span>
                                                    <div className="introduce-nb">
                                                        <i class="fas fa-minus" onClick={this.handleDecreaseQuantity}></i>
                                                        <input type="text" value={quantity} readOnly />
                                                        <i class="fas fa-plus" onClick={this.handleIncreaseQuantity}></i>
                                                    </div>
                                                    <span className="introduce-have">{book.soLuong} sản phẩm có sẵn</span>
                                                </div>
                                                <div className="introduce-buy">
                                                    <button onClick={() => this.handleThemGioHang()} className="introduce-buy-add">
                                                        <i class="fas fa-cart-plus"></i>
                                                        Thêm Vào Giỏ Hàng</button>
                                                    <button onClick={() => this.handleBuyBook()} className="introduce-buy-click">
                                                        Mua Ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_detail" />
                                </div>
                                <div className="product_info">
                                    <div className="product-information">
                                        <h3>Thông tin sản phẩm</h3>
                                        <table className="data-table table-additional">
                                            <colgroup>
                                                <col width="25%" />
                                                <col />
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <th className="table-label">
                                                        Mã hàng </th>
                                                    <td className="table-data">
                                                        {book.id} </td>
                                                </tr>
                                                <tr>
                                                    <th className="table-label">
                                                        Tên Nhà Cung Cấp </th>
                                                    <td className="table-data">
                                                        <a className="xem-chi-tiet" href="sky-books?fhs_campaign=ATTRIBUTE_PRODUCT">Skybooks</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="table-label">
                                                        Tác giả </th>
                                                    <td className="table-data">
                                                        {book.tacGia} </td>
                                                </tr>
                                                <tr>
                                                    <th className="table-label">
                                                        NXB </th>
                                                    <td className="table-data">
                                                        Dân Trí </td>
                                                </tr>
                                                <tr>
                                                    <th className="table-label">
                                                        Giá </th>
                                                    <td className="table-data">
                                                        {book.gia} </td>
                                                </tr>

                                                <tr>
                                                    <th className="table-label">
                                                        Số lượng </th>
                                                    <td className="table-data">
                                                        {book.soLuong} </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="product-short">
                                        <h3>{book.tieuDe}</h3>
                                        <p className="product-info-short">
                                            {book.moTa}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        SachID: state.admin.idSach
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookID: (id) => dispatch(actions.getBookID(id)),
        createHoaDonTT: (data) => dispatch(actions.createHoaDonTT(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietTLNB);