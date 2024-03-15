import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangeUser.scss'


class TableMangeUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <>
                <table id='TableMangeUser'>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                    </tr>
                    <>
                        <tr>
                            <td>{'item.taiKhoan'}</td>
                            <td>{'item.hoTen'}</td>
                            <td>{'item.diaChi'}</td>
                            <td>{'item.dienThoai'}</td>
                            <td>
                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </>

                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableMangeUser);
