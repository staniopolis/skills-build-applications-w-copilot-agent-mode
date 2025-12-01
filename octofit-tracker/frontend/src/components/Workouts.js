import React, { useEffect, useState } from 'react';
import JsonTable from './JsonTable';

const Workouts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawOpen, setRawOpen] = useState(false);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  const url = `${base}/api/workouts/`;

  const load = () => {
    setLoading(true);
    setError(null);
    console.log('[Workouts] fetching from', url);
    fetch(url)
      .then(r => r.json())
      .then(json => {
        console.log('[Workouts] fetched', json);
        if (json && json.results) setData(json.results);
        else if (Array.isArray(json)) setData(json);
        else setData([]);
      })
      .catch(err => {
        console.error('[Workouts] fetch error', err);
        setError(String(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-card card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="page-title">Workouts</div>
            <div className="muted">Endpoint: {url}</div>
          </div>
          <div className="controls">
            <button className="btn btn-outline-secondary" onClick={load} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="btn btn-primary" onClick={() => setRawOpen(true)}>
              View Raw
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-wrapper">
          <JsonTable data={data} />
        </div>
      </div>

      {rawOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workouts — Raw JSON</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setRawOpen(false)} />
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setRawOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
