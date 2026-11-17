import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertMessage from '../../components/AlertMessage';
import { Award, CheckCircle2, XCircle, ArrowRight, Home, Calendar } from 'lucide-react';

const ExamResult = () => {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/exams/attempt/${attemptId}`);
        if (res.data.success) {
          setAttempt(res.data.result || res.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch examination score summary');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) return <LoadingSpinner text="Computing assessment results..." />;

  const isPassed = attempt?.isPassed;

  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card custom-card p-5 border-0 shadow-sm">
            <AlertMessage message={error} onClose={() => setError('')} />

            <div className={`d-inline-flex p-4 rounded-circle mb-3 ${isPassed ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
              {isPassed ? <CheckCircle2 size={56} /> : <XCircle size={56} />}
            </div>

            <h3 className="fw-bold text-dark mb-1">
              {isPassed ? 'Congratulations! You Passed' : 'Assessment Completed'}
            </h3>
            <p className="text-muted small mb-4">
              Your examination answers have been securely evaluated and recorded by the system.
            </p>

            {/* Score Metric Card */}
            <div className="p-4 bg-light rounded-3 border mb-4">
              <div className="row g-3">
                <div className="col-4">
                  <div className="fs-3 fw-bold text-dark">{attempt?.score}</div>
                  <div className="text-muted small">Score Obtained</div>
                </div>
                <div className="col-4 border-start border-end">
                  <div className="fs-3 fw-bold text-dark">{attempt?.totalMarks}</div>
                  <div className="text-muted small">Total Marks</div>
                </div>
                <div className="col-4">
                  <div className={`fs-3 fw-bold ${isPassed ? 'text-success' : 'text-danger'}`}>
                    {attempt?.percentage}%
                  </div>
                  <div className="text-muted small">Percentage</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              <div className="d-flex justify-content-between p-2 px-3 bg-white rounded border small text-muted">
                <span>Result Status:</span>
                <span className={`badge-custom badge-${isPassed ? 'passed' : 'rejected'}`}>
                  {isPassed ? 'Qualified' : 'Did Not Qualify'}
                </span>
              </div>
              <div className="d-flex justify-content-between p-2 px-3 bg-white rounded border small text-muted">
                <span>Submission Mode:</span>
                <span className="fw-medium text-dark">{attempt?.submissionStatus || 'Submitted'}</span>
              </div>
              {attempt?.submittedAt && (
                <div className="d-flex justify-content-between p-2 px-3 bg-white rounded border small text-muted">
                  <span>Submitted At:</span>
                  <span className="fw-medium text-dark">{new Date(attempt.submittedAt).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="d-flex gap-2 justify-content-center">
              <Link to="/student/dashboard" className="btn btn-primary-custom d-flex align-items-center gap-2">
                <Home size={18} /> Candidate Dashboard
              </Link>
              <Link to="/student/history" className="btn btn-outline-custom d-flex align-items-center gap-2">
                View Full History <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
