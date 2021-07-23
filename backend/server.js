
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);


// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const accountRoutes = require('./api/account/account.routes');
const budgetRoutes = require('./api/budget/budget.routes');
const budgetListRoutes = require('./api/budgetList/budgetList.routes');
const guestRoutes = require('./api/guest/guest.routes');
const todoListRoutes = require('./api/todoList/todoList.routes');
const venueRoutes = require('./api/venue/venue.routes');
const categoryRoutes = require('./api/category/category.routes');
// const connectSockets = require('./api/socket/socket.routes');


//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/budgetList', budgetListRoutes);
app.use('/api/guest',guestRoutes);
app.use('/api/todo',todoListRoutes);
app.use('/api/venue',venueRoutes);
app.use('/api/cat',categoryRoutes);


// connectSockets(io)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('server is running on port:', port);
});