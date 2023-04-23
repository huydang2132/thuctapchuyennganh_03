import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './AdminPage.scss';
import DigitalClock from './Section/DigitalClock';
import Avatar from '../../assets/images/avatar.png';
import Navbar from './Section/Navbar';
import * as actions from '../../store/actions';
import { getRoleIdService } from '../../services/userService';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        let { userInfo } = this.props;
        if (userInfo && userInfo.roleId === 'R3') {
            this.props.history.push('/home');
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { userInfo } = this.props;
        if (prevProps.userInfo && this.props.userInfo) {
            if (userInfo && userInfo.roleId === 'R3') {
                this.props.history.push('/home');
            }
        }
    }
    returnHome = () => {
        this.props.history.push('/home');
    }
    render() {
        let { userInfo } = this.props;
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
                                <img src={Avatar} alt='' />
                            </div>
                            <span className='header-name'>
                                {userInfo.lastName} {userInfo.firstName}
                            </span>
                        </div>
                    </div>
                </header>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
