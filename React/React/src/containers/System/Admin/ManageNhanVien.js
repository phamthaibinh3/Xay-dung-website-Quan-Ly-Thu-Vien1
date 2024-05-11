import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageStaff from './TableManageStaff';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            vaiTroArr: [],
            previewImgUrl: '',
            isOpen: false,

            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            dienThoai: '',
            gioiTinh: '',
            vaiTro: '',
            anh: '',
            email: '',

            tinhThanh: '',
            quanHuyen: '',
            phuongXa: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.fetchVaiTroStart();
        // try {
        //     let res = await getAllCodeService('gioiTinh');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('heheh', res);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrgender = this.props.genderRedux
            this.setState({
                genderArr: arrgender,
                gioiTinh: arrgender && arrgender.length > 0 ? arrgender[0].keyMap : ''
            })
        }
        if (prevProps.vaiTroRedux !== this.props.vaiTroRedux) {
            let arrvaiTro = this.props.vaiTroRedux
            this.setState({
                vaiTroArr: arrvaiTro,
                vaiTro: arrvaiTro && arrvaiTro.length > 0 ? arrvaiTro[0].keyMap : ''
            })
        }

        if (prevProps.listUser !== this.props.listUser) {
            let arrvaiTro = this.props.vaiTroRedux
            let arrgender = this.props.genderRedux
            this.setState({
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                dienThoai: '',
                gioiTinh: arrgender && arrgender.length > 0 ? arrgender[0].keyMap : '',
                vaiTro: arrvaiTro && arrvaiTro.length > 0 ? arrvaiTro[0].keyMap : '',
                anh: '',
                email: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''
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

    handleOnchangeImage = async (event) => {
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

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = async () => {
        let valid = this.checkValidateInput();
        if (valid === false) return; //thoat khoai ham` nay`

        let { action } = this.state;

        //true thi` day data len redux
        if (action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewUser({
                taiKhoan: this.state.taiKhoan,
                matKhau: this.state.matKhau,
                hoTen: this.state.hoTen,
                tinhThanh: this.state.tinhThanh,
                quanHuyen: this.state.quanHuyen,
                phuongXa: this.state.phuongXa,
                dienThoai: this.state.dienThoai,
                gioiTinh: this.state.gioiTinh,
                vaiTro: this.state.vaiTro,
                email: this.state.email,
                avatar: this.state.anh
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            await this.props.updateUserRedux({
                id: this.state.userEditId,
                taiKhoan: this.state.taiKhoan,
                matKhau: this.state.matKhau,
                hoTen: this.state.hoTen,
                tinhThanh: this.state.tinhThanh,
                quanHuyen: this.state.quanHuyen,
                phuongXa: this.state.phuongXa,
                dienThoai: this.state.dienThoai,
                gioiTinh: this.state.gioiTinh,
                vaiTro: this.state.vaiTro,
                email: this.state.email,
                avatar: this.state.anh
            })
        }
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.anh) {
            imageBase64 = new Buffer(user.anh, 'base64').toString('binary')
        }
        this.setState({
            taiKhoan: user.taiKhoan,
            matKhau: 'HARDCODE',
            hoTen: user.hoTen,
            dienThoai: user.dienThoai,
            gioiTinh: user.gioiTinh,
            vaiTro: user.vaiTro,
            email: user.email,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgUrl: imageBase64
        })
    }

    checkValidateInput = () => {
        let valid = true;
        let check = ['taiKhoan', 'matKhau', 'hoTen', 'dienThoai', 'email']
        for (let i = 0; i < check.length; i++) {
            if (!this.state[check[i]]) {
                valid = false;
                alert('Bạn chưa nhập thông tin: ' + check[i]);
                break;
            }
        }
        return valid;
    }

    render() {
        // console.log('check lisuer: ', this.props.listUser);
        console.log('check state: ', this.state);
        let vaiTroArr = this.state.vaiTroArr;
        let genders = this.state.genderArr;
        let language = this.props.language;


        let { taiKhoan, matKhau, hoTen, dienThoai, vaiTro, anh, gioiTinh, email } = this.state
        // console.log('asghduiashduaishdu asdasd: ', this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Quản lý người dùng
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mb-3'> <FormattedMessage id="manage-user.them" /></div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.taiKhoan" /></label>
                                <input className='form-control' type='text'
                                    value={taiKhoan}
                                    onChange={(event) => this.handleOnChangeInput(event, 'taiKhoan')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.matKhau" /></label>
                                <input className='form-control' type='password'
                                    value={matKhau}
                                    onChange={(event) => this.handleOnChangeInput(event, 'matKhau')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.hoTen" /></label>
                                <input className='form-control' type='text'
                                    value={hoTen}
                                    onChange={(event) => this.handleOnChangeInput(event, 'hoTen')}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.dienThoai" /></label>
                                <input className='form-control' type='number'
                                    value={dienThoai}
                                    onChange={(event) => this.handleOnChangeInput(event, 'dienThoai')}
                                />
                            </div>
                            {/* <div className='col-4'>
                                <label><FormattedMessage id="manage-user.diaChi" /></label>
                                <input className='form-control' type='text'
                                    value={diaChi}
                                    onChange={(event) => this.handleOnChangeInput(event, 'diaChi')}
                                />
                            </div> */}
                            <div>
                                <select onChange={(event) => this.handleOnChangeInput(event, 'tinhThanh')} class="form-select form-select-sm mb-3" id="city" aria-label=".form-select-sm">
                                    <option value={this.state.tinhThanh} selected={this.state.tinhThanh}>Chọn tỉnh thành</option>
                                </select>

                                <select onChange={(event) => this.handleOnChangeInput(event, 'quanHuyen')} class="form-select form-select-sm mb-3" id="district" aria-label=".form-select-sm">
                                    <option value={this.state.quanHuyen} selected>Chọn quận huyện</option>
                                </select>

                                <select onChange={(event) => this.handleOnChangeInput(event, 'phuongXa')} class="form-select form-select-sm" id="ward" aria-label=".form-select-sm">
                                    <option value={this.state.phuongXa} selected>Chọn phường xã</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <label>email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.gioiTinh" /></label>
                                <select className="form-select"
                                    value={gioiTinh}
                                    onChange={(event) => this.handleOnChangeInput(event, 'gioiTinh')}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>

                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.vaiTro" /></label>
                                <select className="form-select"
                                    onChange={(event) => this.handleOnChangeInput(event, 'vaiTro')}
                                    value={vaiTro}
                                >
                                    {vaiTroArr && vaiTroArr.length > 0 &&
                                        vaiTroArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>

                                            )
                                        })}

                                </select>
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.anh" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg'
                                        className='form-control'
                                        type='file'
                                        hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
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
                            </div>

                            <div className='col-12'>
                                <TableManageStaff
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
        genderRedux: state.admin.genders,
        vaiTroRedux: state.admin.roles,
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchVaiTroStart: () => dispatch(actions.fetchVaiTroStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
