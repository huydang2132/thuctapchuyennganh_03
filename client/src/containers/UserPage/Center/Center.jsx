import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Center.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/center.png';

class Center extends Component {
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
        alert('TrungTam')
    }
    render() {
        let {Anh} = this.state
        return (
            <>
                <div className='center-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='center-section'>
                    <div className="body">
                                <div className="body1">
                                    <p>TRUNG TÂM GIÁO DỤC - HỆ THỐNG GIÁO DỤC ĐIỆN TỬ</p>
                                    <img src={Anh} alt=""/>
                                </div>
                                    

                                <div className="body2">
                                    <h3>Danh sách các trung tâm giáo dục tiêu biểu</h3>
                                    <p>Các trung tâm có cơ sở vật chất, thiết bị giáo dục hiện đại, chất lượng!</p>
                                </div>
                            </div>
                            
                            <hr />
                            <div className="content">
                            <div onClick={()=>this.onClickCourse()}>
                                <img src={Anh} alt=""/>
                                <h2>Trung tâm Tiếng Anh Zauga</h2>
                                <p><b>Địa chỉ:</b>  26 Xuân Phương - Quận Nam Từ Liêm - Hà Nội</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Center));
