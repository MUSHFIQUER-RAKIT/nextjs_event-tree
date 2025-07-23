"use server";

import EmailTemplate from "@/components/payment/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
  getEventById,
} = require("@/db/queries");
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
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const user = await findUserByCredentials(credential);

    return user;
  } catch (error) {
    throw error;
  }
}

async function addInterestEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const message =
      "You have successfully registered for the event: " + event?.name;

    const send = await resend.emails.send({
      from: "noreply.mushfiquer-rakit.io",
      to: user?.email,
      subject: "Event Registration Confirmation",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
}

export { addGoingEvent, addInterestEvent, loginUser, registerUser, sendEmail };
