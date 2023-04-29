import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminPage.scss';
import DigitalClock from './Section/DigitalClock';
import Avatar from '../../assets/images/avatar.png';
import Navbar from './Section/Navbar';
import * as actions from '../../store/actions';
import Header from './Section/Header';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: Avatar,
        }
    }
    componentDidMount() {
        let { userInfo, dataUser, isLoggedIn } = this.props;
        if (userInfo) {
            this.props.getRoleId(userInfo.email);
        }
        let imageBase64 = '';
        if (dataUser) {
            if (dataUser.roleId === 'R3') {
                this.props.history.push('/home');
            }
            if (dataUser.image) {
                imageBase64 = new Buffer(dataUser.image, 'base64').toString('binary');
            }
            this.setState({
                avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataUser, isLoggedIn, userInfo } = this.props;
        let imageBase64 = '';
        if (prevProps.userInfo !== userInfo) {
            if (userInfo) {
                this.props.getRoleId(userInfo.email);
            }
        }
        if (prevProps.dataUser !== dataUser) {
            if (dataUser) {
                if (dataUser.roleId === 'R3') {
                    this.props.history.push('/home');
                }
                if (dataUser.image) {
                    imageBase64 = new Buffer(dataUser.image, 'base64').toString('binary');
                }
                this.setState({
                    avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
                })
            }
        }
    }

    render() {
        return (
            <>
                <div className='admin-page-container'>
                    <Header />
                    <main className='admin-page-main'>
                        <Navbar getRoleId={this.getRoleId} />
                        <section className='admin-page-section'>
                            <div className='digital-clock'>
                                <DigitalClock />
                            </div>
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
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
