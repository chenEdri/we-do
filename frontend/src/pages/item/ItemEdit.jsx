import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemService } from '../../services/ItemService.js'
import { saveItem } from '../../store/action/ItemAction.js'


class _ItemEdit extends Component {

    state = {
        item: ''
    }
    
    componentDidMount() {
        const itemId = this.props.match.params.itemId;
        if (itemId) {
            itemService.getById(itemId)
                .then(item => {
                    console.log('item', item);
                    this.setState({ item })
                })
        } else {
            const item = itemService.getEmpty();
            this.setState({ item });
        }
    }

    handleField = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                item: {
                    ...prevState.item,
                    [field]: value
                }
            }
        })
    }

    onSave = (ev) => {
        ev.preventDefault()
        this.props.saveItem(this.state.item)
        this.props.history.push('/item')
    }


    render() {

        const { item } = this.state;
        if (!item) return <h1>Loading...</h1>
        const { name, price, category, inStock } = item;
        return (
            // <MyForm 
            <form onSubmit={(event) => this.onSave(event, item)}>
                <label htmlFor="txt">Item name</label>
                <Field type="text" id="txt" value={name || ''} name='name' onChange={this.handleField} placeholder="item name" />
                <label htmlFor="txt"> Price </label>
                <Field type="number" value={price || 0} name='price' onChange={this.handleField} />
                <label htmlFor="txt"> Category </label>
                <Field type="text" value={category || ''} name='category' onChange={this.handleField} />
                <label htmlFor="txt"> stcok </label>
                <Field type="checkbox" value={inStock} name='inStock' onChange={this.handleField} />
                <button onClick={this.onSave}>Save</button>
                <button onClick={() => this.props.history.push('/item')}>back to stor</button>
            </form>
        )
    }


}

const mapStateToProps = state => {
    return {
        items: state.itemReducer.items,
    }
}
const mapDispatchToProps = {
    saveItem
}
export const ItemEdit = connect(mapStateToProps, mapDispatchToProps)(_ItemEdit)

