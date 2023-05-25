import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {

    render() {
        return (
            <>
                <div className='home-footer-container'>
                    <section className='home-footer-section'>
                        <div className='home-footer-about'>
                            <h3>Giới thiệu</h3>
                            <p>Website Education được tạo ra bởi Nhóm 3 - IT6041.2 - HaUI, được sử dụng để
                                phục vụ cho đồ án môn Thực tập chuyên ngành kỹ thuật phần mềm.
                            </p>
                        </div>
                        <div className='home-footer-technology'>
                            <h3>Công nghệ</h3>
                            <ul>
                                <li className='react'>
                                    <i className="fa-brands fa-react"></i>
                                    <p>ReactJS</p>
                                </li>
                                <li className='node'>
                                    <i className="fa-brands fa-node"></i>
                                    <p>NodeJS - Express</p>
                                </li>
                                <li className='sql'>
                                    <i className="fa-solid fa-database"></i>
                                    <p>MySQL</p>
                                </li>
                            </ul>
                        </div>
                        <div className='home-footer-social'>
                            <h3>Mạng xã hội</h3>
                            <ul>
                                <li className='facebook'>
                                    <a href='https://www.facebook.com/huydang2132' target="_blank" ref="noopener"><i className="fa-brands fa-facebook-f"></i></a>
                                </li>
                                <li className='instagram'>
                                    <a href='https://www.instagram.com/huy.dang_1304' target="_blank" ref="noopener"><i className="fa-brands fa-instagram"></i></a>
                                </li>
                                <li className='github'>
                                    <a href='https://github.com/huydang2132' target="_blank" ref="noopener"><i className="fa-brands fa-github"></i></a>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <p>&#169; 2023 Copyright: {this.props.author}</p>
                    </footer>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
