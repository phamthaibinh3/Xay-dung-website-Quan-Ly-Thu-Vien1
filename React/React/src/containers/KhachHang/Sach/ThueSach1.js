import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './ThueSach1.scss';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ChiTietTLMN extends Component {
    state = {
        ngayTra: new Date(new Date().setDate(new Date().getDate() + 1)),
        book: []
    };

    async componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getBookID(id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.SachID !== this.props.SachID) {
            let id = this.props.match.params.id;
            // this.props.getBookID(id)
            this.setState({
                book: this.props.SachID
            })
        }
    }

    handleOnchangeNgayCap = (date) => {
        this.setState({
            ngayTra: moment(date[0]).format('DD/MM/YYYY'),
            book: [],
        });
    };

    handleThueSach = async () => {
        const { userInfo, match, createMuonSach } = this.props;
        const { ngayTra,book } = this.state;
        console.log('check gia: ',this.state.book.gia);
        await createMuonSach({
            idUser: userInfo.id,
            idBook: match.params.id,
            ngayTra: ngayTra,
            gia: book.gia
        });
    };

    render() {
        const yesterday = new Date(new Date().setDate(new Date().getDate() + 1));
        console.log(('check state: ', this.state.book.gia));
        return (
            <>
                <HomeHeader />
                <div className="rent-book-container">
                    <h2 className="rent-book-title">Thuê Sách</h2>
                    <form className="rent-book-form" onSubmit={this.handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="ngayTraDuKien">Ngày Trả Dự Kiến:</label>
                            <DatePicker
                                onChange={this.handleOnchangeNgayCap}
                                className="form-control"
                                value={this.state.ngayTra}
                                minDate={yesterday}
                            />
                        </div>
                        <button onClick={() => this.handleThueSach()} type='button' className="introduce-rent-click">
                            Thuê sách
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.user.userInfo,
    SachID: state.admin.idSach,
});

const mapDispatchToProps = {
    createMuonSach: actions.createMuonSach,
    getBookID: (id) => actions.getBookID(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietTLMN);
