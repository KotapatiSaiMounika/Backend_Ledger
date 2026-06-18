require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name){
  const subject = 'Welcome to Backend Ledger!';
  const text = `Hi ${name},\n\nThank you for registering with Backend Ledger! We're excited to have you on board.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>Thank you for registering with Backend Ledger! We're excited to have you on board.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}


async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful!";
  const text = `Hello ${name},

Your transaction of $${amount} to account ${toAccount} was completed successfully.

Thank you,
${userName}`;

  const html = `
    <h2>Transaction Successful </h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>
      Your transaction of <strong>$${amount}</strong>
      to account <strong>${toAccount}</strong>
      was completed successfully.
    </p>
    <p>Thank you,<br>${userName}</p>
  `;
  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount){
  const subject='Transaction Failed!'
  const text = `Hello ${name},

We could not process your transaction of ₹${amount} to account ${toAccount}.

Please check your account balance and try again.

Backend Ledger Team`;

 const html = `
    <h2>Transaction Failed </h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>
      We could not process your transaction of
      <strong>₹${amount}</strong> to account
      <strong>${toAccount}</strong>.
    </p>
    <p>Please check your account balance and try again.</p>
    <p>Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);

}


module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
}