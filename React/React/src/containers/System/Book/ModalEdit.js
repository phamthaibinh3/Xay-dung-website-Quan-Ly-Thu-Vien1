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
            loaiSach: '',
            maNXB: '',
            anh: '',

            allChuyenMuc: [],
            allLoaiSach: [],
            allNhaCungCap: [],
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
                maDanhMuc: book.maDanhMuc,
                loaiSach: book.loaiSach,
                moTa: book.moTa,
                anh: book.anh
            })
        }
        console.log('did mount edit modal: ', this.props.userEdit);

        this.props.fetchChuyenMucStart();
        this.props.fectchAllKindOfBook();
        this.props.getNXB();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            let a = this.props.chuyenMuc
            this.setState({
                allChuyenMuc: a,
                maDanhMuc: a && a.length > 0 ? a[0].id : ''
            })
        }
        if (prevProps.loaiSach !== this.props.loaiSach) {
            let a = this.props.loaiSach
            this.setState({
                allLoaiSach: a,
                loaiSach: a && a.length > 0 ? a[0].id : ''
            })
        }
        if (prevProps.nhaXB !== this.props.nhaXB) {
            this.setState({
                allNhaCungCap: this.props.nhaXB,
                maNXB: this.props.nhaXB[0].id
            })
        }
    }

    toggle = () => {
        this.props.togglebookModal()
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['tieuDe', 'soLuong', 'gia', 'tacGia', 'maDanhMuc'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Bạn chưa nhập trường ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        // let valid = this.checkValidInput();
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

    render() {
        let { allChuyenMuc, allLoaiSach, allNhaCungCap } = this.state;
        let imageBase64 = '';
        if (this.state.anh) {
            imageBase64 = new Buffer(this.state.anh, 'base64').toString('binary')
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
                className={'modal-book-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Sửa thông tin sách</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='column'>
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
                                                {item.tenDanhMuc}
                                            </option>

                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='input-container'>
                                <label>Loại sách:</label>
                                <select className="form-select"
                                    value={this.state.loaiSach}
                                    onChange={(event) => this.isChange(event, 'loaiSach')}
                                >
                                    {allLoaiSach && allLoaiSach.length > 0 && allLoaiSach.map((item, index) => {
                                        return (
                                            <option key={index} value={item.tenTheLoai}>
                                                {item.tenTheLoai}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='input-container'>
                                <label htmlFor='loaiSach'>Nhà xuất bản:</label>
                                <select className="form-select"
                                    value={this.state.maNXB}
                                    onChange={(event) => this.isChange(event, 'maNXB')}
                                >
                                    {allNhaCungCap && allNhaCungCap.length > 0 && allNhaCungCap.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.tenNXB}
                                            </option>

                                        )
                                    })}
                                </select>

                            </div>
                            <div className='input-container'>
                                <label htmlFor='anh'>Ảnh:</label>
                                <div className='image-container'>
                                    {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                </div>
                            </div>
                            <div className="input-container">
                                <label>Mô tả sách:</label>
                                <textarea
                                    value={this.state.moTa}
                                    onChange={(event) => this.isChange(event, 'moTa')}
                                    rows="4"
                                    cols="50"
                                />
                            </div>
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
        loaiSach: state.admin.loaiSach
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart()),
        fectchAllKindOfBook: () => dispatch(actions.fectchAllKindOfBook()),
        getNXB: () => dispatch(actions.getNXB()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
