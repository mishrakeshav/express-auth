const  express = require("express");
const  dotenv = require("dotenv");
const  config = require("./config/default");
const  connect = require("./utils/connect");
const  logger = require("./utils/logger");
const routes = require("./routes/index");
const deserializeUser = require('./middleware/deserializeUser');

dotenv.config();

const port = config.port;

const app = express();
app.use(express.json());
app.use(deserializeUser);



app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    
    await connect();
    routes(app);
});
  