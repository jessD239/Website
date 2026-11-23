import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
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

/**
 * Client-side routing keeps the previous page's scroll position, so reset it on navigation.
 * - New page with a #hash: jump to that element.
 * - New page without one: start at the top.
 * - Back/forward (POP): leave it alone so the browser restores where you were.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // Only on page changes; same-page hash links are handled by the page itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

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
    <>
      <ScrollManager />
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
    </>
  );
}

export default App;
