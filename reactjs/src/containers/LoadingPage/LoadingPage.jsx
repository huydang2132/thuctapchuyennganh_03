import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoadingPage.scss';

class LoaddingPage extends Component {
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
            <>
                <div className='loader-container'>
                    <div className="loader-content"></div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoaddingPage);
