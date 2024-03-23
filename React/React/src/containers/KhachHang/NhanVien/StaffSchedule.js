import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import HomeHeader from '../../HomePage/HomeHeader';
import './StaffSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleStaffByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';


class ManageNhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalabelTime: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.language !== prevProps.language)) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.staffIdFromCustomer !== prevProps.staffIdFromCustomer) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleStaffByDate(this.props.staffIdFromCustomer, allDays[0].value);
            this.setState({
                allAvalabelTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (event) => {
        console.log(event.target.value);
        if (this.props.staffIdFromCustomer && this.props.staffIdFromCustomer !== -1) {
            let nhanVienId = this.props.staffIdFromCustomer;
            let ngay = event.target.value
            let res = await getScheduleStaffByDate(nhanVienId, ngay);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalabelTime: res.data
                })
            }
        }
    }

    render() {
        let { allDays, allAvalabelTime } = this.state;
        let { language } = this.props
        console.log('check state: ', this.state.allAvalabelTime);
        return (
            <>
                <div className='staff-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Lịch làm</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalabelTime && allAvalabelTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvalabelTime.map((item, index) => {
                                            let lable = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index}>{lable}</button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            Chọn <i className='far fa-hand-point-up'></i> và (miễn phí)
                                        </span>
                                    </div>
                                </>
                                :
                                <div>Chưa có lịch</div>
                            }
                        </div>
                    </div>
                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNhanVien);
