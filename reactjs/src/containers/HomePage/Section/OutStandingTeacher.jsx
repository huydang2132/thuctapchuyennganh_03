import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';

class OutStandingTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTeacher: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topTeacher !== this.props.topTeacher) {
            this.setState({
                arrTeacher: this.props.topTeacher
            })
        }
    }
    componentDidMount() {
        this.props.loadTopTeachers();
    }
    handleViewDetailTeacher = (teacher) => {
        this.props.history.push(`/detail-teacher/${teacher.id}`);
    }
    render() {
        let arrTeacher = this.state.arrTeacher;
        let { language } = this.props;
        return (
            <>
                <div className='section-share secion-outstanding-teacher'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="homepage.outstanding-teacher" /></span>
                            <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {arrTeacher && arrTeacher.length > 0 &&
                                    arrTeacher.map((item, index) => {
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className='section-customize' key={index}>
                                                <div className='customize-border' onClick={() => this.handleViewDetailTeacher(item)}>
                                                    <div className='outer-bg'>
                                                        <div className='bg-image secion-outstanding-teacher'
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                        <div>Ngoại ngữ Anh 1</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topTeacher: state.admin.topTeacher,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopTeachers: () => dispatch(actions.fetchTopTeacher())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingTeacher));
