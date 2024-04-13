import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuMoiNhat.scss';
import { FormattedMessage } from 'react-intl';
import { getBookNew } from '../../../services/bookService';
import { withRouter } from 'react-router'

import Slider from 'react-slick'


class TaiLieuMoiNhat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBook: [],
        }
    }

    async componentDidUpdate() {
        let res = await getBookNew('');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    handleDetailBook = (item) => {
        // alert('check hehe: '+item.id)
        this.props.history.push(`/chi-tiet-tai-lieu-moi-nhat/${item.id}`)
    }

    render() {
        let { arrBook } = this.state;
        // console.log('check state11: ', this.state.arrBook);
        return (
            <div className='section-share section-docNew'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Tài liệu mới</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrBook && arrBook.length > 0 &&
                                arrBook.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anh) {
                                        imageBase64 = new Buffer(item.anh, 'base64').toString('binary')
                                    }
                                    return (
                                        <div onClick={() => this.handleDetailBook(item)} className='section-customize'>
                                            <div className='bg-image section-docNew'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                            <div className='a'>{item.tieuDe}</div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='section-customize'>
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
                            </div> */}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaiLieuMoiNhat));
