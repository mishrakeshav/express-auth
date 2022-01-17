const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB')
);


app.listen(process.env.PORT || 5000, ()=>console.log(`Server running on PORT ${process.env.MONGODB_URL || 5000}`));