import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Teacher/ManageSchedule';

class Teacher extends Component {
    render() {
        const { isLoggedIn } = this.props
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {/* <Switch>
                            <Route path="/teacher/manage-schedule" component={ManageSchedule} />
                        </Switch> */}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        TeacherMenuPath: state.app.TeacherMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
