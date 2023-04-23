import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navbar.scss';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 'home',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleClickNavbarItem = (id) => {
        this.setState({
            item: id,
        })
    }
    render() {
        let { item } = this.state;
        return (
            <>
                <nav className='user-manage-sidebar'>
                    <div className={item === 'home' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('home')}>
                        <i className="fa-solid fa-house"></i>
                        <span>Trang chủ</span>
                    </div>
                    <div className={item === 'user' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('user')}>
                        <i className="fa-solid fa-users-gear"></i>
                        <span>Người dùng</span>
                    </div>
                    <div className={item === 'teacher' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('teacher')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>Giáo viên</span>
                    </div>
                    <div className={item === 'schedule' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('schedule')}>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>Lịch dạy</span>
                    </div>
                    <div className={item === 'subject' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('subject')}>
                        <i className="fas fa-school"></i>
                        <span>Môn học</span>
                    </div>
                    <div className={item === 'course' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('course')}>
                        <i className="fa-solid fa-chalkboard-user"></i>
                        <span>Khóa học</span>
                    </div>
                    <div className={item === 'example' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('example')}>
                        <i className="fas fa-book-open"></i>
                        <span>Luyện đề</span>
                    </div>
                    <div className={item === 'handbook' ? 'sidebar-item active' : 'sidebar-item'}
                        onClick={() => this.handleClickNavbarItem('handbook')}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
