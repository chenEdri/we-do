import React, { Component } from "react"
import { connect } from 'react-redux'
import { Jumbo } from "../cmps/Jumbo"

export class _HomeApp extends Component {
  render() {
    return (
      <section className="main-container">
        <Jumbo />
        <div>
          HOME
        </div>
      </section>
    );
  }
}

export const Home = connect()(_HomeApp)
