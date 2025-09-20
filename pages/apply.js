import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react"; 

const Apply = () => {
  const { data: session, status } = useSession(); 
  const [tenantData, setTenantData] = useState({
    selectedProperty: null, 
  });
  const [error, setError] = useState("");

  // Handlingform submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking if user is authenticated
    if (!session || status === "unauthenticated") {
      setError("You must be logged in to apply.");
      return;
    }

    try {
      // Sending a POST request to submit application
      const res = await axios.post("/api/applications", {
        property_id: tenantData.selectedProperty,
      });

      // Handling successful response
      if (res.status === 200) {
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to submit the application. Please try again.");
    }
  };

  return (
    <div>
      <h1>Apply for Property</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="property">Select Property:</label>
          <select
            id="property"
            onChange={(e) =>
              setTenantData({ ...tenantData, selectedProperty: e.target.value })
            }
          >
            <option value="">--Select Property--</option>
            {session?.user?.properties?.map((property) => (
              <option key={property.id} value={property.id}>
                {property.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit Application</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Apply;
