import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2024 Phạm Thái Bình. Địa chỉ 403 Âu Cơ phường Hòa Khánh Bắc Đà Nẵng.
                    <a target='blank' href='https://www.google.com/maps/place/403+%C3%82u+C%C6%A1,+Ho%C3%A0+Kh%C3%A1nh+B%E1%BA%AFc,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng,+Vi%E1%BB%87t+Nam/@16.0738879,108.1324055,17z/data=!3m1!4b1!4m6!3m5!1s0x31421f29a45fdaa3:0xa5bf986643058934!8m2!3d16.0738828!4d108.1349804!16s%2Fg%2F11qn897d6y?hl=vi-VN&entry=ttu'>
                        Chi tiết
                    </a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
