import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Exam.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <>
                <div className='exam-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='exam-section'>
                        <div className="tieude">
                            <h3>Bài Trắc Nghiệm Hoá 9</h3>
                            <hr />
                            <h4> Chương 1: Oxit Axit, Oxit Bazo, Axit, Bazo, Muối </h4>
                        </div>
                        <div className="cau1">
                        <p>Bài 1: Oxit bazơ không có tính chất hóa học nào sau đây?</p>
                        <input type="radio" name="raido" id='a'/><label htmlFor='a'>A. Một số tác dụng với nước ở điều kiện thường.</label>  <br />
                        <input type="radio" name="raido" id='b'/><label htmlFor='b'>B. Oxit bazơ tác dụng được với dung dịch axit.</label>  <br />
                        <input type="radio" name="raido" id='c'/><label htmlFor='c'>C. Oxit bazơ tác dụng được với tất cả kim loại.</label>  <br />
                        <input type="radio" name="raido" id='d'/><label htmlFor='d'>D. Một số oxit bazơ tác dụng được với oxit axit.</label>  <br />
                        <br />
                        </div>
                        {/* <div className="cau2">
                        <p>Bài 2: Dãy các chất tác dụng được với oxit bazơ Na2O là:</p>
                        <input type="radio" name="raido1"/><span>A. H2O, SO2, HCl</span>  <br />
                        <input type="radio" name="raido1"/><span>B. H2O, CO, HCl</span>  <br />
                        <input type="radio" name="raido1"/><span>C. H2O, NO, H2SO4</span>  <br />
                        <input type="radio" name="raido1"/><span>D. H2O, CO, H2SO4</span>  <br />
                        <br />
                        </div>
                        <div className="cau3">
                        <p>Bài 3: Tính chất hóa học của oxit axit là</p>
                        <input type="radio" name="raido2"/><span> A. tác dụng với nước</span> <br />
                        <input type="radio" name="raido2"/><span>B. tác dụng với dung dịch bazơ</span>  <br />
                        <input type="radio" name="raido2"/><span>C. tác dụng với một số oxit bazơ</span>  <br />
                        <input type="radio" name="raido2"/><span>D. cả 3 đáp án trên.</span>  <br />
                        <br />
                        </div>
                        <div className="cau4">
                            <p>Bài 4: Oxit axit có thể tác dụng được với</p>
                            <input type="radio" name="raido3"/><span>A. oxit bazơ </span> <br />
                            <input type="radio" name="raido3"/><span>B. nước</span>  <br />
                            <input type="radio" name="raido3"/><span>C. bazơ</span>  <br />
                            <input type="radio" name="raido3"/><span>D. cả 3 hợp chất trên</span>  <br />
                            <br />
                        </div>
                        <div className="cau5">
                            <p>Bài 5: Cho các oxit bazơ sau: Na2O, FeO, CuO, Fe2O3, BaO. Số oxit bazơ tác dụng với nước ở nhiệt độ thường là</p>
                            <input type="radio" name="raido4"/><span>A. 2</span>  <br />
                            <input type="radio" name="raido4"/><span>B. 3</span>  <br />
                            <input type="radio" name="raido4"/><span>C. 4</span>  <br />
                            <input type="radio" name="raido4"/><span>D. 5</span>  <br />
                            <br />
                        </div> */}
                        <button>Nộp bài</button>
                        <div className="Loigiai">
                            <hr />
                            <p1>Kiểm tra đáp án</p1>
                            <h1>Bài 1: Oxit bazơ không có tính chất tác dụng được với tất cả kim loại.<br /><br /> Đáp án: C</h1>
                            <hr />
                            <h1>Bài 2: A tác dụng với Na2O, B có CO không tác dụng, C có NO không tác dụng, D có CO không tác dụng <br /> <br />Đáp án: A</h1>
                            <hr />
                            <h1>Bài 3: Tính chất hóa học của oxit axit là: <br />- Tác dụng với nước. <br />- Tác dụng với dung dịch bazơ. <br />- Tác dụng với một số oxit bazơ. <br /><br /> Đáp án: D</h1>
                            <hr />
                            <h1>Bài 4: Tính chất hóa học của oxit axit là: <br />- Tác dụng với nước tạo thành dung dịch axit <br />- Tác dụng với dung dịch bazơ tạo thành muối và nước <br />- Tác dụng với một số oxit bazơ tạo thành muối <br /><br /> Đáp án: D</h1>
                            <hr />
                            <h1>Bài 5: Các oxit bazơ tác dụng được với nước ở nhiệt độ thường là: Na2O và BaO <br />- Na2O + H2O → 2NaOH <br />- BaO + H2O → Ba(OH)2 <br /> <br />Đáp án: A</h1>
                            
                        </div>

                        <footer>
                        <HomeFooter />
                    </footer>
                    </section>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Exam));
