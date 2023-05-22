import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import TeachingCenter from './Section/TeachingCenter';
import OutStandingTeacher from './Section/OutStandingTeacher';
import HandBook from './Section/HandBook';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../store/actions';
import Banner from './Banner';

class HomaPage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        return (
            <>
                <HomeHeader />
                <Banner />
                <Specialty settings={settings} />
                <TeachingCenter settings={settings} />
                <OutStandingTeacher settings={settings} />
                <HandBook settings={settings} />
                <HomeFooter author={"Đặng Đình Huy"} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomaPage);
