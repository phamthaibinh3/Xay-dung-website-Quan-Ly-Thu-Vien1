import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import * as actions from '../../../store/actions'
import './ChiTietLoaiSach.scss'
import { getLoaiSachId } from '../../../services/kindOfBook'

class ChiTietLoaiSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idLoaiSach: [],
            isEditing: false,
            tenTheLoai: "",
            moTa: ""
        }
    }

    async componentDidMount() {
        let res = await getLoaiSachId(this.props.match.params.id);
        if (res && res.errCode === 0) {
            this.setState({
                idLoaiSach: res.data
            })
        }
    }

    async componentDidUpdate(){
        let res = await getLoaiSachId(this.props.match.params.id);
        if (res && res.errCode === 0) {
            this.setState({
                idLoaiSach: res.data
            })
        }
    }

    handleDeleteLoaiSach = (id) => {
        this.props.deleteKindOfBook(id);
        this.props.history.push(`/system/quan-ly-loai-sach`)
    }

    handleRollBack = () => {
        this.props.history.push(`/system/quan-ly-loai-sach`)
    }

    handleEditToggle = () => {
        const { idLoaiSach } = this.state;
        this.setState({
            isEditing: true,
            tenTheLoai: idLoaiSach.tenTheLoai,
            moTa: idLoaiSach.moTa
        });
    }

    handleSaveChanges = () => {
        this.props.updateKindOfBook({
            id: this.state.idLoaiSach.id,
            tenLoaiSach: this.state.tenTheLoai,
            moTa: this.state.moTa
        })

        this.setState({ isEditing: false });
    }

    handleCancelEdit = () => {
        this.setState({ isEditing: false });
    }

    render() {
        // this.props.match.params.id
        let { idLoaiSach, isEditing, tenTheLoai, moTa } = this.state;
        return (
            <>
                <Header />
                <div className="kind-of-book-detail">
                    <h2 className="title">Chi tiết Loại Sách</h2>
                    <div className="detail-item">
                        <span className="label">Mã loại sách:</span>
                        <span className="value">{idLoaiSach.id}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Tên loại sách:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={tenTheLoai}
                                onChange={(e) => this.setState({ tenTheLoai: e.target.value })}
                                className="input-field"
                                id="tenTheLoai"
                            />
                        ) : (
                            <span className="value">{idLoaiSach.tenTheLoai}</span>
                        )}
                    </div>
                    <div className="detail-item">
                        <span className="label">Mô tả:</span>
                        {isEditing ? (
                            <textarea
                                value={moTa}
                                onChange={(e) => this.setState({ moTa: e.target.value })}
                                className="input-field"
                                id="moTa"
                            />
                        ) : (
                            <span className="value">{idLoaiSach.moTa}</span>
                        )}
                    </div>
                    <div className="button-group">
                        {isEditing ? (
                            <div className="button-group">
                                <button className="save-btn" onClick={this.handleSaveChanges}>Lưu</button>
                                <button className="cancel-btn" onClick={this.handleCancelEdit}>Hủy</button>
                            </div>
                        ) : (
                            <div className="button-group">
                                    <button className="back-btn" onClick={this.handleRollBack}>Quay lại</button>
                                <button className="edit-btn" onClick={this.handleEditToggle}>Chỉnh sửa</button>
                                <button className="delete-btn" onClick={() => this.handleDeleteLoaiSach(idLoaiSach.id)}>Xóa</button>
                            </div>
                        )}
                    </div>

                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteKindOfBook: (id) => dispatch(actions.deleteKindOfBook(id)),
        updateKindOfBook: (data) => dispatch(actions.updateKindOfBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietLoaiSach);
