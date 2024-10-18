import {Feedback} from '../../models/index.js';
import nodemailer from 'nodemailer';

const sendFeedbackEmail = async (name, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Your Feedback!',
            html: `
                <h3>Dear ${name},</h3>
                <p>We have received your feedback and appreciate you taking the time to share your thoughts with us.</p>
                <p>Your feedback is valuable in helping us improve our services.</p>
                <br>
                <p>We may reach out if we need further details. In the meantime, feel free to contact us for any further queries.</p>
                <br>
                <p>Best regards,</p>
                <p>Your Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Feedback email sent successfully.');
    } catch (error) {
        console.error('Error sending feedback email:', error);
    }
};

export const feedBack = async (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body)
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();

        await sendFeedbackEmail(name, email);

        return res.status(200).send({ message: 'Feedback submitted successfully and confirmation email sent.' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return res.status(500).send({ message: 'Failed to submit feedback.' });
    }
};

export default feedBack