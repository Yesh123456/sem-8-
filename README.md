# Doctor Chatbot v2
This is Version 2 (Revamped Edition) of Doctor Chatbot Project, re-built using React, Flask & Heroku! (Also SQLAlchemy and Gmail API - Google Cloud)

Link: https://doctor-chatbot-project.herokuapp.com/

Link to Original Version of Project (v1): https://github.com/SherwinRF/Doctor_Chatbot/

**Requirements:** Python & Node.js

# Environment Setup
* Create a folder for Project. Open command prompt inside this folder and create a [Python Virtual Environment](https://docs.python.org/3/tutorial/venv.html) called **Doctor_Chatbot** using command `python -m venv Doctor_Chatbot`. Activate the **venv** using command: `Doctor_Chatbot\Scripts\activate`. *In order to deactivate **venv**, just enter command `deactivate`.*
* After creating a **venv**, you can clone this Repository in that project folder.
* Install Python Dependencies: `pip install -r requirements.txt`
* Goto **doctorchatbot** folder (`cd doctorchatbot`), and install Node Dependencies: `npm install`.
* If any new Python Dependencies are installed, run `pip freeze > requirements.txt` in main project Folder.

# Run & Deploy the Project
* Run `python connection.py` in the folder where the **connection.py** file is present. This will activate the Flask Server (http://127.0.0.1:5000/). This link will run the Static Web files present in *doctorchatbot/build* folder.
* In order to React React App, **doctorchatbot** folder (`cd doctorchatbot`) and use command `npm start`. **Note:** the fetch routes will be fetched from the *proxy* link as configured in the **package.json** file. (You can Temporary change to http://127.0.0.1:5000/ for local testing, use [ngrok](https://ngrok.com/download/) to connect to Dialogflow).
* Dialogflow Fulfillment is already configured with https://doctor-chatbot-project.herokuapp.com/webhook
* After completing the React App changes, run `npm run build` to generate the static files in the Build folder!
* After completing all changes, use *git status* to check all changes, then do git add, commit & push to Deploy code to Github Repository. All changes to the main branch will automatically be deployed to Heroku App!

# Debug Python Logs
* Open command prompt, and enter `heroku login`, and login into Heroku Account. *To logout, enter `heroku logout`.*
* Enter `heroku logs --tail --app doctor-chatbot-project` to check the logs.

# Gmail SMTP Issue
* **UPDATE:** I've used Gmail API to send email, So the below steps are not required (as they're used for the original version SMTP code). [Tutorial](https://learndataanalysis.org/how-to-use-gmail-api-to-send-an-email-in-python/), [API Docs](https://developers.google.com/gmail/api/guides/sending).
* Checking allow low secure apps in Google settings (it was already on, tried turing it off and back on):
https://www.google.com/settings/security/lesssecureapps
* Unlock captcha link: https://accounts.google.com/DisplayUnlockCaptcha
* Google will send security Notification, just tap on ***Yes*** or ***Yes, It was me*** to ensure Google Authorizes valid login!