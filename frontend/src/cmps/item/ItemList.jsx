import React from 'react'
import { ItemPreview } from './ItemPreview'
import { Card } from '../Card'

export function ItemList({ items,  onRemove }) {
    return (
        <div className= "card-grid">
            {
                items.map(item=>
                <Card key={ item._id } header={ item.name } body={ <ItemPreview item={ item } 
                onRemove={onRemove}/> } footer='The footer' />)
            }
        </div>
    )
}
