import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import * as actions from '../../../store/actions'
import './TaiLieuNoiBat.scss'
import { getBookNew } from '../../../services/bookService'

class TaiLieuNoiBat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allBook: []
        }
    }

    async componentDidMount() {
        let res = await getBookNew('');
        // console.log('check res: ', res);
        if (res && res.errCode === 0) {
            this.setState({
                allBook: res.data
            })
        }
    }

    componentDidUpdate() {

    }



    render() {
        let { allBook } = this.state;
        return (
            <>
                <div className="contener">
                    <div className="header-page">TÀI LIỆU MỚI NHẤT</div>
                    {/* <div className="btn-addbook">

                    </div> */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên Sách</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                    <th>Tác Giả</th>
                                    <th>Danh Mục</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBook && allBook.length > 0 &&
                                    allBook.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.anh) {
                                            imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                                </td>
                                                <td>{item.tieuDe}</td>
                                                <td>{item.soLuong}</td>
                                                <td>{item.gia} VNĐ</td>
                                                <td>{item.tacGia}</td>
                                                <td>{item.maDanhMuc}</td>
                                                <td>
                                                    <div className="icon-product">
                                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuNoiBat);
