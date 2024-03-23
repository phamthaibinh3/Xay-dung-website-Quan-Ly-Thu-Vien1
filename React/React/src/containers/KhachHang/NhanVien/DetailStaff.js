import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailStaff.scss'
import { getDetailStaff } from '../../../services/userService'
import StaffSchedule from './StaffSchedule'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageNhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailStaff: {},
            currentStaffId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentStaffId: id
            })
            let response = await getDetailStaff(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailStaff: response.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        console.log('check state: ', this.state);
        let { detailStaff } = this.state;
        let hoTen
        if (detailStaff && detailStaff.vaiTroData) {
            hoTen = detailStaff.hoTen
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='staff-detail-container'>
                    <div className='intro-staff'>
                        <div
                            style={{ backgroundImage: `url(${detailStaff.anh ? detailStaff.anh : ''})` }}
                            className='content-left'>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {hoTen}
                            </div>
                            <div className='down'>
                                {detailStaff.Markdown && detailStaff.Markdown.moTa &&
                                    <span>
                                        {detailStaff.Markdown.moTa}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-staff'>
                        <div className='content-left'>
                            <StaffSchedule
                                staffIdFromCustomer={this.state.currentStaffId}
                            />
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>
                    <div className='detail-infor-staff'>
                        {detailStaff && detailStaff.Markdown && detailStaff.Markdown.noiDungHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailStaff.Markdown.noiDungHTML }}></div>
                        }

                    </div>
                    <div className='comment-staff'>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageNhanVien);
