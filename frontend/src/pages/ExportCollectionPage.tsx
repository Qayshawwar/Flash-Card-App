import { type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const SAMPLE = [
  {
    question: 'What is photosynthesis?',
    answer: 'Process plants use to make food from light.',
  },
  { question: 'Define mitochondria', answer: 'Organelle that produces ATP.' },
];

export default function ExportCollectionPage() {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  function handleExportPdf() {
    window.alert('Export to PDF will call the API when UC11 is implemented.');
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button
          type="button"
          style={styles.backBtn}
          onClick={() =>
            collectionId
              ? navigate(`/collections/${collectionId}`)
              : navigate('/mock')
          }
        >
          ← Back
        </button>
        <DarkModeToggle variant="compact" showLabel={false} />
      </header>

      <div style={styles.container}>
        <h1 style={styles.h1}>Export collection</h1>
        <p style={styles.lead}>
          Collection ID: <code style={styles.code}>{collectionId ?? '—'}</code>
          — preview what will be included in the PDF export.
        </p>
        <button type="button" style={styles.primary} onClick={handleExportPdf}>
          Download PDF
        </button>
        <div style={styles.list}>
          <h2 style={styles.h2}>Included cards</h2>
          {SAMPLE.map((row, i) => (
            <div key={row.question} style={styles.card}>
              <p style={styles.cardMeta}>#{i + 1}</p>
              <p style={styles.cardQ}>{row.question}</p>
              <p style={styles.cardA}>{row.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--app-bg, #f5f3ee)',
    fontFamily: 'Georgia, serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--app-muted, #e0ddd6)',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--app-muted-strong, #555)',
    fontSize: 14,
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'sans-serif',
  },
  container: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '32px 16px',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'var(--app-fg, #1a1a1a)',
    marginTop: 0,
  },
  lead: {
    fontSize: 14,
    color: 'var(--app-muted, #666)',
    lineHeight: 1.5,
    marginBottom: 20,
    fontFamily: 'sans-serif',
  },
  code: {
    fontSize: 13,
    backgroundColor: 'var(--app-surface, #eee)',
    padding: '2px 6px',
    borderRadius: 4,
  },
  primary: {
    backgroundColor: 'var(--app-accent, #6b8f71)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'sans-serif',
  },
  list: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  h2: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    color: 'var(--app-fg, #1a1a1a)',
    margin: '0 0 8px 0',
  },
  card: {
    border: '1px solid var(--app-muted, #e0ddd6)',
    borderRadius: 8,
    padding: '12px 14px',
    backgroundColor: 'var(--app-surface, #fff)',
  },
  cardMeta: {
    fontSize: 11,
    color: 'var(--app-muted, #888)',
    margin: '0 0 6px 0',
    fontFamily: 'sans-serif',
  },
  cardQ: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--app-fg, #1a1a1a)',
    margin: '0 0 6px 0',
    fontFamily: 'sans-serif',
  },
  cardA: {
    fontSize: 14,
    color: 'var(--app-muted-strong, #555)',
    margin: 0,
    fontFamily: 'sans-serif',
    lineHeight: 1.45,
  },
};
