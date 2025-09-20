import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function Logout() {
  useEffect(() => {
    const baseUrl = window.location.origin;

    // When sign out redirecting to homepage 
    signOut({ callbackUrl: `${baseUrl}/` });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Logging you out...
    </div>
  );
}
