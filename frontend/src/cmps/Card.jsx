import React from 'react'

// Creating an illusion of slots
export function Card({ header, body, footer, img }) {
    return (
        <div className="card-container">
            <h3 className="card-title tac">{ header }</h3>
            {/* { img && <img src={ img } alt="" /> } */}
            <div>{ body }</div>
        </div>
    )
}
