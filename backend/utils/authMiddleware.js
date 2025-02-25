import { verifyToken } from "./password_services";

export const authMiddleware = (req, res, next) => {

    const token = req.headers('Authorization').split()[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = verifyToken(token, process.env.ACCESS_SECRETE);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
}