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
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailStaff } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageNhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noiDungMarkdown: '',
            noiDungHTML: '',
            selectedOption: '',
            moTa: '',
            listStaff: [],
            hasOldData: false
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
            noiDungMarkdown: text,
            noiDungHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailStaff1({
            noiDungHTML: this.state.noiDungHTML,
            noiDungMarkdown: this.state.noiDungMarkdown,
            moTa: this.state.moTa,
            nhanVienId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })

        let res = await getDetailStaff(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                noiDungHTML: markdown.noiDungHTML,
                noiDungMarkdown: markdown.noiDungMarkdown,
                moTa: markdown.moTa,
                hasOldData: true
            })
        } else {
            this.setState({
                noiDungHTML: '',
                noiDungMarkdown: '',
                moTa: '',
                hasOldData: false
            })
        }
        console.log('check cho vui: ', res);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            moTa: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
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
                            onChange={this.handleChangeSelect}
                            options={this.state.listStaff}
                        />
                    </div>

                    <div className='content-right'>
                        <label>Thong tin gioi thieu: </label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.moTa}
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
                        value={this.state.noiDungMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-nhanvien' : 'create-content-nhanvien'}
                >
                    {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div >
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
