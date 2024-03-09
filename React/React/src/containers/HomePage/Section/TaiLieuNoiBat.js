import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuNoiBat.scss';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class TaiLieuNoiBat extends Component {

    render() {

        return (
            <div className='section-share section-docNoiBat'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Tài liệu nổi bật</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-docNoiBat' />
                                <div>heheh 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuNoiBat);
