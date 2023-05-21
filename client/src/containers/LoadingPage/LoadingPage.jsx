import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoadingPage.scss';
import { toast } from 'react-toastify';

class LoaddingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.timeOutLoading();
        }, 6000);
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
