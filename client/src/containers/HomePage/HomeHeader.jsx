import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import Avatar from '../../assets/images/avatar.png';
import { validateToken } from '../../services/userService';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: Avatar,
            roleId: ''
        }
    }
    componentDidMount() {
        let { userInfo, dataUser, isLoggedIn } = this.props
        if (userInfo) {
            this.props.getRoleId(userInfo);
        }
        let imageBase64 = '';
        if (dataUser) {
            if (dataUser.image) {
                imageBase64 = Buffer.from(dataUser.image, 'base64').toString('binary');
            }
            this.setState({
                avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar,
                roleId: dataUser && dataUser.roleId
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { userInfo, dataUser, isLoggedIn } = this.props
        if (prevProps.userInfo !== userInfo) {
            if (userInfo) {
                this.props.getRoleId(userInfo);
            }
        }
        if (prevProps.dataUser !== dataUser || prevProps.isLoggedIn !== isLoggedIn) {
            let imageBase64 = '';
            if (dataUser) {
                if (dataUser.image) {
                    imageBase64 = Buffer.from(dataUser.image, 'base64').toString('binary');
                }
                this.setState({
                    avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar,
                    roleId: dataUser && dataUser.roleId
                })
            }
        }
    }
    returnHome = () => {
        this.props.history.push(`/home`);
    }
    settingAccount = () => {
        this.props.history.push('/account/profile');
    }
    changePassword = () => {
        this.props.history.push('/account/change-password')
    }
    logIn = () => {
        this.props.history.push('/login');
    }
    logOut = () => {
        this.props.processLogout();
    }
    adminSystem = () => {
        if (this.state.roleId === 'R1') {
            this.props.history.push('/system/manage');
        }
        else if (this.state.roleId === 'R2') {
            this.props.history.push('/teacher/manage');
        }
    }
    nextPage = (id) => {
        this.props.history.push(`/user/${id}`);
    }
    render() {
        const { dataUser, isLoggedIn } = this.props;
        let { avatar } = this.state;
        let nameUser = dataUser && dataUser.lastName && dataUser.firstName ? dataUser.lastName + ' ' + dataUser.firstName : 'Loading...';
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-item'>
                                <div className='header-logo' onClick={() => this.returnHome('subject')}>
                                    <i className="fas fa-graduation-cap"></i>
                                    <div className='logo-title'>Education</div>
                                </div>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content' onClick={() => this.nextPage('subject')}>
                                <div><b>Môn học</b></div>
                                <div className='subs-title'>Tìm lớp theo môn học</div>
                            </div>
                            <div className='child-content' onClick={() => this.nextPage('center')}>
                                <div><b>Trung tâm</b></div>
                                <div className='subs-title'>Chọn trung tâm giảng dạy</div>
                            </div>
                            <div className='child-content' onClick={() => this.nextPage('teacher')}>
                                <div><b>Giáo viên</b></div>
                                <div className='subs-title'>Chọn giáo viên giỏi</div>
                            </div>
                            <div className='child-content' onClick={() => this.nextPage('course')}>
                                <div><b>Khóa học</b></div>
                                <div className='subs-title'>Học theo khóa học</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='account' onClick={isLoggedIn === false ? (() => this.logIn()) : undefined}>
                                <div className='account-avatar'>
                                    <img src={avatar} alt='Avatar' />
                                </div>
                                <span className='account-name'>
                                    {isLoggedIn === false ? 'Đăng nhập' : nameUser}
                                </span>
                                <ul className='setting-account'>
                                    {isLoggedIn === false ? ''
                                        :
                                        <>
                                            {dataUser && dataUser.roleId === 'R3' ?
                                                <>
                                                    <li onClick={() => this.settingAccount()}>Tài khoản của tôi</li>
                                                    <li onClick={() => this.changePassword()}>Đổi mật khẩu</li>
                                                    <li onClick={() => this.logOut()}>Đăng xuất</li>
                                                </>
                                                :
                                                <>
                                                    <li onClick={() => this.adminSystem()}>Hệ thống quản trị</li>
                                                    <li onClick={() => this.settingAccount()}>Tài khoản của tôi</li>
                                                    <li onClick={() => this.changePassword()}>Đổi mật khẩu</li>
                                                    <li onClick={() => this.logOut()}>Đăng xuất</li>
                                                </>
                                            }
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
