import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tieuDe: '',
            maNXB: '',
            namXuatBan: '',
            soLuong: '',
            gia: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['tieuDe', 'maNXB', 'namXuatBan', 'soLuong', 'gia'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Ban chua nhap truong ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleThemSach = () => {
        let valid = this.checkValideInput();
        if (valid === false) return;

        this.props.createBook1({
            tieuDe: this.state.tieuDe,
            maNXB: this.state.maNXB,
            namXuatBan: this.state.namXuatBan,
            soLuong: this.state.soLuong,
            gia: this.state.gia
        })
        this.toggle()
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
        console.log('check state: ', this.state);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
                className={'modal-user-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Thêm Sách</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Tiêu đề:</label>
                            <input
                                onChange={(event) => this.isChange(event, 'tieuDe')}
                                type='text'
                                value={this.state.tieuDe}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Mã nhà xuất bản</label>
                            <input
                                onChange={(event) => this.isChange(event, 'maNXB')}
                                type='text'
                                value={this.state.maNXB}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Năm xuất bản:</label>
                            <input
                                value={this.state.namXuatBan}
                                type='text'
                                onChange={(event) => this.isChange(event, 'namXuatBan')} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Số lượng:</label>
                            <input value={this.state.soLuong} type='text' onChange={(event) => this.isChange(event, 'soLuong')} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Giá:</label>
                            <input value={this.state.gia} type='text' onChange={(event) => this.isChange(event, 'gia')} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleThemSach()}>
                        Xác nhận
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
        createBook1: (data) => dispatch(actions.createBook1(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




