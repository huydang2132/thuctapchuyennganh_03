import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableCenter.scss';
import { deleteCenterService } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import LoadingPage from '../../../LoadingPage/LoadingPage';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { getTotalService } from '../../../../services/userService';

class TableCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            totalCenter: 0
        }
    }

    async componentDidMount() {
        const Center = await getTotalService('Center');
        if (Center && Center.errCode === 0) {
            this.setState({
                totalCenter: Center.total,
            })
        }
        let { offset, perPage } = this.state;
        this.props.fetchAllCenter('ALL', offset, perPage);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataCenter } = this.props;
        let { totalCenter } = this.state;
        let { offset, perPage } = this.state;
        if (prevState.currentPage !== this.state.currentPage) {
            this.props.fetchAllCenter('ALL', offset, perPage);
        }
        if (prevProps.dataCenter !== dataCenter) {
            const pageCount = Math.ceil(totalCenter / this.state.perPage);
            this.setState({
                centers: dataCenter.resCenter,
                pageCount: pageCount
            })
        }

    }
    clickAddCenter = () => {
        this.props.showAddCenter();
    }
    handleEditCenter = (data) => {
        let { offset, perPage } = this.state;
        this.props.showEditCenter();
        this.props.currentCenter(data, offset, perPage);
    }
    handleDeleteCenter = async (data) => {
        let confirm = window.confirm(`Xác nhận xóa trung tâm "${data.name}"`);
        if (confirm) {
            let res = await deleteCenterService(data.id);
            if (res && res.errCode === 0) {
                toast.success('Xóa trung tâm thành công!');
                this.props.fetchAllCenter('ALL');
            }
        }
        else {
            return;
        }
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;
        this.setState({ currentPage: selected, offset });
    }
    render() {
        let { centers, pageCount } = this.state;
        let { loading } = this.props;
        return (
            <>
                <div className='manage-center-list'>
                    <table className='manage-center-table'>
                        <thead className='table-head'>
                            <tr className='tr-add-center'>
                                <td>
                                    <h2 className='title-table-center'>Danh sách trung tâm</h2>
                                </td>
                                <td>
                                    <button title='Thêm khóa học' className='btn-add-center'
                                        onClick={() => this.clickAddCenter()}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Tên trung tâm</th>
                                <th>Địa chỉ</th>
                                <th>Tỉnh/Thành phố</th>
                                <th>Ngày thêm</th>
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
                                    centers && centers.length > 0 &&
                                    centers.map((item, index) => {
                                        let day = moment(item.createdAt).format('DD/MM/YYYY, HH:mm:ss');
                                        return (
                                            centers && centers.length > 0 &&
                                            <tr key={item.id}>
                                                <td className='course-full-with'>{item.name}</td>
                                                <td className='course-full-with'>{item.address}</td>
                                                <td>{item.provinceData.value}</td>
                                                <td>{day}</td>
                                                <td>
                                                    <button title='Sửa khóa học' className='btn-edit' onClick={() => this.handleEditCenter(item)}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button title='Xóa khóa học' className='btn-delete' onClick={() => this.handleDeleteCenter(item)}>
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
        dataCenter: state.admin.allCenter,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email)),
        fetchAllCenter: (id, offset, limit) => dispatch(actions.fetchAllCenter(id, offset, limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCenter);
