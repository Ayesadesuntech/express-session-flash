function flashMiddleware(req, res, next) {
    if (!req.session) {
        throw new Error('Session is required. Use express-session before flash middleware.');
    }

    if (!req.session.flash) {
        req.session.flash = {};
    }

    req.flash = function (type, message) {
        if (!type) return;

        if (message === undefined) {
            const messages = req.session.flash[type] || [];
            delete req.session.flash[type];
            return messages;
        }

        if (!Array.isArray(req.session.flash[type])) {
            req.session.flash[type] = [];
        }
        req.session.flash[type].push(message);
    };

    res.locals.getFlash = function (type) {
        return req.flash(type);
    };

    next();
}

export default flashMiddleware;