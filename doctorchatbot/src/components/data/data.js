import * as yup from 'yup';

export const REPORT_VALIDATE = yup.object().shape({
    chestPain: yup.number().integer().required("What Type of Chest Pain?"),
    fastingBloodSugar: yup.number().integer().required("Please Select Yes or No"),
    restingECG: yup.number().integer().required("Please Select Resting ECG Type"),
    exerciseInducedAngina: yup.number().integer().required("Please Select Yes or No"),
    peakExerciseSTSegment: yup.number().integer().required("Please Select an Option"),
    thalassemia: yup.number().integer().required("Select Thalassemia Type?"),
    gender: yup.number().integer().required("Male or Female?"),

    restingBloodPressure: yup.number("Enter a Number").positive().integer().min(50).max(300).required("Blood Pressure Value (mmHg).."),
    serumCholestoral: yup.number("Enter a Number").positive().integer().min(100).max(300).required("Cholesterol Value (mg/dl).."),
    maxHeartRateAchieved: yup.number("Enter a Number").positive().integer().min(50).max(300).required("Max. Heart Rate..."),
    stDepressionInducedByExercise: yup.number("Enter a Number").min(0).max(10).required("Enter ST Depression Value.."),
    numberOfMajorVesselsColoredByFlourosopy: yup.number("Enter a Number").integer().min(0).max(10).required("Enter Fluoroscopy Value.."),
    age: yup.number("Enter a Number").positive().integer().min(1).max(150).required("Enter Age..")
});

export const INIT_REPORT = {
    chestPain: '',
    fastingBloodSugar: '',
    restingECG: '',
    exerciseInducedAngina: '',
    peakExerciseSTSegment: '',
    thalassemia: '',

    restingBloodPressure: '',
    serumCholestoral: '',
    maxHeartRateAchieved: '',
    stDepressionInducedByExercise: '',
    numberOfMajorVesselsColoredByFlourosopy: '',
    age: '',
    gender: ''
};

export const EMAIL_VALIDATE = yup.object().shape({
    email: yup.string()
                .email("Invalid Email Format")
                .required("Please Provide Email to proceed..."),
    terms: yup.boolean()
                .oneOf([true], 'You must Agree the Terms and Conditions')
                .required("Please Accept Terms & Conditions!")
});

export const INIT_EMAIL = {
    email: '',
    terms: false
};