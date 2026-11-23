import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ContactModal from "./components/ContactModal";
import Home from "./pages/Home";
import Collective from "./pages/Collective";
// import EventSignup from "./pages/EventSignup";
import Subscribe from "./pages/Subscribe";
import Unsubscribe from "./pages/Unsubscribe";
import Awards from "./pages/Awards";
import Workshops from "./pages/Workshops";
import { useReveal } from "./functions/Utility";
import "./App.css";

function HomePage() {
  useReveal();
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Home onOpenContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function CollectivePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} forceDark />
      <Collective />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function AwardsPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} forceDark />
      <Awards onOpenContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function WorkshopsPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [topic, setTopic] = useState<string | undefined>();

  const openContact = (nextTopic?: string) => {
    setTopic(nextTopic);
    setContactOpen(true);
  };

  return (
    <>
      <Navbar onOpenContact={() => openContact()} forceDark />
      <Workshops onEnquire={openContact} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} topic={topic} />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collective" element={<CollectivePage />} />
      <Route path="/awards" element={<AwardsPage />} />
      <Route path="/workshops" element={<WorkshopsPage />} />

      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />

      {/* <Route path="/event" element={<EventSignup />} /> */}
      {/* <Route path="/event-draw" element={<EventDraw />} /> */}
    </Routes>
  );
}

export default App;
