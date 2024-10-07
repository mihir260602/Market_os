
import React, { useEffect, useRef, useState } from 'react';
import Blog from './Blog';
import Footer from './Footer';
import './Home.css'; // Combined CSS for Home and Header

const Home = () => {
  // Header Component
  const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
    };

    const toggleDropdown1 = () => {
      setDropdown1Open((prev) => !prev);
    };

    const toggleDropdown2 = () => {
      setDropdown2Open((prev) => !prev);
    };

    // Close sidebar when clicking outside of it
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false);
          setDropdown1Open(false);
          setDropdown2Open(false);
        }
      };

      if (isSidebarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
 
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isSidebarOpen]);

    return (
      <header className="home-header">
        <div className="home-header-logo">
          <img
            src="https://media.licdn.com/dms/image/v2/C4E0BAQFXurrY90D9HA/company-logo_200_200/company-logo_200_200/0/1631332599022?e=2147483647&v=beta&t=FaZgupSB22pk73yA1bzmf71oZooanHP9RRpHLka59eg"
            alt="Company Logo"
            className="home-logo"
          />
        </div>
        <div className="home-header-right">
          <button className="home-be-client-button">Become a Client</button>
          <div
            className="home-hamburger-icon"
            onClick={toggleSidebar}
            role="button"
            aria-label="Toggle sidebar"
          >
            <span>☰</span>
          </div>
        </div>
        <div ref={sidebarRef} className={`home-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <h3 className="home-sidebar-title">Menu</h3>
          <ul className="home-sidebar-menu">
            <li className="home-sidebar-item" onClick={toggleDropdown1}>
              Services
              <span className="home-dropdown-icon">{dropdown1Open ? '' : ''}</span>
              {dropdown1Open && (
                <ul className="home-dropdown">
                  <li>
                    <a href="/subfield1-1">Capability</a>
                  </li>
                  <li>
                    <a href="/subfield1-2">User Experience Design</a>
                  </li>
                  <li>
                    <a href="/subfield1-3">Digital Experience Platforms</a>
                  </li>
                  <li>
                    <a href="/subfield1-4">Drupal Development</a>
                  </li>
                  <li>
                    <a href="/subfield1-5">Cloud-Native Software Engineering</a>
                  </li>
                  <li>
                    <a href="/subfield1-6">Cloud and DevOps</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="home-sidebar-item" onClick={toggleDropdown2}>
              Resources
              <span className="home-dropdown-icon">{dropdown2Open ? '' : ''}</span>
              {dropdown2Open && (
                <ul className="home-dropdown">
                  <li>
                    <a href="/subfield2-1">Blogs</a>
                  </li>
                  <li>
                    <a href="/subfield2-2">Whitepaper</a>
                  </li>
                  <li>
                    <a href="/subfield2-3">Webinar</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="home-sidebar-item">
              <a href="/field3">Case Studies</a>
            </li>
            <li className="home-sidebar-item">
              <a href="/field4">About Us</a>
            </li>
            <li className="home-sidebar-item">
              <a href="/field5">Contact Us</a>
            </li>
            <li className="home-sidebar-item">
              <a href="/Login">Sign In</a>
            </li>
          </ul>
        </div>
      </header>
    );
  };

  // Button Click Handler
  const handleButtonClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="homepage">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>"Technology is best when it brings people together."</h2>
          <p> – Matt Mullenweg</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="expertise-section">
        <h2>Our Expertise in the Digital Transformation Journey</h2>
        <div className="expertise-cards">
          <div className="expertise-card">
            <img
              src="https://www.valuebound.com/sites/default/files/inline-images/Digital-Transformation-Icons-01.png"
              alt="Cloud Native Solutions"
              className="expertise-card-image"
            />
            <h3 className="expertise-card-title">Cloud Native Solutions</h3>
            <p className="expertise-card-description">Unleash Cloud's Power with Scalable, Secure Solutions.</p>
          </div>
          <div className="expertise-card">
            <img
              src="https://www.valuebound.com/sites/default/files/inline-images/Digital-Transformation-Icons-02.png"
              alt="AWS Services"
              className="expertise-card-image"
            />
            <h3 className="expertise-card-title">AWS Services</h3>
            <p className="expertise-card-description">Elevate Business on Cloud, AWS Expertise at Core.</p>
          </div>
          <div className="expertise-card">
            <img
              src="https://www.valuebound.com/sites/default/files/inline-images/Digital-Transformation-Icons-03.png"
              alt="Integration Prowess"
              className="expertise-card-image"
            />
            <h3 className="expertise-card-title">Integration Process</h3>
            <p className="expertise-card-description">Amplify Growth, Seamlessly Integrate Diverse Systems.</p>
          </div>
          <div className="expertise-card">
            <img
              src="https://www.valuebound.com/sites/default/files/inline-images/Digital-Transformation-Icons-04.png"
              alt="Drupal Consulting"
              className="expertise-card-image"
            />
            <h3 className="expertise-card-title">Drupal Consulting</h3>
            <p className="expertise-card-description">Enhance Digital Presence, Leverage Drupal Expertise.</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Blog />

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Take the Next Step Toward Innovation</h2>
        <p>Let us partner with you to drive your digital transformation.</p>
        <button className="cta-btn" onClick={handleButtonClick} title="Get in touch with our team!">
          Get in Touch
        </button>
      </section>

      {/* Projects Section */}
      <section className="projects-showcase">
        <h2 className="projects-heading">Highlights of Our Esteemed Projects</h2>
        <div className="projects-cards-wrapper">
          <div className="project-item">
            <h3 className="project-title">Innovative Marketing Operating System</h3>
          </div>
          <div className="project-item">
            <h3 className="project-title">Unified Content Management System with Multisite Architecture</h3>
          </div>
          <div className="project-item">
            <h3 className="project-title">LASK AI Code Assistant</h3>
          </div>
          <div className="project-item">
            <h3 className="project-title">Dynamic Marketplace Platform</h3>
          </div>
          <div className="project-item">
            <h3 className="project-title">Comprehensive Knowledge Hub for the Company</h3>
          </div>
        </div>
      </section>

      {/* Expertise Showcase */}
      <section className="expertise-showcase">
        <h2 className="expertise-heading">Overview of Microservices Architecture</h2>
        <div className="expertise-cards-container">
          <div className="expertise-card-item">
            <h3 className="expertise-card-title">Wagtail</h3>
            <div className="card-partition"></div> {/* Partition Line */}
            <p className="expertise-card-details">
              Manages user-facing content, marketing pages, lead generation forms, and personalized experiences based on user behavior.
            </p>
          </div>
          <div className="expertise-card-item">
            <h3 className="expertise-card-title">PostHog</h3>
            <div className="card-partition"></div>
            <p className="expertise-card-details">
              Provides real-time tracking of user behavior on the website (page views, clicks, form submissions), powering behavioral analytics for CRM and AI models.
            </p>
          </div>
          <div className="expertise-card-item">
            <h3 className="expertise-card-title">Mautic</h3>
            <div className="card-partition"></div>
            <p className="expertise-card-details">
              Manages email marketing automation, personalized drip campaigns, and lead nurturing sequences based on data.
            </p>
          </div>
          <div className="expertise-card-item">
            <h3 className="expertise-card-title">EspoCRM</h3>
            <div className="card-partition"></div>
            <p className="expertise-card-details">
              Stores customer and lead information, manages interactions with prospects, and syncs with email marketing tools and lead scoring systems.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;