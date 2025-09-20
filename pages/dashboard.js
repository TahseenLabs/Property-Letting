import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

// I created a function to CAPS 1st letter
const capitalizeRole = (role) => role.charAt(0).toUpperCase() + role.slice(1);

export default function Dashboard({ user }) {
  const router = useRouter();

  // Debugging
  console.log(user);

  return (
    <div>
      {/* Navigation Bar */}
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <span className="ml-3 text-xl">LETEASE DUBLIN</span>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/apply">
              <span className="mr-5 hover:text-gray-900">Apply</span>
            </Link>
            <Link href="/listings">
              <span className="mr-5 hover:text-gray-900">Listings</span>
            </Link>
            <Link href="/manage-apps">
              <span className="mr-5 hover:text-gray-900">Manage Apps</span>
            </Link>
            <Link href="/manage-users">
              <span className="mr-5 hover:text-gray-900">Manage Users</span>
            </Link>
            <Link href="/my-applications">
              <span className="mr-5 hover:text-gray-900">My Applications</span>
            </Link>
            <Link href="/my-properties">
              <span className="mr-5 hover:text-gray-900">My Properties</span>
            </Link>
          </nav>
          <button
            onClick={() => router.push("/logout")}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      {/*DASHBOARD STYLING */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Welcome! {user.name}
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              You're logged in as a {capitalizeRole(user.role)} and have access
              to your dashboard.
            </p>
            <div class="flex mt-6 justify-center">
              <div class="w-16 h-1 rounded-full bg-gray-500 inline-flex"></div>
            </div>
          </div>

          <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {/* BLOCK STARTS*/}
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75a.75.75 0 00.75.75h4.5v-6h4.5v6h4.5a.75.75 0 00.75-.75V10.5"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Apply
                </h2>
                <p class="leading-relaxed text-base">
                  Ready to get started? Simply fill out the application form,
                  and you’ll be on your way. It’s a quick process!
                </p>
                <Link href="/apply">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    Apply
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            {/* BLOCK ENDS*/}
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213 3 21l1.788-4.5L16.862 3.487z"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  My Properties
                </h2>
                <p class="leading-relaxed text-base">
                  Explore a curated selection of my personally managed
                  properties, each offering a unique blend of comfort, design,
                  and functionality. From modern interiors to prime locations,
                  these spaces reflect quality living and thoughtful amenities
                  tailored for a variety of lifestyles.
                </p>
                <Link href="/my-properties">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    My Properties
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Listings
                </h2>
                <p class="leading-relaxed text-base">
                  Browse through available listings to explore your options.
                  Find what best suits your needs with ease.
                </p>
                <Link href="/listings">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    Listings
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2zM3 8h18M3 12h18M3 16h18"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Manage Apps
                </h2>
                <p class="leading-relaxed text-base">
                  Effortlessly manage your applications here. Keep track of your
                  app details, updates, and settings in one place.
                </p>
                <Link href="/manage-apps">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    Manage Apps
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4zM12 10a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Manage Users
                </h2>
                <p class="leading-relaxed text-base">
                  Take control of user accounts with simple management tools.
                  Add, edit, or remove users as needed to keep everything
                  organized.
                </p>
                <Link href="/manage-users">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    Manage Users
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16M4 8h16M4 12h16M4 16h16M4 20h16"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  My Applications
                </h2>
                <p class="leading-relaxed text-base">
                  View and manage all your applications in one spot. Check their
                  status and make updates as necessary.
                </p>
                <Link href="/my-applications">
                  <span className="mt-3 text-gray-500 inline-flex items-center">
                    My Applications
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  return {
    props: { user: session.user },
  };
}
