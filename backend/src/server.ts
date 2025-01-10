import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send(
    "Hello I am buildig the app on the typescript + express + nodejs backend!"
  );
});

app.listen(port, () => {
  console.log(`Server is runing on the port ${port}`);
});
