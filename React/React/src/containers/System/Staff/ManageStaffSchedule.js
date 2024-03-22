import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageStaffSchedule.scss'
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { saveBulkScheduleStaff } from '../../../services/userService'

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listStaff: [],
            selectedStaff: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllStaff();
        this.props.fetchAllSchedule();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaff !== this.props.allStaff) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaff)
            this.setState({
                listStaff: dataSelect
            })
        }
        if (prevProps.allSchedule !== this.props.allSchedule) {
            let data = this.props.allSchedule;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSeleted: false }))
            }
            this.setState({
                rangeTime: data,
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

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedStaff: selectedOption })
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTim = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) { item.isSeleted = !item.isSeleted };
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedStaff, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error('Bạn bỏ lỡ thông tin ngày');
            return;
        }
        if (!selectedStaff && !_.isEmpty(selectedStaff)) {
            toast.error('Bạn bỏ lỡ thông tin nhân viên');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => item.isSeleted === true);
            if (selectTime && selectTime.length > 0) {
                selectTime.map((item, index) => {
                    let object = {};
                    object.nhanVienId = selectedStaff.value;
                    object.ngay = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Bạn chưa nhập thông tin thời gian');
                return;
            }
        }

        let res = await saveBulkScheduleStaff({
            arrSchedule: result,
            nhanVienId: selectedStaff.value,
            formatedDate: formatedDate
        })
        console.log('check res ',res);
        console.log('hehajshdjashdja: ', result);
    }

    render() {
        console.log('check state: ', this.state);
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.tieuDe" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Chọn nhân viên</label>
                            <Select
                                value={this.state.selectedStaff}
                                onChange={this.handleChangeSelect}
                                options={this.state.listStaff}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            onClick={() => this.handleClickBtnTim(item)}
                                            className={item.isSeleted === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                            }
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-primary'>
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allStaff: state.admin.allStaff,
        language: state.app.language,
        allSchedule: state.admin.allSchedule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
        fetchAllSchedule: () => dispatch(actions.fetchAllSchedule())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
