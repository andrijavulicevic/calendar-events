const users = [
  {
    email: "john@doe.com",
    password: "password",
    role: "client"
  },
  {
    email: "jane@doe.com",
    password: "password",
    role: "client"
  },
  {
    email: "jack@doe.com",
    password: "password",
    role: "client"
  },
  {
    email: "admin@doe.com",
    password: "password",
    role: "organizer"
  }
];

const events = [
  {
    id: "4f508e72-3ce8-49e4-94d2-5ab61ad7d993",
    name: "Meeting",
    start: "2019-08-28 09:00",
    end: "2019-08-28 09:30",
    visibility: "Private",
    details: "Discussing important matters",
    location: "Conf room 1",
    participants: [{ email: "admin@doe.com", accepted: true }],
    color: "blue",
    owner: "john@doe.com"
  },
  {
    id: "fcfc8b54-b4be-4397-b028-ff75d8cec8ee",
    name: "Another Meeting",
    start: "2019-08-17 11:00",
    end: "2019-08-17 12:30",
    visibility: "Private",
    details: "Discussing important matters",
    location: "Conf room 2",
    participants: [],
    color: "green",
    owner: "john@doe.com"
  },
  {
    id: "bef1f1c2-55b4-46b7-ba5d-6306e9b762aa",
    name: "Breefing",
    start: "2019-08-17 13:00",
    end: "2019-08-17 13:30",
    visibility: "Private",
    details: "Breefing about new project",
    location: "Conf room 2",
    participants: [{ email: "john@doe.com", accepted: false }],
    color: "green",
    owner: "jane@doe.com"
  },
  {
    id: "d2699f4d-cb57-446d-b585-fd3f8481fc5c",
    name: "Vacation",
    start: "2019-08-29",
    end: "2019-09-06",
    visibility: "Public",
    details: "Traveling to Rome",
    location: "Rome",
    color: "orange",
    owner: "john@doe.com"
  },
  {
    id: "eceaf5c8-1cf5-4b11-b47c-2ea581970428",
    name: "Jane's birthday",
    start: "2019-08-27",
    end: "2019-08-27",
    visibility: "Private",
    details: "Birthday party for Jane",
    location: "Jane's home",
    participants: [
      { email: "john@doe.com", accepted: false },
      { email: "admin@doe.com", accepted: false },
      { email: "jack@doe.com", accepted: false }
    ],
    color: "orange",
    owner: "jane@doe.com"
  }
];

export { users, events };
