import About from "../sections/About";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Showcase from "../sections/Showcase";
import Testimonials from "../sections/Testimonials";
import Work from "../sections/Work";

interface HomeProps {
  onOpenContact?: () => void;
}

const Home = ({ onOpenContact }: HomeProps) => {
  return (
    <>
      <Hero onOpenContact={onOpenContact} />
      <Work />
      <Services />
      <About />
      <Showcase />
      <Testimonials />
      <Contact onOpenContact={onOpenContact} />
    </>
  );
};

export default Home;
