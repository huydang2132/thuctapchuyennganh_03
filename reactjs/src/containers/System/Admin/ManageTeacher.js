import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageTeacher.scss';
import Header from '../Section/Header';
import Navbar from '../Section/Navbar';


class ManageTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className='manage-teacher-container'>
                <header>
                    <Header />
                </header>
                <main className='manage-teacher-main'>
                    <Navbar />
                    <section className='manage-teacher-section'>

                    </section>
                </main>
                <footer className='system-footer'>
                    <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                </footer>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
