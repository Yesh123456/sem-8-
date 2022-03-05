import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Chatbot from "./Chatbot";
import ReportPop from "./templates/ReportPop";
import CustomLottie from './templates/CustomLottie';
import art from './data/chat.json';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#2b303e',
        height: '10vh'
    },
    content: {
        [theme.breakpoints.up('md')]: {
            height: '90vh',
            textAlign: 'center'
        },
        textAlign: 'center'
    },
    header: {
        [theme.breakpoints.up('md')]: {
            fontFamily: 'Lobster', 
            color: 'white', 
            float: 'left', 
            paddingLeft: 30
        },
        fontFamily: 'Lobster', 
        color: 'white', 
        fontSize: 20,
        float: 'left', 
        paddingLeft: 5
    },
    goBack: {
        [theme.breakpoints.up('md')]: {
            float: 'right', 
            color: 'orange', 
            paddingRight: 30, 
            paddingLeft: 30,
            '&:hover': {
                fontWeight: 'bolder'
            }
        },
        float: 'right', 
        color: 'orange', 
        '&:hover': {
            fontWeight: 'bolder'
        }
    }
}));

function Consult() {
    const [helloDoc, setHelloDoc] = useState(false);
    const [disBtn, setDisBtn] = useState(true);
    const [disLottie, setLottie] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setHelloDoc(true);
        if( window.screen.width <= 600 ){
            setLottie(false)
        }
    }, []);

    const disableButton = () => {
        setDisBtn(false);
    };

    const formSuccess = () => {
        setFormSubmit(true);
    };

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.navbar}>
                <Typography variant='h6' className={classes.header}>
                    Doctor Chatbot
                </Typography>
                <BackButton title="End Chat" redirect="/" />
                { 
                    disBtn && 
                    <ReportPop dis={disableButton} formSub={formSuccess} /> 
                }
            </Grid>
            {
                disLottie && 
                <Grid item xs={12} md={5} className={classes.content}>
                    <CustomLottie lotti={art} />
                </Grid>
            }
            <Grid item xs={12} md={7} className={classes.content}>
                <Chatbot />
            </Grid>
            { 
                helloDoc && 
                <CustomAlert 
                    type="info" 
                    title="Say Hello to Doctor Chatbot!" 
                    b1="Start Typing" 
                    b2="Hi" 
                /> 
            }
            { 
                formSubmit && 
                <CustomAlert 
                    type="success" 
                    title="Report Submitted Successfully" 
                    b1="Continue Chatting" 
                    b2="Submitted" 
                /> 
            }
        </Grid>
        </>
    )
}

function CustomAlert(args) {
    const [open, setOpen] = useState(true);

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={args.type}>
                <AlertTitle>{args.title}</AlertTitle>
                {args.b1} — <strong>Say '{args.b2}'</strong>
            </Alert>
        </Snackbar>
        </>
    )
}

function BackButton(params){
    const history = useHistory();
    const classes = useStyles();

    const goBack = () => {
        console.log("Erasing Data.....");
        fetch('/clear', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => {
            if( resp.status === 200 ){
                return resp.json()
            }
        }).then( data => console.log(data) )
        .then(err => console.log(err))

        console.log("Redirecting/Refreshing....");
        history.push(params.redirect);
    };

    return (
        <Button onClick={goBack} className={classes.goBack}> 
            {params.title} 
        </Button>
    )
}

export default Consult
