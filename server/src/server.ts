//server.js
import app from "./index";
require('dotenv/config');

app.listen(8091, () => {
  console.log("Example app listening on port 8091");
  console.log(process.env.NODE_ENV)
});

//export default server;