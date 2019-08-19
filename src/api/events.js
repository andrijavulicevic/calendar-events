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
    if (event.participants.find(p => p.email === user.email && p.accepted)) {
      return event;
    }
  });
}

async function loadPendingEvents(user) {
  await simulateLoading();
  return events.filter(event => {
    if (event.visibility === "Public") return false;
    if (!event.participants || event.participants.length === 0) return false;
    if (event.participants.find(p => p.email === user.email && !p.accepted)) {
      return true;
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

function acceptInvite(eventId, user) {
  const event = events.find(event => event.id === eventId);
  if (!event) throw new Error("Unknown event");
  const participant = event.participants.find(p => p.email === user.email);
  participant.accepted = true;
}

function declineInvite(eventId, user) {
  const event = events.find(event => event.id === eventId);
  if (!event) throw new Error("Unknown event");
  const participantIndex = event.participants.findIndex(
    p => p.email === user.email
  );
  event.participants.splice(participantIndex, 1);
}

export {
  loadEventsForUser,
  loadPendingEvents,
  createEventForUser,
  loadParticipants,
  deleteEvent,
  updateEvent,
  acceptInvite,
  declineInvite
};
