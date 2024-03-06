import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Loại sách</b></div>
                                <div className='subs-title'>Chìa khóa tri thức, sách của bạn!</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Tài Liệu</b></div>
                                <div className='subs-title'>Chọn tài liệu học tập</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Nhân viên</b></div>
                                <div className='subs-title'>Chọn nhân viên giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói thuê</b></div>
                                <div className='subs-title'>Gói thuê: Tiện lợi, dễ dàng</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question"></i>Hỗ trợ</div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='tìm kiếm' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-mobile-alt"></i></div>
                                <div className='text-child'>Tư vấn</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-books"></i></div>
                                <div className='text-child'>Sách mới</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                <div className='text-child'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                <div className='text-child'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                <div className='text-child'>Khám nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
