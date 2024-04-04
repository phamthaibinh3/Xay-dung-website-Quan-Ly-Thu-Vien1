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
                allChuyenMuc: this.props.chuyenMuc
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
        })
        this.setState({
            maDanhMuc: '',
            tenDanhMuc: ''
        })
    }

    handleDeleteCategory = (item) => {
        this.props.deleteCategory(item.id)
    }


    handleEditCategory = (index) => {
        this.setState({
            editingIndex: index
        })
    }

    handleUpdateCategory = (item) => {
        this.props.updateCategory({
            id: item.id,
            tenDanhMuc: this.state.tenDanhMuc
        })
        this.setState({
            editingIndex: -1,
            tenDanhMuc: '',
            maDanhMuc: ''
        })
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
                                                <input
                                                    type="text"
                                                    value={tenDanhMuc}
                                                    onChange={(event) => this.isChange(event, 'tenDanhMuc')}
                                                />
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