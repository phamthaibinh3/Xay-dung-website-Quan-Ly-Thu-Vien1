import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import * as actions from '../../../store/actions'
import { getThanhToan, layTraSach } from '../../../services/userService'

class HoaDon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPhieuMuon: [],
            searchQuery: ''
        }
    }

    async componentDidMount() {
        // this.props.getPhieuMuon();
        let res = await getThanhToan()
        console.log('check res: ', res);
        if (res && res.errCode === 0) {
            this.setState({
                allPhieuMuon: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.phieuMuon !== this.props.phieuMuon) {
        //     this.props.getPhieuMuon()
        //     this.setState({
        //         allPhieuMuon: this.props.phieuMuon
        //     })
        // }
        let res = await getThanhToan();
        if (res && res === 0) {
            this.setState({
                allPhieuMuon: res.data
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
        await this.props.traHoaDon({
            idSach: item.maSach,
            id: item.id,
        });
    }

    handleSearchInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value // Cập nhật trạng thái searchQuery
        });
    };

    render() {
        let { allPhieuMuon } = this.state;
        console.log('check state: ', allPhieuMuon)
        // const filteredBooks = allPhieuMuon.filter(arrbook => arrbook.ngayMuon.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
        return (
            <>
                <div className="contener">
                    <div className="header-page">Thuê sách</div>
                    {/* <div className="btn-addbook">

                    </div> */}
                    <div className="table-container">
                        <input
                            type="text"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchInputChange}
                            placeholder="Nhập từ khóa để tìm kiếm..."
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>người mượn</th>
                                    <th>Mã sách</th>
                                    <th>Tình trạng</th>
                                    {/* <th>Số tiền phạt</th> */}
                                    <th>Hàng động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPhieuMuon && allPhieuMuon.length > 0 &&
                                    allPhieuMuon.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {item.NguoiDung.hoTen}
                                                </td>
                                                <td>{item.Sach.tenSach}</td>
                                                <td>{item.gia}VND</td>
                                                <td>
                                                    <div className="icon-product">
                                                        <button onClick={() => this.handleDuyetPhieuMuon(item)} className='btn-delete'><i className="fas fa-check"></i></button>
                                                        <button onClick={() => this.handleHuyPhieuMuon(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
                                                        <button onClick={() => this.handleTraSach(item)} className='btn-delete'><i className="fas fa-arrow-alt-circle-left"></i></button> {/* Nút trả sách */}
                                                    </div>
                                                </td>
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
        phieuMuon: state.admin.phieuMuon,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getPhieuMuon: () => dispatch(actions.getPhieuMuon()),
        // duyetMuonSach: (data) => dispatch(actions.duyetMuonSach(data)),
        // huyMuonSach: (data) => dispatch(actions.huyMuonSach(data)),
        // traHoaDon: (data) => dispatch(actions.traHoaDon(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoaDon);
