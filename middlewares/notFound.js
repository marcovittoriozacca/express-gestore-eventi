module.exports = (req, res) => {
    res.status(404).json({
        status: 404,
        error: "Sorry, the thing you're looking for is missing",
    });
}