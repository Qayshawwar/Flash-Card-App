//Halema Diab
//Frontend code for UC1- User Login With Optional "Remember Me"
//maps to FR-25, FR-26, FR-27, FR-28, FR-29, FR-30, NFR-08, NFR-10
// //This page allows the user to log in, and to stay logged in, or take them to sign up

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../services/authApi';
import {
  clearLoginFailuresAndLockout,
  isAccountLocked,
  LOCKOUT_MESSAGE,
  recordLoginFailure,
} from '../../services/loginLockout';

const IDENTIFIER_FIELD_ID = 'login-identifier';
const PASSWORD_FIELD_ID = 'login-password';
const REMEMBER_FIELD_ID = 'login-remember';

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isAccountLocked()) {
      setMessage(LOCKOUT_MESSAGE);
      return;
    }

    const result = await loginRequest(identifier.trim(), password);
    if (result.ok) {
      clearLoginFailuresAndLockout();
      setMessage(null);
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('minddeck_token', result.token);
      navigate('/mock');
      return;
    }

    recordLoginFailure();
    setMessage(isAccountLocked() ? LOCKOUT_MESSAGE : result.error);
  }

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.logo}>MindDeck</h2>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to continue studying</p>

        {message ? (
          <div role="alert" style={styles.alert}>
            {message}
          </div>
        ) : null}

        <label htmlFor={IDENTIFIER_FIELD_ID} style={styles.label}>
          EMAIL OR USERNAME
        </label>
        <input
          id={IDENTIFIER_FIELD_ID}
          style={styles.input}
          type="text"
          placeholder="you@example.com"
          value={identifier}
          onChange={(ev) => setIdentifier(ev.target.value)}
          autoComplete="username"
        />

        <label htmlFor={PASSWORD_FIELD_ID} style={styles.label}>
          PASSWORD
        </label>
        <input
          id={PASSWORD_FIELD_ID}
          style={styles.input}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          autoComplete="current-password"
        />

        <div style={styles.rememberMe}>
          <input
            id={REMEMBER_FIELD_ID}
            type="checkbox"
            checked={rememberMe}
            onChange={(ev) => setRememberMe(ev.target.checked)}
          />
          <label htmlFor={REMEMBER_FIELD_ID} style={styles.rememberLabel}>
            Remember me
          </label>
        </div>

        <button type="submit" style={styles.signInButton}>
          Sign In
        </button>

        <p style={styles.or}>or</p>

        <button
          type="button"
          style={styles.createButton}
          onClick={() => navigate('/register')}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f0eb',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  alert: {
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '5px',
    backgroundColor: '#fdecea',
    color: '#611a15',
    fontSize: '13px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#333',
  },
  rememberLabel: {
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
  },
  signInButton: {
    padding: '10px',
    backgroundColor: '#6b8f71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  or: {
    textAlign: 'center' as const,
    color: '#888',
    fontSize: '13px',
    marginBottom: '10px',
  },
  createButton: {
    padding: '10px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#333',
  },
};

export default Login;
