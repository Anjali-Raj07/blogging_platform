// const express = require('express');
// const router = express.Router();
// const validateToken = require('../middleware/validateTokenHandler');
// const {adminLogin} = require('../controllers/admin.controller');

// router.post('/adminLogin', adminLogin);


// // Route to render the admin home page
// router.get('/adminHome', validateToken, adminMiddleware, async (req, res) => {
//     try {
//         const users = await User.find({}, 'username email _id'); // Ensure User model is imported
//         res.render('adminHome', { users });
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAllUsers,
  editUserPage,
  updateUser,
  deleteUser,
  getUserPosts
} = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/adminLogin', adminLogin);
router.get('/adminHome', authMiddleware, adminMiddleware, getAllUsers);
router.get('/edit/:id', authMiddleware, adminMiddleware, editUserPage);
router.post('/update/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteUser);

// Logout route
router.get('/logout', (req, res) => {
  console.log('Logout request received');
  res.clearCookie('token', { path: '/' });
  res.redirect('/adminLogin');
});

module.exports = router;
