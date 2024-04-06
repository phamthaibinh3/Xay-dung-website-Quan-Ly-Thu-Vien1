import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import 'react-image-lightbox/style.css';
import './ChuyenMuc.scss'

class ChuyenMuc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allChuyenMuc: [],
            maDanhMuc: '',
            tenDanhMuc: '',
            previewImgUrl: '',
            anh: '',

            editingIndex: -1
        }
    }

    async componentDidMount() {
        this.props.fetchChuyenMucStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            this.props.fetchChuyenMucStart()
            this.setState({
                allChuyenMuc: this.props.chuyenMuc,
                
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

    handleCreateCategory = async () => {
        await this.props.createCategory({
            maDanhMuc: this.state.maDanhMuc,
            tenDanhMuc: this.state.tenDanhMuc,
            anh: this.state.anh
        })
        this.setState({
            maDanhMuc: '',
            tenDanhMuc: '',
            anh: '',
            previewImgUrl: '',
        })
    }

    handleDeleteCategory = (item) => {
        this.props.deleteCategory(item.id)
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
        this.props.updateCategory({
            id: item.id,
            tenDanhMuc: this.state.tenDanhMuc,
            anh: this.state.anh
        })
        this.setState({
            editingIndex: -1,
            tenDanhMuc: '',
            maDanhMuc: ''
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
        const { allChuyenMuc, maDanhMuc, tenDanhMuc, editingIndex } = this.state;
        return (
            <div className="manage-folders">
                <h2 className="title">Quản lý Thư mục</h2>
                <div className="add-folder">
                    <div>
                        <label htmlFor="folderName">Nhập mã danh mục: </label>
                        <input
                            type="text"
                            id="folderName"
                            className='form-control'
                            value={maDanhMuc}
                            onChange={(event) => this.isChange(event, 'maDanhMuc')}
                            placeholder="Nhập mã danh mục"
                        />
                    </div>
                    <div>
                        <label htmlFor="folderName">Nhập tên danh mục: </label>
                        <input
                            type="text"
                            id="folderName"
                            className='form-control'
                            // value={tenDanhMuc}
                            value={editingIndex === -1 ? tenDanhMuc : ''}
                            onChange={(event) => this.isChange(event, 'tenDanhMuc')}
                            placeholder="Nhập tên thư mục mới"
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='anh'>Ảnh:</label>
                        <input
                            id='anh'
                            className='form-control'
                            type='file'
                            onChange={(event) => this.handleFileChange(event)}
                        />
                    </div>
                    {this.state.previewImgUrl && (
                        <div className='input-container'>
                            <img src={editingIndex === -1 ?  this.state.previewImgUrl  : ''}  style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                    )}
                    <button className="add-folder-button" onClick={() => this.handleCreateCategory()}>Thêm Thư mục</button>
                </div>

                <ul className="folder-list">
                    {allChuyenMuc && allChuyenMuc.length > 0 &&
                        allChuyenMuc.map((item, index) => {
                            return (
                                <li key={index} className="folder-item">
                                    <div className="folder-details">
                                        {editingIndex === index ? (
                                            <div>
                                                <div>
                                                    <label htmlFor='anh'>Tên danh mục:</label>
                                                    <input
                                                        type="text"
                                                        value={tenDanhMuc}
                                                        onChange={(event) => this.isChange(event, 'tenDanhMuc')}
                                                    />
                                                    <div className='input-container py-4'>
                                                        <label htmlFor='anh'>Ảnh:</label>
                                                        <input
                                                            id='anh'
                                                            className='form-control'
                                                            type='file'
                                                            onChange={(event) => this.handleFileChange(event)}
                                                        />
                                                    </div>
                                                    {this.state.previewImgUrl && (
                                                        <div className='input-container'>
                                                            <img src={this.state.previewImgUrl} alt="Ảnh xem trước" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                                        </div>
                                                    )}
                                                </div>
                                                <button className="save-btn" onClick={() => this.handleUpdateCategory(item)}>Lưu</button>
                                            </div>
                                        ) : (
                                            <span>{item.tenDanhMuc}</span>
                                        )}
                                        <div>
                                            {editingIndex !== index && <button className="edit-btn" onClick={() => this.handleEditCategory(index)}>Sửa</button>}
                                            <button className="delete-btn" onClick={() => this.handleDeleteCategory(item)}>Xóa</button>
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
        chuyenMuc: state.admin.chuyenMuc
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart()),
        createCategory: (data) => dispatch(actions.createCategory(data)),
        deleteCategory: (data) => dispatch(actions.deleteCategory(data)),
        updateCategory: (data) => dispatch(actions.updateCategory(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChuyenMuc);
