import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
