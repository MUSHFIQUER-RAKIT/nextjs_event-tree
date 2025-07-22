import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

async function getAllEvents() {
  const events = await eventModel.find().lean();

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

export { createUser, findUserByCredentials, getAllEvents, getEventById };
