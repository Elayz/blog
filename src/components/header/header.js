import React from 'react'
import classes from './header.module.scss'
import  { Link, BrowserRouter } from "react-router-dom";

const Header = () => {
    return (
            <Link to='/articles'>
                <div className={classes.main}>
                    <p>Realworld Blog</p>
                    <section>
                        <span>Sign In</span>
                        <span>Sign Up</span>
                    </section>
                </div>
            </Link>

    )
}
export default Header