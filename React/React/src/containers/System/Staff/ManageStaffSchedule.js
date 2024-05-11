import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageStaffSchedule.scss'
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { fectchNhanVien } from '../../../services/userService'
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class ManageStaffSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllUserRedux();
        // let res = await fectchNhanVien();
        // if(res && res.length > 0){
        //    this.setState({
        //        userRedux:res.data
        //    })
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nhanVien !== this.props.nhanVien) {
            this.setState({
                userRedux: this.props.nhanVien
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);

    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
        // handleEditUserFromParent
    }

    render() {
        // console.log('check data redux ', this.props.nhanVien);
        let arrUser = this.state.userRedux
        return (
            <>
                <div className='title mb-4'>
                    Quản lý người dùng
                </div>
                <table id='ManageStaffSchedule'>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                    </tr>
                    <>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.taiKhoan}</td>
                                        <td>{item.hoTen}</td>
                                        <td>{item.tinhThanh}</td>
                                        <td>{item.dienThoai}</td>
                                        <td>
                                            {/* <button
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button> */}
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </>
                </table>
                <div className="a"></div>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        nhanVien: state.admin.khachHang
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.layKhachHang()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffSchedule);
