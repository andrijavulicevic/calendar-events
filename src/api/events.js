import { events, users } from "./mock";
import { simulateLoading } from "./helpers";
import { uuidv4 } from "../utils/uuid-generator";

async function loadEventsForUser(user) {
  await simulateLoading();
  if (user.role === "organizer") return events;
  return events.filter(event => {
    if (event.owner === user.email) {
      event.owned = true;
      return event;
    }
    if (event.visibility === "Public") return event;
    if (event.participants.find(p => p.email === user.email)) {
      return event;
    }
  });
}

async function createEventForUser(event, userEmail) {
  await simulateLoading();
  events.push({ id: uuidv4(), ...event, owner: userEmail });
}

async function loadParticipants() {
  await simulateLoading();
  return users.map(user => user.email);
}

async function deleteEvent(event, user) {
  await simulateLoading();
  if (event.owner !== user.email && user.role !== "organizer") {
    throw new Error("You can not delete other people events!");
  }
  const indexOfSelectedEvent = events.findIndex(e => e.id === event.id);
  events.splice(indexOfSelectedEvent, 1);
}

async function updateEvent(event, user) {
  await simulateLoading();
  if (event.owner !== user.email && user.role !== "organizer") {
    throw new Error("You can not delete other people events!");
  }
  const indexOfSelectedEvent = events.findIndex(e => e.id === event.id);
  events.splice(indexOfSelectedEvent, 1, event);
}

export {
  loadEventsForUser,
  createEventForUser,
  loadParticipants,
  deleteEvent,
  updateEvent
};
