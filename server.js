require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

app.use(logger);

// Handle options credentials check - before CORS !
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//일반사용자 product 화면
app.use('/visitor', require('./routes/api/visitor'));
app.use(verifyJWT);
app.use('/product', require('./routes/api/products'));
app.use('/users', require('./routes/api/users'));


app.all('*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	// https 의존성으로 certificate와 private key로 새로운 서버를 시작
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

