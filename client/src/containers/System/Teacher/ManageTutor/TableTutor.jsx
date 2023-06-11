import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableTutor.scss';
import { updateBookingService } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import LoadingPage from '../../../LoadingPage/LoadingPage';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

class TableTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            totalCenter: 0
        }
    }

    componentDidMount() {
        let { dataUser } = this.props;
        this.props.fetchAllBooking(dataUser.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataBooking, dataUser } = this.props;
        if (prevProps.dataUser !== this.props.dataUser) {
            this.props.fetchAllBooking(dataUser.id);
        }
        if (prevProps.dataBooking !== dataBooking) {
            const pageCount = Math.ceil(dataBooking.length / this.state.perPage);
            this.setState({
                bookings: dataBooking,
                pageCount: pageCount
            })
        }
    }
    handleDoneBooking = async (data) => {
        let confirm = window.confirm(`Xác nhận hoàn thành lịch dạy này?`);
        if (confirm) {
            let res = await updateBookingService({ id: data.id, statusId: 'S3' });
            if (res && res.errCode === 0) {
                toast.success('Hoàn thành lịch dạy!');
                this.props.fetchAllBooking(data.teacherId);
            }
        }
    }
    handleCancelBooking = async (data) => {
        let confirm = window.confirm(`Xác nhận hủy lịch dạy này?`);
        if (confirm) {
            let res = await updateBookingService({ id: data.id, statusId: 'S4' });
            if (res && res.errCode === 0) {
                toast.success('Hủy lịch dạy thành công!');
                this.props.fetchAllBooking(data.teacherId);
            }
            console.log(res);
        }
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;
        this.setState({ currentPage: selected, offset });
    }
    render() {
        let { bookings, pageCount, perPage } = this.state;
        let { loading } = this.props;
        return (
            <>
                <div className='manage-booking-list'>
                    <table className='manage-booking-table'>
                        <thead className='table-head'>
                            <tr className='tr-head'>
                                <td>
                                    <h2 className='title-table-booking'>Danh sách lịch dạy</h2>
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Lịch dạy</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {
                                loading && loading === true ?
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th><LoadingPage /></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    :
                                    bookings && bookings.length > 0 &&
                                    bookings.slice(this.state.offset, this.state.offset + perPage).map((item, index) => {
                                        const timestamp = item.date && parseInt(item.date, 10);
                                        const date = moment(timestamp).format('DD/MM/YYYY');
                                        const timeType = item.dateTypeBookingData && item.dateTypeBookingData.value;
                                        let check = item.statusId && item.statusId;
                                        let statusValue = `${item.statusData && item.statusData.value}`;
                                        let status;
                                        if (check === 'S1') {
                                            status = <p className='wait'>{statusValue}</p>
                                        }
                                        if (check === 'S2') {
                                            status = <p className='confirm'>{statusValue}</p>
                                        }
                                        if (check === 'S3') {
                                            status = <p className='done'>{statusValue}</p>
                                        }
                                        if (check === 'S4') {
                                            status = <p className='cancel'>{statusValue}</p>
                                        }
                                        return (
                                            bookings && bookings.length > 0 &&
                                            <tr key={item.id}>
                                                <td className='course-full-with'>{item.User && `${item.User.email}`}</td>
                                                <td className='course-full-with'>{item.User && `${item.User.lastName} ${item.User.firstName}`}</td>
                                                <td>{item.User && item.User.address}</td>
                                                <td>{`${timeType}, ${date}`}</td>
                                                <td>{status}</td>
                                                <td>
                                                    <button title='Đã dạy xong' className='btn-done' onClick={() => this.handleDoneBooking(item)}>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    </button>
                                                    <button title='Hủy lịch học' className='btn-delete' onClick={() => this.handleCancelBooking(item)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                        )
                                    })}
                        </tbody>
                    </table>
                    <div className='paging'>
                        <ReactPaginate
                            previousLabel={<i className="fa-solid fa-arrow-left"></i>}
                            nextLabel={<i className="fa-solid fa-arrow-right"></i>}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName={'pageNumer'}
                        />
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        dataBooking: state.admin.allBooking,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email)),
        fetchAllBooking: (teacherId) => dispatch(actions.fetchAllBooking(teacherId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTutor);
