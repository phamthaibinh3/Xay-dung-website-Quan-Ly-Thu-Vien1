import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, staffMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';

import { FormattedMessage } from 'react-intl';
import _ from 'lodash'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    handleLanguage = (language) => {
        this.props.changeLanguageAppredux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.vaiTro
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            else if (role === USER_ROLE.STAFF) {
                menu = staffMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
        console.log('check hehe: ', staffMenu);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check state: ', this.state);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span
                        className='welcome'>
                        <FormattedMessage id="homeheader.xinChao" />, {userInfo && userInfo.hoTen ? userInfo.hoTen : ''}!
                    </span>
                    <span
                        onClick={() => this.handleLanguage(LANGUAGES.VI)}
                        className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                    >
                        VN
                    </span>
                    <span
                        onClick={() => this.handleLanguage(LANGUAGES.EN)}
                        className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Đăng xuất'>
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppredux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
