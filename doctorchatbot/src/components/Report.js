import { Formik, Form } from 'formik';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import BackupIcon from '@material-ui/icons/Backup';

import CustomText from './templates/CustomText';
import CustomSubmit from './templates/CustomSubmit';
import CustomSelect from './templates/CustomSelect';

import { REPORT_VALIDATE, INIT_REPORT } from './data/data';
import reportData from './data/report_select.json';
import helpers from './data/helpers.json';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 50,
            paddingTop: 30
        },
        paddingLeft: 10,
        paddingTop: 20
    },
    inputWidth: {
        [theme.breakpoints.up('md')]: {
            width: '90vh',
            paddingBottom: 20
        },
        width: '50vh',
        paddingBottom: 20
    },
    LongInputWidth: {
        [theme.breakpoints.up('md')]: {
            width: '192vh',
            paddingBottom: 20
        },
        width: '50vh',
        paddingBottom: 20
    },
    reportBtn: {
        backgroundColor: '#2b303e',
        color: 'white',
        width: '52vh',
        height: '8vh',
        borderRadius: 50,
        marginBottom: 20,
        marginRight: 10
    }
}));

function Report(props) {
    const classes = useStyles();

    const submitForm = (data) => {
        console.log("---- Sending Report Data ----");
        fetch('/report', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(data => { 
            console.log('Successfully Sent Report Data:', data);
            props.formSub();
        })
        .catch((error) => { 
            alert("Something Went Wrong! Form is not Submitted! You may still continue to chat with the Bot!");
            console.error('Failed to Sent Report Data:', error); 
        });

        props.close();
        props.dis();
    }

    return (
        <div>
            <Formik 
                initialValues={{ ...INIT_REPORT }}
                validationSchema={REPORT_VALIDATE}
                onSubmit={ submitForm } 
                >
                <Form>
                    <Grid container className={classes.root}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="age"
                                    label="Enter Your Age"
                                    helperText="Age"
                                    className={classes.inputWidth}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="gender"
                                    label="Select Your Gender"
                                    helperText="Gender"
                                    className={classes.inputWidth}
                                    options={reportData.gender}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="chestPain"
                                    label="Chest Pain Types"
                                    helperText="Type Of Chest Pain"
                                    className={classes.inputWidth}
                                    options={reportData.chestPain}
                                />
                                <Help text={helpers.chestPain} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="restingBloodPressure"
                                    label="Resting Blood Pressure"
                                    helperText="Blood Pressure (mmHg)"
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.restingBloodPressure} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="serumCholestoral"
                                    label="Serum Cholesterol"
                                    helperText="Cholesterol Value (mg/dl)"
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.serumCholestoral} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="fastingBloodSugar"
                                    label="Fasting Blood Sugar"
                                    helperText="Fasting Blood Sugar > 120mg/dl"
                                    className={classes.inputWidth}
                                    options={reportData.fastingBloodSugar}
                                />
                                <Help text={helpers.fastingBloodSugar} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <CustomSelect
                                    name="restingECG"
                                    label="Resting ECG"
                                    helperText="Resting ECG"
                                    options={reportData.restingECG}
                                    className={classes.LongInputWidth}
                                />
                                <Help text={helpers.restingECG} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="maxHeartRateAchieved"
                                    label="Max. Heart Rate Achieved"
                                    helperText="Max. Heart Rate"
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.maxHeartRateAchieved} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="exerciseInducedAngina"
                                    label="Exercise Induced Angina"
                                    helperText="Exercise Induced Angina"
                                    options={reportData.exerciseInducedAngina}
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.exerciseInducedAngina} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="stDepressionInducedByExercise"
                                    label="ST Depression Induced by Exercise"
                                    helperText="ST Depression Value"
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.stDepressionInducedByExercise} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="peakExerciseSTSegment"
                                    label="Peak Exercise ST Segment"
                                    helperText="Peak Exercise ST Segment"
                                    options={reportData.peakExerciseSTSegment}
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.peakExerciseSTSegment} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CustomText 
                                    name="numberOfMajorVesselsColoredByFlourosopy"
                                    label="Number of Major Vessels Colored by Fluoroscopy"
                                    helperText="Fluoroscopy Result Value"
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.numberOfMajorVesselsColoredByFlourosopy} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomSelect
                                    name="thalassemia"
                                    label="Thalassemia"
                                    helperText="Thalassemia"
                                    options={reportData.thalassemia}
                                    className={classes.inputWidth}
                                />
                                <Help text={helpers.thalassemia} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} align='center'>
                                <CustomSubmit 
                                    child="Submit Report" 
                                    type='submit'
                                    startIcon={<BackupIcon />} 
                                    className={classes.reportBtn} 
                                />
                                <CustomSubmit 
                                    child="Reset Report" 
                                    type='reset'
                                    startIcon={<CancelIcon />} 
                                    className={classes.reportBtn} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    )
}

function Help(args) {
    return(
        <Tooltip title={args.text}>
            <HelpIcon fontSize="medium" />
        </Tooltip>
    )
}

export default Report
