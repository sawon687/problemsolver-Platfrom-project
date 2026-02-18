'use client'

import { motion } from "framer-motion";

const bannerImg =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1470&q=80";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* HERO BANNER */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl mb-20">

          <img
            src={bannerImg}
            alt="Contact"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-700/60 to-transparent"></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 h-full flex flex-col justify-center px-10 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>

            <p className="text-lg text-green-100 max-w-xl">
              Have questions? Need support? Want to collaborate?
              We’d love to hear from you.
            </p>
          </motion.div>
        </div>

        {/* CONTACT SECTION */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-green-600">
              Get In Touch
            </h2>

            <p className="text-gray-600">
              Reach out to us for support, partnership or any marketplace-related queries.
            </p>

            <div className="space-y-4">

              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold text-green-600">Email</h3>
                <p className="text-gray-600">support@racoai.com</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold text-green-600">Phone</h3>
                <p className="text-gray-600">+880 1234-567890</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold text-green-600">Location</h3>
                <p className="text-gray-600">Dhaka, Bangladesh</p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white shadow-xl rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Send Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full"
              >
                Send Message
              </button>

            </form>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default page;
