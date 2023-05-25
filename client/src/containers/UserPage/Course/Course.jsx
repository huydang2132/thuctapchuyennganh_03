import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Course.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/header-background.jpg';

class Course extends Component {
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
    onClickCourse=()=>{
        alert('DiChuyen')
    }
    render() {
        let {Anh} = this.state
    
        return (
            <>
                <div className='course-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='course-section'>

                            <div className="body">
                                <div className="body1">
                                    <p>CÁC KHOÁ HỌC - HỆ THỐNG GIÁO DỤC ĐIỆN TỬ</p>
                                    <img src={Anh} alt=""/>
                                </div>
                                    

                                <div className="body2">
                                    <h3>Danh sách các khoá học tiêu biểu</h3>
                                    <p>Được giảng dạy bởi những giáo viên tận tâm nhất!</p>
                                </div>
                            </div>
                            
                            <hr />
                            <div className="content">
                            <div onClick={()=>this.onClickCourse()}>
                                <img src={Anh} alt=""/>
                                <h2>Giảng viên: Đặng Đình Huy</h2>
                                <p>Môn học: Hoá học lớp 9</p>
                            </div>
                            </div>
                            <hr />
                            <div className="content2">
                                
                                <ul>
                                    <li><i className="fa-solid fa-caret-left"></i></li>
                                    <li className="so1"><a href="" ><b>1</b></a></li>
                                    <li><a href=""><b>2</b></a></li>
                                    <li><a href=""><b>3</b></a></li>
                                    <li><i className="fa-solid fa-caret-right"></i></li>
                                </ul>
                            </div>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));
