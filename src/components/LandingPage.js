import React, { useState } from 'react';

// Define styles as a string for global CSS
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; }
  @media (max-width: 768px) {
    nav ul { display: none !important; }
    nav button:last-child { display: none; }
    nav button:nth-child(3) { display: block !important; }
  }
  @media (min-width: 769px) {
    nav ul { display: flex !important; flex-direction: row; position: static; width: auto; background: none; padding: 0; }
    nav button:nth-child(3) { display: none !important; }
  }
`;

const LandingPage = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #00695c 0%, #4db6ac 100%)' }}>
        {/* Navigation Bar */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
          padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffb300' }}>FixitMeet</div>
          <ul style={{
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column', position: 'absolute', top: '100%', left: 0, width: '100%',
            background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
            listStyle: 'none', margin: 0, padding: '1rem 2rem', gap: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <li><a href="#home" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#services" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#providers" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Providers</a></li>
            <li><a href="#about" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#contact" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          <button onClick={toggleMenu} style={{
            display: 'none',
            background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer'
          }}>☰</button>
          <a href="/login" style={{
            background: '#ffb300', color: '#00695c', border: 'none', padding: '0.5rem 1rem',
            borderRadius: '12px', cursor: 'pointer', fontWeight: '500', textDecoration: 'none'
          }}>Login / Sign Up</a>
        </nav>

        {/* Hero Section */}
        <section id="home" style={{
          padding: '4rem 2rem', textAlign: 'center', color: 'white',
          background: 'linear-gradient(135deg, rgba(0, 105, 92, 0.8) 0%, rgba(77, 182, 172, 0.8) 100%)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 179, 0, 0.3) 0%, transparent 70%)'
          }}></div>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', zIndex: 1, position: 'relative' }}>
            Book Trusted Services Near You
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', zIndex: 1, position: 'relative' }}>
            Fast. Reliable. Verified Professionals.
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem',
            flexWrap: 'wrap', zIndex: 1, position: 'relative'
          }}>
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{
              padding: '0.75rem', borderRadius: '12px', border: 'none', width: '200px'
            }}>
              <option value="">Select Category</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="cleaning">Cleaning</option>
            </select>
            <input
              type="text"
              placeholder="Enter Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '12px', border: 'none', width: '200px' }}
            />
            <button style={{
              background: '#ffb300', color: '#00695c', border: 'none', padding: '0.75rem 1.5rem',
              borderRadius: '12px', cursor: 'pointer', fontWeight: '600'
            }}>Find Services</button>
          </div>
          <button style={{
            background: 'transparent', color: '#ffb300', border: '2px solid #ffb300',
            padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: '600'
          }}>Become a Provider</button>
        </section>

        {/* Services Section */}
        <section id="services" style={{ padding: '4rem 2rem', background: 'white' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00695c' }}>Our Services</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'
          }}>
            {[
              { icon: '🔧', title: 'Plumbing', desc: 'Expert plumbing repairs and installations.' },
              { icon: '⚡', title: 'Electrical', desc: 'Safe electrical services for your home.' },
              { icon: '🧹', title: 'Cleaning', desc: 'Deep cleaning for a spotless space.' },
              { icon: '🏥', title: 'Healthcare', desc: 'Professional healthcare at home.' },
              { icon: '🔨', title: 'Repair', desc: 'General repairs and maintenance.' }
            ].map((service, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
                padding: '2rem', borderRadius: '16px', textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-5px)'; e.target.style.boxShadow = '0 8px 32px rgba(255, 179, 0, 0.3)'; }}
                 onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'; }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ color: '#00695c' }}>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e8 100%)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00695c' }}>How It Works</h2>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap'
          }}>
            {[
              { step: 1, icon: '🔍', title: 'Search Service', desc: 'Find the right service in your area.' },
              { step: 2, icon: '📅', title: 'Book Appointment', desc: 'Schedule with verified professionals.' },
              { step: 3, icon: '🚚', title: 'Get Service Delivered', desc: 'Enjoy reliable service at your doorstep.' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white', padding: '2rem', borderRadius: '16px',
                textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '250px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ color: '#00695c' }}>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ padding: '4rem 2rem', background: 'white' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00695c' }}>What Our Customers Say</h2>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap'
          }}>
            {[
              { name: 'John D.', rating: 5, feedback: 'Amazing service, highly recommend!' },
              { name: 'Sarah L.', rating: 5, feedback: 'Fast and professional. Will use again.' },
              { name: 'Mike R.', rating: 5, feedback: 'Verified pros made all the difference.' }
            ].map((testimonial, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
                padding: '2rem', borderRadius: '16px', textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', width: '300px'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{'⭐'.repeat(testimonial.rating)}</div>
                <p>"{testimonial.feedback}"</p>
                <p style={{ fontWeight: 'bold', color: '#00695c' }}>- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#00695c', color: 'white', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
            <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span>Follow us: </span>
            <a href="#" style={{ color: '#ffb300', margin: '0 0.5rem' }}>FB</a>
            <a href="#" style={{ color: '#ffb300', margin: '0 0.5rem' }}>IG</a>
            <a href="#" style={{ color: '#ffb300', margin: '0 0.5rem' }}>TW</a>
          </div>
          <p>&copy; 2026 FixitMeet. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;