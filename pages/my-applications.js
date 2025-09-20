import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MyApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  // Fetching applications when component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications', {
          method: 'GET',
        });

        const data = await res.json();
        if (res.ok) {
          setApplications(data.applications);
        } else {
          setError(data.message || 'Failed to load applications.');
        }
      } catch (err) {
        setError('Failed to load applications.');
        console.error(err);
      }
    };

    if (session) {
      fetchApplications();
    }
  }, [session]);

  if (!session) return <p>Loading session...</p>;
  if (session.user.role !== 'tenant') return <p>Access denied. Tenants only.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">My Applications</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {applications.length === 0 ? (
          <p>You have not submitted any applications yet.</p>
        ) : (
          applications.map((application) => (
            <div key={application.application_id} className="border p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{application.title}</h2>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Price:</strong> ${application.price}</p>
              <p><strong>Address:</strong> {application.address}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
