import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageNhanVien from '../containers/System/Admin/ManageNhanVien';
import ManageBook from '../containers/System/Book/ManageBook';
import ChuyenMuc from '../containers/System/ChuyenMuc/ChuyenMuc';
import LoaiSach from '../containers/System/LoaiSach/LoaiSach';
import TaiLieuMoiNhat from '../containers/System/TaiLieuMoiNhat/TaiLieuMoiNhat';
import TaiLieuNoiBat from '../containers/System/TaiLieuMoiNhat/TaiLieuNoiBat';
import NhaXuatBan from '../containers/System/NhaXuatBan/NhaXuatBan';
import ThueSach from '../containers/System/ThueSach/ThueSach';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-nhanvien" component={ManageNhanVien} />
                            <Route path="/system/quan-ly-sach" component={ManageBook}/>
                            <Route path="/system/quan-ly-chuyen-muc" component={ChuyenMuc}/>
                            <Route path="/system/quan-ly-loai-sach" component={LoaiSach}/>
                            <Route path="/system/quan-ly-tai-lieu-moi" component={TaiLieuMoiNhat}/>
                            <Route path="/system/quan-ly-tai-lieu-noi-bat" component={TaiLieuNoiBat}/>
                            <Route path="/system/quan-ly-tai-nha-xuat-ban" component={NhaXuatBan}/>
                            <Route path="/system/quan-ly-thue-sach" component={ThueSach}/>
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
