import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangeUser.scss'
import actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions'

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
        }
    }

    componentDidMount() {
        this.props.getTheThanhVien();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.theThanhVien !== this.props.theThanhVien) {
            this.setState({
                userRedux: this.props.theThanhVien
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteTheThanhVien(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
        // handleEditUserFromParent
    }

    render() {
        let arrUser = this.state.userRedux
        return (
            <>
                <table id='TableMangeUser'>
                    <tr>
                        <th>Mã người dùng</th>
                        <th>Ngày cấp</th>
                        <th>Ngày hết hạn</th>
                        <th>Hành động</th>
                    </tr>
                    <>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.maNguoiDung}</td>
                                        <td>{item.ngayCap}</td>
                                        <td>{item.ngayHetHan}</td>
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

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users,
        theThanhVien: state.admin.theThanhVien
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTheThanhVien: () => dispatch(actions.getTheThanhVien()),
        deleteTheThanhVien: (data) => dispatch(actions.deleteTheThanhVien(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMangeUser);
