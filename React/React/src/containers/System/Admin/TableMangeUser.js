import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangeUser.scss'
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class TableMangeUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            searchQuery: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                userRedux: this.props.listUser
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

    handleSearchInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value // Cập nhật trạng thái searchQuery
        });
    };

    render() {
        // console.log('check data redux ', this.props.listUser);
        let arrUser = this.state.userRedux
        let { listUser, searchQuery } = this.state;
        const filteredBooks = arrUser.filter(arrUser => arrUser.hoTen.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
            <>
                <input
                    type="text"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchInputChange}
                    placeholder="Nhập từ khóa để tìm kiếm..."
                />
                <table id='TableMangeUser'>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                    </tr>
                    <>
                        {filteredBooks && filteredBooks.length > 0 &&
                            filteredBooks.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.taiKhoan}</td>
                                        <td>{item.hoTen}</td>
                                        <td>{item.tinhThanh}</td>
                                        <td>{item.dienThoai}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
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
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMangeUser);
