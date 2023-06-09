import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../store/actions';
import { userCheckRoleR1, userCheckRoleR2 } from '../hoc/authentication';
import AdminPage from '../containers/System/AdminPage';
import ManageUser from '../containers/System/Admin/ManageUser';
import ManageCourse from '../containers/System/Admin/ManageCourse/ManageCourse';
import MangeSchedule from '../containers/System/Teacher/MangeSchedule';
import ManageTeacher from '../containers/System/Admin/ManageTeacher';
import ManageCenter from '../containers/System/Admin/ManageCenter/ManageCenter';
import ManageHandbook from '../containers/System/Admin/ManageHandbook/ManageHandbook';
import ManageSubject from '../containers/System/Admin/ManageSubject/ManageSubject';
import Page404 from '../containers/Page404/Page404';

class System extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataUser } = this.props;
        if (prevProps.dataUser !== this.props.dataUser) {
            if (dataUser.roleId === 'R2') {
                this.props.history.replace('/teacher/manage');
            }
        }
    }
    render() {
        return (
            <>
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage" component={AdminPage} />
                            <Route path="/system/list-user" component={ManageUser} />
                            <Route path="/system/manage-teacher" component={ManageTeacher} />
                            <Route path="/system/manage-course" component={ManageCourse} />
                            <Route path="/system/manage-schedule" component={MangeSchedule} />
                            <Route path="/system/manage-center" component={ManageCenter} />
                            <Route path="/system/manage-handbook" component={ManageHandbook} />
                            <Route path="/system/manage-subject" component={ManageSubject} />
                            <Route path="/system/*" component={Page404} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.app.userInfo,
        dataUser: state.user.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
