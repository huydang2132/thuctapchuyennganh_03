import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminPage from '../containers/System/AdminPage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageTeacher from '../containers/System/Admin/ManageTeacher';

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
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-teacher" component={ManageTeacher} />
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
