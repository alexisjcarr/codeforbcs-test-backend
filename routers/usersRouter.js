const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../data/models/usersModel");
const secrets = require("../config/secrets");

/**
 * @api {post} /api/register Registers a new user
 * @apiGroup Authentication
 * @apiSuccess {Object[]} Registered user
 * @apiSuccess {Number} users.id User id
 * @apiSuccess {String} users.username User username
 * @apiSuccess {Boolean} users.password User password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "username": alexisjcarr
 *      "password": iMHaShEdPaSsWoRd
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

/**
 * @api {post} /api/login User login
 * @apiGroup Authentication
 * @apiSuccess {Object[]} Logged in user
 * @apiSuccess {String} Welcomr message
 * @apiSuccess {String} Auth token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "message": "Welcome alexisjcarr",
 *      "token": iAmAToken
 *    }]
 * @apiErrorExample {json} List error
 *  HTTP/1.1 401 Invalid credentials
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error*/
router.post("/register", async (req, res) => {
  const user = req.body;

  try {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/**
 * @api {post} /api/register User login
 * @apiGroup Authentication
 * @apiSuccess {Object[]} Logged in user
 * @apiSuccess {String} Welcomr message
 * @apiSuccess {String} Auth token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "message": "Welcome alexisjcarr",
 *      "token": iAmAToken
 *    }]
 * @apiErrorExample {json} List error
 *  HTTP/1.1 401 Invalid credentials
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome ${user.username} 😁`,
        token
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials!"
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };

  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;
