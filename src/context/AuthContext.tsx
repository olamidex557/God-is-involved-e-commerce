import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const SESSION_EXPIRED_MESSAGE =
  "Session expired due to inactivity";

const ADMIN_TIMEOUT_MS =
  5 * 60 * 1000;

const CUSTOMER_TIMEOUT_MS =
  30 * 60 * 1000;

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "null"
      )
    );

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem(
        "token"
      )
    );

  const timeoutRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
  };

  const logout = (
    reason?: string
  ) => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);
    setUser(null);

    if (reason) {
      sessionStorage.setItem(
        "authMessage",
        reason
      );
    }
  };

  useEffect(() => {
    if (!token || !user) {
      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }

      return;
    }

    const timeout =
      user.role === "admin"
        ? ADMIN_TIMEOUT_MS
        : CUSTOMER_TIMEOUT_MS;

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }

      timeoutRef.current =
        setTimeout(() => {
          logout(
            SESSION_EXPIRED_MESSAGE
          );

          window.location.assign(
            "/login"
          );
        }, timeout);
    };

    const events = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "popstate",
    ];

    resetTimer();

    events.forEach((event) =>
      window.addEventListener(
        event,
        resetTimer,
        {
          passive: true,
        }
      )
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }

      events.forEach((event) =>
        window.removeEventListener(
          event,
          resetTimer
        )
      );
    };
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () =>
    useContext(
      AuthContext
    );
