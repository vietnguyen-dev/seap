import express from "express";
import * as dotenv from 'dotenv';

import { getSellers, postSeller, putSeller, deleteSingleSeller, deleteMultiplesellers } from "../middleware/data/sellers";
import { sendEmailToBuyer, sendEmailToSeller } from "../middleware/services/email";
import { postDeveloper } from "../middleware/data/developer";
import { postDeveloperKey } from "../middleware/data/developer-key";
import { getUsers, postUser, preventExistingUser, putUser, deleteUser } from "../middleware/data/users";
// import { authorizeKey, authorizeAdminKey } from "../middleware/auth/keys";
import { userCredentials, userExists, correctPasswordForUser, userLogin } from "../middleware/auth/user-login";

import { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT;
dotenv.config()

app.use(express.json());

//use app.all to add authorize key to all routes once it is done
// app.all('*', requireAuthentication)

//root is motivated seller info
app.get("/", getSellers);
app.post("/", postSeller)
app.put("/",  putSeller);
app.delete("/:id", deleteSingleSeller)
app.delete("/", deleteMultiplesellers)

//email
app.get("/email-seller", sendEmailToSeller)
app.put('/email-buyer', sendEmailToBuyer)

//user
app.get('/user', getUsers)
app.post('/user', postUser) //this registers a new user and creates session storage
app.put('/user', putUser)
app.delete('/user', deleteUser)

//user login
app.post('/user-login', userCredentials, userExists, correctPasswordForUser, userLogin)

//user logout

//subscriptions

//sale log

//developers - need admin api key
app.post('/developer', postDeveloper);

//developer api keys - need admin api key
app.post('/developer/key', postDeveloperKey)

//admin login - need admin api key

//admin logout - need admin api key

app.listen(port, () => {
  console.log(`SEAP listening at http://localhost:${port}`);
});


export default app;