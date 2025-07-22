import { eventModel } from "@/models/event-models";
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

export { getAllEvents, getEventById };
