import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiLieuNoiBat.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router'
import { getTaiLieuNoiBat } from '../../../services/userService'


class TaiLieuNoiBat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            arrBook: [],
        }
    }

    async componentDidMount(){
        let res = await getTaiLieuNoiBat('');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    async componentDidUpdate() {
        let res = await getTaiLieuNoiBat('');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    handleDetailTLNB = async(item) => {
        this.props.history.push(`/chi-tiet-tai-lieu-noi-bat/${item.id}`)
    }

    handleXemThemTLMN = () => {
        this.props.history.push(`/all-TLNB`)
    }

    render() {
        let { arrBook } = this.state;
        return (
            <div className='section-share section-docNoiBat'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Tài liệu nổi bật</span>
                        <button onClick={() => this.handleXemThemTLMN()} className='btn-section'>Xem thêm</button>
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
                                        <div onClick={() => this.handleDetailTLNB(item)} className='section-customize'>
                                            <div className='bg-image section-docNew'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                            <div className='a'>{item.tieuDe}</div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='section-customize'>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaiLieuNoiBat));
