import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalBook.scss'

class ModalBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tieuDe: '',
            soLuong: '',
            tacGia: '',
            gia: '',
            maDanhMuc: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.togglebookModal()
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['tieuDe', 'soLuong', 'tacGia', 'gia', 'maDanhMuc'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Ban chua nhap truong ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleThemUser = () => {
        let valid = this.checkValideInput();
        if (valid === true) {
            this.props.createbook(this.state)
            this.setState({
                tieuDe: '',
                soLuong: '',
                tacGia: '',
                gia: '',
                maDanhMuc: ''
            })
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
                <ModalHeader toggle={() => this.toggle()}>Thêm Sách</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Tên Sách:</label>
                            <input
                                onChange={(event) => this.isChange(event, 'tieuDe')}
                                type='text'
                                value={this.state.tieuDe}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Số lượng:</label>
                            <input
                                onChange={(event) => this.isChange(event, 'soLuong')}
                                type='text'
                                value={this.state.soLuong}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Tác giả:</label>
                            <input value={this.state.tacGia} type='text' onChange={(event) => this.isChange(event, 'tacGia')} />
                        </div>
                        <div className='input-container'>
                            <label>Danh mục:</label>
                            <input value={this.state.maDanhMuc} type='number' onChange={(event) => this.isChange(event, 'maDanhMuc')} />
                        </div>
                        <div className='input-container'>
                            <label>Giá:</label>
                            <input value={this.state.gia} type='number' onChange={(event) => this.isChange(event, 'gia')} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleThemUser()}>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);




