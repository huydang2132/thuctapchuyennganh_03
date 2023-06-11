import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageTutor.scss';
import * as actions from '../../../../store/actions';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';
import TableTutor from './TableTutor';

class ManageTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let { userInfo } = this.props;
        this.props.getRoleId(userInfo);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userInfo !== this.props.userInfo) {
            let { userInfo } = this.props;
            this.props.getRoleId(userInfo);
        }
    }
    render() {
        return (
            <>
                <div className='manage-tutor-container'>
                    <Header />
                    <main className='manage-tutor-main'>
                        <Navbar />
                        <section className='manage-tutor-section'>
                            <div className='manage-tutor-content'>
                                <TableTutor />
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
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTutor);
