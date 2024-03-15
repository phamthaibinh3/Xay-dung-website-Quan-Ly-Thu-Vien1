import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableMangeUser from './TableMangeUser';

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
            diaChi: '',
            gioiTinh: '',
            vaiTro: '',
            anh: '',
            email: ''
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
                gioiTinh: arrgender && arrgender.length > 0 ? arrgender[0].key : ''
            })
        }
        if (prevProps.vaiTroRedux !== this.props.vaiTroRedux) {
            let arrvaiTro = this.props.vaiTroRedux
            this.setState({
                vaiTroArr: arrvaiTro,
                vaiTro: arrvaiTro && arrvaiTro.length > 0 ? arrvaiTro[0].key : ''
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

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                anh: file
            })

        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let valid = this.checkValidateInput();
        if (valid === false) return; //thoat khoai ham` nay`

        //true thi` day data len redux
        this.props.createNewUser({
            taiKhoan: this.state.taiKhoan,
            matKhau: this.state.matKhau,
            hoTen: this.state.hoTen,
            diaChi: this.state.diaChi,
            dienThoai: this.state.dienThoai,
            gioiTinh: this.state.gioiTinh,
            vaiTro: this.state.vaiTro,
            email: this.state.email
        })
        alert('Thêm user thanh cong');
        this.setState({
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            diaChi: '',
            dienThoai: '',
            gioiTinh: '',
            vaiTro: '',
            email: ''
        })
    }

    checkValidateInput = () => {
        let valid = true;
        let check = ['taiKhoan', 'matKhau', 'hoTen', 'dienThoai', 'diaChi', 'email']
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
        let vaiTroArr = this.state.vaiTroArr;
        let genders = this.state.genderArr;
        let language = this.props.language;

        let { taiKhoan, matKhau, hoTen, dienThoai, diaChi, vaiTro, anh, gioiTinh, email } = this.state
        // console.log('asghduiashduaishdu asdasd: ', this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Redux
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
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.matKhau" /></label>
                                <input className='form-control' type='password'
                                    value={matKhau}
                                    onChange={(event) => this.handleOnChangeInput(event, 'matKhau')}
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
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.diaChi" /></label>
                                <input className='form-control' type='text'
                                    value={diaChi}
                                    onChange={(event) => this.handleOnChangeInput(event, 'diaChi')}
                                />
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
                                    onChange={(event) => this.handleOnChangeInput(event, 'gioiTinh')}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
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
                                >
                                    {vaiTroArr && vaiTroArr.length > 0 &&
                                        vaiTroArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
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
                            <div className='col-12 my-3'>
                                <button className='btn btn-primary px-3'
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id="manage-user.luu" />
                                </button>
                            </div>

                            <div className='col-12'>
                                <TableMangeUser />
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
        vaiTroRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchVaiTroStart: () => dispatch(actions.fetchVaiTroStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
