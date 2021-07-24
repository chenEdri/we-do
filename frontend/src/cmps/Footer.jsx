import React from 'react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {Facebook, GitHub, LinkedIn } from '@material-ui/icons'

function openSource(source) {
    window.open(source);
}


export function Footer() {
    return (
        <div className="footer brt">
            <div className="footer-container">
                <div className="foot-col">
                <div className="bold"><div>TECHNOLOGY</div></div>
                    <p>React Hooks</p>
                    <p>Node.js</p>
                    <p>Mongo DB</p>  
                </div>
                <div className="foot-col">
                    <div className="bold"><div>CONTACT</div></div>
                    <div className="mb10" ><a className="foot-hover mb10" href="mailto:chenedri22@gmail.com">chenedri22@gmail.com</a></div>        
                </div>
                <div className="foot-col">
                    <div className="bold"><div>Media</div></div>
                    <div className="cp" onClick={() => openSource('https://www.linkedin.com/in/chen-edri-46290776')}><LinkedIn /></div>
                        <div className="cp" onClick={() => openSource('https://github.com/chenEdri ')}><GitHub /></div>
                        <div className="cp" onClick={() => openSource('https://www.facebook.com/chen.edri.3')}><Facebook /></div>
                        <div className="cp" onClick={() => { 'https://api.whatsapp.com/send?phone=972537616607' }}><WhatsAppIcon /></div>
                </div>
            </div>
        </div>
    )
}