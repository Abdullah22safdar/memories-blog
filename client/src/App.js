import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getPosts} from './actions/posts';

import memories from "./images/memories.jfif"
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentID, setCurrentID] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentID])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch"
                          spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentID={setCurrentID}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentID={currentID} setCurrentID={setCurrentID}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;