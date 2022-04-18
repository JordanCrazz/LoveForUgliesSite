//import React from 'react'
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import testImage from './../assets/images/testImage.png'
import swimImage from './../assets/images/swimmingMammal.jpg'
import sealImage from './../assets/images/SealMyDad.jpg'
import amazingImage from './../assets/images/GeckoAmazing.jpg'
import screamImage from './../assets/images/screamMonkey.jpg'
import auth from './../auth/auth-helper'
//import {read} from './api-user.js'
import {Link} from 'react-router-dom'
import {listadmin} from './../user/api-user.js'
import {joke} from '../thirdparty/api-dadjokes.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
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
  const [value, setValue] = useState("")
  const handleChange = e => {
    console.log(e.target.value)
    setValue(e.target.value)
  }
  const [jokes, setJokes] = useState({
    joke: 'No joke',
    error: ''
  })

    

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

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
            <Typography variant="body1" component="p">
              Have something to say?
              {
              /*
              test to see if authenticated
              {auth.isAuthenticated() ? <div> if true show </div> : ''}
              
              {jokes.joke}
              */
              }
              <div>
              <TextField
                id="comment-box"
                label="comment here"
                variant="filled"
                style={{alignSelf: 'flex-start'}}
                value = {value}
                onChange = {handleChange}
                />



                    <button
                        id="comment-button"
                        label="submit!"
                        variant="secondary"
                        size="lg"
                        style={{height: '50px', width : '100px', margin:6}}
                        >
                        submit!
                    </button>

                </div>
                <div>


                comment list goes here



                </div>
            </Typography>
          </CardContent>
        </Card>
    )
}
