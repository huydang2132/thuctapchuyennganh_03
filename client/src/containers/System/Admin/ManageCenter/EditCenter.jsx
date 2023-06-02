import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditCenter.scss';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';

class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nameCenter: '',
            imgShow: null,
            listProvince: [],
            selectedProvince: '',
            description: '',
            address: '',
            image: null
        }
    }
    componentDidMount() {
        let { dataCenter, currentCenter } = this.props;
        let dataSelectProvince = this.dataInputSelect(dataCenter.resProvince);
        if (currentCenter) {
            let imageBase64 = '';
            if (currentCenter.image) {
                imageBase64 = Buffer.from(currentCenter.image, 'base64').toString('binary');
            }
            this.setState({
                id: currentCenter.id,
                listProvince: dataSelectProvince,
                nameCenter: currentCenter.name,
                address: currentCenter.address,
                description: currentCenter.description,
                imgShow: imageBase64 ? imageBase64 : null
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { listProvince } = this.state;
        let { currentCenter } = this.props;
        if (prevState.listProvince !== listProvince) {
            let selectedProvince = '', provinceId = '';
            provinceId = currentCenter.provinceId;
            selectedProvince = listProvince.find(item => {
                return item && item.value === provinceId
            })
            this.setState({
                selectedProvince: selectedProvince
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
    handleEditCenter = async () => {
        let { nameCenter, selectedProvince, address, description, image, id } = this.state;
        if (!nameCenter || !selectedProvince || !address || !description) {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        else {
            this.props.fetchEditCenter({
                id: id,
                name: nameCenter,
                provinceId: selectedProvince.value,
                address: address,
                description: description,
                image: image
            })
            this.props.showEditCenter();
        }
    }
    dataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = item.value;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    hideEditCenter = () => {
        this.props.showEditCenter();
    }
    handleOnChangeImage = async (file) => {
        let base64 = await CommonUtils.getBase64(file);
        this.setState({
            imgShow: URL.createObjectURL(file),
            image: base64
        })
    }
    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { editCenter } = this.props;
        let { nameCenter, imgShow, address, description } = this.state;
        return (
            <div className={`edit-center-container ${editCenter === false ? '' : 'show'}`}>
                <div className='edit-center-content'>
                    <h2>Cập nhật trung tâm</h2>
                    <div className='account-form'>
                        <div className='form-col'>
                            <label htmlFor='nameCenter'>Tên trung tâm</label>
                            <input className='form-input' id='nameCenter'
                                value={nameCenter}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameCenter')}
                            ></input>
                        </div>
                        <div className='form-row'>
                            <div className='form-col'>
                                <label>Tỉnh/Thành</label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listProvince}
                                    placeholder="Chọn tỉnh/thành"
                                    name="selectedProvince"
                                    className='select-input'
                                />
                            </div>
                            <div className='form-col'>
                                <label htmlFor='address'>Địa chỉ trung tâm</label>
                                <input className='form-input' id='address'
                                    value={address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                ></input>
                            </div>
                        </div>
                        <div className='form-col'>
                            <label htmlFor='description'>Mô tả chi tiết</label>
                            <textarea className='form-input description' id='description'
                                value={description}
                                onChange={(event) => this.handleOnchangeInput(event, 'description')}
                            ></textarea>
                        </div>
                        <div className='image-center'>
                            <div className='image-item'>
                                <input type="file" accept='image/*' id='image' hidden
                                    onChange={(event) => this.handleOnChangeImage(event.target.files[0])} />
                                <label htmlFor="image" title='Đổi ảnh'></label>
                                <p className='alt-img'>Ảnh minh họa trung tâm</p>
                                <img src={imgShow} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='add-center'>
                        <button className='btn-cancel' onClick={() => this.hideEditCenter()}>Hủy bỏ</button>
                        <button className='btn-add-center' onClick={() => this.handleEditCenter()}>Cập nhật</button>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        dataCenter: state.admin.allCenter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEditCenter: (data) => dispatch(actions.fetchEditCenter(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
