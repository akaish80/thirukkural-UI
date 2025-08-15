import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../Common/common.styles';
import './homepage.component.scss';

const Homepage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const features = [
    {
      icon: '📖',
      title: 'Read Thirukkural',
      description: 'Explore the timeless wisdom of Thiruvalluvar through beautiful Tamil verses.',
      link: '/thirukurral',
      color: 'blue'
    },
    {
      icon: '✍️',
      title: 'Practice Writing',
      description: 'Learn to write Tamil letters with interactive drawing exercises.',
      link: '/practice',
      color: 'green'
    },
    {
      icon: '🎯',
      title: 'Interactive Games',
      description: 'Test your knowledge with engaging Tamil learning games.',
      link: '/practice',
      color: 'purple'
    },
    {
      icon: '🎨',
      title: 'Themes',
      description: 'Customize your learning experience with beautiful themes.',
      link: '/',
      color: 'orange'
    }
  ];

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">திருக்குறள்</span>
            <span className="subtitle">Thirukkural Learning Platform</span>
          </h1>
          <p className="hero-description">
            Discover the eternal wisdom of Thiruvalluvar through interactive learning.
            Master Tamil literature with modern teaching methods.
          </p>
          <div className="hero-actions">
            <Link to="/thirukurral" className="btn btn-primary btn-large">
              <span>🚀</span>
              Start Learning
            </Link>
            <Link to="/practice" className="btn btn-secondary btn-large">
              <span>✨</span>
              Practice Now
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-content">
              <h3>அறம்</h3>
              <p>Virtue</p>
            </div>
          </div>
          <div className="floating-card delayed">
            <div className="card-content">
              <h3>பொருள்</h3>
              <p>Wealth</p>
            </div>
          </div>
          <div className="floating-card delayed-more">
            <div className="card-content">
              <h3>இன்பம்</h3>
              <p>Pleasure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Explore Learning Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`feature-card ${feature.color}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1330</div>
              <div className="stat-label">திருக்குறள்கள்</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">133</div>
              <div className="stat-label">அதிகாரங்கள்</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">பால்கள்</div>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <div role="alert" className="sr-only">
          Welcome to Thirukkural Learning Platform
        </div>
      )}
    </div>
  );
};

export default Homepage;