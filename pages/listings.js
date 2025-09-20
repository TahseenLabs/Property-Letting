import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Listings() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/properties/properties");
      const data = await res.json();
      if (data.properties) {
        setProperties(data.properties);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Available Properties for Rent</h1>
      {properties.length === 0 ? (
        <p>No properties available at the moment.</p>
      ) : (
        <>
          {properties.map((property) => (
            <section
              key={property.property_id}
              className="text-gray-600 body-font overflow-hidden"
            >
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      Landlord ID: {property.landlord_id}
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                      {property.title}
                    </h1>
                    <div className="flex mb-4">
                      <span className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                        {property.location}
                      </span>
                    </div>
                    <p className="leading-relaxed mb-4">
                      {property.description}
                    </p>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Color</span>
                      <span className="ml-auto text-gray-900">Blue</span>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Size</span>
                      <span className="ml-auto text-gray-900">Medium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        ${property.price}/month
                      </span>
                      <Link href={`/apply?propertyId=${property.property_id}`}>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                          Apply
                        </button>
                      </Link>
                    </div>
                  </div>
                  <Image
                    alt="ecommerce"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                     src="/images/img-6.jpg"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
