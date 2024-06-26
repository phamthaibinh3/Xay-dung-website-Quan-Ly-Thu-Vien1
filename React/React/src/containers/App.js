import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage'
import CustomScrollbars from '../components/CustomScrollbars.js'

import DetailStaff from './KhachHang/NhanVien/DetailStaff.js'
import Staff from '../routes/Staff.js';
import ChiTietLoaiSach from './System/LoaiSach/ChiTietLoaiSach.js';
import ChiTietTLMN from './KhachHang/Sach/ChiTietTLMN.js';
import ChiTietTLNB from './KhachHang/Sach/ChiTietTLNB.js';
import ThueSach from './KhachHang/Sach/ThueSach.js';
import ThueSach1 from './KhachHang/Sach/ThueSach1.js';
import AllTLNB from './HomePage/Section/AllTLNB.js';
import AllTMN from './HomePage/Section/AllTMN.js';
import QuenMatKhau from './Auth/QuenMatKhau.js';
class App extends Component {

    // handlePersistorState = () => {
    //     const { persistor } = this.props;
    //     let { bootstrapped } = persistor.getState();
    //     if (bootstrapped) {
    //         if (this.props.onBeforeLift) {
    //             Promise.resolve(this.props.onBeforeLift())
    //                 .then(() => this.setState({ bootstrapped: true }))
    //                 .catch(() => this.setState({ bootstrapped: true }));
    //         } else {
    //             this.setState({ bootstrapped: true });
    //         }
    //     }
    // };

    componentDidMount() {
        // this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/staff/'} component={userIsAuthenticated(Staff)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_STAFF} component={DetailStaff} />
                                    <Route path={path.DETAIL_BOOK_TLMN} component={ChiTietTLMN} />
                                    <Route path={path.DETAIL_KIND_OF_BOOK_ADMIN} component={ChiTietLoaiSach} />
                                    <Route path={path.DETAIL_BOOK_TLNB} component={ChiTietTLNB} />
                                    <Route path={path.GIO_HANG} component={ThueSach} />
                                    <Route path={path.THUE_SACH} component={ThueSach1} />
                                    <Route path={path.ALL_TLNB} component={AllTLNB} />
                                    <Route path={path.ALL_TLMN} component={AllTMN} />
                                    <Route path={path.QUEN_MAT_KHAU} component={QuenMatKhau} />

                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);