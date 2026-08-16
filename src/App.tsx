import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ContactModal from "./components/ContactModal";
import Home from "./pages/Home";
// import EventSignup from "./pages/EventSignup";
import Subscribe from "./pages/Subscribe";
import Unsubscribe from "./pages/Unsubscribe";
import { useReveal } from "./functions/Utility";
import "./App.css";

function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
      {/* <Route path="/event" element={<EventSignup />} /> */}
      {/* <Route path="/event-draw" element={<EventDraw />} /> */}
    </Routes>
  );
}

export default App;
