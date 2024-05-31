const index = (req, res) => {
    res.send(`${req.params.event}`);
}

const store = (req, res) => {
    res.send(`${req.params.event}`);
}

const destroy = (req, res) => {
    
    res.send(`${req.params.event} - ${req.params.reservation}`);
}

module.exports = {
    index,
    store,
    destroy
}