import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import * as actions from '../../../store/actions'
import { getBookNew } from '../../../services/bookService'

class ThueSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPhieuMuon: []
        }
    }

    async componentDidMount() {
        this.props.getPhieuMuon()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.phieuMuon !== this.props.phieuMuon) {
            this.props.getPhieuMuon()
            this.setState({
                allPhieuMuon: this.props.phieuMuon
            })
        }
    }

    handleDuyetPhieuMuon = async (item) => {
        // console.log('check: ', item);
        await this.props.duyetMuonSach({
            id: item.id,
            maSach: item.maSach
        });
    }

    handleHuyPhieuMuon = async (item) => {
        await this.props.huyMuonSach({ id: item.id })
    }

    render() {
        let { allPhieuMuon } = this.state;
        return (
            <>
                <div className="contener">
                    <div className="header-page">Thuê sách</div>
                    {/* <div className="btn-addbook">

                    </div> */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>người Dùng</th>
                                    <th>Mã sách</th>
                                    <th>Ngày mượn</th>
                                    <th>Tình trạng</th>
                                    <th>Ngày dự kiến trả</th>
                                    <th>Hàng động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPhieuMuon && allPhieuMuon.length > 0 &&
                                    allPhieuMuon.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {item.maNguoiDung}
                                                </td>
                                                <td>{item.maSach}</td>
                                                <td>{item.ngayMuon}</td>
                                                <td>{item.tinhTrang}</td>
                                                <td>{item.ngayTraDuKien}</td>
                                                <td>
                                                    <div className="icon-product">
                                                        <button onClick={() => this.handleDuyetPhieuMuon(item)} className='btn-delete'><i className="fas fa-check"></i></button>
                                                        <button onClick={() => this.handleHuyPhieuMuon(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
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
        phieuMuon: state.admin.phieuMuon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPhieuMuon: () => dispatch(actions.getPhieuMuon()),
        duyetMuonSach: (data) => dispatch(actions.duyetMuonSach(data)),
        huyMuonSach: (data) => dispatch(actions.huyMuonSach(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThueSach);
