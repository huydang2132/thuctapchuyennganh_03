import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableCenter.scss';
import { deleteCenterService } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import LoadingPage from '../../../LoadingPage/LoadingPage';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

class TableCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            timeOutData: true
        }
    }

    componentDidMount() {
        this.props.fetchAllCenter('ALL');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataCenter } = this.props;
        if (prevProps.dataCenter !== dataCenter) {
            const pageCount = Math.ceil(dataCenter.resCenter.length / this.state.perPage);
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
        this.props.showEditCenter();
        this.props.currentCenter(data);
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
    timeOutCourse = () => {
        let { centers } = this.state;
        if (centers && centers.length > 0) {
            return;
        }
        else {
            this.props.showAddCenter();
            toast.error('Không có dữ liệu về khóa học!');
            return;
        }
    }
    render() {
        let { centers, pageCount, perPage } = this.state;
        return (
            <>
                {
                    centers && centers.length > 0 ?
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
                                        {centers && centers.length > 0 &&
                                            centers.slice(this.state.offset, this.state.offset + perPage).map((item, index) => {
                                                let day = moment(item.createdAt).format('DD/MM/YYYY, HH:mm:ss');
                                                return (
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
                        :
                        <LoadingPage
                            timeOutLoading={this.timeOutCourse}
                        />
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        dataCenter: state.admin.allCenter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email)),
        fetchAllCenter: (id) => dispatch(actions.fetchAllCenter(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCenter);
