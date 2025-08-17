import React, { useRef, useState, useEffect } from 'react';
import { Container } from '../../../Common/common.styles';
import './draw.letter.scss';

const DrawLetter = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('அ');
  const [strokeCount, setStrokeCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showGuide, setShowGuide] = useState(true);

  // Tamil letters collection
  const tamilLetters = [
    { letter: 'அ', name: 'A', type: 'Vowel', sound: '/a/ as in "father"' },
    { letter: 'ஆ', name: 'Aa', type: 'Vowel', sound: '/aː/ as in "father" (long)' },
    { letter: 'இ', name: 'I', type: 'Vowel', sound: '/i/ as in "bit"' },
    { letter: 'ஈ', name: 'Ee', type: 'Vowel', sound: '/iː/ as in "beet" (long)' },
    { letter: 'உ', name: 'U', type: 'Vowel', sound: '/u/ as in "put"' },
    { letter: 'ஊ', name: 'Oo', type: 'Vowel', sound: '/uː/ as in "boot" (long)' },
    { letter: 'எ', name: 'E', type: 'Vowel', sound: '/e/ as in "bet"' },
    { letter: 'ஏ', name: 'Ae', type: 'Vowel', sound: '/eː/ as in "bay" (long)' },
    { letter: 'ஐ', name: 'Ai', type: 'Vowel', sound: '/aɪ/ as in "eye"' },
    { letter: 'ஒ', name: 'O', type: 'Vowel', sound: '/o/ as in "pot"' },
    { letter: 'ஓ', name: 'Oo', type: 'Vowel', sound: '/oː/ as in "boat" (long)' },
    { letter: 'ஔ', name: 'Au', type: 'Vowel', sound: '/aʊ/ as in "how"' },
    { letter: 'க', name: 'Ka', type: 'Consonant', sound: '/k/ as in "kite"' },
    { letter: 'ங', name: 'Nga', type: 'Consonant', sound: '/ŋ/ as in "sing"' },
    { letter: 'ச', name: 'Cha', type: 'Consonant', sound: '/tʃ/ as in "chair"' },
    { letter: 'ஞ', name: 'Nya', type: 'Consonant', sound: '/ɲ/ as in "canyon"' },
    { letter: 'ட', name: 'Ta', type: 'Consonant', sound: '/ʈ/ retroflex T' },
    { letter: 'ண', name: 'Na', type: 'Consonant', sound: '/ɳ/ retroflex N' },
    { letter: 'த', name: 'Tha', type: 'Consonant', sound: '/t̪/ dental T' },
    { letter: 'ந', name: 'Na', type: 'Consonant', sound: '/n/ dental N' },
    { letter: 'ப', name: 'Pa', type: 'Consonant', sound: '/p/ as in "pot"' },
    { letter: 'ம', name: 'Ma', type: 'Consonant', sound: '/m/ as in "mat"' },
    { letter: 'ய', name: 'Ya', type: 'Consonant', sound: '/j/ as in "yes"' },
    { letter: 'ர', name: 'Ra', type: 'Consonant', sound: '/r/ rolled R' },
    { letter: 'ல', name: 'La', type: 'Consonant', sound: '/l/ as in "love"' },
    { letter: 'வ', name: 'Va', type: 'Consonant', sound: '/ʋ/ as in "water"' },
    { letter: 'ழ', name: 'Zha', type: 'Consonant', sound: '/ɻ/ retroflex approximant' },
    { letter: 'ள', name: 'La', type: 'Consonant', sound: '/ɭ/ retroflex L' },
    { letter: 'ற', name: 'Ra', type: 'Consonant', sound: '/r/ hard R' },
    { letter: 'ன', name: 'Na', type: 'Consonant', sound: '/n/ alveolar N' }
  ];

  const getCurrentLetterInfo = () => {
    return tamilLetters.find(item => item.letter === currentLetter) || tamilLetters[0];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#e74c3c';

    // Draw guide letter function
    const drawGuideLetter = (ctx) => {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.font = '200px Tamil, serif';
      ctx.fillStyle = '#bdc3c7';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentLetter, 200, 200);
      ctx.restore();
    };

    // Draw guide letter if enabled
    if (showGuide) {
      drawGuideLetter(ctx);
    }
  }, [showGuide, currentLetter]);

  const drawGuideLetter = (ctx) => {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.font = '200px Tamil, serif';
    ctx.fillStyle = '#bdc3c7';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentLetter, 200, 200);
    ctx.restore();
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
      // Touch events
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      // Mouse events
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setStrokeCount(strokeCount + 1);
    setFeedback('');
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);

    // Get current letter info for feedback
    const letterInfo = tamilLetters.find(item => item.letter === currentLetter);
    const letterName = letterInfo ? letterInfo.name : currentLetter;

    // Provide feedback based on stroke count
    if (strokeCount >= 2) {
      setFeedback(`நல்லது! Good attempt at writing ${currentLetter} (${letterName})!`);
    } else if (strokeCount === 1) {
      setFeedback(`Keep going! ${currentLetter} needs more strokes.`);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showGuide) {
      // Redraw guide letter
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.font = '200px Tamil, serif';
      ctx.fillStyle = '#bdc3c7';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentLetter, 200, 200);
      ctx.restore();
    }

    setStrokeCount(0);
    setFeedback('');
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
    // The useEffect will handle redrawing the canvas
  };

  const selectLetter = (letter) => {
    setCurrentLetter(letter);
    setStrokeCount(0);
    setFeedback('');
    // The useEffect will handle redrawing the canvas with the new letter
  };

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * tamilLetters.length);
    const randomLetter = tamilLetters[randomIndex].letter;
    if (randomLetter !== currentLetter) {
      selectLetter(randomLetter);
      setFeedback(`🎲 Random letter selected: ${randomLetter}`);
    } else {
      getRandomLetter(); // Try again if same letter
    }
  };

  const giveTip = () => {
    const currentInfo = getCurrentLetterInfo();
    const tips = [
      `${currentLetter} is a ${currentInfo.type} letter`,
      `Practice the shape of ${currentLetter} slowly`,
      `${currentLetter} is pronounced as ${currentInfo.sound}`,
      `Focus on the unique features of ${currentLetter}`,
      'Draw slowly and deliberately for better muscle memory',
      'Use the guide to understand the proper proportions'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setFeedback(`💡 Tip: ${randomTip}`);
  };

  return (
    <Container>
      <div className="draw-letter-container">
        <div className="header-section">
          <h2>எழுத்து வரைதல் (Letter Drawing Practice)</h2>
          <h3>Draw the letter: {currentLetter}</h3>
        </div>

        <div className="letter-selection-section">
          <h4>Select a Tamil Letter to Practice:</h4>
          <div className="letter-categories">
            <div className="vowels-section">
              <h5>உயிர் எழுத்துகள் (Vowels)</h5>
              <div className="letter-grid">
                {tamilLetters.filter(item => item.type === 'Vowel').map((item) => (
                  <button
                    key={item.letter}
                    className={`letter-button ${currentLetter === item.letter ? 'selected' : ''}`}
                    onClick={() => selectLetter(item.letter)}
                    title={`${item.name} - ${item.sound}`}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="consonants-section">
              <h5>மெய் எழுத்துகள் (Consonants)</h5>
              <div className="letter-grid">
                {tamilLetters.filter(item => item.type === 'Consonant').map((item) => (
                  <button
                    key={item.letter}
                    className={`letter-button ${currentLetter === item.letter ? 'selected' : ''}`}
                    onClick={() => selectLetter(item.letter)}
                    title={`${item.name} - ${item.sound}`}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={getRandomLetter} className="random-button">
                            🎲 Random Letter
            </button>
          </div>
        </div>

        <div className="current-letter-display">
          <h4>Practice Letter:</h4>
          <div className="large-letter">{currentLetter}</div>
          <div className="letter-info">
            {tamilLetters.find(item => item.letter === currentLetter) && (
              <>
                <p className="letter-name">
                  {tamilLetters.find(item => item.letter === currentLetter).name}
                </p>
                <p className="letter-sound">
                                    Sound: {tamilLetters.find(item => item.letter === currentLetter).sound}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="drawing-section">
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              className="drawing-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />

            {feedback && (
              <div className="drawing-feedback">
                {feedback}
              </div>
            )}
          </div>

          <div className="controls-section">
            <div className="control-buttons">
              <button onClick={clearCanvas} className="clear-button">
                                🗑️ Clear Canvas
              </button>
              <button onClick={toggleGuide} className="guide-button">
                {showGuide ? '👁️ Hide Guide' : '👁️ Show Guide'}
              </button>
              <button onClick={giveTip} className="tip-button">
                                💡 Get Tip
              </button>
            </div>

            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Strokes:</span>
                <span className="stat-value">{strokeCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="instructions-section">
          <h4>Drawing Instructions:</h4>
          <div className="instruction-grid">
            <div className="instruction-item">
              <span className="step-number">1</span>
              <span className="step-text">Start with the curved line on the left side</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">2</span>
              <span className="step-text">Add the vertical line on the right</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">3</span>
              <span className="step-text">Connect or adjust the strokes as needed</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">4</span>
              <span className="step-text">Practice multiple times for muscle memory</span>
            </div>
          </div>
        </div>

        <div className="tips-section">
          <h4>Drawing Tips:</h4>
          <ul>
            <li>Use your finger or stylus to draw on the canvas</li>
            <li>Take your time - accuracy is more important than speed</li>
            <li>Toggle the guide on/off to challenge yourself</li>
            <li>Clear the canvas and try again as many times as needed</li>
            <li>Focus on the basic shape before adding details</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default DrawLetter;
