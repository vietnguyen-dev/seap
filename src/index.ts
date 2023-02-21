import express from "express";
import session from "express-session";
import connectRedis from 'connect-redis';
import * as dotenv from 'dotenv';

//authorization
// import { authorizeKey, authorizeAdminKey } from "../middleware/auth/keys";
import { userCredentials, userExists, correctPasswordForUser, userLogin, userLogout, checkSession } from "../middleware/auth/user-login";

//data from postgres
import { getSellers, getSellersForUser, postSeller, putSeller, deleteSingleSeller } from "../middleware/data/sellers";
import { postDeveloper } from "../middleware/data/developer";
import { postDeveloperKey } from "../middleware/data/developer-key";
import { getUsers, getSingleUser, postUser, preventExistingUser, putUser, deleteUser } from "../middleware/data/users";
import { getContacts, getContactsForUser, postContact, preventExistingContact, putContact, deleteContact } from "../middleware/data/contacts";
import { authSusenKey, authAdminKey } from "../middleware/auth/keys";

//external services
import { sendEmailToSeller, sendEmailToContact } from "../middleware/services/email";

//utils
const RedisStore = connectRedis(session);
import redisClient from "../middleware/util/connect-redis";

const app = express();
const port = process.env.PORT;
dotenv.config()

const environment = process.env.NODE_ENV === 'production'


app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
  name: process.env.SESSION_NAME,
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  store:  new RedisStore({ client: redisClient as any}),
  saveUninitialized: false,
  cookie: { 
    httpOnly: environment ? true : false,
    secure: environment ? true : false,
    //1000 ms * 60 seconds * 60 minutes * 24 hours
    maxAge: 1000 * 60 * 60 * 24 
  },
}))

redisClient.on('connect', () => console.log('Redis Client: Connected!'));
redisClient.on('error', err => console.log('Redis Client: Error', err));
console.log('Environment', environment)
console.log('Maybe Error')
//Auth middleware, if the route doesnt have a session id, send an error
app.use(checkSession);

//AUTHORIZATION ROUTES
//user login, only accessible in susen
app.post('/user-login', authSusenKey, userCredentials, userExists, correctPasswordForUser, userLogin)
//user logout, only accessible in susen
app.post('/user-logout', authSusenKey, userLogout)

//admin login - need admin api key
//admin logout - need admin api key


//DATA FROM POSTGRES ROUTES
//root is motivated seller info, use all data for now until cron jobs implemented
app.get("/", authSusenKey, getSellers);
// app.get('/:id', getSellersForUser)
app.post("/", authSusenKey, postSeller)
app.put("/", authSusenKey, putSeller);
app.delete("/:id", authSusenKey, deleteSingleSeller)

//user
// /user is only accessible in admin route, all other routes accessible in susan with session id
app.get('/users', authAdminKey, getUsers) //gets list of all users
app.get('/users/:id', authSusenKey, getSingleUser) //gets Single User
//this is where users register for an account
app.post('/users', authSusenKey, preventExistingUser, postUser) 
app.put('/users', authSusenKey, putUser)
app.delete('/users/:id', authSusenKey, deleteUser)

//contacts, all accessible in susan with session id
app.get('/contacts/:id', authSusenKey, getContactsForUser) 
app.post('/contacts', authSusenKey, preventExistingContact, postContact) 
app.put('/contacts', authSusenKey, putContact)
app.delete('/contacts/:id', authSusenKey, deleteContact)

//developers - need admin api key
app.post('/developers', authAdminKey, postDeveloper);

//developer api keys - need admin api key
app.post('/api-keys/:id', authAdminKey, postDeveloperKey)

//SERVICES
//email seller accesible in network sites
app.get("/email-seller", authSusenKey, sendEmailToSeller)
//email contact accessible in susen
app.get('/email-contact', authSusenKey, sendEmailToContact)

//MESSAGES
//tracking which seller info was sent to who

//subscriptions
//may be all done in stripe?
// app.get all subscriptions
// app.get single subcriptions
// app.post create subscription 
// app.put update  PushSubscription
// app.delete delete subscription

//sale log
//may be all done in stripe?

app.listen(port, () => {
  console.log(`SEAP listening at http://localhost:${port}`);
});

// redeploy