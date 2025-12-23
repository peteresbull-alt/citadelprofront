"use client";
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const GoogleMapsSection = () => {
  const [activeLocation, setActiveLocation] = useState<
    "newyork" | "washington"
  >("newyork");

  const locations = {
    newyork: {
      name: "New York Office",
      address: "225 Central Park West",
      city: "New York, NY 10024",
      phone: "+1 (606) 229-7623",
      email: "support@citadelmarketspro.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215280101934!2d-73.97403668459394!3d40.77544597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f4b00f7665%3A0x98a3d7d0a9d3d3d3!2s225%20Central%20Park%20West%2C%20New%20York%2C%20NY%2010024!5e0!3m2!1sen!2sus!4v1234567890123",
    },
    washington: {
      name: "Washington DC Office",
      address: "1100 15th St NW 4th Floor",
      city: "Washington, DC 20005",
      phone: "+44 7888 880119",
      email: "support@citadelmarketspro.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0989427614987!2d-77.03600168461656!3d38.90390597957092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7bcdecbb1df%3A0x715969d86d0b76bf!2s1100%2015th%20St%20NW%2C%20Washington%2C%20DC%2020005!5e0!3m2!1sen!2sus!4v1234567890124",
    },
  };

  return (
    <section className="dark:bg-black bg-white py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Find us at our convenient locations in New York and Washington DC
            </p>
          </div>
        </>

        {/* Location Toggle Buttons */}
        <>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveLocation("newyork")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeLocation === "newyork"
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                New York
              </div>
            </button>
            <button
              onClick={() => setActiveLocation("washington")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeLocation === "washington"
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Washington DC
              </div>
            </button>
          </div>
        </>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map Container */}
          <>
            <div className=" bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-800">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-700 shadow-lg">
                <iframe
                  key={activeLocation}
                  src={locations[activeLocation].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full transition-opacity duration-300"
                ></iframe>
              </div>

              {/* Quick Address Below Map (Mobile) */}
              <div className="mt-4 lg:hidden text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {locations[activeLocation].name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {locations[activeLocation].address}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {locations[activeLocation].city}
                </p>
              </div>
            </div>
          </>

          {/* Office Information Card */}

          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {locations[activeLocation].name}
            </h3>

            <div className="space-y-6 flex-1">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Address
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {locations[activeLocation].address}
                    <br />
                    {locations[activeLocation].city}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Phone
                  </h4>
                  <a
                    href={`tel:${locations[activeLocation].phone.replace(
                      /\s/g,
                      ""
                    )}`}
                    className="text-gray-700 dark:text-gray-300 text-sm hover:text-emerald-500 transition-colors"
                  >
                    {locations[activeLocation].phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${locations[activeLocation].email}`}
                    className="text-gray-700 dark:text-gray-300 text-sm hover:text-emerald-500 transition-colors break-all"
                  >
                    {locations[activeLocation].email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Business Hours
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {locations[activeLocation].hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${locations[activeLocation].address}, ${locations[activeLocation].city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsSection;
