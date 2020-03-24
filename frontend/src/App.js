import React from "react";
// import "./App.css";
import Jogo from "view/Jogo";
import JogoProvider from "contexts/JogoContext";

function App() {
  return (
    <JogoProvider>
      <Jogo />
    </JogoProvider>
  );
}

export default App;
