// Srinidhi Sivakaminathan
// Test Cases for UC9 - Pause Study Session
// Maps to FR-19, FR-28, NFR-05, NFR-06

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock PauseSession component - simulates expected UC9 behavior
const PauseSession = ({ sessionActive }: { sessionActive: boolean }) => {
  const [isPaused, setIsPaused] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handlePause = () => {
    if (!sessionActive) {
      setError('No active session found');
      setStatus('');
      return;
    }
    if (isPaused) {
      setError('Unable to Pause session.');
      return;
    }
    setIsPaused(true);
    setError('');
    setStatus('paused');
  };

  const handleResume = () => {
    setIsPaused(false);
    setStatus('active');
  };

  return (
    <div>
      <p data-testid="session-status">{status}</p>
      <button data-testid="pause-btn" onClick={handlePause}>Pause</button>
      {isPaused && <button data-testid="resume-btn" onClick={handleResume}>Resume</button>}
      {error && <span data-testid="error-msg">{error}</span>}
      {isPaused && <span data-testid="paused-indicator">Session paused</span>}
    </div>
  );
};

test('TC1 - clicking pause during active session pauses successfully', () => {
  render(<PauseSession sessionActive={true} />);
  fireEvent.click(screen.getByTestId('pause-btn'));
  expect(screen.getByTestId('paused-indicator')).toHaveTextContent('Session paused');
});

test('TC2 - clicking pause with no active session shows error', () => {
  render(<PauseSession sessionActive={false} />);
  fireEvent.click(screen.getByTestId('pause-btn'));
  expect(screen.getByTestId('error-msg')).toHaveTextContent('No active session found');
});

test('TC3 - clicking pause on already paused session shows error', () => {
  render(<PauseSession sessionActive={true} />);
  fireEvent.click(screen.getByTestId('pause-btn'));
  fireEvent.click(screen.getByTestId('pause-btn'));
  expect(screen.getByTestId('error-msg')).toHaveTextContent('Unable to Pause session.');
});

test('TC4 - pause completes within 500ms', () => {
  render(<PauseSession sessionActive={true} />);
  const start = performance.now();
  fireEvent.click(screen.getByTestId('pause-btn'));
  const end = performance.now();
  expect(end - start).toBeLessThan(500);
});

test('TC5 - session state shows as paused in UI after pause', () => {
  render(<PauseSession sessionActive={true} />);
  fireEvent.click(screen.getByTestId('pause-btn'));
  expect(screen.getByTestId('paused-indicator')).toBeInTheDocument();
});