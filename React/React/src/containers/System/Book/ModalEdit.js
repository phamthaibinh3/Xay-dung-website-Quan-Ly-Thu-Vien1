import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            tieuDe: '',
            soLuong: '',
            gia: '',
            tacGia: '',
            maDanhMuc: '',

            allChuyenMuc: [],
        }
    }

    componentDidMount() {
        let book = this.props.bookEdit;
        if (book && !_.isEmpty(book)) {
            this.setState({
                id: book.id,
                tieuDe: book.tieuDe,
                soLuong: book.soLuong,
                gia: book.gia,
                tacGia: book.tacGia,
                maDanhMuc: book.maDanhMuc
            })
        }
        console.log('did mount edit modal: ', this.props.userEdit);

        this.props.fetchChuyenMucStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            let a = this.props.chuyenMuc
            this.setState({
                allChuyenMuc: a,
                maDanhMuc: a && a.length > 0 ? a[0].keyMap : ''
            })
        }
    }

    toggle = () => {
        this.props.togglebookModal()
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['tieuDe', 'soLuong', 'gia', 'tacGia', 'maDanhMuc'];
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
        // let valid = this.checkValideInput();
        // if (valid === true) {
        this.props.editbook(this.state)
        // this.setState({
        //     tieuDe: '',
        //     soLuong: '',
        //     gia: '',
        //     tacGia: '',
        //     maDanhMuc: ''
        // })
        // }
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
        let { language } = this.props
        let { allChuyenMuc } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
                className={'modal-book-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Sửa thôn tin sách</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'>
                            <label>Tiêu đề:</label>
                            <input
                                className='form-control'
                                onChange={(event) => this.isChange(event, 'tieuDe')}
                                type='text'
                                value={this.state.tieuDe}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Số lượng:</label>
                            <input
                                className='form-control'
                                onChange={(event) => this.isChange(event, 'soLuong')}
                                type='text'
                                value={this.state.soLuong}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Giá:</label>
                            <input className='form-control' value={this.state.gia} type='text' onChange={(event) => this.isChange(event, 'gia')} />
                        </div>
                        <div className='input-container'>
                            <label>Tác giả:</label>
                            <input className='form-control' value={this.state.tacGia} type='text' onChange={(event) => this.isChange(event, 'tacGia')} />
                        </div>
                        <div className='input-container'>
                            <label>Danh mục:</label>
                            <select className="form-select"
                                value={this.state.maDanhMuc}
                                onChange={(event) => this.isChange(event, 'maDanhMuc')}
                            >
                                {allChuyenMuc && allChuyenMuc.length > 0 && allChuyenMuc.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>

                                    )
                                })}
                            </select>
                        </div>
                        <div className='input-container'>
                            <label htmlFor='anh'>Ảnh:</label>
                            <input
                                id='anh'
                                className='form-control'
                                type='file'
                                onChange={this.handleFileChange}
                            />
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
        chuyenMuc: state.admin.chuyenMuc,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




