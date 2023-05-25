import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import Center from './Center/Center';
import Subject from './Subject/Subject';
import Course from './Course/Course';
import Exam from './Exam/Exam';
import ComboSubject from './Subject/ComboSubject';
import Teacher from './Teacher/Teacher';
import MoreHandBook from './HandBook/MoreHandBook';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <>
                <div className='user-page-container'>
                    <div className='user-page-list'>
                        <Switch>
                            <Route path="/user/center" component={Center} />
                            <Route path="/user/subject" component={Subject} />
                            <Route path="/user/combo-subject" component={ComboSubject} />
                            <Route path="/user/course" component={Course} />
                            <Route path="/user/exam" component={Exam} />
                            <Route path="/user/teacher" component={Teacher} />
                            <Route path="/user/handbook" component={MoreHandBook} />
                        </Switch>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
