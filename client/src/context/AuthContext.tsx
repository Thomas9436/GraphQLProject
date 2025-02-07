import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import { toast } from "sonner";

// Définir la requête GraphQL
const LOGGED_USER_QUERY = gql`
  query LoggedUser {
    loggedUser {
      id
      username
    }
  }
`;

// Définir le type du contexte
interface AuthContextType {
  user: { id: string; username: string } | null;
  loadingUser: boolean;
  errorUser: any;
  logout: () => void;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournisseur du contexte
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading: loadingUser, error: errorUser } = useQuery(LOGGED_USER_QUERY);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    if (data?.loggedUser) {
      setUser(data.loggedUser);
    }
  }, [data]);

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success('Deconnexion réeussie !')
    window.location.href = "/login"; // Redirection vers la page de connexion
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, errorUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}