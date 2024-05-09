import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import * as actions from '../../../store/actions'
import { layTraSach } from '../../../services/userService'

class TraSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTraSach: [],
        }
    }

    async componentDidMount() {
        this.props.layTraThueSach();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.traSach !== this.props.traSach) {
            // this.props.layTraThueSach()
            this.setState({
                allTraSach: this.props.traSach
            })
        }
    }

    handleDuyetPhieuMuon = async (item) => {
        // console.log('check: ', item);
        await this.props.duyetMuonSach({
            idPhieuMuon: item.id,
            maSach: item.maSach,
            idNhanVien: this.props.userInfo.id
        });
    }

    handleHuyPhieuMuon = async (item) => {
        await this.props.huyMuonSach({ id: item.id })
    }

    handleTraSach = async (item) => {
        console.log('check id: ', item.id);
        console.log('check idSach: ', item.id);
        await this.props.traThueSach({
            idSach: item.maSach,
            id: item.id,
        });
    }

    render() {
        let { allTraSach } = this.state;
        // console.log('check id nguoi dung: ', this.props.userInfo.id)
        console.log('check state: ',this.state);
        return (
            <>
                <div className="contener">
                    <div className="header-page">Quản lý trả sách</div>
                    {/* <div className="btn-addbook">

                    </div> */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã phiếu mượn</th>
                                    <th>Mã người dùng</th>
                                    <th>Mã sách</th>
                                    <th>Ngày trả</th>
                                    <th>Số tiền phạt</th>
                                    {/* <th>Hàng động</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {allTraSach && allTraSach.length > 0 &&
                                    allTraSach.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {item.maPhieuMuon}
                                                </td>
                                                <td>{item.phieuMuon.maNguoiDung}</td>
                                                <td>{item.phieuMuon.maSach}</td>
                                                <td>{item.ngayTra}</td>
                                                <td>{item.soTienPhat}</td>
                                                
                                                {/* <td>
                                                    <div className="icon-product">
                                                        <button onClick={() => this.handleDuyetPhieuMuon(item)} className='btn-delete'><i className="fas fa-check"></i></button>
                                                        <button onClick={() => this.handleHuyPhieuMuon(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
                                                        <button onClick={() => this.handleTraSach(item)} className='btn-delete'><i className="fas fa-arrow-alt-circle-left"></i></button> 
                                                    </div>
                                                </td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        traSach: state.admin.traSach,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getPhieuMuon: () => dispatch(actions.getPhieuMuon()),
        // duyetMuonSach: (data) => dispatch(actions.duyetMuonSach(data)),
        // huyMuonSach: (data) => dispatch(actions.huyMuonSach(data)),
        // traThueSach: (data) => dispatch(actions.traThueSach(data))
        layTraThueSach: () => dispatch(actions.layTraThueSach())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraSach);
