import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader.jsx';
import Specialty from './Section/Specialty.jsx';
import TeachingCenter from './Section/TeachingCenter.jsx';
import OutStandingTeacher from './Section/OutStandingTeacher.jsx';
import HandBook from './Section/HandBook.jsx';
import HomeFooter from './Section/HomeFooter.jsx';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomaPage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                {/* <TeachingCenter settings={settings} /> */}
                {/* <OutStandingTeacher settings={settings} /> */}
                {/* <HandBook settings={settings} /> */}
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomaPage);
