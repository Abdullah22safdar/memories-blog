import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import Icon from "./Icon";
import GoogleLogin from "react-google-login";
import useStyles from './styles';
import Input from "./Input";
import {googleSignIn, signIn, signUp} from "../../actions/auth";

const intialData = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}


const Auth = () => {

        const [formData, setFormData] = useState(intialData);
        const classes = useStyles();
        const dispatch = useDispatch();
        const history = useHistory();
        const [isSignUp, setSignUp] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const googleSuccess = async (res) => {
            const result = res?.profileObj;
            const token = res?.tokenId;
            dispatch(googleSignIn(result, token));
            history.push('/');
        };

        const googleFailure = () => console.log("Google Sign In was unsuccessful.Try again later");

        const switchMode = () => {
            setSignUp((prevSignUp) => !prevSignUp);
            setShowPassword(false);

        };

        const handleShowPassword = () => setShowPassword((preShowPassword) => !preShowPassword);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (isSignUp) {
                dispatch(signUp(formData, history))
            } else {
                dispatch(signIn(formData, history))
            }
        };

        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value})
        }

        return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar classes={classes.avatar}>
                        <LockOutLinedIcon/>
                    </Avatar>
                    <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus
                                               half/>
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange}
                                   type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                            {isSignUp && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                                 type="password"/>)}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary"
                                className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sigin In'}</Button>
                        <GoogleLogin clientId="1059005539152-o1evps231c0786gmghdf9nf1rbb8tf2h.apps.googleusercontent.com"
                                     render={(renderProps) => (
                                         <Button
                                             className={classes.googleButton}
                                             color="primary"
                                             fullWidth
                                             onClick={renderProps.onClick}
                                             disabled={renderProps.disabled}
                                             startIcon={<Icon/>}
                                             variant="contained"
                                         >
                                             Google Sign In
                                         </Button>
                                     )}
                                     onSuccess={googleSuccess}
                                     onFailure={googleFailure}
                                     cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        );
    }

;

export default Auth;