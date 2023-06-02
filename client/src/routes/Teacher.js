import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Teacher/MangeSchedule';
import AdminPage from '../containers/System/AdminPage';
import ManageTeacher from '../containers/System/Admin/ManageTeacher';
import ManageCourse from '../containers/System/Admin/ManageCourse/ManageCourse';
import ManageExam from '../containers/System/Teacher/ManageExam/ManageExam';
import MangeTutor from '../containers/System/Teacher/ManageTutor/MangeTutor';
import Page404 from '../containers/Page404/Page404';

class Teacher extends Component {
    render() {
        return (
            <>
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/teacher/manage" component={AdminPage} />
                            <Route path="/teacher/manage-schedule" component={ManageSchedule} />
                            <Route path="/teacher/manage-teacher" component={ManageTeacher} />
                            <Route path="/teacher/manage-course" component={ManageCourse} />
                            <Route path="/teacher/manage-exam" component={ManageExam} />
                            <Route path="/teacher/manage-tutor" component={MangeTutor} />
                            <Route path="/teacher/*" component={Page404} />
                        </Switch>
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
