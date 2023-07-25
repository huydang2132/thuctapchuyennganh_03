import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageTeacher.scss';
import Header from '../Section/Header';
import Navbar from '../Section/Navbar';
import Select from 'react-select';
import { getDetailteacherService } from '../../../services/userService';

class ManageTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeacher: '',
            description: '',
            listTeacher: [],
            hasOldData: false,
            isTeacher: false,

            listPrice: [],
            listPayment: [],
            listCenter: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedCenter: '',
            note: ''
        }
    }
    componentDidMount() {
        this.props.allTeacherRedux();
        this.props.getTeacherInfo();
    }
    async componentDidUpdate(prevProps, prevState) {
        let { dataUser } = this.props;
        if (prevProps.allTeacher !== this.props.allTeacher) {
            let dataSelect = this.dataInputSelect(this.props.allTeacher, 'USERS');
            this.setState({
                listTeacher: dataSelect
            })
        }
        if (prevProps.allTeacherInfo !== this.props.allTeacherInfo) {
            const { resPayment, resPrice, resProvince, resCenter } = await this.props.allTeacherInfo
            let dataSelectPrice = this.dataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.dataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.dataInputSelect(resProvince, 'PROVINCE');
            let dataSelectCenter = this.dataInputSelect(resCenter, 'CENTER');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listCenter: dataSelectCenter,
            })
            this.handleGetInfo(this.state.selectedTeacher);
        }
        if (prevProps.dataUser !== this.props.dataUser) {
            if (dataUser && dataUser.roleId === 'R2') {
                let selectedOption = {};
                selectedOption.label = `${dataUser.lastName} ${dataUser.firstName}`;
                selectedOption.value = dataUser.id
                this.setState({
                    selectedTeacher: selectedOption,
                    isTeacher: true
                })
            }
        }
    }
    dataInputSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let object = {};
                    object.label = `${item.lastName} ${item.firstName}`;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    object.label = `${item.value} VND`
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {};
                    object.label = item.value;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'CENTER') {
                data.map((item, index) => {
                    let object = {};
                    object.label = `${item.name} - ${item.provinceData.value}`;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }
    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleGetInfo = async (selectedOption) => {
        this.setState({ selectedTeacher: selectedOption });
        let { listPrice, listPayment, listCenter } = this.state;
        let res = await getDetailteacherService(selectedOption.value);
        if (res && res.errCode === 0 && res.data) {
            let note = '', centerId = '',
                paymentId = '', priceId = '', description = '';
            let selectedPayment = '', selectedCenter = '', selectedPrice = '';
            if (res.data.Teacher_info && res.data.Teacher_info.description
                && res.data.Teacher_info.note) {
                note = res.data.Teacher_info.note;
                description = res.data.Teacher_info.description;
                paymentId = res.data.Teacher_info.paymentId;
                priceId = res.data.Teacher_info.priceId;
                centerId = res.data.Teacher_info.centerId;
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                selectedCenter = listCenter.find(item => {
                    return item && item.value === centerId;
                })
            }
            this.setState({
                description: description,
                selectedCenter: selectedCenter,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
            })
        } else {
            this.setState({
                description: '',
                selectedCenter: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
            })
        }
    }
    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleSaveContent = () => {
        this.props.saveDetailTeacher({
            description: this.state.description,
            teacherId: this.state.selectedTeacher.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedCenter: this.state.selectedCenter.value,
            note: this.state.note,
        })
    }
    render() {
        return (
            <div className='manage-teacher-container'>
                <header>
                    <Header />
                </header>
                <main className='manage-teacher-main'>
                    <Navbar />
                    <section className='manage-teacher-section'>
                        <div className='manage-teacher-content'>
                            <div className='manage-teacher-title'>
                                Thêm thông tin giáo viên
                            </div>
                            <div className='more-info-content'>
                                <div className='more-info-item'>
                                    <div className='item-col'>
                                        <label>Chọn giáo viên</label>
                                        <Select
                                            value={this.state.selectedTeacher}
                                            onChange={this.handleGetInfo}
                                            options={this.state.listTeacher}
                                            placeholder="Chọn giáo viên"
                                            className='select-input'
                                            isDisabled={this.state.isTeacher}
                                        />
                                    </div>
                                    <div className='item-col'>
                                        <label>Tên trung tâm</label>
                                        <Select
                                            value={this.state.selectedCenter}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.listCenter}
                                            placeholder="Chọn trung tâm"
                                            name="selectedCenter"
                                            className='select-input'
                                        />
                                    </div>
                                </div>
                                <div className='more-info-item'>
                                    <div className='item-col'>
                                        <label>Giá giảng dạy</label>
                                        <Select
                                            value={this.state.selectedPrice}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.listPrice}
                                            placeholder="Giá giảng dạy"
                                            name="selectedPrice"
                                            className='select-input'
                                        />
                                    </div>
                                    <div className='item-col'>
                                        <label>Phương thức thanh toán</label>
                                        <Select
                                            value={this.state.selectedPayment}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.listPayment}
                                            placeholder="Phương thức thanh toán"
                                            name="selectedPayment"
                                            className='select-input'
                                        />
                                    </div>
                                </div>
                                <div className='more-info-item note'>
                                    <label>Thông tin giới thiệu</label>
                                    <textarea className='description'
                                        onChange={(event) => this.handleOnChangeText(event, 'description')}
                                        value={this.state.description}>
                                    </textarea>
                                </div>
                                <div className='more-info-item note'>
                                    <label>Ghi chú</label>
                                    <input className='input-note'
                                        onChange={(event) => this.handleOnChangeText(event, 'note')}
                                        value={this.state.note}
                                    />
                                </div>
                            </div>
                            <button className='btn-save-content-teacher'
                                onClick={() => this.handleSaveContent()}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </section>
                </main>
                <footer className='system-footer'>
                    <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                </footer>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allTeacher: state.admin.allTeacher,
        allTeacherInfo: state.admin.allTeacherInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        allTeacherRedux: () => dispatch(actions.fetchAllTeacher()),
        saveDetailTeacher: (data) => dispatch(actions.saveDetailTeacher(data)),
        getTeacherInfo: () => dispatch(actions.getTeacherInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
