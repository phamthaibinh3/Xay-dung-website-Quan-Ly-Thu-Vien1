import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService'
import ModalUser from './ModalUser'


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUserFormReact();
    }

    getAllUserFormReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
        console.log('data tu Nodejs: ', response);
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }


    createUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFormReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUser = this.state.arrUser;
        return (
            <>
                <div className='user-container'>
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleUserModal={this.toggleUserModal}
                        createUser={this.createUser}
                    />
                    <div className='title mt-3'>Danh sách Users</div>
                    <div className="mx-3">
                        <button
                            onClick={() => this.handleAddNewUser()}
                            className='btn btn-primary px-2'
                        > <i className="fas fa-plus"></i> Thêm người dùng
                        </button>
                    </div>
                    <div className='user-content mt-4 mx-3'>
                        <table id="customers">
                            <tr>
                                <th>Tài khoản</th>
                                <th>Họ tên</th>
                                <th>Địa chỉ</th>
                                <th>SĐT</th>
                                <th>Hành động</th>
                            </tr>
                            {arrUser && arrUser.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.taiKhoan}</td>
                                            <td>{item.hoTen}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.dienThoai}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
