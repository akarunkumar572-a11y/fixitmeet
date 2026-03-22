import Button from '../common/Button/Button';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero public-hero">
      <div className="hero-container">
        <h1>Get Repairs & Healthcare Delivered at Your Doorstep</h1>
        <p className="hero-subtitle">Quick and reliable service platform for all your needs.</p>
        <Button>Book Service</Button>
      </div>
    </section>
  );
};

export default Hero;