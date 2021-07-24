import React, { Component } from "react";
import { connect } from "react-redux";
import { loadItems, removeItem } from '../../store/action/ItemAction.js';
import { Filter } from '../../cmps/item/Filter';
import { ItemList } from '../../cmps/item/ItemList';


class _ItemApp extends Component {

    state = {
        filterBy: '',
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadItems(this.props.filterBy);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.filterBy) return;
        if (prevProps.filter !== this.props.filterBy) this.props.loadItems()
    }

    onRemove = (_id) => {
        this.props.removeItem(_id);
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    };


    render() {
        const { items }= this.props;
        if (!items) return <div className="loader"><img src={'https://res.cloudinary.com/dygtul5wx/image/upload/v1601042370/sprint%204/users/75_2_cf1ozr.gif'} /></div>
        return (
            <div className="main-container">
                <Filter onSetFilter={this.onSetFilter}/>
                <div>
                    <ItemList bottomBorder={true} items={items} onRemove={this.onRemove} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.itemReducer.items,
        filterBy: state.filterReducer.filterBy
    };
};
const mapDispatchToProps = {
    loadItems,
    removeItem,
};
export const ItemApp = connect( mapStateToProps, mapDispatchToProps)(_ItemApp);
