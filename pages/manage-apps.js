// pages/manage-apps.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/applications/all") 
        .then((res) => res.json())
        .then((data) => setApplications(data.applications || []));
    }
  }, [session]);

  if (!session) return <p>Loading...</p>;
  if (session.user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Applications</h1>
      {applications.map((app) => (
        <section
          key={app.application_id}
          className="text-gray-600 body-font overflow-hidden"
        >
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700">
                    Application ID: {app.application_id}
                  </span>
                  <span className="mt-1 text-gray-500 text-sm">
                    Status: {app.status}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                    Username: {app.tenant_username}
                  </h2>
                  <p className="leading-relaxed">
                    {app.property_title}
                    This property, titled {app.property_title}, has been booked
                    by the tenant with the username {app.tenant_username}. The
                    current status of the application {app.application_id} is{" "}
                    {app.status}. Review the details to understand the progress
                    and tenant activity associated with this listing on{" "}
                    <Link href="/manage-users">
                      <span className="text-indigo-500 inline-flex items-center">
                        Manage Users
                      </span>
                    </Link>{" "}
                    page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
