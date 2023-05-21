import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageHandbook.scss';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';

class ManageHandbook extends Component {
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
                <div className='manage-handbook-container'>
                    <header>
                        <Header />
                    </header>
                    <main className='manage-handbook-main'>
                        <Navbar />
                        <section className='manage-handbook-section'>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
