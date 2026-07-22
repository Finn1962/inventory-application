const { supabase } = require("./supabaseClient.js");

async function checkConnection() {
  console.log("Teste Verbindung zu Supabase...");

  try {
    // Versuche, die Liste deiner Buckets abzurufen
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Verbindungsfehler:", error.message);
      return;
    }

    console.log("Verbindung erfolgreich!");
    console.log(
      "Gefundene Buckets:",
      data.map((b) => b.name),
    );
  } catch (err) {
    console.error("Unerwarteter Fehler:", err.message);
  }
}

checkConnection();
