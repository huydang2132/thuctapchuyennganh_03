import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableCourse.scss';
import { deleteCourseService } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import LoadingPage from '../../../LoadingPage/LoadingPage';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            timeOutData: true
        }
    }

    componentDidMount() {
        let { dataUser, userInfo } = this.props;
        this.props.getRoleId(userInfo);
        if (dataUser && dataUser.roleId === 'R2') {
            this.props.fetchAllCourseByTeacher(dataUser.id);
        }
        else {
            this.props.getAllCourse('ALL');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataCourse } = this.props;
        let { dataUser } = this.props;
        if (prevProps.dataUser !== this.props.dataUser) {
            if (dataUser && dataUser.roleId === 'R2') {
                this.props.fetchAllCourseByTeacher(dataUser.id);
            }
        }
        if (prevProps.dataCourse !== dataCourse) {
            const pageCount = Math.ceil(dataCourse.length / this.state.perPage);
            this.setState({
                courses: dataCourse,
                pageCount: pageCount
            })
        }
    }
    clickAddCourse = () => {
        this.props.showAddCourse();
    }
    handleEditCourse = (data) => {
        this.props.showEditCourse();
        this.props.currentCourse(data);
    }
    handleDeleteCourse = async (data) => {

        let confirm = window.confirm(`Xác nhận xóa khóa học "${data.name}"`);
        if (confirm) {
            let res = await deleteCourseService(data.id);
            if (res && res.errCode === 0) {
                toast.success('Xóa khóa học thành công!');
                let { dataUser, userInfo } = this.props;
                this.props.getRoleId(userInfo);
                if (dataUser.roleId === 'R2') {
                    this.props.fetchAllCourseByTeacher(dataUser.id);
                }
                else {
                    this.props.getAllCourse('ALL');
                }
                this.props.getAllCourse('ALL');
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
        let { courses, pageCount, perPage } = this.state;
        return (
            <>
                <div className='manage-course-list'>
                    <table className='manage-course-table'>
                        <thead className='table-head'>
                            <tr className='tr-add-course'>
                                <td>
                                    <h2 className='title-table-center'>Danh sách khóa học</h2>
                                </td>
                                <td>
                                    <button title='Thêm khóa học' className='btn-add-course'
                                        onClick={() => this.clickAddCourse()}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Tên khóa học</th>
                                <th>Mã khóa học</th>
                                <th>Người tạo</th>
                                <th>Ngày tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {courses && courses.length > 0 ?
                                courses.slice(this.state.offset, this.state.offset + perPage).map((item, index) => {
                                    let day = moment(item.createdAt).format('DD/MM/YYYY, HH:mm:ss');
                                    return (
                                        <tr key={item.id}>
                                            <td className='course-full-with'>{item.name}</td>
                                            <td className='course-full-with'>{item.listId}</td>
                                            <td>{item.User.lastName} {item.User.firstName}</td>
                                            <td>{day}</td>
                                            <td>
                                                <button title='Sửa khóa học' className='btn-edit' onClick={() => this.handleEditCourse(item)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button title='Xóa khóa học' className='btn-delete' onClick={() => this.handleDeleteCourse(item)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className='empty-course-row'>
                                    <td className='empty-course'><LoadingPage /> </td>
                                </tr>
                            }
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
        dataCourse: state.admin.allCourse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (userInfo) => dispatch(actions.getRoleId(userInfo)),
        getAllCourse: (id) => dispatch(actions.fetchAllCourse(id)),
        fetchAllCourseByTeacher: (teacherId) => dispatch(actions.fetchAllCourseByTeacher(teacherId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
