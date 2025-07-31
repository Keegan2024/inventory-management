import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportReview = () => {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setReports(res.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  const handleReview = async (reportId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reports/${reportId}`,
        { status, feedback: feedback[reportId] || '' },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setReports(reports.map(report =>
        report._id === reportId ? { ...report, status, feedback: feedback[reportId] } : report
      ));
    } catch (error) {
      console.error('Error reviewing report:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Reports</h2>
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report._id} className="card">
            <h3 className="text-xl font-semibold">{report.title}</h3>
            <p className="mt-2">{report.content}</p>
            <p className="text-sm text-gray-600">Submitted by: {report.submittedBy.email}</p>
            <p className="text-sm text-gray-600">Status: {report.status}</p>
            {report.feedback && <p className="text-sm text-gray-600">Feedback: {report.feedback}</p>}
            <textarea
              placeholder="Add feedback"
              onChange={(e) => setFeedback({ ...feedback, [report._id]: e.target.value })}
              className="input mt-2"
            ></textarea>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleReview(report._id, 'reviewed')}
                className="btn-primary bg-green-600 hover:bg-green-700"
              >
                Mark as Reviewed
              </button>
              <button
                onClick={() => handleReview(report._id, 'feedback')}
                className="btn-secondary bg-yellow-600 hover:bg-yellow-700"
              >
                Request Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportReview;
