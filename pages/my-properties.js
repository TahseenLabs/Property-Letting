import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function MyProperties() {
  const { data: session } = useSession();
 
  // Restricting tenants from accessing 
  if (session.user.role === "tenant") {
    return (
      <p className="text-red-600 text-xl text-center mt-10 font-semibold">
        Access Denied
      </p>
    );
  }

  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [editProperty, setEditProperty] = useState(null);

  // Fetching landlord's property
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch(
        `/api/properties/properties?landlord_id=${session.user.id}`
      );
      const data = await res.json();
      if (data.properties) {
        setProperties(data.properties);
      }
    };
    if (session) fetchProperties();
  }, [session]);

  // Handling adding a new property
  const handleAddProperty = async () => {
    const res = await fetch("/api/properties/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProperty, landlord_id: session.user.id }),
    });
    const data = await res.json();
    if (data.propertyId) {
      setProperties([
        ...properties,
        { ...newProperty, property_id: data.propertyId },
      ]);
      setNewProperty({
        title: "",
        description: "",
        price: "",
        location: "",
      });
    }
  };

  // Handling editing a property
  const handleEditProperty = async () => {
    const res = await fetch("/api/properties/properties", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editProperty }),
    });
    const data = await res.json();
    if (data.message === "Property updated") {
      setProperties(
        properties.map((property) =>
          property.property_id === editProperty.property_id
            ? editProperty
            : property
        )
      );
      setEditProperty(null);
    }
  };

  // Handling deleting a property
  const handleDeleteProperty = async (id) => {
    const res = await fetch(`/api/properties/properties?property_id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message === "Property deleted") {
      setProperties(
        properties.filter((property) => property.property_id !== id)
      );
    }
  };

  if (!session) return <p>You must be logged in to manage properties.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">My Properties</h1>

      {/* Landlord Dashboard */}
      {session.user.role === "landlord" && (
        <div>
          <h2 className="text-xl mt-4">Landlord Dashboard</h2>
          <p>Manage your listed properties:</p>

          {/* To Add New Property Form */}
          <div>
            <h3 className="text-lg mt-4">Add a New Property</h3>
            <input
              type="text"
              value={newProperty.title}
              onChange={(e) =>
                setNewProperty({ ...newProperty, title: e.target.value })
              }
              placeholder="Property Title"
              className="border p-2 mb-2 w-full"
            />
            <textarea
              value={newProperty.description}
              onChange={(e) =>
                setNewProperty({ ...newProperty, description: e.target.value })
              }
              placeholder="Property Description"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              value={newProperty.price}
              onChange={(e) =>
                setNewProperty({ ...newProperty, price: e.target.value })
              }
              placeholder="Property Price"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={newProperty.location}
              onChange={(e) =>
                setNewProperty({ ...newProperty, location: e.target.value })
              }
              placeholder="Property Location"
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={handleAddProperty}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Property
            </button>
          </div>

          {/* To Edit Property Form */}
          {editProperty && (
            <div>
              <h3 className="text-lg mt-4">Edit Property</h3>
              <input
                type="text"
                value={editProperty.title}
                onChange={(e) =>
                  setEditProperty({ ...editProperty, title: e.target.value })
                }
                placeholder="Property Title"
                className="border p-2 mb-2 w-full"
              />
              <textarea
                value={editProperty.description}
                onChange={(e) =>
                  setEditProperty({
                    ...editProperty,
                    description: e.target.value,
                  })
                }
                placeholder="Property Description"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                value={editProperty.price}
                onChange={(e) =>
                  setEditProperty({ ...editProperty, price: e.target.value })
                }
                placeholder="Property Price"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editProperty.location}
                onChange={(e) =>
                  setEditProperty({ ...editProperty, location: e.target.value })
                }
                placeholder="Property Location"
                className="border p-2 mb-2 w-full"
              />
              <button
                onClick={handleEditProperty}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Property
              </button>
            </div>
          )}

          {/* List of Properties */}
          <h3 className="text-xl mt-4">My Properties</h3>
          <ul>
            {properties.map((property) => (
              <li key={property.property_id} className="border p-4 mb-4">
                <h4 className="text-lg">{property.title}</h4>
                <p>{property.description}</p>
                <p>Price: ${property.price}</p>
                <p>Location: {property.location}</p>
                <button
                  onClick={() => setEditProperty(property)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProperty(property.property_id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Admin Dashboard it's only visible if user is admin */}
      {session.user.role === "admin" && (
        <div>
          <h2 className="text-xl mt-4">Admin Dashboard</h2>
          <p>Manage users and applications:</p>
          <div className="bg-gray-200 p-4 rounded mt-4">
            <h3 className="font-semibold">Sample Admin Info:</h3>
            <p>
              <strong>Name:</strong> {session.user.name}
            </p>
            <p>
              <strong>Status:</strong> Approving 10 applications
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
