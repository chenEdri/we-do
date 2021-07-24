
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadItem } from '../../store/action/ItemAction.js'

const loadingImgUrl = 'https://res.cloudinary.com/dygtul5wx/image/upload/v1601042370/sprint%204/users/75_2_cf1ozr.gif';

class _ItemDetails extends Component {

    componentDidMount = () => {
        const { toyId } = this.props.match.params;
        if (toyId) this.props.loadItem(itemId)
    }

    render() {
        let { item } = this.props;
        if (!item || item._id !== this.props.match.params.itemId) return (
            <div className="loader">
                <img src={loadingImgUrl} alt="Loading..." />
            </div>
        )
        return (<div className="main-container">ITEM</div>)
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.itemyReducer.currItem
    };
};

const mapDispatchToProps = {
    loadItem
};

export const ItemDetails = connect(mapStateToProps,mapDispatchToProps)(_ItemDetails);
