var express = require("express");
var { createClient } = require("redis");
var router = express.Router();

let client;
(async () => {
  client = await createClient({})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  await client?.set?.("visits", 0);
})();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const value = await client?.get?.("visits");
  res.render("index", { title: "Express", data: `Total visits: ${value}` });
  await client?.set?.("visits", (Number(value) || 0) + 1);
});

module.exports = router;
