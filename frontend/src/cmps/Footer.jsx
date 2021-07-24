import React from 'react'
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <div className="brt main-container">
            <div className=" flex sa">
                <div className="foot-col">
                <div className="bold"><p>ABOUT</p></div>
                    <p>How Health-E works</p>
                    <p>Newsroom</p>
                    <p>Health-E Plus</p>
                    <p>Healthy for Work</p>
                    <p>Olympics</p>
                    <p>Careers</p>
                </div>
                <div className="foot-col">
                    <div className="bold"><p>COMMUNITY</p></div>
                    <p>Diversity Belonging</p>
                    <p>Against Discrimination</p>
                    <p>Accessibility</p>
                    <p>Frontline Stays</p>
                    <p>Invite friends</p>
                    <p>Gift cards</p>
                </div>
                <div className="foot-col">
                    <div className="bold"><p>SUPPORT</p></div>
                    {/* <Link to ="/about">About us</Link> */}
                    <p>Updates for COVID-19</p>
                    <p>Help Center</p>
                    <p>Cancellation options</p>
                    <p>Neighborhood Support</p>
                    <p>Trust and Safety</p>
                </div>
            </div>
        </div>
    )
}
