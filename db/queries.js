import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose from "mongoose";

async function getAllEvents(query) {
  let events = [];
  if (query) {
    const regex = new RegExp(query, "i");
    events = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    events = await eventModel.find().lean();
  }

  return replaceMongoIdInArray(events);
}
async function getEventById(eventId) {
  const events = await eventModel.findById(eventId).lean();

  return replaceMongoIdInObject(events);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();

  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.interested_ids.find(
      userId => userId.toString() === authId.toString()
    );
    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
  }
}

async function updateGoing(eventId, authId) {
  const event = await eventModel.findById(eventId);

  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
}

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventById,
  updateGoing,
  updateInterest,
};
