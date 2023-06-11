import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Page404.scss';

class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        return (
            <div className='page-not-found-container'>
                <h1>404 Page not found</h1>
                <section className="error-container">
                    <span className="four"><span class="screen-reader-text">4</span></span>
                    <span className="zero"><span class="screen-reader-text">0</span></span>
                    <span className="four"><span class="screen-reader-text">4</span></span>
                </section>
                <div className="link-container">
                    <Link to="/home" className='more-link'>Trở lại trang chủ</Link>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Page404);
