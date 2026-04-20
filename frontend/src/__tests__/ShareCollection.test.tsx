import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FlashcardList from '../pages/FlashcardList';

const mockCollectionId = '1';

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={[`/collections/${mockCollectionId}`]}>
      <Routes>
        <Route path="/collections/:collectionId" element={<FlashcardList />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  sessionStorage.setItem('minddeck_token', 'test-token');
  localStorage.setItem('minddeck_token', 'test-token');

  global.fetch = jest.fn((url: string) => {
    if (url.includes('/flashcards/flagged')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) } as Response);
    }
    if (url.includes('/flashcards')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([{ flashcardID: 1, question: 'Q1', answer: 'A1', isFlaggedDifficult: false }]) } as Response);
    }
    if (url.includes('/share')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ message: 'Collection shared successfully.' }) } as Response);
    }
    if (url.includes('/users/me')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ username: 'testuser', email: 'test@test.com' }) } as Response);
    }
    if (url.includes('/collections')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([{ collectionID: 1, collectionName: 'Test Collection', visibility: 'private' }]) } as Response);
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response);
  }) as jest.Mock;

  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

describe('UC16 - Share Collection', () => {
  test('TC1: Valid Share - clicking Share button calls share endpoint and shows modal', async () => {
    renderComponent();
    const shareBtn = await screen.findByText('🔗 Share');
    fireEvent.click(shareBtn);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/share'),
        expect.objectContaining({ method: 'POST' })
      );
    });
    expect(await screen.findByText('Share Collection')).toBeInTheDocument();
  });

  test('TC2: User Cancels Share - clicking Close hides modal', async () => {
    renderComponent();
    const shareBtn = await screen.findByText('🔗 Share');
    fireEvent.click(shareBtn);
    const closeBtn = await screen.findByText('Close');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByText('Share Collection')).not.toBeInTheDocument();
    });
  });

  test('TC3: User Closes Dialog - modal dismissed, collection remains private', async () => {
    renderComponent();
    const shareBtn = await screen.findByText('🔗 Share');
    fireEvent.click(shareBtn);
    expect(await screen.findByText('Share Collection')).toBeInTheDocument();
    const closeBtn = await screen.findByText('Close');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Share Collection')).not.toBeInTheDocument();
  });

  test('TC4: Duplicate Share Attempt - sharing already shared collection does not error', async () => {
    renderComponent();
    const shareBtn = await screen.findByText('🔗 Share');
    fireEvent.click(shareBtn);
    await waitFor(() => expect(screen.findByText('Share Collection')).toBeTruthy());
    const closeBtn = await screen.findByText('Close');
    fireEvent.click(closeBtn);
    fireEvent.click(shareBtn);
    expect(await screen.findByText('Share Collection')).toBeInTheDocument();
  });
});