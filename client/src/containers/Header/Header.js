import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, teacherMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE } from '../../utils';
import _ from 'lodash';
import { withRouter } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.TERACHER) {
                menu = teacherMenu;
            }
            if (role === USER_ROLE.STUDENT) {
                this.props.history.push('/home');
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout } = this.props;
        let userInfo = this.props.userInfo;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='header-right'>
                    <span className='welcome'>welcome
                        {userInfo && userInfo.firstName ? userInfo.firstName : 'null'}
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
