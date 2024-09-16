import "./App.css";
import { Console, Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <main className="content">
        <Console />
      </main>
    </>
  );
}

export default App;
