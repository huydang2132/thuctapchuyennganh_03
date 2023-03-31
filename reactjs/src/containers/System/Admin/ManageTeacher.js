import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageTeacher.scss';


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
                ManageTeacher
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
