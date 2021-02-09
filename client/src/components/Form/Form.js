import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";

import useStyles from './styles';
import {createPosts, updatePosts} from "../../actions/posts";

const Form = ({currentID, setCurrentID}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentID ? state.posts.find((p) => p._id === currentID) : null);
    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const profile = JSON.parse(localStorage.getItem('profile'));
    const creatorName = profile?.result?.name;

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentID) {

            dispatch(updatePosts({...postData,name: creatorName}, currentID))
        } else {
            dispatch(createPosts({...postData,name: creatorName}))
        }
        clear()
    }

    const clear = () => {
        setCurrentID(null);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    if (!profile)
    {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentID ? 'Editing' : 'Creating'} a Memory</Typography>

                <TextField name="title" variant="outlined" label="Title"
                           fullWidth value={postData.title}
                           onChange={(e) => {
                               setPostData({...postData, title: e.target.value})
                           }}/>
                <TextField name="message" variant="outlined" label="Message"
                           fullWidth value={postData.message}
                           onChange={(e) => {
                               setPostData({...postData, message: e.target.value})
                           }}/>
                <TextField name="tags" variant="outlined" label="Tags"
                           fullWidth value={postData.tags}
                           onChange={(e) => {
                               setPostData({...postData, tags: e.target.value.split(',')})
                           }}/>
                <div className={classes.fileInput}>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                        fullWidth>Submit </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form