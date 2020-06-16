import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function DropdownItem(props) {
    return (
        <>
            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.user}
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/profile" className="dropdown-item">Edit profile</Link>
                <Link to="/setPassword" className="dropdown-item">Change password</Link>
                <Link to="/logout" className="dropdown-item">Logout</Link>
            </div>
        </>
    )
}

function MakeDropdown(props) {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
                <DropdownItem user={props.user} />
            </li>
        </ul>
    )
}

export default class NavBar extends Component {

    render() {
        
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                <img src="logo.png" alt="logo" height="30" loading="lazy" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse flex-row-reverse mr-4" id="navbarSupportedContent">   
                <ul class="navbar-nav">
                    <li class="nav-item px-4">
                        <Link to="/fields" className="nav-link font-weight-bold">Fields</Link>
                    </li>
                    <li class="nav-item px-4">
                        <Link to="/responces" className="nav-link font-weight-bold">Responces</Link> 
                    </li>
                </ul>
            </div>

            <MakeDropdown user={this.props.user} />

            </nav>
        )
    }
}