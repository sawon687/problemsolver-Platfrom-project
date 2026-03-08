"use client";
import { useState } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "Sawon Islam",
    email: "sawon@example.com",
    phone: "017XXXXXXXX",
    skill: "MERN Stack Developer",
    hourlyRate: "20",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-10 bg-gradient-to-tr from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-6 font-medium hover:text-green-600 transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-gray-100 text-center md:text-left">
        Edit Profile
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* LEFT SIDE - PROFILE IMAGE & INFO */}
        <div className="flex flex-col items-center md:w-1/3 space-y-6">
          <div className="relative group">
            <img
              src={profileImage || "https://i.pravatar.cc/150?img=12"}
              alt="Profile"
              className="w-44 h-44 md:w-48 md:h-48 rounded-full object-cover border-4 border-green-400 shadow-xl transition-transform transform group-hover:scale-105"
            />
            <label className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 p-3 rounded-full cursor-pointer shadow-lg transition transform hover:scale-110">
              <Camera className="w-5 h-5 text-white" />
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{profile.name}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{profile.email}</p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{profile.phone}</p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{profile.skill}</p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Hourly Rate: ${profile.hourlyRate}</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="md:w-2/3 space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Phone", name: "phone", type: "text", placeholder: "Enter your phone number" },
              { label: "Skill", name: "skill", type: "text", placeholder: "Enter your main skill" },
              { label: "Hourly Rate ($)", name: "hourlyRate", type: "number", placeholder: "Enter hourly rate" },
            ].map((field) => (
              <div
                key={field.name}
                className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-md hover:shadow-xl transition"
              >
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-md">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={profile[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition placeholder-gray-400"
                />
              </div>
            ))}

            <button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-md shadow-lg transition transform hover:scale-105 text-sm"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;