import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PauseSession from '../components/PauseSession';

describe('PauseSession', () => {
  test('shows deck and progress text', () => {
    render(
      <PauseSession
        deckName="Biology 101"
        currentCard={2}
        totalCards={10}
        onResume={jest.fn()}
        onDashboard={jest.fn()}
      />
    );

    expect(screen.getByText('Study session paused')).toBeInTheDocument();
    expect(screen.getByText('Deck: Biology 101')).toBeInTheDocument();
    expect(screen.getByText('Progress: 2/10 cards')).toBeInTheDocument();
  });

  test('calls handlers when buttons are clicked', () => {
    const onResume = jest.fn();
    const onDashboard = jest.fn();

    render(
      <PauseSession
        deckName="Biology 101"
        currentCard={2}
        totalCards={10}
        onResume={onResume}
        onDashboard={onDashboard}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /return to dashboard/i }));
    fireEvent.click(screen.getByRole('button', { name: /resume session/i }));

    expect(onDashboard).toHaveBeenCalledTimes(1);
    expect(onResume).toHaveBeenCalledTimes(1);
  });
});
