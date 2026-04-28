import { useState } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ContactModal from "./components/ContactModal";
import Home from "./pages/Home";
import { useReveal } from "./functions/Utility";
import "./App.css";

function App() {
  useReveal();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Home onOpenContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export default App;
