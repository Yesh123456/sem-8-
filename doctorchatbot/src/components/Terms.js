import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Terms() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Read Terms and Conditions
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Doctor Chatbot Privacy Policy
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This Privacy Policy applies to the practices of Doctor Chatbot concerning information that is obtained by and through your use of our website, web application or mobile application and the services provided through the Application. Doctor Chatbot is committed to respecting your privacy and recognizing your need for appropriate protection and management of personally identifiable information (“PII”) and the information you share. The purpose of this Privacy Policy is to explain the types of information This Project obtains about users of our Application and/or Services, how the information is obtained, how it is used, how it is disclosed, how you can get access to this information, and the choices you have regarding our use of, and your ability to review and correct, the information. By using the Application and/or the Services, you are accepting and consenting to the use of your information as described in this Policy and you agree to be bound by this Policy. Please review this Policy carefully. <br/><br/>
            This Privacy Policy applies only to this Application and Services and becomes effective as soon as you use the Application. Any other services rendered by any independent provider are subject to that particular provider’s own privacy standards or policies.
          </Typography>
          <br/>
          <Typography gutterBottom variant='h6'>
            Terms and Conditions
          </Typography>
          <Typography gutterBottom>
          The only PII that the Application obtains is information that you voluntarily provide or authorize. When you use our Services, we collect PII such as your name, age, gender, email address etc. We also may collect PII or Protected Health Information (“PHI”) from you when you make a request to be connected with an independent medical practice, which may provide an on-call licensed physician to provide non-emergency general adult and pediatric healthcare services at your location; create a profile; or comment on articles or complete surveys. <br/><br/>
          The information that we collect varies depending upon how you use our Services. When you choose to Enroll, you will need to provide us with health-related information that a provider will need to determine whether he/she is willing to provide services to you. That information will be associated with your profile. Any PHI that you provide through the Application briefly describing your symptoms (or those of any minor for whom you request Services) will be sent to our employed medical provider or an independent alternate provider to be used for treatment and processing your payment for the Visit, and other services. All providers are bound to protect all PHI of patients in accordance with HIPAA rules, as outlined in our Notice of Privacy Practices.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#2b303e">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}