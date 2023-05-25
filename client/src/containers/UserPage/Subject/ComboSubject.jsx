import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ComboSubject.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/header-background.jpg';

class ComboSubject extends Component {
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
    onClickComboSubject=()=>{
        alert('MonToHop')
    }
    render() {
        let {Anh} = this.state
        return (
            <>
                <div className='combo-subject-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='combo-subject-section'>
                    <div className="modau">
                            <p>HÃY TRỌN TỔ HỢP MÔN MÀ BẠN CẦN ÔN TẬP</p>
                        </div>
                        <div onClick={()=>this.onClickComboSubject()} class="mon">
                            <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                KHỐI A: TOÁN LÝ HOÁ
                            </div>
                        </div>
                        <div onClick={()=>this.onClickComboSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                KHỐI A0: TOÁN LÝ ANH
                            </div>
                        </div>
                        <div onClick={()=>this.onClickComboSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                KHỐI B: LÝ HOÁ SINH
                            </div>
                        </div>
                        <div onClick={()=>this.onClickComboSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                KHỐI C: VĂN SỬ ĐỊA
                            </div>
                        </div>
                        <div onClick={()=>this.onClickComboSubject()} class="mon">
                        <div className="img">
                                <img src={Anh} alt="" />
                            </div>
                            <div className="text">
                                KHỐI D: TOÁN VĂN ANH
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComboSubject));
