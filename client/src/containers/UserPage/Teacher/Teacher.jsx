import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Teacher.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';

class Teacher extends Component {
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
                <div className='teacher-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='teacher-section'>
                        Giáo viên
                    </section>
                    <footer>
                        <HomeFooter author={"Đặng Đình Huy"} />
                    </footer>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Teacher));