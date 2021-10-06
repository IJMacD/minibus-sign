import { useEffect, useState } from 'react';
import './App.css';

const LINE1_DEFAULT = "香港";
const LINE2_DEFAULT = "油麻地";

function App() {
  const [ line1, setLine1 ] = useState(() => getHashValue("l1", LINE1_DEFAULT));
  const [ line2, setLine2 ] = useState(() => getHashValue("l2", LINE2_DEFAULT));

  useEffect(() => {
    window.location.hash = `l1=${encodeURIComponent(line1)}&l2=${encodeURIComponent(line2)}`;
  }, [line1, line2]);

  useEffect(() => {
    const cb = () => {
      setLine1(getHashValue("l1", ""));
      setLine2(getHashValue("l2", ""));
    };

    window.addEventListener("hashchange", cb);

    return () => window.removeEventListener("hashchange", cb);
  }, []);

  return (
    <div className="App">
      <label>Line 1: <input value={line1} onChange={e => setLine1(e.target.value)} /></label>
      <label>Line 2: <input value={line2} onChange={e => setLine2(e.target.value)} /></label>
      <div className="paai">
        <p className="line1">{line1}</p>
        <p className="line2">{line2}</p>
      </div>
    </div>
  );
}

export default App;

function getHashValue (key, defaultValue = null) {
  const { hash } = window.location;

  if (!hash) return defaultValue;

  const params = new URLSearchParams(hash.substr(1));

  return params.get(key) || defaultValue;
}