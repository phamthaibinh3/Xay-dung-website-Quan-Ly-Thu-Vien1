import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllSBook, createBook, deleteBook, updateBook } from '../../../services/userService'
import Modalbook from './ModalBook'
import { CommonUtils } from '../../../utils'
import ModalEditbook from './ModalEdit'
import { toast } from "react-toastify";
import * as actions from '../../../store/actions'

import './ManageBook.scss'

class ManageBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrbook: [],
            isOpenModalbook: false,
            isOpenModalEidtbook: false,
            bookEdit: {},

            allChuyenMuc: '',
            searchQuery: ''
        }
    }

    async componentDidMount() {
        await this.getAllbookFormReact();
        this.props.fetchChuyenMucStart();
    }

    getAllbookFormReact = async () => {
        let response = await getAllSBook();
        console.log('ehhe: ', response);
        if (response && response.errCode === 0) {
            this.setState({
                arrbook: response.data
            })
        }
        console.log('data tu Nodejs: ', response);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chuyenMuc !== this.props.chuyenMuc) {
            this.setState({
                allChuyenMuc: this.props.chuyenMuc

            })
        }
        // await this.getAllbookFormReact();
    }

    handleAddNewbook = () => {
        this.setState({
            isOpenModalbook: true
        })
    }

    togglebookModal = () => {
        this.setState({
            isOpenModalbook: !this.state.isOpenModalbook
        })
    }

    togglebookEditModal = () => {
        this.setState({
            isOpenModalEidtbook: !this.state.isOpenModalEidtbook
        })
    }

    createbook = async (data) => {
        try {

            let response = await createBook(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)

            } else {
                await this.getAllbookFormReact();
                this.setState({
                    isOpenModalbook: false
                })
                toast.success('Thêm sách thành công');
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeletebook = async (book) => {
        try {
            let res = await deleteBook(book.id);
            if (res && res.errCode === 0) {
                this.getAllbookFormReact();
                this.setState({

                })
                toast.success('Xóa sách thành công');
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditbook = async (book) => {
        this.setState({
            isOpenModalEidtbook: true,
            bookEdit: book
        })
    }

    doEditbook = async (book) => {
        try {
            let res = await updateBook(book);
            if (res && res.errCode === 0) {
                await this.getAllbookFormReact();
                this.setState({
                    isOpenModalEidtbook: false
                })
                toast.success('Cập nhập thành công');
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleSearchInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value // Cập nhật trạng thái searchQuery
        });
    };

    render() {
        let arrbook = this.state.arrbook;
        const filteredBooks = arrbook.filter(arrbook => arrbook.tieuDe.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
        return (
            <>
                {/* <div className='book-container'>
                    <Modalbook
                        isOpen={this.state.isOpenModalbook}
                        togglebookModal={this.togglebookModal}
                        createbook={this.createbook}
                    />
                    {this.state.isOpenModalEidtbook &&
                        <ModalEditbook
                            isOpen={this.state.isOpenModalEidtbook}
                            togglebookModal={this.togglebookEditModal}
                            bookEdit={this.state.bookEdit}
                            editbook={this.doEditbook}
                        />
                    }
                    <div className='title mt-3'>Danh sách Sách</div>
                    <div className="mx-3">
                        <button
                            onClick={() => this.handleAddNewbook()}
                            className='btn btn-primary px-2'
                        > <i className="fas fa-plus"></i> Thêm sách
                        </button>
                    </div>
                    <div className='book-content mt-4 mx-3'>
                        <table id="customers">
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên sách</th>
                                <th>số lượng</th>
                                <th>giá</th>
                                <th>Tác giả</th>
                                <th>Danh mục</th>
                                <th>Loại sách</th>
                                <th>Hành động</th>
                            </tr>
                            {arrbook && arrbook.map((item, index) => {
                                let imageBase64 = '';
                                if (item.anh) {
                                    imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                }
                                console.log('check anh: ', imageBase64);
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>
                                                <div
                                                    className='book-image'
                                                    style={{ backgroundImage: `url(${imageBase64})`,width:'100px',height:'200px' }}
                                                ></div>
                                            </td>
                                            <td>{item.tieuDe}</td>
                                            <td>{item.soLuong}</td>
                                            <td>{item.gia}</td>
                                            <td>{item.tacGia}</td>
                                            <td>{item.maDanhMuc}</td>
                                            <td>{item.maLoaiSach}</td>
                                            <td>
                                                <button onClick={() => this.handleEditbook(item)} className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button onClick={() => this.handleDeletebook(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}

                        </table>
                    </div>
                </div> */}
                <Modalbook
                    isOpen={this.state.isOpenModalbook}
                    togglebookModal={this.togglebookModal}
                    createbook={this.createbook}
                />
                {this.state.isOpenModalEidtbook &&
                    <ModalEditbook
                        isOpen={this.state.isOpenModalEidtbook}
                        togglebookModal={this.togglebookEditModal}
                        bookEdit={this.state.bookEdit}
                        editbook={this.doEditbook}
                    />
                }
                <div className="contener">
                    <div className="header-page">KHO SÁCH MIỄN PHÍ</div>
                    <div className="btn-addbook">
                        <button
                            onClick={() => this.handleAddNewbook()}
                            className='btn btn-primary px-2'
                        > <i className="fas fa-plus"></i> Thêm sách
                        </button>
                    </div>
                    <input
                        type="text"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchInputChange}
                        placeholder="Nhập từ khóa để tìm kiếm..."
                    />
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên Sách</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                    <th>Tác Giả</th>
                                    <th>Danh Mục</th>
                                    <th>Loại sách</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {filteredBooks && filteredBooks.length > 0 &&
                                    filteredBooks.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.anh) {
                                            imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {imageBase64 && <img className="product-img" src={imageBase64} alt="" />}
                                                </td>
                                                <td>{item.tieuDe}</td>
                                                <td>{item.soLuong}</td>
                                                <td>{item.gia}</td>
                                                <td>{item.tacGia}</td>
                                                <td>{item.maDanhMuc}</td>
                                                <td>{item.maLoaiSach}</td>
                                                <td>
                                                    <div className="icon-product">
                                                        <button onClick={() => this.handleEditbook(item)} className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                        <button onClick={() => this.handleDeletebook(item)} className='btn-delete'><i className="fas fa-trash"></i></button>
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
        chuyenMuc: state.admin.chuyenMuc,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChuyenMucStart: () => dispatch(actions.fetchChuyenMucStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
