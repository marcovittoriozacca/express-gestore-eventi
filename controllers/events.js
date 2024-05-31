const index = (req, res) => {
    res.json({message: "Index Route"});
}

const store = (req, res) => {
    res.json({message: "Store Route"});
}

const update = (req, res) => {
    res.json({message: "Update Route"});
}

module.exports = {
    index,
    store,
    update
}