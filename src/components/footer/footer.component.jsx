import React from 'react';
import './footer.styles.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">திருக்குறள்</h3>
            <p className="footer-description">
              திருவள்ளுவர் அருளிய உலகப்பொதுமறை
            </p>
          </div>

          <div className="footer-section">
            <h4 className="section-title">சிக்षণம्</h4>
            <div className="footer-links">
              <a href="/thirukurral" className="footer-link">குறள் கற்க</a>
              <a href="/practice" className="footer-link">பயிற்சி</a>
              <a href="/adhikarams" className="footer-link">அதிகாரங்கள்</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">பற்றி</h4>
            <div className="footer-links">
              <a href="/about" className="footer-link">இந்த செயலி</a>
              <a href="/contact" className="footer-link">தொடர்பு</a>
              <a href="/privacy" className="footer-link">தனியுரिमै</a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} திருக்குறள் | அனைத்து உरिमైகळும் பாतুकाप्पागिदे</p>
          </div>

          <div className="footer-social">
            <span className="social-text">Developed with ❤️ by</span>
            <span className="developer-name">Arun & Co</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
