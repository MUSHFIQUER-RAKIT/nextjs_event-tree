"use server";

const { createUser, findUserByCredentials } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);

  const created = await createUser(user);
  if (!created) {
    throw new Error("User creation failed");
  }
  redirect("/login");
}

async function loginUser(formData) {
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");

  const user = await findUserByCredentials(credential);

  if (user) {
    redirect("/");
  } else {
    throw new Error(`User with email ${formData.get("email")} not found`);
  }
}
export { loginUser, registerUser };
