import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import HomeHeader from '../../HomePage/HomeHeader';
import './ChiTietTLMN.scss'
import * as actions from '../../../store/actions'

class ChiTietTLMN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: [],
            quantity: 1,
            liked: false
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
        this.setState(prevState => ({
            quantity: prevState.quantity + 1
        }));
    };

    render() {
        let { book, quantity, liked } = this.state;
        let imageBase64 = '';
        if (book.anh) {
            imageBase64 = new Buffer(book.anh, 'base64').toString('binary')
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="app">
                    {/* header */}
                    {/* contaner */}
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
                                            {/* <div className="introduce-slider--small">
                                                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278606642.jpg" alt="" className="introduce-slider--small-items" />
                                                <img src="https://cdn0.fahasa.com/media/catalog/product/v/_/v_ng_tr_n_l_a.png?_gl=1*1d8ltlk*_ga*NzU0MTE2OTU0LjE3MDkyMTk0MTk.*_ga_460L9JMC2G*MTcxMjA2OTUyOC4xNS4xLjE3MTIwNjk3MzQuNTkuMC4w*_gcl_au*MTIyMzEzNDc2OC4xNzA5MjE5NDE4" alt="" className="introduce-slider--small-items" />
                                                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278606642.jpg" alt="" className="introduce-slider--small-items" />
                                                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278606642.jpg" alt="" className="introduce-slider--small-items" />
                                                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278606642.jpg" alt="" className="introduce-slider--small-items" />
                                            </div> */}
                                            <div className="product_introduce-slider--media">
                                                {/* <div className="product_introduce-slider--share">
                                                    <span>Chia sẻ: </span>
                                                    <i className="fa-brands fa-facebook-messenger" />
                                                    <i className="fa-brands fa-facebook icon" />
                                                    <i className="fa-brands fa-pinterest" />
                                                    <i className="fa-brands fa-twitter" />
                                                </div> */}
                                                <div className="product_introduce-slider--liked">
                                                    {/* <i className="fa-regular fa-heart" /> */}
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
                                                    {/* <div className="product_introduce-vote-items ">
                                                        <a href className="product_introduce-vote-star product_introduce-vote-text">
                                                            4.9
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                        </a>
                                                    </div> */}
                                                    {/* <div className="product_introduce-vote-items">
                                                        <a href className="product_introduce-vote-text">
                                                            11.9k
                                                            <span>Đánh giá</span>
                                                        </a>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="product_introduce-price">
                                                <div className="product_introduce-price-content">
                                                    <div className="product_introduce-price-sale">
                                                        {/* <span className="introduce-price__old">₫600.000</span> */}
                                                        <span className="introduce-price__new">₫{book.gia}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* điền thông tin mua */}
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
                                                        {/* <button className="fa-solid fa-minus" /> */}
                                                        <i class="fas fa-minus" onClick={this.handleDecreaseQuantity}></i>
                                                        <input type="text" value={quantity} readOnly />
                                                        <i class="fas fa-plus" onClick={this.handleIncreaseQuantity}></i>
                                                        {/* <button className="fa-solid fa-plus" /> */}
                                                    </div>
                                                    <span className="introduce-have">{book.soLuong} sản phẩm có sẵn</span>
                                                </div>
                                                <div className="introduce-buy">
                                                    <button className="introduce-buy-add">
                                                        {/* <i className="fa-solid fa-cart-plus" /> */}
                                                        <i class="fas fa-cart-plus"></i>
                                                        Thêm Vào Giỏ Hàng</button>
                                                    <button className="introduce-buy-click">
                                                        Mua Ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_detail" />
                                </div>
                                {/* thông tin san pham */}
                                <div className="product_info">
                                    <div className="product-information">
                                        <h2>Thông tin sản phẩm</h2>
                                        <div className="data-table">
                                            <div className="table-label1">
                                                Mã hàng
                                            </div>
                                            <div className="table-data">
                                                {book.id}
                                            </div>
                                        </div>
                                        <div className="data-table">
                                            <div className="table-label1">
                                                Tác giả
                                            </div>
                                            <div className="table-data">
                                                {book.tacGia}
                                            </div>
                                        </div>
                                        <div className="data-table">
                                            <div className="table-label1">
                                                NXB
                                            </div>
                                            <div className="table-data">
                                                Dân Trí
                                            </div>
                                        </div>
                                        <div className="data-table">
                                            <div className="table-label1">
                                                Giá
                                            </div>
                                            <div className="table-data">
                                                {book.gia}
                                            </div>
                                        </div>
                                        <div className="data-table">
                                            <div className="table-label1">
                                                Số lượng
                                            </div>
                                            <div className="table-data">
                                                {book.soLuong}
                                            </div>
                                        </div>

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
        getBookID: (id) => dispatch(actions.getBookID(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietTLMN);
