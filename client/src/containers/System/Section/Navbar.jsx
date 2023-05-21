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
    handleClickNavbarItem = (id) => {
        this.props.history.push(`/system/${id}`);
    }
    render() {
        let { item } = this.state;
        return (
            <>
                <nav className='user-manage-sidebar'>
                    <div className={item === '/system/manage' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage')}>
                        <i className="fa-solid fa-house"></i>
                        <span>Trang chủ</span>
                    </div>
                    <div className={item === '/system/list-user' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('list-user')}>
                        <i className="fa-solid fa-users-gear"></i>
                        <span>Người dùng</span>
                    </div>
                    <div className={item === '/system/manage-teacher' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-teacher')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>Giáo viên</span>
                    </div>
                    <div className={item === '/system/manage-schedule' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-schedule')}>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>Lịch dạy</span>
                    </div>
                    <div className={item === '/system/manage-center' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-center')}>
                        <i className="fas fa-school"></i>
                        <span>Trung tâm</span>
                    </div>
                    <div className={item === '/system/manage-course' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-course')}>
                        <i className="fa-solid fa-chalkboard-user"></i>
                        <span>Khóa học</span>
                    </div>
                    <div className={item === '/system/manage-subject' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-subject')}>
                        <i className="fas fa-book-open"></i>
                        <span>Môn học</span>
                    </div>
                    <div className={item === '/system/manage-handbook' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('manage-handbook')}>
                        <i className="fa-solid fa-address-card"></i>
                        <span>Cẩm nang</span>
                    </div>
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
