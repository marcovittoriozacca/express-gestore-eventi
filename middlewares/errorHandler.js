module.exports = (err, req, res, next) => {
    res.status(500).json({error: err.message, stack: err.stack})
}