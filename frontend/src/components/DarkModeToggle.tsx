import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'minddeck-theme-dark';
const STYLE_ID = 'minddeck-theme-vars';

type ThemeValue = {
  dark: boolean;
  setDark: (next: boolean) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

function injectThemeStylesOnce(): void {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    body {
      margin: 0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: var(--app-bg);
      color: var(--app-fg);
    }
    :root[data-theme='light'] {
      --app-bg: #f5f3ee;
      --app-fg: #1a1a1a;
      --app-muted: #888888;
      --app-muted-strong: #555555;
      --app-accent: #6b8f71;
      --app-surface: #fafafa;
    }
    :root[data-theme='dark'] {
      --app-bg: #141718;
      --app-fg: #e8eaed;
      --app-muted: #9aa0a6;
      --app-muted-strong: #bdc1c6;
      --app-accent: #6b8f71;
      --app-surface: #2a2f33;
    }
  `;
  document.head.appendChild(el);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    injectThemeStylesOnce();
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, dark ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [dark]);

  const setDark = useCallback((next: boolean) => {
    setDarkState(next);
  }, []);

  const toggle = useCallback(() => {
    setDarkState((d) => !d);
  }, []);

  const value = useMemo(
    () => ({ dark, setDark, toggle }),
    [dark, setDark, toggle]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

type Props = {
  variant?: 'default' | 'compact';
  showLabel?: boolean;
};

export default function DarkModeToggle({
  variant = 'default',
  showLabel = true,
}: Props) {
  const { dark, toggle } = useTheme();
  const compact = variant === 'compact';
  const accent = 'var(--app-accent, #6b8f71)';

  return (
    <div
      style={compact ? styles.rowCompact : styles.row}
      className="dark-mode-toggle"
    >
      {showLabel ? (
        <div>
          <p style={{ ...styles.label, fontSize: compact ? 13 : 16 }}>
            Dark mode
          </p>
          {!compact ? (
            <p style={styles.hint}>
              {dark ? 'Dark theme is on' : 'Dark theme is off'}
            </p>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Toggle dark mode"
        onClick={toggle}
        style={{
          ...styles.switchTrack,
          width: compact ? 44 : 50,
          height: compact ? 26 : 28,
          backgroundColor: dark ? accent : '#c4c4c4',
        }}
      >
        <span
          style={{
            ...styles.switchThumb,
            width: compact ? 20 : 22,
            height: compact ? 20 : 22,
            transform: dark
              ? `translateX(${compact ? 18 : 22}px)`
              : 'translateX(0)',
          }}
        />
      </button>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  rowCompact: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontWeight: 600,
    margin: 0,
    color: 'var(--app-fg, #333)',
  },
  hint: {
    fontSize: 13,
    margin: '4px 0 0 0',
    color: 'var(--app-muted, #888)',
  },
  switchTrack: {
    borderRadius: 14,
    border: 'none',
    padding: 3,
    cursor: 'pointer',
    position: 'relative',
    flexShrink: 0,
    transition: 'background-color 0.2s ease',
  },
  switchThumb: {
    display: 'block',
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s ease',
  },
};
