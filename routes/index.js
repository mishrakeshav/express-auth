
const userRouter = require("./user.router");
const sessionRouter = require('./session.router')

const routes = (app)=>{
    app.get('/check', (req,res)=> res.sendStatus(200));
    app.use('/api/user', userRouter);
    app.use('/api/session', sessionRouter);
}

module.exports = routes;