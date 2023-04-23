import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminPage.scss';
import DigitalClock from './Section/DigitalClock';
import Avatar from '../../assets/images/avatar.png';
import Navbar from './Section/Navbar';
import * as actions from '../../store/actions';
import { Route, Switch } from 'react-router-dom';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: Avatar,
            test: ''
        }
    }
    componentDidMount() {
        let { userInfo, dataUser, isLoggedIn } = this.props;
        if (userInfo) {
            this.props.getRoleId(userInfo.email);
        }
        let imageBase64 = '';
        if (dataUser) {
            if (dataUser.roleId === 'R3') {
                this.props.history.push('/home');
            }
            if (dataUser.image) {
                imageBase64 = new Buffer(dataUser.image, 'base64').toString('binary');
            }
            this.setState({
                avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
            })
        }
        this.mounted = true;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataUser, isLoggedIn, userInfo } = this.props;
        let imageBase64 = '';
        if (prevProps.userInfo !== userInfo) {
            if (userInfo) {
                this.props.getRoleId(userInfo.email);
            }
        }
        if (prevProps.dataUser !== dataUser) {
            if (dataUser) {
                if (dataUser.roleId === 'R3') {
                    this.props.history.push('/home');
                }
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
                <div className='user-manage-container'>
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
                                        dataUser.lastName + ' ' + dataUser.firstName : ''}
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
                    <main className='user-manage-main'>
                        <Navbar getRoleId={this.getRoleId} />
                        <section className='user-manage-section'>
                            <div className='digital-clock'>
                                <DigitalClock />
                            </div>
                        </section>
                    </main>
                    <footer className='user-manage-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
