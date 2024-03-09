import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuMoiNhat.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick'


class TaiLieuMoiNhat extends Component {

    render() {

        return (
            <div className='section-share section-docNew'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Tài liệu mới</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNew' />
                                <div>huhu 6</div>
                            </div>

                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuMoiNhat);
