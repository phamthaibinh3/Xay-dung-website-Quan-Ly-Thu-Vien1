import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './AllTLNB.scss'
import { getAllTLNB } from '../../../services/userService'
import * as actions from '../../../store/actions'

class ALL_TLMN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchQuery: ''
        }
    }

    async componentDidMount() {
        this.props.layAllTLNB()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taiLieuNoiBat !== this.props.taiLieuNoiBat) {
            this.setState({
                books: this.props.taiLieuNoiBat
            })
        }
    }
    handleDetailBook = (item) => {
        this.props.history.push(`/chi-tiet-tai-lieu-moi-nhat/${item.id}`);
    };

    handleSearchInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value // Cập nhật trạng thái searchQuery
        });
    };

    render() {
        const { books, searchQuery } = this.state;
        const filteredBooks = books.filter(book => book.tieuDe.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log('check books: ', this.state.books);
        return (
            <div className="rent-book-container1">
                <div>
                    <h1>Danh sách sản phẩm</h1>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={this.handleSearchInputChange}
                        placeholder="Nhập từ khóa để tìm kiếm..."
                    />
                    <div className="product-grid">
                        {filteredBooks.map((item, index) => {
                            let imageBase64 = '';
                            if (item.anh) {
                                imageBase64 = new Buffer(item.anh, 'base64').toString('binary');
                            }
                            return (
                                <div className="product" key={index}>
                                    {imageBase64 && <img onClick={() => this.handleDetailBook(item)} className="product-img" src={imageBase64} alt="" />}
                                    <h2>{item.tieuDe}</h2>
                                    <p>{item.moTa}</p>
                                    <p>{item.gia}</p>
                                </div>
                            );
                        })}
                        {/* Thêm các sản phẩm khác tương tự */}
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
        taiLieuNoiBat: state.admin.taiLieuNoiBat
    };
};

const mapDispatchToProps = dispatch => {
    return {
        layAllTLNB: () => dispatch(actions.layAllTLNB())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ALL_TLMN);
