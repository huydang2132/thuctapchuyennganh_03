import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddUser.scss';
import { CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions';
import Avatar from '../../../../assets/images/avatar.png';
import { toast } from 'react-toastify';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            positionId: '',
            img: Avatar,
            avatar: '',

            arrGenders: [],
            arrPositions: [],
            arrRoles: []
        }
    }
    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPosition();
        this.props.getRole();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                arrGenders: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                arrPositions: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                arrRoles: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            })
        }
    }
    handleOnchangeInput = (event, id) => {
        let copySate = { ...this.state };
        copySate[id] = event.target.value;
        this.setState({
            ...copySate
        })
    }
    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return false;
            }
        }
        return true;
    }
    changeAvatar = async (files) => {
        let base64 = await CommonUtils.getBase64(files[0]);
        this.setState({
            img: URL.createObjectURL(files[0]),
            avatar: base64
        })
    }
    backToView = () => {
        this.props.viewUsers();
    }
    handleAddUser = () => {
        let { email, password, firstName, lastName, phoneNumber, address, gender, positionId, roleId, avatar } = this.state;
        if (this.checkValidateInput() === true) {
            this.props.createNewUserRedux({
                email, password, firstName, lastName, phoneNumber, address, gender, positionId, roleId, avatar
            });
            this.props.viewUsers();
        }
        else {
            toast.error('Vui lòng nhập đủ thông tin!');
            return;
        }
    }
    render() {
        let { email, password, firstName, lastName, address, phoneNumber,
            gender, img, arrGenders, arrPositions, arrRoles,
            roleId, positionId } = this.state;
        return (
            <>
                <div className='add-user-container'>
                    <div className='add-user-content'>
                        <header className='add-user-header'>
                            <div className='add-user-header-content'>
                                <h2 className='add-user-header-title'>
                                    Thêm mới người dùng
                                </h2>
                                <button title='Trở lại' className='add-user-header-close'
                                    onClick={() => this.backToView()}>
                                    <i className="fa-solid fa-arrow-left"></i>
                                </button>
                            </div>
                            <hr className='line'></hr>
                        </header>
                        <main className='add-user-main'>
                            <div className='add-user-main-head'>
                                <div className='add-user-avatar'>
                                    <img src={img} alt='' />
                                    <label htmlFor="avatar" className='chane-avatar'>
                                        <i className="fa-solid fa-camera"></i>
                                    </label>
                                    <input type="file" accept='image/*' id='avatar' hidden
                                        onChange={(e) => this.changeAvatar(e.target.files)} />
                                </div>
                            </div>
                            <div className='add-user-form'>
                                <div className='account-form'>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='email'>Email</label>
                                            <input className='form-input' id='email'
                                                value={email}
                                                onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                            ></input>
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='password'>Mật khẩu</label>
                                            <input className='form-input' id='password'
                                                type='password'
                                                value={password}
                                                onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='firstName'>Họ</label>
                                            <input className='form-input' id='firstName'
                                                value={lastName}
                                                onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                            ></input>
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='lastName'>Tên</label>
                                            <input className='form-input' id='lastName'
                                                value={firstName}
                                                onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='phoneNum'>Số điện thoại</label>
                                            <input className='form-input' id='phoneNum'
                                                value={phoneNumber}
                                                onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                            ></input>
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='gender'>Giới tính</label>
                                            <select className='form-select' type='text' id='gender'
                                                value={gender ? gender : ''}
                                                onChange={(event) => this.handleOnchangeInput(event, 'gender')}>
                                                {arrGenders && arrGenders.length > 0 &&
                                                    arrGenders.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>
                                                                {item.value}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='role'>Quyền</label>
                                            <select className='form-select' type='text' id='role'
                                                value={roleId ? roleId : ''}
                                                onChange={(event) => this.handleOnchangeInput(event, 'roleId')}>
                                                {arrRoles && arrRoles.length > 0 &&
                                                    arrRoles.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>
                                                                {item.value}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='position'>Học hàm/học vị</label>
                                            <select className='form-select' type='text' id='position'
                                                value={positionId ? positionId : ''}
                                                disabled={roleId === 'R2' ? false : true}
                                                onChange={(event) => this.handleOnchangeInput(event, 'position')}>
                                                {arrPositions && arrPositions.length > 0 &&
                                                    arrPositions.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>
                                                                {item.value}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='address'>Địa chỉ</label>
                                        <input className='form-input' id='address'
                                            value={address}
                                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <footer className='add-user-footer'>
                            <div className='add-user-footer-content'>
                                <button className='btn-add' onClick={() => this.handleAddUser()}>Thêm mới</button>
                            </div>
                        </footer>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPosition: () => dispatch(actions.fetchPositionStart()),
        getRole: () => dispatch(actions.fetchRoleStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
