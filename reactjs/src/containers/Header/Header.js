import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, teacherMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
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
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language } = this.props;
        let userInfo = this.props.userInfo;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='header-right'>
                    <div className='language'>
                        <span
                            className={language && language === LANGUAGES.VI ? 'flag flag-vn active' : 'flag flag-vn'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}></span>
                        <span
                            className={language && language === LANGUAGES.EN ? 'flag flag-en active' : 'flag flag-en'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}></span>
                    </div>
                    <span className='welcome'><FormattedMessage id="home-header.welcome" />
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
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
