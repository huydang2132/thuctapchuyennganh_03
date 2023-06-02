import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navbar.scss';
import { withRouter } from 'react-router';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
        }
    }
    componentDidMount() {
        let { location } = this.props;
        this.setState({
            item: location.pathname,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { location } = this.props;
        if (prevProps.location !== location) {
            this.setState({
                item: location.pathname,
            })
        }
    }
    handleClickNavbarItem = (pathName, id) => {
        this.props.history.push(`/${pathName}/${id}`);
    }
    render() {
        let { item } = this.state;
        let roleId = this.props.dataUser.roleId
        return (
            <>
                <nav className='user-manage-sidebar'>
                    {
                        roleId && roleId === 'R1' ?
                            <>
                                <div className={item === '/system/manage' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage')}>
                                    <i className="fa-solid fa-house"></i>
                                    <span>Trang chủ</span>
                                </div>
                                <div className={item === '/system/list-user' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'list-user')}>
                                    <i className="fa-solid fa-users-gear"></i>
                                    <span>Người dùng</span>
                                </div>
                                <div className={item === '/system/manage-teacher' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-teacher')}>
                                    <i className="fa-solid fa-user-gear"></i>
                                    <span>Giáo viên</span>
                                </div>
                                <div className={item === '/system/manage-schedule' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-schedule')}>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>Lịch dạy</span>
                                </div>
                                <div className={item === '/system/manage-center' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-center')}>
                                    <i className="fas fa-school"></i>
                                    <span>Trung tâm</span>
                                </div>
                                <div className={item === '/system/manage-course' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-course')}>
                                    <i className="fa-solid fa-chalkboard-user"></i>
                                    <span>Khóa học</span>
                                </div>
                                <div className={item === '/system/manage-subject' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-subject')}>
                                    <i className="fas fa-book-open"></i>
                                    <span>Môn học</span>
                                </div>
                                <div className={item === '/system/manage-handbook' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('system', 'manage-handbook')}>
                                    <i className="fa-solid fa-address-card"></i>
                                    <span>Cẩm nang</span>
                                </div>
                            </>
                            :
                            <>
                                <div className={item === '/teacher/manage' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage')}>
                                    <i className="fa-solid fa-house"></i>
                                    <span>Trang chủ</span>
                                </div>
                                <div className={item === '/teacher/manage-teacher' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage-teacher')}>
                                    <i className="fa-solid fa-user-gear"></i>
                                    <span>Giáo viên</span>
                                </div>
                                <div className={item === '/teacher/manage-tutor' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage-tutor')}>
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    <span>Gia sư</span>
                                </div>
                                <div className={item === '/teacher/manage-schedule' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage-schedule')}>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>Lịch dạy</span>
                                </div>
                                <div className={item === '/teacher/manage-course' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage-course')}>
                                    <i className="fa-solid fa-chalkboard-user"></i>
                                    <span>Khóa học</span>
                                </div>
                                <div className={item === '/teacher/manage-exam' ? 'sidebar-item active' : 'sidebar-item'}
                                    onClick={() => this.handleClickNavbarItem('teacher', 'manage-exam')}>
                                    <i className="fas fa-book-open"></i>
                                    <span>Đề luyện</span>
                                </div>
                            </>
                    }
                </nav>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPage));
