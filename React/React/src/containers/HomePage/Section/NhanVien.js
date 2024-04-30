import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router'


class NhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaff: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topStaffRedux !== this.props.topStaffRedux) {
            this.setState({
                arrStaff: this.props.topStaffRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopStaff();
    }

    handleViewDetailStaff = (staff) => {
        // console.log('check: ', staff);
        this.props.history.push(`/detail-staff/${staff.id}`)
    }

    render() {
        let arrStaff = this.state.arrStaff;
        let { language } = this.props;
        return (
            <div className='section-share section-nhanVien'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Nhân viên nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrStaff && arrStaff.length > 0 &&
                                arrStaff.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anh) {
                                        imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.vaiTroData.valueVi}, ${item.hoTen}`
                                    let nameEn = `${item.vaiTroData.valueEn}, ${item.hoTen}`
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailStaff(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-nhanVien'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />

                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Nhân viên</div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topStaffRedux: state.admin.topStaff
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopStaff: () => dispatch(actions.fetchTopStaff())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NhanVien));
