import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            diaChi: '',
            dienThoai: ''
        }
    }

    componentDidMount() {
        let user = this.props.userEdit;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                taiKhoan: user.taiKhoan,
                matKhau: 'hascode',
                hoTen: user.hoTen,
                diaChi: user.diaChi,
                dienThoai: user.dienThoai
            })
        }
        console.log('did mount edit modal: ', this.props.userEdit);
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['taiKhoan', 'matKhau', 'hoTen', 'diaChi', 'dienThoai'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Ban chua nhap truong ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let valid = this.checkValideInput();
        if (valid === true) {
            this.props.editUser(this.state)
            // this.setState({
            //     taiKhoan: '',
            //     matKhau: '',
            //     hoTen: '',
            //     diaChi: '',
            //     dienThoai: ''
            // })
        }
    }

    isChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    //toggle khi kick ra ngoai thi` ra khoi form
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
                className={'modal-user-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Sửa người dùng</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Tài khoản:</label>
                            <input
                                onChange={(event) => this.isChange(event, 'taiKhoan')}
                                type='text'
                                value={this.state.taiKhoan}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Mật khẩu:</label>
                            <input
                                onChange={(event) => this.isChange(event, 'matKhau')}
                                type='password'
                                value={this.state.matKhau}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Họ tên:</label>
                            <input value={this.state.hoTen} type='text' onChange={(event) => this.isChange(event, 'hoTen')} />
                        </div>
                        <div className='input-container'>
                            <label>SĐT:</label>
                            <input value={this.state.dienThoai} type='number' onChange={(event) => this.isChange(event, 'dienThoai')} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Địa chỉ:</label>
                            <input value={this.state.diaChi} type='text' onChange={(event) => this.isChange(event, 'diaChi')} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleSaveUser()}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




