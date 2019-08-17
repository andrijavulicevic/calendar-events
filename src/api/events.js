import { events } from "./mock";
import { simulateLoading } from "./helpers";

async function loadEventsForUser(userEmail) {
  await simulateLoading();
  return events.filter(event => event.owner === userEmail);
}

async function createEventForUser(event, userEmail) {
  await simulateLoading();
  event.push({ ...event, owner: userEmail });
}

export { loadEventsForUser, createEventForUser };
