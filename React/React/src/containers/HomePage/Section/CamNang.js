import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CamNang.scss';
import { allSach } from '../../../services/userService';

class CamNang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBook: []
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            await this.fetchData();
        }
    }

    async fetchData() {
        try {
            const res = await allSach();
            if (res && res.data) {
                this.setState({ allBook: res.data });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const { allBook } = this.state;
        console.log('Current search query:', this.props.searchQuery);
        const filteredBooks = allBook.filter(allBook => allBook.tieuDe.toLowerCase().includes(this.props.searchQuery.toLowerCase()));
        return (
            <div className='section-share section-camNang'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <div className="product-grid">
                            {filteredBooks.map((item, index) => {
                                let imageBase64 = '';
                                if (item.anh) {
                                    imageBase64 = new Buffer(item.anh, 'base64').toString('binary');
                                }
                                return (
                                    <div className="product" key={index}>
                                        {imageBase64 && <img onClick={() => this.handleDetailBook(item)} className="product-img" src={imageBase64} alt="" />}
                                        <h2>{item.tieuDe}</h2>
                                        <p>{item.moTa}</p>
                                        <p>{item.gia}</p>
                                    </div>
                                );
                            })}
                        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CamNang);
