import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUser from './TableUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        return (
            <>
                Mange User
                <TableUser />
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
