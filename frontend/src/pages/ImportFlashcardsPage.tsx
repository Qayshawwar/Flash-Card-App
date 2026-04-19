import { useRef, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

type PreviewRow = { question: string; answer: string };

export default function ImportFlashcardsPage() {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<PreviewRow[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    setStatus(null);
    const file = files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const rows: PreviewRow[] = [];
      for (const line of text.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const [q, ...rest] = trimmed.split(',').map((s) => s.trim());
        const a = rest.join(', ') || '—';
        if (q) rows.push({ question: q, answer: a });
      }
      setPreviews(rows.slice(0, 12));
      setStatus(
        rows.length
          ? `Previewing ${Math.min(rows.length, 12)} of ${rows.length} row(s).`
          : 'No rows found. Try CSV with "question,answer" per line.'
      );
    };
    reader.readAsText(file);
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <button
          type="button"
          style={backBtnStyle}
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

      <div style={containerStyle}>
        <h1 style={h1Style}>Import flashcards</h1>
        <p style={leadStyle}>
          Collection ID:{' '}
          <code style={codeStyle}>{collectionId ?? '—'}</code> — upload a CSV
          (question, answer per line) to preview. Saving to the server is not
          wired yet.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv,text/plain"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          style={chooseFileBtnStyle}
          onClick={() => fileInputRef.current?.click()}
        >
          Choose CSV file
        </button>

        {status ? <p style={statusStyle}>{status}</p> : null}
        {previews.length > 0 ? (
          <div style={listStyle}>
            <h2 style={h2Style}>Preview</h2>
            {previews.map((row, i) => (
              <div key={`${row.question}-${i}`} style={cardStyle}>
                <p style={cardMetaStyle}>#{i + 1}</p>
                <p style={cardQStyle}>{row.question}</p>
                <p style={cardAStyle}>{row.answer}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: 'var(--app-bg, #f5f3ee)',
  fontFamily: 'Georgia, serif',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid var(--app-muted, #e0ddd6)',
};

const backBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--app-muted-strong, #555)',
  fontSize: 14,
  cursor: 'pointer',
  padding: 0,
  fontFamily: 'sans-serif',
};

const containerStyle: CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '32px 16px',
};

const h1Style: CSSProperties = {
  fontSize: 22,
  fontWeight: 'bold',
  color: 'var(--app-fg, #1a1a1a)',
  marginTop: 0,
};

const leadStyle: CSSProperties = {
  fontSize: 14,
  color: 'var(--app-muted, #666)',
  lineHeight: 1.5,
  marginBottom: 20,
  fontFamily: 'sans-serif',
};

const codeStyle: CSSProperties = {
  fontSize: 13,
  backgroundColor: 'var(--app-surface, #eee)',
  padding: '2px 6px',
  borderRadius: 4,
};

const chooseFileBtnStyle: CSSProperties = {
  backgroundColor: 'var(--app-accent, #6b8f71)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 18px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'sans-serif',
};

const statusStyle: CSSProperties = {
  fontSize: 14,
  color: 'var(--app-accent, #6b8f71)',
  fontFamily: 'sans-serif',
  marginTop: 16,
};

const listStyle: CSSProperties = {
  marginTop: 28,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const h2Style: CSSProperties = {
  fontSize: 18,
  fontFamily: 'sans-serif',
  color: 'var(--app-fg, #1a1a1a)',
  margin: '0 0 8px 0',
};

const cardStyle: CSSProperties = {
  border: '1px solid var(--app-muted, #e0ddd6)',
  borderRadius: 8,
  padding: '12px 14px',
  backgroundColor: 'var(--app-surface, #fff)',
};

const cardMetaStyle: CSSProperties = {
  fontSize: 11,
  color: 'var(--app-muted, #888)',
  margin: '0 0 6px 0',
  fontFamily: 'sans-serif',
};

const cardQStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--app-fg, #1a1a1a)',
  margin: '0 0 6px 0',
  fontFamily: 'sans-serif',
};

const cardAStyle: CSSProperties = {
  fontSize: 14,
  color: 'var(--app-muted-strong, #555)',
  margin: 0,
  fontFamily: 'sans-serif',
  lineHeight: 1.45,
};
