const openName = (req, res, next) => {res.send(`Welcome to Horse Forge, ${req.user.displayName}!`);};



module.exports = { openName };