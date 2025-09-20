import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "tenant",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess("Registered successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError(data.message);
    }
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Welcome to LETEASE DUBLIN
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            LETEASE DUBLIN is the perfect platform for both tenants and
            landlords to connect seamlessly. Whether you're looking for a place
            to rent or seeking reliable tenants for your property, we provide an
            easy-to-use space to meet all your leasing needs in Dublin.
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full flex-col mx-auto px-8 sm:px-0 space-y-4 items-center">
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="relative flex-grow w-full max-w-sm">
              <label for="username" class="leading-7 text-sm text-gray-600">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            {/* Password Input  */}
            <div className="relative flex-grow w-full max-w-sm">
              <label for="password" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {/* Dropdown Menu */}
            <div className="relative flex-grow w-full max-w-sm mt-1">
              <label for="role" class="leading-7 text-sm text-gray-600">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                id="role"
                name="role"
                className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>

            <button
              type="submit"
              class="text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg mt-6"
            >
              Submit
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </section>
  );
}
