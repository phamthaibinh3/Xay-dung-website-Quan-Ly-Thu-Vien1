import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageBook.scss'
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { saveBulkScheduleStaff } from '../../../services/userService'
import ModalBook from './ModalBook';

class ManageBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataBook: [],
            isOpenModal: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllBook();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allbook !== this.props.allbook) {
            this.setState({
                dataBook: this.props.allbook
            })
        }
        
    }

    handleCreateBook = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    render() {
        let { dataBook } = this.state;
        console.log('check state: ', this.state.dataBook);
        return (
            <>
                <ModalBook
                    isOpen={this.state.isOpenModal}
                    toggleUserModal={this.toggleUserModal}
                />
                <div className='book-container'>
                    <div className='title mb-4'>Quản lý sách</div>
                    <div className='book-body'>
                        <div className='container'>
                            <div className='mx-2'>
                                <button
                                    onClick={() => this.handleCreateBook()}
                                >
                                    <i className="fas fa-plus"></i>
                                    Thêm sách
                                </button>
                            </div>
                            <div className='book-content mx-2 mt-4'>
                                <table id='TableMangeUser'>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên sách</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                        <th>Tác giả</th>
                                        <th>Hành động</th>
                                    </tr>
                                    <>
                                        {dataBook && dataBook.length > 0 &&
                                            dataBook.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.tieuDe}</td>
                                                        <td>{item.tieuDe}</td>
                                                        <td>{item.soLuong}</td>
                                                        <td>{item.gia}</td>
                                                        <td>{item.gia}</td>
                                                        <td>
                                                            <button
                                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                            <button
                                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allbook: state.admin.allbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBook: () => dispatch(actions.fetchAllBook()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
