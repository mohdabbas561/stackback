const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mohammadabbas561:Abbas%40786@user.a1vg4sd.mongodb.net/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  });

module.exports = mongoose.model('User', UserSchema);
const PORT = process.env.PORT || 5000;

const User = mongoose.model('User', UserSchema);



app.post('/api/users', async (req, res) => {
try {
const user = new User(req.body);
var transport = nodemailer.createTransport({
    service: "hotmail",
    
    auth: {
      user: "testfornode123@outlook.com",
      pass: "Abbas@786"
    }
  });

const mailOptions = {
    from: "testfornode123@outlook.com",
    to: user.email,
    subject: "Thank you for submitting the form",
    text: "Hello,\n\nWe have recieved your form!\n\nMohammad Abbas",
  };
  
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
await user.save();
res.sendStatus(201);
} catch (error) {
console.log(error);
res.sendStatus(500);
}
});

app.get('/api/users', async (req, res) => {
try {
const users = await User.find();
res.send(users);
} catch (error) {
console.log(error);
res.sendStatus(500);
}
});





app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});