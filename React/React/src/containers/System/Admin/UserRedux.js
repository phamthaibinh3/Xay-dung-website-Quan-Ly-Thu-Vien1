import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            vaiTro: []
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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.vaiTroRedux !== this.props.vaiTroRedux) {
            this.setState({
                vaiTro: this.props.vaiTroRedux
            })
        }
    }

    render() {
        let vaiTro = this.state.vaiTro;
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('asghduiashduaishdu asdasd: ', this.props.genderRedux);
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
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.matKhau" /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.hoTen" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.dienThoai" /></label>
                                <input className='form-control' type='number' />
                            </div>
                            <div className='col-8'>
                                <label><FormattedMessage id="manage-user.diaChi" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.gioiTinh" /></label>
                                <select className="form-select">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.vaiTro" /></label>
                                <select className="form-select">
                                    {vaiTro && vaiTro.length > 0 &&
                                        vaiTro.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                        })}

                                </select>
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id="manage-user.anh" /></label>
                                <div>
                                    <input className='form-control' type='file' />
                                    <label htm></label>
                                    <div className='preview-image'></div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'>
                                    <FormattedMessage id="manage-user.luu" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
        fetchVaiTroStart: () => dispatch(actions.fetchVaiTroStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
