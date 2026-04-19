// Flashcard List Page - UC4 (Qays), UC10 (Aaliyan), UC11 (Aaliyan), UC13 (Vitalii), UC14 (Vitalii), UC16 (Vitalii)
// Shows all flashcards inside a specific collection
// UC4:  "Study" button to start random study mode
// UC10: Import flashcards from file (Aaliyan) - modal/button
// UC11: Export collection as PDF (Aaliyan) - modal/button
// UC13: Search bar to filter flashcards by keyword (Vitalii)
// UC14: Add flashcard manually via "+" button (Vitalii)
// UC16: Share collection button (Vitalii)

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMinddeckToken } from '../services/apiAuth';
import { duplicateFlashcard, getFlashcards, type FlashcardDto } from '../services/flashcardApi';

export default function FlashcardList() {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<number | null>(null);

  const loadCards = useCallback(async () => {
    if (!collectionId) {
      setError('Missing collection.');
      setLoading(false);
      return;
    }
    if (!getMinddeckToken()) {
      setError('Please sign in to view this collection.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const list = await getFlashcards(collectionId);
      setCards(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load flashcards.');
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    void loadCards();
  }, [loadCards]);

  async function handleDuplicate(flashcardID: number) {
    if (!collectionId) return;
    setDuplicatingId(flashcardID);
    setError(null);
    try {
      const copy = await duplicateFlashcard(collectionId, flashcardID);
      setCards((prev) => [...prev, copy]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not duplicate flashcard.');
    } finally {
      setDuplicatingId(null);
    }
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="6" width="20" height="15" rx="3" fill="#a8c5a0" stroke="#6b8f71" strokeWidth="1.5"/>
            <rect x="5" y="13" width="20" height="15" rx="3" fill="white" stroke="#6b8f71" strokeWidth="1.5"/>
          </svg>
          <span style={styles.navTitle}>MindDeck</span>
        </div>
        <div style={styles.navRight}>
          <button style={styles.profileBtn} onClick={() => navigate('/edit-profile')}>Profile</button>
        </div>
      </nav>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/collections')}>
          ← Back to Collections
        </button>

        <h2 style={styles.heading}>Collection Name</h2>

        {collectionId ? (
          <div style={styles.actions}>
            <button
              type="button"
              style={styles.primaryBtn}
              onClick={() => navigate(`/collections/${collectionId}/study`)}
            >
              Study
            </button>
          </div>
        ) : null}

        {error ? (
          <div role="alert" style={styles.alert}>
            {error}
            {error.includes('sign in') ? (
              <>
                {' '}
                <button type="button" style={styles.linkBtn} onClick={() => navigate('/')}>
                  Sign in
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        {loading ? (
          <p style={styles.muted}>Loading flashcards…</p>
        ) : !error || cards.length > 0 ? (
          <div style={styles.tableWrap}>
            {!loading && cards.length === 0 && !error ? (
              <p style={styles.muted}>No flashcards in this collection yet.</p>
            ) : null}
            {cards.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Question</th>
                    <th style={styles.th}>Answer</th>
                    <th style={styles.thAction} aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {cards.map((c) => (
                    <tr key={c.flashcardID}>
                      <td style={styles.td}>{c.question}</td>
                      <td style={styles.td}>{c.answer}</td>
                      <td style={styles.tdAction}>
                        <button
                          type="button"
                          style={styles.smallBtn}
                          disabled={duplicatingId === c.flashcardID}
                          onClick={() => void handleDuplicate(c.flashcardID)}
                        >
                          {duplicatingId === c.flashcardID ? 'Duplicating…' : 'Duplicate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', backgroundColor: '#f5f3ee', fontFamily: 'Georgia, serif' },
  navbar: { backgroundColor: '#ffffff', padding: '12px 24px', borderBottom: '1px solid #e0ddd6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  navBrand: { display: 'flex', alignItems: 'center', gap: '8px' },
  navTitle: { fontWeight: 'bold', fontSize: '18px', color: '#2c2c2c', letterSpacing: '0.5px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  profileBtn: { background: 'none', border: '1px solid #ddd', borderRadius: '8px', padding: '6px 16px', fontSize: '14px', color: '#555', cursor: 'pointer', fontFamily: 'sans-serif' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '32px 16px' },
  backBtn: { background: 'none', border: 'none', color: '#555', fontSize: '14px', cursor: 'pointer', marginBottom: '16px', padding: '0' },
  heading: { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' },
  actions: { marginBottom: '16px' },
  primaryBtn: {
    backgroundColor: '#6b8f71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 18px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
  },
  alert: {
    backgroundColor: '#fdeaea',
    color: '#8b2a2a',
    padding: '12px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontFamily: 'sans-serif',
    fontSize: '14px',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#6b8f71',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    padding: 0,
  },
  muted: { color: '#888', fontFamily: 'sans-serif', fontSize: '14px' },
  tableWrap: { marginTop: '8px' },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    fontFamily: 'sans-serif',
    fontSize: '14px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 14px',
    backgroundColor: '#e8efe9',
    color: '#2c2c2c',
    fontWeight: 600,
    borderBottom: '1px solid #d8dfd9',
  },
  thAction: {
    width: '120px',
    padding: '12px 14px',
    backgroundColor: '#e8efe9',
    borderBottom: '1px solid #d8dfd9',
  },
  td: {
    padding: '12px 14px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
    color: '#333',
  },
  tdAction: {
    padding: '10px 14px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle',
    textAlign: 'right',
  },
  smallBtn: {
    backgroundColor: '#fff',
    border: '1px solid #6b8f71',
    color: '#4a6b4f',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
  },
};
