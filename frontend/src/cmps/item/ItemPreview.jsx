import React from 'react'
import { Link } from 'react-router-dom'

export function ItemPreview({ item, onRemove }) {
    return <div>
        <div>item</div>
        <Link to="/item/:itemId">ITEM-DETAILS</Link>
        </div>
}