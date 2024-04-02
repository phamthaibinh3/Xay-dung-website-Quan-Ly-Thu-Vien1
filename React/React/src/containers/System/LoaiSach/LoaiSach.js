import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import 'react-image-lightbox/style.css';
import './LoaiSach.scss'

class LoaiSach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maLoaiSach: '',
            tenLoaiSach: '',
            moTa: '',

            allLoaiSach: '',
            editingIndex: -1,
        }
    }

    async componentDidMount() {
        this.props.fectchAllKindOfBook()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loaiSach !== this.props.loaiSach) {
            this.props.fectchAllKindOfBook()
            this.setState({
                allLoaiSach: this.props.loaiSach
            })
        }
    }

    isChange = (event,id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleCreateLoaiSach = () => {
        this.props.createKindOfBook({
            maLoaiSach: this.state.maLoaiSach,
            tenLoaiSach: this.state.tenLoaiSach,
            moTa: this.state.moTa
        });
    }

    handleDeleteKindOfBook = (item) => {
        this.props.deleteKindOfBook(item.id)
    }

    render() {
        console.log('check state: ',this.state);
        const { maLoaiSach, tenLoaiSach, editingIndex, allLoaiSach, moTa } = this.state;
        return (
            <div className="manage-folders">
                <h2 className="title">Quản lý Loại Sách</h2>
                <div className="add-folder">
                    <div>
                        <label htmlFor="categoryID">Nhập mã loại sách: </label>
                        <input
                            type="text"
                            id="categoryID"
                            className='form-control'
                            value={maLoaiSach}
                            onChange={(event) => this.isChange(event, 'maLoaiSach')}
                            placeholder="Nhập mã loại sách"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryName">Nhập tên loại sách: </label>
                        <input
                            type="text"
                            id="categoryName"
                            className='form-control'
                            value={editingIndex === -1 ? tenLoaiSach : ''}
                            onChange={(event) => this.isChange(event, 'tenLoaiSach')}
                            placeholder="Nhập tên loại sách mới"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryDescription">Nhập mô tả loại sách: </label>
                        <textarea
                            id="categoryDescription"
                            className='form-control'
                            value={moTa}
                            onChange={(event) => this.isChange(event, 'moTa')}
                            placeholder="Nhập mô tả loại sách"
                        ></textarea>
                    </div>
                    <button className="add-folder-button" onClick={() => this.handleCreateLoaiSach()}>Thêm Loại sách</button>
                </div>

                <ul className="folder-list">
                    {allLoaiSach && allLoaiSach.length > 0 &&
                        allLoaiSach.map((item, index) => {
                            return (
                                <li key={index} className="folder-item">
                                    <div className="folder-details">
                                        {editingIndex === index ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={tenLoaiSach}
                                                    onChange={(event) => this.isChange(event, 'tenLoaiSach')}
                                                />
                                                <textarea
                                                    value={moTa}
                                                    onChange={(event) => this.isChange(event, 'moTa')}
                                                ></textarea>
                                                <button className="save-btn" onClick={() => this.handleUpdateCategory(item)}>Lưu</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className='tenLoai'>{item.tenTheLoai}</span><br></br>
                                                <span className='moTa'>{item.moTa}</span>
                                            </div>
                                        )}
                                        <div className='btn'>
                                            {editingIndex !== index && <button className="edit-btn" onClick={() => this.handleEditCategory(index)}>Sửa</button>}
                                            <button className="delete-btn" onClick={() => this.handleDeleteKindOfBook(item)}>Xóa</button>
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
        loaiSach: state.admin.loaiSach
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fectchAllKindOfBook: () => dispatch(actions.fectchAllKindOfBook()),
        createKindOfBook: (data) => dispatch(actions.createKindOfBook(data)),
        deleteKindOfBook: (id) => dispatch(actions.deleteKindOfBook(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoaiSach);
