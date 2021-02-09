import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Avatar, Button, Toolbar} from "@material-ui/core";
import memories from "../../images/memories.jfif";
import useStyles from './styles';
import decode from 'jwt-decode';

import {logout} from "../../actions/auth";
import {Link,useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";


const Navbar = () => {
    const history = useHistory();
    const location =  useLocation();
    const  classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleLogout = ()=>{
        dispatch(logout());

        history.push('/auth');
        setUser(null);
    }

    useEffect(()=>{
        const token = user?.token;
        if (token)
        {
            const decodedToken= decode(token);
            if (decodedToken.exp*1000< new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60"/>
            <Toolbar className={classes.toolbar}>
                {user ? (<div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>logout</Button>
                </div>) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;