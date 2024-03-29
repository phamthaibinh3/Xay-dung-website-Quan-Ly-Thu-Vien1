import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalBook.scss'
import { toast } from "react-toastify";
import { CommonUtils, LANGUAGES } from '../../../utils';

class ModalBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tieuDe: '',
            soLuong: '',
            tacGia: '',
            gia: '',
            maDanhMuc: '',
            anh: '',

            previewImgUrl: '',
            allChuyenMuc: [],
        }
    }

    componentDidMount() {
        this.props.fetchChuyenMucStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            this.setState({
                allChuyenMuc: this.props.chuyenMuc,
                maDanhMuc: this.props.chuyenMuc[0].keyMap
            })
        }
    }

    toggle = () => {
        this.props.togglebookModal();
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

    handleThemUser = async (data) => {
        let valid = this.checkValideInput();
        if (valid === true) {
            this.props.createbook(this.state)
            this.setState({
                tieuDe: '',
                soLuong: '',
                tacGia: '',
                gia: '',
                maDanhMuc: [],
                anh: ''
            })
        }
        this.toggle()
    }

    isChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleFileChange = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                anh: base64
            })

        }
    }

    //toggle khi kick ra ngoai thi` ra khoi form
    render() {
        console.log('check state: ', this.state);
        let { language } = this.props
        let { allChuyenMuc } = this.state
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
                            <label htmlFor='maDanhMuc'>Danh mục:</label>
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
                            <label>Giá:</label>
                            <input value={this.state.gia} type='number' onChange={(event) => this.isChange(event, 'gia')} />
                        </div>
                        <div className='input-container'>
                            <label htmlFor='anh'>Ảnh:</label>
                            <input
                                id='anh'
                                className='form-control'
                                type='file'
                                onChange={(event) => this.handleFileChange(event)}
                            />
                        </div>
                        {this.state.previewImgUrl && (
                            <div className='input-container'>
                                <img src={this.state.previewImgUrl} alt="Ảnh xem trước" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={(data) => this.handleThemUser(data)}>
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
        chuyenMuc: state.admin.chuyenMuc,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);




