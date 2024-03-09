import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Nhúng Video
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/Aj1zoxOx270"
                            title="Dự Án TVC Giới thiệu nhà sách và nhân viên Nhà sách Tiến Thọ | TVC"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>

                    </div>
                    <div className='content-right'>
                        <p>Đoạn văn này mô tả về việc sử dụng thư viện trong một dự án phần mềm. Nó giải thích cách thư viện được tích hợp và sử dụng để cung cấp các tính năng cụ thể cho ứng dụng hoặc dự án. Mô tả có thể bao gồm các thông tin về phiên bản, tác giả, mục tiêu và lợi ích của việc sử dụng thư viện. Ngoài ra, nó cũng có thể cung cấp ví dụ minh họa về cách sử dụng thư viện và các hướng dẫn cụ thể cho việc tích hợp và triển khai.</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
