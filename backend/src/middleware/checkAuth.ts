const checkAuth = (req: any, res: any, next: any) => {
    if (req.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized', unauthorized: true });
    }
}

export default checkAuth;