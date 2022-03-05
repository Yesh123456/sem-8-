import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import Terms from './Terms';
import CustomText from './templates/CustomText';
import CustomCkBox from './templates/CustomCkBox';
import CustomSubmit from './templates/CustomSubmit';
import CustomLottie from './templates/CustomLottie';

import { EMAIL_VALIDATE, INIT_EMAIL } from './data/data';
import hello from './data/hello.json';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    welcome: {
        [theme.breakpoints.up('md')]: {
            height: '70vh',
            textAlign: 'center',
            marginTop: 60
        },
        textAlign: 'center',
        padding: 20
    },
    lottie: {
        [theme.breakpoints.up('md')]: {
            height: '90vh'
        }
    },
    form: {
        [theme.breakpoints.up('md')]: {
            width: '70vh'
        },
        width: '50vh'
    },
    chatBtn: {
        backgroundColor: '#2b303e',
        color: 'white',
        width: '45vh',
        height: '8vh',
        borderRadius: 50,
        border: '2px solid orange'
    },
    footer: {
        height: '10vh',
        textAlign: 'center',
        borderTop: '1px solid #2b303e'
    }
}));

function Home() {
    const history = useHistory();
    const classes = useStyles();
    
    const goToConsult = (data) => {
        console.log("---- Sending Email ----");
        fetch('/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(data => { 
            console.log('Successfully Sent Email:', data); 
            history.push("/consult");
        })
        .catch((error) => { 
            console.error('Failed to Sent Email:', error); 
            alert("Couldn't Send Email! Please check your Network Connection!")
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} className={classes.welcome}>
                    <Typography variant='h2' style={{ fontFamily: 'Lobster' }}>
                        Welcome to Doctor Chatbot
                    </Typography>
                    <Typography variant='h4' style={{ fontFamily: 'Dancing Script' }}>
                        A Heart Disease Prediction System
                    </Typography>  
                    <Formik 
                        initialValues={{ ...INIT_EMAIL }}
                        validationSchema={EMAIL_VALIDATE}
                        onSubmit={ goToConsult } 
                        >
                        <Form>
                            <br/>
                            <CustomText 
                                name="email"
                                label="Please Enter Your Email to Continue..."
                                className={classes.form}
                            />
                            <br/><br/>
                            <CustomCkBox
                                name="terms" 
                                legend="Please Agree Terms and Conditions"
                                label="I Agree Terms and Conditions"
                            />
                            <Terms />
                            <br/>
                            <CustomSubmit 
                                child="Chat with Doctor" 
                                startIcon={<QuestionAnswerIcon />} 
                                className={classes.chatBtn}
                            />
                        </Form>
                    </Formik>
                </Grid>
                <Grid item xs={12} md={5} className={classes.lottie} >
                    <CustomLottie lotti={hello} />
                </Grid>
                <Grid item xs={12} className={classes.footer}>
                    <Typography variant='h6' style={{ fontFamily: 'Indie Flower' }}>
                        B.E. Final Year Project, Made by Sherwin, Rutvij, Preston and Macklon
                    </Typography>
                </Grid>
            </Grid>
            
        </>
    )
}

export default Home
