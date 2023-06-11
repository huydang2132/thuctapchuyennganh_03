import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageCourse.scss';
import * as actions from '../../../../store/actions';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';
import AddCourse from './AddCourse';
import TableCourse from './TableCourse';
import EditCourse from './EditCourse';

class MangeCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCourse: false,
            courses: [],
            editCourse: false
        }
    }

    componentDidMount() {
        let { dataUser, userInfo } = this.props;
        this.props.getRoleId(userInfo);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataUser, userInfo } = this.props;
        if (prevProps.dataUser !== this.props.dataUser) {
            this.props.getRoleId(userInfo);
        }
    }
    showAddCourse = () => {
        this.setState({
            addCourse: !this.state.addCourse
        })
    }
    showEditCourse = () => {
        this.setState({
            editCourse: !this.state.editCourse
        })
    }
    currentCourse = (data) => {
        this.setState({
            courses: data
        })
    }
    render() {
        let { addCourse, editCourse, courses } = this.state;
        return (
            <>
                <div className='manage-course-container'>
                    <Header />
                    <main className='manage-course-main'>
                        <Navbar />
                        <section className='manage-course-section'>
                            {
                                addCourse === false ?
                                    <TableCourse
                                        showAddCourse={this.showAddCourse}
                                        showEditCourse={this.showEditCourse}
                                        currentCourse={this.currentCourse}
                                    />
                                    :
                                    <AddCourse
                                        showAddCourse={this.showAddCourse}
                                        courses={courses}
                                        editCourse={editCourse}
                                    />
                            }
                        </section>
                    </main>
                    <footer className='system-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                    {
                        editCourse === false ?
                            undefined
                            :
                            <EditCourse
                                editCourse={editCourse}
                                showEditCourse={this.showEditCourse}
                                currentCourse={courses}
                            />
                    }
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (userInfo) => dispatch(actions.getRoleId(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MangeCourse);
