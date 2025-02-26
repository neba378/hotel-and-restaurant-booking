const { verifyToken } = require("./password_services");

exports.authMiddleware = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = verifyToken(
      token.replace("Bearer ", ""),
      process.env.ACCESS_SECRETE
    );

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
}

exports.authVendor = (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== 'vendor') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

exports.authAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

exports.authCustomer = (req, res, next) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}