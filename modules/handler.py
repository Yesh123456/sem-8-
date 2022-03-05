from .pygmail import sendEmail

def makeWebhookResult(db, AllData, query_response):
    getDBwb = AllData.query.filter_by(id="public").first()
    action = query_response.get("action")
    parameters = query_response.get("parameters")
    queryText = query_response.get("queryText")
    confirmation = parameters.get("Confirmation")
    sendResponse = { "fulfillmentText": "", }
    
    # Checkup_Patient_gender
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Checkup_Patient-custom":
        # Patient_Name
        getDBwb.name = parameters.get('given-name')
        db.session.commit()
        sendResponse["fulfillmentText"] = f"OK { parameters.get('given-name') }, Please fill and submit the report form on the top right side.... Type 'submitted' or 'done' after submitting!"
        return sendResponse
    
    # Checkup_Patient_filling
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Checkup_Patient-custom.Checkup_Patient_gender-custom":
        sendResponse["fulfillmentText"] = f"Thanks {getDBwb.name}, after analysing the information you have given us, The System Predicts that {getDBwb.predict} Please note, this is not a diagnosis. Always visit a doctor if you are in doubt, or if your symptoms get worse or don't improve. If your situation is serious, always call the emergency services. Do you want to book an appointment with a doctor?"
        return sendResponse
        
    ############ Suffering Patient ##########################
    
    # Suffering_Patient
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom":
        # Main Problem
        getDBwb.problem = parameters.get("Symptoms")
        if parameters.get("Symptoms") == "Chest Pain": 
            getDBwb.solution = "A pain reliever, such as aspirin, can help alleviate the heart/chest pain associated with less severe cases. When heart pain strikes, lying down immediately with the head elevated above the body may bring some relief. A slightly upright position helps when the pain is due to reflux."
        elif parameters.get("Symptoms") == "High Blood Pressure": 
            getDBwb.solution = "Blood pressure often increases as weight (Obesity) increases. Regular physical activity such as 150 minutes a week can lower your blood pressure by about 5 to 8 mm Hg if you have high blood pressure. Eating a diet that is rich in whole grains, fruits, vegetables and low-fat dairy products and skimps on saturated fat and cholesterol can lower your blood pressure by up to 11 mm Hg if you have high blood pressure. Chronic stress and also smoking may contribute to high blood pressure, so avoid that."
        elif parameters.get("Symptoms") in("breathing problems", "breathlessness"): 
            getDBwb.solution = "Breathing-in deeply through the abdomen and also ursed-lip breathing can help to manage your breathlessness. Finding a comfortable and supported position to stand or lie in can help to relax and catch your breath. Inhaling steam can help to keep nasal passages clear, which can help to breathe more easily. Drinking black coffee may help to treat breathlessness, reducing tiredness in the airway muscles. Being overweight also can cause disrupted breathing while you sleep (sleep apnea)."
        elif parameters.get("Symptoms") in("sleeping", "sleep"): 
            getDBwb.solution = "Set yourself up for restful sleep: Stick to a regular sleep/wake schedule. Turn off the TV, computer, and other devices before bedtime. Keep your bedroom cool and dark. Avoid alcohol before bedtime and caffeine in the afternoon or evening. Exercise every morning."
        else: getDBwb.solution = "Don't have any Solutions available for your Problem!"
        db.session.commit()

    # Suffering_Patient_symp_dur
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom":
        # Duration
        getDBwb.symptom_duration = queryText
        db.session.commit()

    # Suffering_Patient_Q2
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom":
        # Q. Heart Disease
        if confirmation == 'Yes':
            getDBwb.questions += "You had Heart Disease before, "
            db.session.commit()
        
    # Suffering_Patient_Q3
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom.Suffering_Patient_Q2-custom":
        # Q. Diabetes
        if confirmation == 'Yes':
            getDBwb.questions += "You have/had Diabetes, "
            db.session.commit()
        
    # Suffering_Patient_Q4
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom.Suffering_Patient_Q2-custom.Suffering_Patient_Q3-custom":
        # Q. High Blood Pressure
        if confirmation == 'Yes':
            getDBwb.questions += "You have/had High Blood Pressure, "
            db.session.commit()
        
    # Suffering_Patient_Q5
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom.Suffering_Patient_Q2-custom.Suffering_Patient_Q3-custom.Suffering_Patient_Q4-custom":
        # Q. Chronic Obstructive Lung Disease/Asthma
        if confirmation == 'Yes': 
            getDBwb.questions += "You've suffered from Asthma OR Chronic Obstructive lung disease, "
            db.session.commit()

    # Suffering_Patient_Q6
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom.Suffering_Patient_Q2-custom.Suffering_Patient_Q3-custom.Suffering_Patient_Q4-custom.Suffering_Patient_Q5-custom":
        # Q. Smoking
        if confirmation == 'Yes':
            getDBwb.questions += "You're Smoking (or smoked before), "
            db.session.commit()
        
    # Suffering_Patient_sym1
    if action == "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.Suffering_Patient-custom.Suffering_Patient_symp_dur-custom.Suffering_Patient_Q2-custom.Suffering_Patient_Q3-custom.Suffering_Patient_Q4-custom.Suffering_Patient_Q5-custom.Suffering_Patient_Q6-custom":
        # Q.  brain stroke/ Overweight/Obese / Kidney Disease
        if confirmation == 'Yes':
            getDBwb.questions += "You have/had: Brain Stroke OR Kidney Disease OR Obesity Problem."
            db.session.commit()

    # Suffering_Patient_sym2
    if action == "symp1":
        ''' Q. - Chest Pain worse on breathing in.
            - Burning pain in chest/upper abdomen.
            - Chest pain caused by pressing the chest.
            - Chest pain worse on movement.  - None '''
        if queryText not in("none","None"):
            getDBwb.other_symptoms += queryText + ", "
            db.session.commit()
    
    # Suffering_Patient_sym3
    if action == "Suffering_Patient_sym2.Suffering_Patient_sym2-custom":
        ''' Q. - Chest pain while resting.
            - Sudden chest pain.
            - Shortness of Breadth.
            - Fast or Shallow breathing. - None ''' 
        if queryText not in("none","None"):
            getDBwb.other_symptoms += queryText + ", "
            db.session.commit()
        
    # Suffering_Patient_sym_final
    if action == "Suffering_Patient_sym2.Suffering_Patient_sym2-custom.Suffering_Patient_sym3-custom":
        ''' Q. - Feeling your heart racing or skipping a beat.
            - Chest pain spreading to the left arm.
            - Chest pain spreading on physical effort.
            - Joint/Abdominal pain. - None
            
            - Chest Tightness.
            - Unusually Tired.
            - Anxiety .
            - Chest pain spreading the Jaw. - None '''
        if queryText not in("none","None"):
            getDBwb.other_symptoms += queryText + "."
            db.session.commit()
        
        ###### Create Report ############
        getDBwb.report += f"To Summarize: You had {getDBwb.problem} for {getDBwb.symptom_duration} duration. {getDBwb.questions}"
        if getDBwb.other_symptoms != "":
            getDBwb.report += f"and also have symptoms like {getDBwb.other_symptoms}"
        if getDBwb.questions == "":
            getDBwb.report += "You didn't have any of the above mentioned symptoms!"
        db.session.commit()

    # Suffering_Patient_sym_report_filling
    if action == "Suffering_Patient_sym2.Suffering_Patient_sym2-custom.Suffering_Patient_sym3-custom.Suffering_Patient_sym_final-custom.Suffering_Patient_sym_report_yes-custom":
        getDBwb.name = parameters.get('given-name')
        db.session.commit()
        
    # Suffering_Patient_sym_report_results
    if action == "Suffering_Patient_sym2.Suffering_Patient_sym2-custom.Suffering_Patient_sym3-custom.Suffering_Patient_sym_final-custom.Suffering_Patient_sym_report_yes-custom.Suffering_Patient_sym_report_filling-custom":
        sendResponse["fulfillmentText"] = f"Thanks {getDBwb.name}, after analysing the information you have given us, The System Predicts that {getDBwb.predict} {getDBwb.report}. Some ways how you can avoid this problem are: {getDBwb.solution} --> Please note, this is not a diagnosis. Always visit a doctor if you are in doubt, or if your symptoms get worse or don't improve. If your situation is serious, always call the emergency services. Do you want to book an appointment with a doctor?"
        return sendResponse
    
    # Suffering_Patient_sym_report_no
    if action == "Suffering_Patient_sym2.Suffering_Patient_sym2-custom.Suffering_Patient_sym3-custom.Suffering_Patient_sym_final-custom":
        sendResponse["fulfillmentText"] = f"OK, {getDBwb.report}. Some ways how you can avoid this problem are: {getDBwb.solution} --> Please note, this is not a diagnosis. Always visit a doctor if you are in doubt, or if your symptoms get worse or don't improve. If your situation is serious, always call the emergency services. Do you want to book an appointment with a doctor?"
        return sendResponse
        
    ######## DOCTOR SECTION ##########
    
    # app_date_time
    if action == "doctors_list.doctors_list-custom":
        getDBwb.doctor = queryText
        db.session.commit()
    
    # app_booked
    if action == "doctors_list.doctors_list-custom.app_date_time-custom":
        sendEmail( mailto = getDBwb.email, 
                    doctor = getDBwb.doctor, 
                    date = parameters.get("date"), 
                    time = parameters.get("time"), 
                    name = getDBwb.name, 
                    report = getDBwb.report
                )
        
    return sendResponse