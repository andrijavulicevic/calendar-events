import { events, users } from "./mock";
import { simulateLoading } from "./helpers";
import { uuidv4 } from "../utils/uuid-generator";

async function loadEventsForUser(userEmail) {
  await simulateLoading();
  return events.filter(event => event.owner === userEmail);
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

export { loadEventsForUser, createEventForUser, loadParticipants, deleteEvent };
