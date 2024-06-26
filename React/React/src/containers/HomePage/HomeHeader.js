import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import logo from '../../../src/assets/Untitled.png'
import { withRouter } from 'react-router-dom'

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allBook: [],
            searchQuery: ''
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppredux(language)
        // alert(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    handleSearchInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        });
        this.props.updateSearchQuery(event.target.value); // Gọi prop updateSearchQuery
    };

    render() {
        let language = this.props.language

        // console.log('check state: ', this.state.searchQuery);
        // this.props.updateSearchQuery(this.tate.searchQuery);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.loaiSach" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.loaiSach1" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.taiLieu" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.taiLieu1" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.nhanVien" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.nhanVien1" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.goiThue" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.goiThue1" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question"></i><FormattedMessage id="homeheader.hoTro" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.tieuDe1" /></div>
                            <div className='title2'><FormattedMessage id="banner.tieuDe2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type="text"
                                    value={this.state.searchQuery}
                                    onChange={this.handleSearchInputChange}
                                    placeholder="Nhập từ khóa để tìm kiếm..." />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-book-open"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.chuyenMuc6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppredux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
