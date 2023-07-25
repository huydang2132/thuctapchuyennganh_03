import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Center.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/center.png';
import ReactPaginate from 'react-paginate';
import { getTotalService } from '../../../services/userService';
import { toast } from 'react-toastify';
import LoadingPage from '../../LoadingPage/LoadingPage';

class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Anh: Img,
            centers: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            totalCenter: 0
        }
    }
    async componentDidMount() {
        const Center = await getTotalService('Center');
        if (Center && Center.errCode === 0) {
            this.setState({
                totalCenter: Center.total,
            })
        }
        let { offset, perPage } = this.state;
        this.props.fetchAllCenter('ALL', offset, perPage);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataCenter } = this.props;
        let { totalCenter } = this.state;
        let { offset, perPage } = this.state;
        if (prevState.currentPage !== this.state.currentPage) {
            this.props.fetchAllCenter('ALL', offset, perPage);
        }
        if (prevProps.dataCenter !== dataCenter) {
            const pageCount = Math.ceil(totalCenter / this.state.perPage);
            this.setState({
                centers: dataCenter.resCenter,
                pageCount: pageCount
            })
        }

    }
    onClickCenter = () => {
        toast.info('Chức năng đang phát triển!');
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;
        this.setState({ currentPage: selected, offset });
    }
    render() {
        let { Anh } = this.state
        let { centers, pageCount } = this.state;
        let { loading } = this.props;
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
                                <img src={Anh} alt="" />
                            </div>


                            <div className="body2">
                                <h3>Danh sách các trung tâm giáo dục tiêu biểu</h3>
                                <p>Các trung tâm có cơ sở vật chất, thiết bị giáo dục hiện đại, chất lượng!</p>
                            </div>
                        </div>

                        <hr />
                        <div className="content">
                            {
                                loading === false ?
                                    centers && centers.length > 0 &&
                                    centers.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className='content-item' onClick={() => this.onClickCenter()}>
                                                <img src={imageBase64} alt="" />
                                                <h2>Trung tâm {item.name}</h2>
                                                <p><b>Địa chỉ:</b>  {item.address}, {item.provinceData && item.provinceData.value}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='loading-center'>
                                        <LoadingPage />
                                    </div>
                            }
                        </div>
                        <hr />
                        <div className='paging'>
                            <ReactPaginate
                                previousLabel={<i className="fa-solid fa-arrow-left"></i>}
                                nextLabel={<i className="fa-solid fa-arrow-right"></i>}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'pageNumer'}
                            />
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
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        dataCenter: state.admin.allCenter,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getRoleId: (email) => dispatch(actions.getRoleId(email)),
        fetchAllCenter: (id, offset, limit) => dispatch(actions.fetchAllCenter(id, offset, limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Center));
