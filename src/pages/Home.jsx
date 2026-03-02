import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Team from '../components/Team';
import OfficeSection from '../components/OfficeSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            <Header />
            <main>
                <Hero />
                <WhyUs />
                <Services />
                <OfficeSection />
                <Team />
                <MapSection />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
