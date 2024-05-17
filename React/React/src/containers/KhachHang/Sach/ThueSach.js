import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ThueSach.scss'
import './ThanhToan.css'
import { toast } from "react-toastify";
import { CommonUtils, LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { tongTien } from '../../../services/userService'
import { thanhToan } from '../../../services/userService';

class ThueSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: '',
            quantity: 1,
            hoaDonTT: '',
            tongtien: ''
        }
    }

    async componentDidMount() {
        this.props.getBookID(this.props.match.params.id);
        this.props.getHoaDonTT();
        await this.props.Gia();

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.SachID !== this.props.SachID) {
            this.setState({
                book: this.props.SachID
            })
        }
        if (prevProps.hoaDonTT !== this.props.hoaDonTT) {
            this.setState({
                hoaDonTT: this.props.hoaDonTT
            })
        }
        if (prevProps.gia !== this.props.gia) {
            this.setState({
                tongtien: this.props.gia
            })
        }
        this.props.getHoaDonTT();
        this.props.Gia()
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
        // let { userInfo } = this.props;
        // this.props.handleHoaDon({
        //     idSach: this.state.book.id,
        //     idUser: userInfo.id,
        //     gia: this.state.book.gia * this.state.quantity + this.state.book.gia * this.state.quantity * 0.1
        // })
        // Kiểm tra xem giá sách và số lượng đã được thiết lập chưa
        if (!this.state.book || !this.state.quantity) {
            toast.error("Vui lòng chọn sách và nhập số lượng trước khi thanh toán!");
            return;
        }

        // Tính toán giá cuối cùng dựa trên giá sách, số lượng và thuế
        // const totalPrice = this.props.gia * this.state.quantity + this.state.book.gia * this.state.quantity ;

        // Gọi hàm thanhToan với giá tính toán
        let res = await thanhToan({
            maNguoiDung: this.props.userInfo.id
        });

        // console.log('check gia: ', totalPrice);
        // console.log('check res: ', res);

        // Xử lý kết quả trả về từ yêu cầu thanh toán
        if (res && res.return_code === 1 && res.order_url) {
            // Chuyển hướng đến đường link đơn hàng
            window.location.href = res.order_url;
        } else {
            // Xử lý khi có lỗi hoặc không có đường link đơn hàng
            toast.error("Đã xảy ra lỗi khi thực hiện thanh toán!");
        }
    }

    handleDeleteHoaDonTT = (item) => {
        this.props.deleteHoaDonTT(item)
    }


    render() {
        let { book, quantity, hoaDonTT } = this.state


        return (

            <>
                <HomeHeader isShowBanner={false} />
                <div className="app">
                    <div className="product">
                        <div className="chon-tat-ca">
                            <div className="chon-tat-ca_radio">
                                {/* <input type="checkbox" className="checkbox" /> */}
                            </div>
                            {/* <div className="chon-tat-ca_text">Chọn tất cả</div> */}
                            <div className="chon-tat-ca_soluong">Số lượng</div>
                            <div className="chon-tat-ca_thanhtien">Thành tiền</div>
                        </div>
                        {hoaDonTT && hoaDonTT.length > 0 &&
                            hoaDonTT.map((item, index) => {
                                let imageBase64 = '';
                                if (item.HoaDonTTSach.anh.data) {
                                    imageBase64 = new Buffer(item.HoaDonTTSach.anh.data, 'base64').toString('binary')
                                }
                                return (
                                    <div key={index} className="list">
                                        <div className="list-radio">
                                            {/* <input type="checkbox" className="checkbox" /> */}
                                        </div>
                                        <div className="list-image">
                                            {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                        </div>
                                        <div className="list-to">
                                            <div className="list-name">{item.HoaDonTTSach.tieuDe}</div>
                                            <div className="list-soluong">
                                                <div className="list-soluongnua">
                                                    <i class="fas fa-minus" onClick={this.handleDecreaseQuantity}></i>
                                                    <input type="text" value={quantity} readOnly />
                                                    <i class="fas fa-plus" onClick={this.handleIncreaseQuantity}></i>
                                                </div>
                                            </div>
                                            <div className="list-thanhtien">{item.HoaDonTTSach.gia} đ</div>
                                        </div>
                                        <div className="list-xoa">
                                            <i onClick={() => this.handleDeleteHoaDonTT(item.id)} className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="list">
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
                    </div> */}

                    </div>
                    <div className="pay">
                        <div className="thanhtien">
                            <div className="title-thanhtien"> Thành tiền</div>
                            <span className="gia">{book.gia * +this.state.quantity}đ</span>
                        </div>
                        <div className="final">
                            <div className="title-tongsotien"> Tổng Số Tiền (gồm VAT)</div>
                            <span className="gias">{this.props.gia}đ</span>
                        </div>
                        <button onClick={() => this.handleThanhToan()} className="thanhtoan">THANH TOÁN</button>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        SachID: state.admin.idSach,
        userInfo: state.user.userInfo,
        hoaDonTT: state.admin.hoaDonTT,
        gia: state.admin.gia
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookID: (id) => dispatch(actions.getBookID(id)),
        handleHoaDon: (data) => dispatch(actions.handleHoaDon(data)),
        getHoaDonTT: () => dispatch(actions.getHoaDonTT()),
        deleteHoaDonTT: (id) => dispatch(actions.deleteHoaDonTT(id)),
        Gia: () => dispatch(actions.Gia()),
        // thanhToanQR: () => dispatch(actions.thanhToanQR()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThueSach);
