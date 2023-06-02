import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminPage.scss';
import Avatar from '../../assets/images/avatar.png';
import Navbar from './Section/Navbar';
import * as actions from '../../store/actions';
import Header from './Section/Header';
import Statistic from './Section/Statistic';

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
            this.props.getRoleId(userInfo);
        }
        let imageBase64 = '';
        if (dataUser) {
            if (dataUser.image) {
                imageBase64 = Buffer.from(dataUser.image, 'base64').toString('binary');
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
                this.props.getRoleId(userInfo);
            }
        }
        if (prevProps.dataUser !== dataUser) {
            if (dataUser) {
                if (dataUser.image) {
                    imageBase64 = Buffer.from(dataUser.image, 'base64').toString('binary');
                }
                this.setState({
                    avatar: dataUser && isLoggedIn === true && imageBase64 ? imageBase64 : Avatar
                })
            }
        }
    }

    render() {
        let { dataUser } = this.props;
        return (
            <>
                <div className='admin-page-container'>
                    <Header />
                    <main className='admin-page-main'>
                        <Navbar getRoleId={this.getRoleId} />
                        <section className='admin-page-section'>
                            {
                                dataUser && dataUser.roleId === 'R1' &&
                                <div className='statistic'>
                                    <Statistic />
                                </div>

                            }

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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
