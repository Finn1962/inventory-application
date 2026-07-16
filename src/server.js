const { app } = require("./app.js");

const port = process.env.PORT;

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
