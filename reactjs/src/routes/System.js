import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminPage from '../containers/System/AdminPage';
import ManageTeacher from '../containers/System/Admin/ManageTeacher';
import ManageUser from '../containers/System/Admin/ManageUser';
import ManageCourse from '../containers/System/Admin/ManageCourse/ManageCourse';

class System extends Component {
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        const { systemMenuPath } = this.props
        return (
            <>
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage" component={AdminPage} />
                            <Route path="/system/list-user" component={ManageUser} />
                            <Route path="/system/manage-teacher" component={ManageTeacher} />
                            <Route path="/system/manage-course" component={ManageCourse} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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
        userInfo: state.app.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
