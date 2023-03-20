app.post("/", async (req, res) => {
    const { key, val } = req.body;
    const response = await client.set(key, val);
    res.json(response)
})


app.get("/", async (req, res) => {
    const { key } = req.body;
    const response = await client.get(key);
    res.json(response)
})