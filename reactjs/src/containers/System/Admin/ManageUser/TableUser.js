import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import moment from 'moment';
import LoadingPage from '../../../LoadingPage/LoadingPage';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

class TableUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            offset: 0, // Vị trí bắt đầu của trang hiện tại
            perPage: 8, // Số phần tử trên một trang
            currentPage: 0, // Trang hiện tại
            pageCount: 0,
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux("ALL");
    }
    componentDidUpdate(prevProps, prevState) {
        let { listUsers } = this.props;
        if (prevProps.listUsers !== listUsers) {
            const pageCount = Math.ceil(listUsers.length / this.state.perPage)
            this.setState({
                users: this.props.listUsers,
                pageCount: pageCount
            })
        }
    }
    handleDeleteUser = (user) => {
        let confirm = window.confirm(`Bạn có chắc muốn xóa người dùng ${user.email}?`);
        if (confirm) {
            this.props.deleteUserRedux(user.id);
        }
        else {
            return;
        }
    }
    handleEditUser = (data) => {
        this.props.showEditUser();
        this.props.currentUser(data);
    }
    clickAddUser = () => {
        this.props.addNewUser();
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;

        this.setState({ currentPage: selected, offset });
    }
    timeOutUser = () => {
        let { users } = this.state;
        if (users && users.length > 0) {
            return;
        }
        else {
            this.props.addNewUser();
            toast.error('Không có dữ liệu về người dùng!');
            return;
        }
    }
    render() {
        let { users, pageCount, perPage } = this.state;
        return (
            <>
                {
                    users && users.length > 0 ?
                        <>
                            <table className='manage-user-table'>
                                <thead className='table-head'>
                                    <tr className='tr-add-user'>
                                        <td>
                                            <button title='Thêm tài khoản' className='btn-add-user'
                                                onClick={() => this.clickAddUser()}>
                                                <i className="fa-solid fa-user-plus"></i>
                                            </button>
                                        </td>
                                        <td className='search-user'>
                                            <input type='search' placeholder='Tìm kiếm' />
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Địa chỉ</th>
                                        <th>Quyền</th>
                                        <th>Ngày tham gia</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {users && users.length > 0 &&
                                        users.slice(this.state.offset, this.state.offset + perPage).map((item, index) => {
                                            let day = moment(item.createdAt).format('Do/MM/YYYY, HH:mm:ss');
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.lastName} {item.firstName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.roleData.value}</td>
                                                    <td>{day}</td>
                                                    <td>
                                                        <button title='Sửa tài khoản' className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button title='Xóa tài khoản' className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
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
                        </>
                        :
                        <LoadingPage
                            timeOutLoading={this.timeOutUser}
                        />
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: (id) => dispatch(actions.fetchAllUsersStart(id)),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
