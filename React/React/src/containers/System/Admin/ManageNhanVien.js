import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageNhanVien.scss'
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageNhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noiDungMarkdown: '',
            noiDungHTML: '',
            selectedOption: '',
            description: '',
            listStaff: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllStaff();
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaff !== this.props.allStaff) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaff)
            this.setState({
                listStaff: dataSelect
            })
        }
    }


    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.hoTen
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            noiDungMarkdown: html,
            noiDungHTML: text,
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDetailStaff1({
            noiDungHTML: this.state.noiDungHTML,
            noiDungMarkdown: this.state.noiDungMarkdown,
            moTa: this.state.description,
            nhanVienId: this.state.selectedOption.value
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
        // this.setState({ selectedOption }, () =>
        //     console.log(`Option selected:`, this.state.selectedOption)
        // );
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log(this.state);
        console.log('check list staff: ', this.state.listStaff);
        return (
            <div className='manage-nhanvien-container'>
                <div className='manage-nhanvien-title'>
                    Tạo thêm thông tin Nhân viên
                </div>
                <div className='more-infor'>
                    <div className='content-left'>
                        <label>Chon nhan vien</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listStaff}
                        />
                    </div>

                    <div className='content-right'>
                        <label>Thong tin gioi thieu: </label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            rows="4"
                            className='form-control'>

                        </textarea>
                    </div>
                </div>
                <div className='manage-nhanvien-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-content-nhanvien'
                >
                    Luu thong tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allStaff: state.admin.allStaff,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
        saveDetailStaff1: (data) => dispatch(actions.saveDetailStaff1(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNhanVien);
