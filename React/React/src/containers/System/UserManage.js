import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, delteUserService, updateUserService } from '../../services/userService'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEidtUser: false,
            userEdit: {}
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

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEidtUser: !this.state.isOpenModalEidtUser
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

    handleDeleteUser = async (user) => {
        try {
            let res = await delteUserService(user.id);
            if (res && res.errCode === 0) {
                this.getAllUserFormReact();
                this.setState({

                })
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEidtUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await updateUserService(user);
            if (res && res.errCode === 0) {
                await this.getAllUserFormReact();
                this.setState({
                    isOpenModalEidtUser: false
                })
            } else {
                alert(res.errMessage);
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
                    {this.state.isOpenModalEidtUser &&
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEidtUser}
                            toggleUserModal={this.toggleUserEditModal}
                            userEdit={this.state.userEdit}
                            editUser={this.doEditUser}
                        />
                    }
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
                                                <button onClick={() => this.handleEditUser(item)} className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button onClick={() => this.handleDeleteUser(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
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
