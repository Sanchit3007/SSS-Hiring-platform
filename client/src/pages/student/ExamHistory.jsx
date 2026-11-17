import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertMessage from '../../components/AlertMessage';
import { History, Award, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const ExamHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/student/history');
        if (res.data.success) {
          setHistory(res.data.history);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch your examination history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <LoadingSpinner text="Loading exam history records..." />;

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">My Examination History</h2>
          <p className="text-muted small mb-0">Review all historical examination attempts, scores, and recruitment round statuses</p>
        </div>
      </div>

      <AlertMessage message={error} onClose={() => setError('')} />

      <div className="card custom-card overflow-hidden">
        {history.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No examination attempts recorded yet. Join an active recruitment drive to start an assessment.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Recruitment Drive & Paper</th>
                  <th className="py-3">Attempt #</th>
                  <th className="py-3">Score & Percentage</th>
                  <th className="py-3">Result</th>
                  <th className="py-3">Submission Status</th>
                  <th className="py-3">Current Round</th>
                  <th className="py-3 text-end px-4">Date Taken</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3">
                      <div className="fw-semibold text-dark">{item.drive?.name || 'Drive'}</div>
                      <div className="text-muted small">Paper: {item.paperTitle}</div>
                    </td>
                    <td className="py-3">
                      <span className="badge bg-light text-dark border">
                        Attempt {item.attemptNumber}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="fw-bold text-dark">
                        {item.score} / {item.totalMarks}
                      </div>
                      <div className="text-muted small">{item.percentage}%</div>
                    </td>
                    <td className="py-3">
                      <span className={`badge-custom badge-${item.isPassed ? 'passed' : 'rejected'}`}>
                        {item.isPassed ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {item.isPassed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="badge bg-light text-dark border">
                        {item.submissionStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="badge bg-primary-subtle text-primary">
                        {item.recruitmentStage}
                      </span>
                    </td>
                    <td className="py-3 text-end px-4 text-muted small">
                      {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamHistory;
