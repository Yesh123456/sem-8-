from .Google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendEmail( mailto, doctor, date, time, name, report ):
    if mailto == "":
        print("Email is Empty!")
        mailto = "sherwinrf11@gmail.com"
        
    sub = "Confirmed: Doctor Appointment Booked"
    if (len(report) == 0): report = "Checkup"
    msag = f"Hey {name},\n\nYour Appointment has been Successfully Booked with Dr. {doctor}.\n\nDate : {date}\nTime : {time}\nProblem : {report}\n\nThank you for using Doctor Chatbot."
    msg = 'Subject: {}\n\n{}'.format(sub, msag)
    
    sub2 = f"Appointment Booked with Doctor {doctor} on {date}"
    msag2 = f"Patient Email: {mailto}\n\nReport: {report}"
    msg2 = 'Subject: {}\n\n{}'.format(sub2, msag2)
    
    try:
        CLIENT_SECRET_FILE = 'modules/client_secret.json'
        API_NAME = 'gmail'
        API_VERSION = 'v1'
        SCOPES = ['https://mail.google.com/']
        service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

        emailMsg = msg
        mimeMessage = MIMEMultipart()
        mimeMessage['to'] = mailto
        mimeMessage['subject'] = sub
        mimeMessage.attach(MIMEText(emailMsg, 'plain'))
        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
        message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
        print("---- User Email Sent! ----\n", message)

        emailMsg = msg2
        mimeMessage = MIMEMultipart()
        mimeMessage['to'] = "doctor.chatbot.project@gmail.com"
        mimeMessage['subject'] = sub2
        mimeMessage.attach(MIMEText(emailMsg, 'plain'))
        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
        message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
        print("---- Admin Email Sent! ----\n", message)
    except Exception as e:
        print(f"Error while Sending Email: {e}")
    return




