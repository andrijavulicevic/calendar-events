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

export { loadEventsForUser, createEventForUser, loadParticipants };
