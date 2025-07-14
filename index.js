const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = "9308c532e4msh276406204cdf97dp178639jsn5d69d53284e3";

app.post("/api/foto", async (req, res) => {
  const rawUsername = req.body.username || "";
  const username = rawUsername.replace(/^@/, ""); // remove @ se for enviado

  try {
    const response = await axios.get(
      `https://instagram-profile1.p.rapidapi.com/getprofile/${username}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "instagram-profile1.p.rapidapi.com",
        },
      }
    );

    const foto = response.data?.profile_pic_url_hd || response.data?.profile_pic_url || null;
    res.json({ foto });
  } catch (error) {
    console.error("Erro ao buscar imagem:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao buscar imagem." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
});