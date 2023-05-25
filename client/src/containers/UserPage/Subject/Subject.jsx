import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subject.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/header-background.jpg';

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Anh:Img
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    onClickSubject=()=>{
        alert('MonHoc')
    }
    render() {
        let {Anh} = this.state
        return (
            <>
                <div className='subject-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='subject-section'>
                        <div className="modau">
                            <p>DANH SÁCH CÁC MÔN HỌC TRÊN HỆ THỐNG GIÁO DỤC ĐIỆN TỬ</p>
                        </div>
                        <div onClick={()=>this.onClickSubject()} class="mon">
                            <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                HOÁ HỌC
                            </div>
                        </div>
                        <div onClick={()=>this.onClickSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                VẬT LÝ
                            </div>
                        </div>
                        <div onClick={()=>this.onClickSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                GIẢI TÍCH
                            </div>
                        </div>
                        <div onClick={()=>this.onClickSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                TIẾNG ANH
                            </div>
                        </div>
                        <div onClick={()=>this.onClickSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                NGỮ VĂN
                            </div>
                        </div>
                        <div className="div"></div>
                    </section>
                    <footer>
                        <HomeFooter author={"Phạm Văn Nhất"} />
                    </footer>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subject));
