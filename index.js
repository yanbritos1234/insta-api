const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = "SEU_KEY_AQUI"; // troca pela tua key real

app.post("/api/foto", async (req, res) => {
  const rawUsername = req.body.username || "";
  const username = rawUsername.replace(/^@/, "");

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

// 👇 O Render SEMPRE fornece a porta via env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
});
