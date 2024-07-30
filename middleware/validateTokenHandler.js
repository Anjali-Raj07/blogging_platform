const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyAsync = promisify(jwt.verify);

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    let authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader, "error ");
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        console.log('Token:', token); // Logging the token for debugging

        try {
            const decoded = await verifyAsync(token, process.env.ACCESS_TOKEN_SECRET);
            console.log('Decoded JWT:', decoded); // Logging the decoded JWT for debugging
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                console.error('JWT Token Expired:', err); // Logging the error for debugging
                res.status(401).json({ title: 'UNAUTHORIZED', message: 'Token expired, please login again' });
            } else {
                console.error('JWT Verification Error:', err); // Logging the error for debugging
                res.status(401).json({ title: 'UNAUTHORIZED', message: 'User is not authorized', error: err.message });
            }
        }
    } else {
        console.error('Authorization header missing or not starting with Bearer'); // Logging the missing header case
        res.status(401).json({ title: 'UNAUTHORIZED', message: 'User is not authorized, no token' });
    }
});

module.exports = validateToken;