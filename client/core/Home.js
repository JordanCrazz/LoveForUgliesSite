//import React from 'react'
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Person from '@material-ui/icons/Person'
import ArrowForward from '@material-ui/icons/ArrowForward'
import DeleteIcon from '@material-ui/icons/Delete'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import testImage from './../assets/images/testImage.png'
import swimImage from './../assets/images/swimmingMammal.jpg'
import sealImage from './../assets/images/SealMyDad.jpg'
import amazingImage from './../assets/images/GeckoAmazing.jpg'
import screamImage from './../assets/images/screamMonkey.jpg'
import { format } from 'date-fns';
import { parseISO } from 'date-fns' 

import auth from './../auth/auth-helper'
import {read} from './../user/api-user.js'
import {list} from'./../user/api-user.js'
import {listComment} from './../comment/api-comment.js'
import {create} from './../comment/api-comment.js'
import {remove} from './../comment/api-comment.js'

import {Link} from 'react-router-dom'
import {listadmin} from './../user/api-user.js'
import {joke} from '../thirdparty/api-dadjokes.js'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1000,
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    }
  }
}))

export default function Home(){
  
  const classes = useStyles()
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])

  var commentText = ""
  var nameText = "default"
  const [commentValues, setCommentValues] = useState({
    name: '',
    comment: '',
    open: false,
    error: ''
  })
  const refreshPage = () => {
    window.location.reload();
    }

  const handleChange = comment => event => {
    //console.log(event.target.value)
    setCommentValues({ ...commentValues, [comment]: event.target.value })
  }


  /*
  //function to remove the comment when clicked by an admin
  const clickDeleteComment = (delCommentId) => {
    remove({
      commentId: delCommentId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }
  }
  */

  const clickSubmit = () => {
    commentValues.name = "testname"
    const commentData = {
      name: commentValues.name || undefined,
      comment: commentValues.comment || undefined
    }

    create(commentData).then((data) => {
      if (data.error) {
        setCommentValues({ ...commentValues, error: data.error})
      } else {
        setCommentValues({ ...commentValues, error: '', open: true})
      }
    })
  }


  const [jokes, setJokes] = useState({
    joke: 'No joke',
    error: ''
  })

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal



    listComment(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setComments(data)
      }
    })

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })




    /*
    joke(signal).then((data) => {
    const stringData = auth.isAuthenticated()
      if (data && data.error) {
        //console.log("error in getting jokes: " + data.error)
        //setJokes(...jokes, error: data.error)
      } else {
        //console.log("Here is the user data: " + data)
        if (data != undefined){
        
          console.log("setting the data")
          console.log(stringData)
          setJokes(data)
        }
      }
    })
    */

    return function cleanup(){
      abortController.abort()
    }
  }, [])

    return (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            The home for conventionally unattractive animal advocates!
          </Typography>
          <CardMedia className={classes.media} image={swimImage} title="An expert swimmer"/>
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">guess who selected function over form?</Typography>
          
          <CardContent>
          <div>
          <canvas style={{margin: 0}}></canvas>
          <script src="public/Game.js"></script>


          </div>
            <Typography variant="body1" component="p">
              Have something to say?

              {/*
              test to see if authenticated
              {auth.isAuthenticated() ? <div> if true show </div> : ''}
              
              {jokes.joke}
              */}

              <div>
              <TextField
                id="comment"
                className={classes.textField}
                label="comment here"
                variant="filled"
                style={{alignSelf: 'flex-start'}}
                value={commentValues.comment}
                onChange={handleChange('comment')}
                />

                    <button
                        id="comment-button"
                        label="submit!"
                        variant="secondary"
                        size="lg"
                        style={{height: '50px', width : '100px', margin:6}}
                        onClick={clickSubmit}
                        className={classes.submit}>
                        submit!
                    </button>

                    <Dialog open={commentValues.open} 
                    disableBackdropClick={false}>
                        <DialogTitle>Thanks for commenting!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                New comment posted
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Link to="/">
                                <Button 
                                color="primary" 
                                autoFocus="autoFocus" 
                                variant="contained"
                                onClick={refreshPage}>
                                    continue
                                </Button>
                            </Link>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>           
              
                <Paper 
                className={classes.root} 
                elevation={4}
                >
                    <Typography variant="h6" className={classes.title}>
                        All Comments
                    </Typography>
                    <List dense
                    style={{maxHeight: 200, overflow: 'auto'}}>
                        {comments.slice().reverse().map((item, i) => {
                        return <Link to={"/user/" + item.user} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                            <ListItemText primary={item.comment}
                            secondary = {format(parseISO(item.created), 'yyyy/MM/dd kk:mm')}
                            />
                            {/*
                            adds a button to delete, if you are an admin, could just be done through database
                            <ListItemSecondaryAction>

                                <IconButton
                                onClick={clickDeleteComment(item._id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            */}
                            </ListItem>
                        </Link>
                        })
                        }
                    </List>
                </Paper>
                


                </div>
            </Typography>
          </CardContent>
        </Card>
    )
}
