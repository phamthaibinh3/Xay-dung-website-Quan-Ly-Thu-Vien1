import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import 'react-image-lightbox/style.css';
import './NhaXuatBan.scss'

class NhaXuatBan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNXB: [],
            id: '',
            tenNXB: '',
            diaChi: '',
            SDT: '',

            editingIndex: -1
        }
    }

    async componentDidMount() {
        this.props.getNXB()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nhaXB !== this.props.nhaXB) {
            // this.props.getNXB()
            this.setState({
                allNXB: this.props.nhaXB,

            })
        }
    }

    isChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleCreateNhaXuatBan = async () => {
        await this.props.createNXB({
            tenNXB: this.state.tenNXB,
            diaChi: this.state.diaChi,
            SDT: this.state.SDT,
        })
        this.setState({
            tenNXB: '',
        })
    }

    handleDeleteNXB = (item) => {
        this.props.deleteNXB(item.id)
        this.setState({
            editingIndex: -1,
        })
    }


    handleEditCategory = (index) => {
        this.setState({
            editingIndex: index
        })
    }

    handleUpdateCategory = (item) => {
        this.props.updateNXB({
            id: item.id,
            tenNXB: this.state.tenNXB,
        })
        this.setState({
            editingIndex: -1,
            tenNXB: '',
        })
    }
    handleDongSua = (item) => {
        this.setState({
            editingIndex: -1,
        })
    }

    handleFileChange = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                anh: base64
            })

        }
    }

    render() {
        const { allNXB, diaChi,SDT , tenNXB, editingIndex } = this.state;
        console.log('check state: ',this.state);
        return (
            <div className="manage-folders">
                <h2 className="title">Quản lý nhà xuất bản</h2>
                <div className="add-folder">
                    <div>
                        <label htmlFor="folderName">Nhập tên nhà xuất bản: </label>
                        <input
                            type="text"
                            id="folderName"
                            className='form-control'
                            // value={tenDanhMuc}
                            value={editingIndex === -1 ? tenNXB : ''}
                            onChange={(event) => this.isChange(event, 'tenNXB')}
                            placeholder="Nhập tên thư mục mới"
                        />
                    </div>
                    <div>
                        <label htmlFor="folderName">Nhập tên nhà xuất bản: </label>
                        <input
                            type="text"
                            id="folderName"
                            className='form-control'
                            // value={tenDanhMuc}
                            value={diaChi}
                            onChange={(event) => this.isChange(event, 'diaChi')}
                            placeholder="Nhập tên thư mục mới"
                        />
                    </div>
                    <div>
                        <label htmlFor="folderName">Nhập số điện thoại nhà xuất bản: </label>
                        <input
                            type="number"
                            id="folderName"
                            className='form-control'
                            // value={tenDanhMuc}
                            value={SDT}
                            onChange={(event) => this.isChange(event, 'SDT')}
                            placeholder="Nhập địa chỉ nhà xuất bản"
                        />
                    </div>
                    <button className="add-folder-button" onClick={() => this.handleCreateNhaXuatBan()}>Thêm nhà xuất bản</button>
                </div>

                <ul className="folder-list">
                    {allNXB && allNXB.length > 0 &&
                        allNXB.map((item, index) => {
                            return (
                                <li key={index} className="folder-item">
                                    <div className="folder-details">
                                        {editingIndex === index ? (
                                            <div>
                                                <div>
                                                    <label htmlFor='anh'>Tên nhà xuất bản:</label>
                                                    <input
                                                        type="text"
                                                        value={tenNXB}
                                                        onChange={(event) => this.isChange(event, 'tenNXB')}
                                                    />
                                                </div>
                                                <button className="save-btn" onClick={() => this.handleDongSua(item)}>Đóng</button>
                                                <button className="save-btn" onClick={() => this.handleUpdateCategory(item)}>Lưu</button>
                                            </div>
                                        ) : (
                                            <span>{item.tenNXB}</span>
                                        )}
                                        <div>
                                            {editingIndex !== index && <button className="edit-btn" onClick={() => this.handleEditCategory(index)}>Sửa</button>}
                                            <button className="delete-btn" onClick={() => this.handleDeleteNXB(item)}>Xóa</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        nhaXB: state.admin.nhaXB
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNXB: () => dispatch(actions.getNXB()),
        createNXB: (data) => dispatch(actions.createNXB(data)),
        deleteNXB: (data) => dispatch(actions.deleteNXB(data)),
        updateNXB: (data) => dispatch(actions.updateNXB(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NhaXuatBan);
