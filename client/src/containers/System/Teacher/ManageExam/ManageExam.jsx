import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageExam.scss';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';

class ManageExam extends Component {
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
                <div className='manage-exam-container'>
                    <Header />
                    <main className='manage-exam-main'>
                        <Navbar />
                        <section className='manage-exam-section'>
                            <h2 className='manage-exam-title'>
                                Quản lý đề luyện
                            </h2>
                            <div className='manage-exam-content'>
                            </div>
                        </section>
                    </main>
                    <footer className='system-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allTeacher: state.admin.allTeacher,
        scheduleTeacher: state.admin.scheduleTeacher,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        allTeacherRedux: () => dispatch(actions.fetchAllTeacher()),
        fetchScheduleTeacher: () => dispatch(actions.fetchScheduleTeacher()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageExam);
