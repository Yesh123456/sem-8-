from .SVM import svm_pred

def checkDisease(getreport):

    print("---- Predicting Presence of Heart Disease or not ----")
    prediction = 2
    try:
        prediction = svm_pred(age = int(getreport["age"]), 
                                sex = int(getreport["gender"]), 
                                cp = int(getreport["chestPain"]), 
                                trestbps = int(getreport["restingBloodPressure"]), 
                                chol = int(getreport["serumCholestoral"]), 
                                fbs = int(getreport["fastingBloodSugar"]), 
                                restecg = int(getreport["restingECG"]), 
                                thalach = int(getreport["maxHeartRateAchieved"]), 
                                exang = int(getreport["exerciseInducedAngina"]), 
                                oldpeak = float(getreport["stDepressionInducedByExercise"]), 
                                slope = int(getreport["peakExerciseSTSegment"]), 
                                ca = int(getreport["numberOfMajorVesselsColoredByFlourosopy"]), 
                                thal = int(getreport["thalassemia"])
                            )
    except Exception as e:
        print(type(e).__name__, e)
    finally:
        if prediction == 0: 
            print("---- No Heart Disease ----")
            return "Your Report Looks Fine."
        elif prediction == 1: 
            print("---- Heart Disease Present ----")
            return "You may be suffering from a Heart Disease/Problem!"
        else: 
            print("---- Can't Really Predict! ----")
            return "Can't Really Predict if Heart Disease is present or not!"