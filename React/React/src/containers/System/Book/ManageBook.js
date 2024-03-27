import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllSBook, createBook, deleteBook, updateBook } from '../../../services/userService'
import Modalbook from './ModalBook'
import ModalEditbook from './ModalEdit'

class ManageBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrbook: [],
            isOpenModalbook: false,
            isOpenModalEidtbook: false,
            bookEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllbookFormReact();
    }

    getAllbookFormReact = async () => {
        let response = await getAllSBook();
        if (response && response.errCode === 0) {
            this.setState({
                arrbook: response.data
            })
        }
        console.log('data tu Nodejs: ', response);
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
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log('check: ', this.state.arrbook);
        let arrbook = this.state.arrbook;
        return (
            <>
                <div className='book-container'>
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
                        > <i className="fas fa-plus"></i> Thêm người dùng
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
                                <th>Hành động</th>
                            </tr>
                            {arrbook && arrbook.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.tieuDe}</td>
                                            <td>{item.tieuDe}</td>
                                            <td>{item.soLuong}</td>
                                            <td>{item.gia}</td>
                                            <td>{item.tacGia}</td>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
