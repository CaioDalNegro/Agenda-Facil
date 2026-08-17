import { AuthProvider } from "./src/context/AuthContext";
import AppRoutes from "./src/navigation/AppRoutes";

// Arquivo principal do app
export default function App() {

  return (

    // Provedor global de autenticação.
    <AuthProvider>

      {/* Rotas do aplicativo */}
      <AppRoutes />

    </AuthProvider>
  );
}
