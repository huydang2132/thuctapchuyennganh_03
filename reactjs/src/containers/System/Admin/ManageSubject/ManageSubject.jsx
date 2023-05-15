import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSubject.scss';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';


class ManageSubject extends Component {
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
                <div className='manage-subject-container'>
                    <header>
                        <Header />
                    </header>
                    <main className='manage-subject-main'>
                        <Navbar />
                        <section className='manage-subject-section'>

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubject);
