const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth'); // Require auth router
const userRouter = require('./routers/user'); // Require user router
const adminRouter = require('./routers/admin');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json()); // Parse JSON request bodies
app.use('/api/v1/auth', authRouter); // Use auth router
app.use('/api/v1/users', userRouter); // Use user router
app.use('/api/v1/admin', adminRouter);
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const port = 3000;


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});