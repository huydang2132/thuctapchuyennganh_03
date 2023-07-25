import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageCenter.scss';
import Header from '../../Section/Header';
import Navbar from '../../Section/Navbar';
import TableCenter from './TableCenter';
import AddCenter from './AddCenter';
import EditCenter from './EditCenter';

class ManageCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCenter: false,
            centers: [],
            editCenter: false,
            offset: 0,
            perPage: 8
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    showAddCenter = () => {
        this.setState({
            addCenter: !this.state.addCenter
        })
    }
    showEditCenter = () => {
        this.setState({
            editCenter: !this.state.editCenter
        })
    }
    currentCenter = (data, offset, perPage) => {
        this.setState({
            centers: data,
            offset,
            perPage
        })
    }
    render() {
        let { addCenter, editCenter, centers, offset, perPage } = this.state;
        return (
            <>
                <div className='manage-center-container'>
                    <header>
                        <Header />
                    </header>
                    <main className='manage-center-main'>
                        <Navbar />
                        <section className='manage-center-section'>
                            {
                                addCenter === false ?
                                    <TableCenter
                                        showAddCenter={this.showAddCenter}
                                        showEditCenter={this.showEditCenter}
                                        currentCenter={this.currentCenter}
                                    />
                                    :
                                    <AddCenter
                                        showAddCenter={this.showAddCenter}
                                        courses={centers}
                                        editCenter={editCenter}
                                    />
                            }
                        </section>
                    </main>
                    <footer className='system-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                    {
                        editCenter === false ?
                            undefined
                            :
                            <EditCenter
                                editCenter={editCenter}
                                showEditCenter={this.showEditCenter}
                                currentCenter={centers}
                                offset={offset}
                                perPage={perPage}
                            />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCenter);
