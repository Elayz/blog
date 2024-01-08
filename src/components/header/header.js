import React from 'react'
import classes from './header.module.scss'
import  { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../actions'


const Header = ({ logOut }) => {
    const authorized = JSON.parse(localStorage.getItem('authorized'));
    const user = JSON.parse(localStorage.getItem('user'));
    const onClick = () => {
        logOut(false)
        localStorage.clear();
        localStorage.setItem('authorized', false)
    }
    return (
        <div className={classes.main}>
            <Link to='/articles'>
                <p className={classes.realWorld}>
                    Realworld Blog
                </p>
            </Link>
            {authorized
                ?<div className={classes.authorized}>
                    <Link to='/sign-up'> <span className={classes.createArticle}>Create article</span></Link>
                    <p className={classes.userUsername}>{user.userUsername}</p>
                    <Link to='/profile'><img src={user.userImage} alt=""/></Link>
                    <Link onClick={onClick} to='/sign-in'><span className={classes.logOut}>Log Out</span></Link>
                </div>
                :<section>
                    <Link className={classes.signIn} to='/sign-in'>Sign In</Link>
                    <Link to='/sign-up'> <span className={classes.signUp}>Sign Up</span></Link>
                </section>
            }
        </div>

    );
};
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        authorized: state.authorized,
    }
};
export default connect(mapStateToProps,actions)(Header)