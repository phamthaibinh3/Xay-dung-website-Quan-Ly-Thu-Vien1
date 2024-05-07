import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../utils'
import * as actions from '../../store/actions'
import './UserManage.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableMangeUser from './TableMangeUser';
import DatePicker from '../../components/Input/DatePicker';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

            maNguoiDung: '',
            ngayCap: '',
            ngayHetHan: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getTheThanhVien()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.theThanhVien !== this.props.theThanhVien) {
            this.setState({
                maNguoiDung: '',
                ngayCap: '',
                ngayHetHan: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        let valid = this.checkValidateInput();
        if (valid === false) return; //thoat khoai ham` nay`

        let { action } = this.state;

        //true thi` day data len redux
        if (action === CRUD_ACTIONS.CREATE) {
            let { ngayCap, ngayHetHan } = this.state;

            let ngayCapDate = new Date(ngayCap);

            // Lấy ra ngày, tháng, năm từ ngày cấp
            let ngayCapDay = ngayCapDate.getDate();
            let ngayCapMonth = ngayCapDate.getMonth() + 1;
            let ngayCapYear = ngayCapDate.getFullYear();
            let ngayCapString = `${ngayCapDay}/${ngayCapMonth}/${ngayCapYear}`;

            let ngayHetHanDate = new Date(ngayCapDate);
            ngayHetHanDate.setMonth(ngayHetHanDate.getMonth() + 2);

            // Trích xuất ngày, tháng và năm từ ngày hết hạn
            let ngayHetHan3 = ngayHetHanDate.getDate().toString().padStart(2, '0');
            let thangHetHan = (ngayHetHanDate.getMonth() + 1).toString().padStart(2, '0');
            let namHetHan = ngayHetHanDate.getFullYear();

            // Tạo chuỗi ngày hết hạn với định dạng 'dd/MM/yyyy'
            let ngayHetHanString = `${ngayHetHan3}/${thangHetHan}/${namHetHan}`;
            this.props.createTheThanhVien({
                maNguoiDung: this.state.maNguoiDung,
                ngayCap: ngayCapString,
                ngayHetHan: ngayHetHanString
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.updateUserRedux({
                id: this.state.userEditId,
                taiKhoan: this.state.taiKhoan,
                matKhau: this.state.matKhau,
                hoTen: this.state.hoTen,
                diaChi: this.state.diaChi,
                dienThoai: this.state.dienThoai,
                gioiTinh: this.state.gioiTinh,
                vaiTro: this.state.vaiTro,
                email: this.state.email,
                avatar: this.state.anh
            })
        }
    }

    handleEditUserFromParent = (user) => {
        this.setState({
            maNguoiDung: user.maNguoiDung,
            ngayCap: user.ngayCap,
            ngayHetHan: user.ngayHetHan,
        })
    }

    checkValidateInput = () => {
        let valid = true;
        let check = ['maNguoiDung']
        for (let i = 0; i < check.length; i++) {
            if (!this.state[check[i]]) {
                valid = false;
                alert('Bạn chưa nhập thông tin: ' + check[i]);
                break;
            }
        }
        return valid;
    }

    handleOnchangeNgayCap = (date) => {
        this.setState({
            ngayCap: date[0]
        })
    }

    handleOnchangeNgayHetHan = (date) => {
        this.setState({
            ngayHetHan: date[0]
        })
    }

    render() {
        let { maNguoiDung } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('check state: ', this.state);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Quản lý thẻ thành viên
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mb-3'> <FormattedMessage id="manage-user.them" /></div>
                            <div className='col-4'>
                                <label>Mã người dùng</label>
                                <input className='form-control' type='text'
                                    value={maNguoiDung}
                                    onChange={(event) => this.handleOnChangeInput(event, 'maNguoiDung')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Ngày cấp</label>
                                <DatePicker
                                    onChange={this.handleOnchangeNgayCap}
                                    className='form-control'
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Ngày hết hạn</label>
                                <DatePicker
                                    onChange={this.handleOnchangeNgayHetHan}
                                    className='form-control'
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>

                            <div className='col-12 my-3 '>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning px-3' : 'btn btn-primary px-3'}
                                    onClick={() => this.handleSaveUser()}

                                >
                                    {this.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.luu" />
                                        :
                                        <FormattedMessage id="manage-user.luu" />
                                    }
                                </button>
                                {/* <button className='btn btn-warning px-3' >
                                    Lưu
                                </button> */}
                            </div>

                            <div className='col-12'>
                                <TableMangeUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        theThanhVien: state.admin.theThanhVien
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTheThanhVien: () => dispatch(actions.getTheThanhVien()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchVaiTroStart: () => dispatch(actions.fetchVaiTroStart()),
        createTheThanhVien: (data) => dispatch(actions.createTheThanhVien(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
