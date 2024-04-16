import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ThueSach.scss'
import './ThanhToan.css'
import { toast } from "react-toastify";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { phieuMuon } from '../../../services/userService'

class ThueSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: '',
            quantity: 1
        }
    }

    componentDidMount() {
        this.props.getBookID(this.props.match.params.id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.SachID !== this.props.SachID) {
            this.setState({
                book: this.props.SachID
            })
        }
        let { userInfo } = this.props;
        console.log('check userInfo ', userInfo);
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
                anh: '',
                loaiSach: '',
                moTa: '',
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

    handleDecreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState(prevState => ({
                quantity: prevState.quantity - 1
            }));
        }
    };

    handleIncreaseQuantity = () => {
        if (this.state.quantity < this.state.book.soLuong) {
            this.setState(prevState => ({
                quantity: prevState.quantity + 1
            }));
        }
    };

    handleThanhToan = async () => {
        let { userInfo } = this.props;
        this.props.handleHoaDon({
            idSach: this.state.book.id,
            idUser: userInfo.id,
            gia: this.state.book.gia * this.state.quantity + this.state.book.gia * this.state.quantity * 0.1
        })
    }

    //toggle khi kick ra ngoai thi` ra khoi form
    render() {
        let { book, quantity } = this.state
        // let { userInfo } = this.props;
        let imageBase64 = '';
        if (book.anh) {
            imageBase64 = new Buffer(book.anh, 'base64').toString('binary')
        }
        console.log('check state: ', this.state);
        return (
            // <Modal
            //     isOpen={this.props.isOpen}
            //     toggle={() => this.toggle()}
            //     size="lg"
            //     centered
            //     className={'modal-user-container'}
            // >
            //     <ModalHeader toggle={() => this.toggle()}>Thuê Sách</ModalHeader>
            //     <ModalBody>
            //         <div className='modal-user-body'>
            //             <div className='input-container'>
            //                 <label>Tên Sách:{book.tieuDe}</label>

            //             </div>
            //             <div className='input-container'>
            //                 <label>Số lượng:{book.soLuong}</label>
            //             </div>
            //             <div className='input-container'>
            //                 <label>Tác giả:{book.tacGia}</label>
            //             </div>
            //             <div className='input-container'>
            //                 <label htmlFor='maDanhMuc'>Danh mục: {book.maDanhMuc}</label>
            //             </div>
            //             <div className='input-container'>
            //                 <label htmlFor='loaiSach'>Loại sách:{book.maLoaiSach}</label>
            //             </div>
            //             <div className='input-container'>
            //                 <label htmlFor='anh'>Ảnh:</label>
            //                 {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
            //             </div>
            //             <div className="input-container">
            //                 <label>Giá:{book.gia}</label>
            //             </div> 
            //         </div>
            //     </ModalBody>
            //     <ModalFooter>
            //         <Button color="primary" className='px-3' onClick={(data) => this.handleThemUser(data)}>
            //             Xác nhận
            //         </Button>{' '}
            //         <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
            //             Thoát
            //         </Button>
            //     </ModalFooter>
            // </Modal >
            <div className="app">
                <div className="product">
                    <div className="chon-tat-ca">
                        <div className="chon-tat-ca_radio">
                            <input type="checkbox" className="checkbox" />
                        </div>
                        <div className="chon-tat-ca_text">Chọn tất cả</div>
                        <div className="chon-tat-ca_soluong">Số lượng</div>
                        <div className="chon-tat-ca_thanhtien">Thành tiền</div>
                    </div>
                    <div className="list">
                        <div className="list-radio">
                            <input type="checkbox" className="checkbox" />
                        </div>
                        <div className="list-image">
                            {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                        </div>
                        <div className="list-to">
                            <div className="list-name">{book.tieuDe}</div>
                            <div className="list-soluong">
                                <div className="list-soluongnua">
                                    <i class="fas fa-minus" onClick={this.handleDecreaseQuantity}></i>
                                    <input type="text" value={quantity} readOnly />
                                    <i class="fas fa-plus" onClick={this.handleIncreaseQuantity}></i>
                                </div>
                            </div>
                            <div className="list-thanhtien">{book.gia} đ</div>
                        </div>
                        <div className="list-xoa">
                            <i className="fa-regular fa-trash-can" />
                        </div>
                    </div>
                </div>
                <div className="pay">
                    <div className="thanhtien">
                        <div className="title-thanhtien"> Thành tiền</div>
                        <span className="gia">{+book.gia * +this.state.quantity}đ</span>
                    </div>
                    <div className="final">
                        <div className="title-tongsotien"> Tổng Số Tiền (gồm VAT)</div>
                        <span className="gias">{book.gia * this.state.quantity + book.gia * this.state.quantity * 0.1}đ</span>
                    </div>
                    <button onClick={() => this.handleThanhToan()} className="thanhtoan">THANH TOÁN</button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        SachID: state.admin.idSach,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookID: (id) => dispatch(actions.getBookID(id)),
        handleHoaDon: (data) => dispatch(actions.handleHoaDon(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThueSach);




