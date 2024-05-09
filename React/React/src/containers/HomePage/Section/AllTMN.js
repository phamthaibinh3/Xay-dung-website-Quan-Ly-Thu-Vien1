import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './AllTMN.scss';
import { getAllTMN } from '../../../services/userService';
import * as actions from '../../../store/actions';

class ALL_TLMN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchQuery: ''
        };
    }

    async componentDidMount() {
        this.props.layAllTLMN();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taiLieuMoiNhat !== this.props.taiLieuMoiNhat) {
            this.setState({
                books: this.props.taiLieuMoiNhat
            });
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
        taiLieuMoiNhat: state.admin.taiLieuMoiNhat
    };
};

const mapDispatchToProps = dispatch => {
    return {
        layAllTLMN: () => dispatch(actions.layAllTLMN())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ALL_TLMN);
