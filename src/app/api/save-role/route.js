// pages/api/save-role.js
import connect from "@/lib/dbconnect";

export const POST = async (req) => {
  const { email, role } = await req.json();
  console.log("email server", email);
  console.log("role server", role);
  if (!["Buyer", "problem_solver"].includes(role)) {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400,
    });
  }

  const userColl = await connect("userColl");

  const result = await userColl.updateOne(
    { userEmail: email },
    { $set: { role } },
    { upsert: true },
  );
  console.log("reulst update role", result);
  return new Response(JSON.stringify({ success: true }));
};
