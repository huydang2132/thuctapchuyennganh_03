import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import Avatar from '../../../assets/images/avatar.png';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: Avatar,
        }
    }
    componentDidMount() {
        let { userInfo, dataUser, isLoggedIn } = this.props;
        let imageBase64 = '';
        if (userInfo) {
            this.props.getRoleId(userInfo.email);
        }
        if (dataUser) {
            if (dataUser.image) {
                imageBase64 = new Buffer(dataUser.image, 'base64').toString('binary');
            }
            this.setState({
                avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { userInfo, dataUser, isLoggedIn } = this.props;
        let imageBase64 = '';
        if (prevProps.userInfo !== userInfo) {
            if (userInfo) {
                this.props.getRoleId(userInfo.email);
            }
        }
        if (prevProps.dataUser !== dataUser) {
            if (dataUser) {
                if (dataUser.image) {
                    imageBase64 = new Buffer(dataUser.image, 'base64').toString('binary');
                }
                this.setState({
                    avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
                })
            }
        }
    }
    returnHome = () => {
        this.props.history.push('/system/manage');
    }
    settingAccount = () => {
        this.props.history.push('/account/profile');
    }
    changePassword = () => {
        this.props.history.push('/account/change-password')
    }
    userPage = () => {
        this.props.history.push('/home');
    }
    logOut = () => {
        this.props.processLogout();
    }
    render() {
        let { dataUser, isLoggedIn } = this.props;
        let { avatar } = this.state;
        return (
            <>
                <header className='user-mange-header'>
                    <div className='header-left'>
                        <div className='header-left-content'>
                            <div className='header-logo' onClick={() => this.returnHome()}>
                                <i className="fas fa-graduation-cap"></i>
                                <div className='logo-title'>Education</div>
                            </div>
                        </div>
                    </div>
                    <div className='header-center'>
                        <div className='header-center-content'>
                            <h2>Hệ thống quản trị</h2>
                        </div>
                    </div>
                    <div className='header-right'>
                        <div className='header-right-content'>
                            <div className='header-avatar'>
                                <img src={avatar} alt='' />
                            </div>
                            <span className='header-name'>
                                {dataUser && dataUser.firstName && dataUser.lastName ?
                                    dataUser.lastName + ' ' + dataUser.firstName : 'Loading...'}
                            </span>
                            <ul className='setting-account'>
                                {isLoggedIn === false ? ''
                                    :
                                    <>
                                        <li onClick={() => this.userPage()}>Trang chủ người dùng</li>
                                        <li onClick={() => this.settingAccount()}>Tài khoản của tôi</li>
                                        <li onClick={() => this.changePassword()}>Đổi mật khẩu</li>
                                        <li onClick={() => this.logOut()}>Đăng xuất</li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </header>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
