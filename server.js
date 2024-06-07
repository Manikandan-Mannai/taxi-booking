const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'friendstaxi22@gmail.com',
        pass: 'qbae yzeo nprm voyu'
    }
});

app.post('/send-email', (req, res) => {
    const { id: generatedID, name, email, start, end, route, pickupDateTime, transactionId, selectedCar, distance, price, dropDate, dropTime, phoneNumber, pickDate, pickTime, adultCount, childCount, luggageCount, pickUpAddress, dropAddress, termsAccepted } = req.body;

    const mailOptions = {
        from: 'friendstaxi22@gmail.com',
        to: [email, 'adiraipattucars@gmail.com'],
        subject: 'Taxi Booking Invoice',
        html: `
        <h1>Friends Taxi</h1>
 <b>ID: ${generatedID}</b>
 <p>Name: ${name}</p>
 <p>Email: ${email}</p>
 <p>Advanced Payment transactionId: ${transactionId}</p>
 <p>Phone Number: ${phoneNumber}</p>

    <p>Start: ${start}</p>
    <p>End: ${end}</p>
    <p>Selected Car: ${selectedCar}</p>
    <p>Price: ₹${price}</p>
    

    <p>Drop Date: ${dropDate}</p>
    <p>Drop Time: ${dropTime}</p>
    <p>Pick Date: ${pickDate}</p>
    <p>Pick Time: ${pickTime}</p>

    <p>Adult Count: ${adultCount}</p>
    <p>Child Count: ${childCount}</p>
    <p>Luggage Count: ${luggageCount}</p>

    <p>Pick Up Address: ${pickUpAddress}</p>
    <p>Drop Address: ${dropAddress}</p>
    <p>Terms Accepted: ${termsAccepted ? 'Yes' : 'No'}</p>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Booking successful! Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
