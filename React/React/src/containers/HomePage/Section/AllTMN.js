import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './AllTMN.scss'
import { getAllTMN } from '../../../services/userService'
import * as actions from '../../../store/actions'

class ALL_TLMN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    async componentDidMount() {
        this.props.layAllTLMN()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taiLieuMoiNhat !== this.props.taiLieuMoiNhat) {
            this.setState({
                books: this.props.taiLieuMoiNhat
            })
        }
    }

    handleDetailBook = (item) => {
        // alert('check hehe: '+item.id)
        this.props.history.push(`/chi-tiet-tai-lieu-moi-nhat/${item.id}`)
    }

    render() {
        const { books } = this.state;
        console.log('check books: ', this.state.books);
        return (
            <div className="rent-book-container1">
                <div>
                    <h1>Danh sách sản phẩm</h1>
                    <div className="product-grid">
                        {books && books.length > 0 &&
                            books.map((item, index) => {
                                let imageBase64 = '';
                                if (item.anh) {
                                    imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                }
                                return (
                                    <div className="product">
                                        {imageBase64 && <img onClick={() => this.handleDetailBook(item)} className="product-img" src={imageBase64} alt="" />}
                                        <h2>{item.tieuDe}</h2>
                                        <p>{item.moTa}</p>
                                        <p>{item.gia}</p>
                                    </div>
                                )
                            })
                        }
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
        taiLieuMoiNhat: state.admin.taiLieuMoiNhat
    };
};

const mapDispatchToProps = dispatch => {
    return {
        layAllTLMN: () => dispatch(actions.layAllTLMN())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ALL_TLMN);
