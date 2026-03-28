"use client";
import { useQuery } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const EditProfileModal = ({ openEdit, close }) => {
  const { data: session } = useSession();
 console.log('session',session)
  // react-query fetch user data
  const { data, isLoading } = useQuery({
    queryKey: ["profile", session?.email], enabled: !!session?.email,
    queryFn: async () => {
      const res = await fetch(`/api/sign-up/${session?.email}`);
      const result = await res.json();
      return result.data;
    },
  });

  console.log('data is',data)
  // Image state
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (data?.userPhoto) setImageUrl(data.userPhoto);
  }, [data]);

  // react-hook-form
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: "",
      phoneno: "",
      Skill: "",
      hourlyRate: "",
      company: "",
      location: "",
      userPhoto: "",
    },
  });
  useEffect(() => {
    if (data) {
      setValue("username", data.username || "");
      setValue("phoneno", data.phoneno || "");
      setValue("Skill", data.Skill || "");
      setValue("hourlyRate", data.hourlyRate || "");
      setValue("company", data.company || "");
      setValue("location", data.location || "");
      setValue("userPhoto", data.userPhoto || "");
    }
  }, [data, setValue]);

  // Image upload handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imageApiUrl = `https://api.imgbb.com/1/upload?&key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`;
    const res = await fetch(imageApiUrl, { method: "POST", body: formData });
    const result = await res.json();

    setImageUrl(result.data.display_url);
    setValue("userPhoto", result.data.display_url);
  };

  // Form submit
  const handleUpdateSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/sign-up/${session?.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: session?.email,
          role:session?.role,
          date:data.date,
          updateDate:new Date(),
          ...formData,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert("Profile updated successfully!");
        close();
      }
    } catch (error) {
      console.log(error);
      alert("Update failed.");
    }
  };

  if (!openEdit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-3xl w-full max-w-4xl shadow-2xl border border-white/20"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Profile
          </h2>
          <button onClick={close}>
            <X className="w-6 h-6 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative group">
              <img
                src={imageUrl || "/placeholder.png"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-green-400 shadow-lg"
              />

              <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition">
                <Camera className="text-white w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {data?.username}
              </h3>
              <p className="text-sm text-gray-500">{data?.userEmail}</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex-1 space-y-4"
          >
            <input
              placeholder="Your Name"
              className="input"
              {...register("username")}
            />

            <input
              placeholder="Phone Number"
              className="input"
              {...register("phoneno")}
            />

            {session?.role === "problem_solver" ? (
              <>
                <input
                  placeholder="Your Skills"
                  className="input"
                  {...register("Skill")}
                />
                <input
                  placeholder="Hourly Rate ($)"
                  className="input"
                  {...register("hourlyRate")}
                />
              </>
            ) : (
              <>
                <input
                  placeholder="Company Name"
                  className="input"
                  {...register("company")}
                />
                <input
                  placeholder="Location"
                  className="input"
                  {...register("location")}
                />
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Tailwind custom input */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
          outline: none;
          transition: 0.3s;
        }
        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
        }
      `}</style>
    </div>
  );
};

export default EditProfileModal;