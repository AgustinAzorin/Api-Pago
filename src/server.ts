import app from "./app";
import { testConnection } from "./config/database";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ No se pudo iniciar la aplicación:", error);
    process.exit(1);
  }
})();
