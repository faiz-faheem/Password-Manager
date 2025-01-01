import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/header";
import Home from "./Home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

function App() {
  const routesArray = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
  ];
  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
