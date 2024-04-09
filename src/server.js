const privateKey = require('./private-key');

const { expressjwt: jwt } = require("express-jwt");

const express = require('express')


// Index das routes
const routes = require('./routes')


const app = express()
app.use(express.json())

app.use(
    jwt({ secret: privateKey, algorithms: ['HS256']}).unless({ path: ['/users/create', '/users/login', '/users/update', '/users/delete', '/users/show'] })
);

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({message: "invalid token"});
    } else {
      next(err);
    }
});

app.use(routes)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
