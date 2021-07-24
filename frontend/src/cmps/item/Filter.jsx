import React, { Component } from 'react'

export class Filter extends Component {

    state = {
        name: '',
        minPrice: '',
        maxPrice: '',
        inStock: '',
        category: ''
    }

    handleChange = ({ target }) => {
        console.log('inside!');
        let field;
        (target.name) ? field = target.name : field = target.id;
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => this.props.onSetFilter(this.state))
    }
    render() {
        return (
            <form className="filter">
                <div>
                    <label htmlFor="">By Name</label>
                    <input name="name" autoComplete="off" value={this.state.name} onChange={this.handleChange} type="text" />
                </div>
                <div>
                    <label htmlFor="">Min-Price</label>
                    <input type="number" name="minPrice" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="">Max-Price</label>
                    <input type="number" name="maxPrice" onChange={this.handleChange} />
                </div>
                <div>
                <label htmlFor="inStock">Availabile</label>
                <select id="inStock" onChange={this.handleChange}>
                    <option value="all" >All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                </div>
                <div>
                <label htmlFor="category">Category</label>
                <select id="category" onChange={this.handleChange}>
                    <option value="all" >All</option>
                    <option value="Adult">Adult</option>
                    <option value="Funny">Funny</option>
                    <option value="Educational">Educational</option>
                </select>
                </div>
            </form>
        )
    }
}
