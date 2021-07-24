import { NavLink, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from 'react-redux'


export function _Header(props) {

    return (
        <div className="main-header flex sb align-center">
            <div className="left-nav">
                <div>LOGO</div>
                <NavLink className="link" to="/">HOME</NavLink>
                <NavLink to="/item">ITEMS</NavLink>
            </div>
            <div className="right-nav">
                <NavLink to="/login">LOGIN</NavLink>
                <NavLink to="/signup">SIGN-UP</NavLink>
            </div>
        </div>
    )
}

export const Header = connect()(withRouter(_Header))