const router = require("express").Router();
const db = require("../psql-con.js");
const verify = require("./verifyToken.js");

router.get("/:title", async (req, res) => {
  const { title } = req.params;
  const regex = /^[\w\s-!?'‘’.,()<>:\[\]]+$/;
  if (regex.test(title)) {
    const header = title.replace(/-/g, "");
    const {
      rows
    } = await db.query("SELECT * FROM entries WHERE LOWER(header)=LOWER($1)", [
      header
    ]);
    if (rows.length) {
      res.status(200).send(rows);
    } else {
      res.status(204).send([]);
    }
  } else {
    res.status(400).send([]);
  }
});

router.get("/page/:page", async (req, res) => {
  const entriesPerPage = 6;
  const offset = (Number(req.params.page) - 1) * entriesPerPage;
  if (typeof offset == "number" && offset >= 0) {
    let {
      rows
    } = await db.query(
      "SELECT * FROM (SELECT *, ROW_NUMBER() OVER() FROM entries) x ORDER BY ROW_NUMBER DESC OFFSET $1 ROWS FETCH FIRST $2 ROWS ONLY",
      [offset, entriesPerPage]
    );
    rows.map((row, index) => {
      let url = row.header;
      link = url.toLowerCase().replace(/\s/g, "-");
      rows[index].link = link;
    });
    res.status(200).send(await rows);
  } else {
    res.status(204).send([]);
  }
});

router.post("/new", verify, async (req, res) => {
  const { header, subheader, category, content } = req.body;
  const author = req.user.username;

  const date = new Date();
  const hhmm =
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).padStart(2, "0");

  const dateStr = dd + "/" + mm + "/" + yy + " " + hhmm;

  if (
    header.trim() != "" &&
    subheader.trim() != "" &&
    category.trim() != "" &&
    content.trim() != ""
  ) {
    const {
      rows
    } = await db.query("INSERT INTO entries VALUES($1, $2, $3, $4, $5, $6)", [
      header,
      subheader,
      category,
      content,
      author,
      dateStr
    ]);
    res.status(201).send({ msg: "Your entry has been added to the database." });
  } else {
    res.status(400).send({ msg: "Please fill all the fields." });
  }
});

module.exports = router;
