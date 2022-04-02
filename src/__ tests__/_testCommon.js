const currentAdminUser = () => ({
  username: "testUser",
  first_name: "Jest",
  last_name: "User",
  email: "noemail@example.com",
  phone: "555-123-4567",
  postal_code: "ABC DEF",
  is_admin: true
})

const avails = () => ([
  {
    id: 1,
    startDate: "2022-04-02",
    endDate: "2022-04-20",
    userId: 1,
    roleId: 1
  },
  {
    id: 2,
    startDate: "2022-04-02",
    endDate: "2022-04-20",
    userId: 1,
    roleId: 2
  }
]);

const roles = () => ([
  {
    id: 1,
    name: "Host"
  },
  {
    id: 2,
    name: "Pet Owner"
  }
]);

const roleForm = () => ({
  id: 2,
  name: "Pet Owner"
});

const role = () => "Pet Owner";

const avail = () => (
  {
    id: 1,
    startDate: "2022-04-02",
    endDate: "2022-04-20",
    userId: 1,
    roleId: 1
  }
);

const bookingAvail = () => ({
  endDate: "2022-04-30T06:00:00.000Z",
  id: 45,
  pets: [
    { id: 23, ownerId: 1, name: 'Garfield1', type: 'Dog', photo: '/static/media/dog.4b90f018c1cda3590605.jpeg' },
    { id: 22, ownerId: 1, name: 'Garfield0', type: 'Cat', photo: '/static/media/cat.590ca8590214640ca23b.png' }
  ],
  role: "Pet Owner",
  roleId: 4,
  startDate: "2022-04-01T06:00:00.000Z",
  user: {
    email: "johndoe@gmail.com",
    firstName: "Test",
    id: 1,
    isAdmin: false,
    lastName: "User",
    phone: "555-123-9875",
    postalCode: "T2Y 3X8",
    username: "testuser"
  },
  userId: 1
})

const dateRange = () => (["2022-04-02", "2022-04-20"]);

const review = () => ({
  id: 1,
  reviewer: "reviewer",
  reviewee: "another user",
  rating: 5,
  comments: "good job!!"
})

const reviews = () => ([
  {
    id: 1,
    reviewer: "reviewer",
    reviewee: "another user",
    rating: 5,
    comments: "good job!!"
  },
  {
    id: 2,
    reviewer: "reviewer 2",
    reviewee: "another user 3",
    rating: 5,
    comments: "good job as well!!"
  }
]);

const booking = () => ({
  endDate: "2022-04-30",
  hostId: 1,
  id: 15,
  ownerId: 2,
  role1: "Host",
  role2: "Pet Owner",
  startDate: "2022-04-16",
  user: {
    rating: "4.50",
    username: "testadmin"
  }
})

const pet = () => ({
  id: 23,
  ownerId: 1, 
  name: 'Garfield1', 
  type: 'Dog', 
  photo: '/static/media/dog.4b90f018c1cda3590605.jpeg'
})

const pets = () => ([
  { 
    id: 23, 
    ownerId: 1, 
    name: 'Garfield1', 
    type: 'Dog', 
    photo: '/static/media/dog.4b90f018c1cda3590605.jpeg'
  },
  { 
    id: 22, 
    ownerId: 1, 
    name: 'Garfield0', 
    type: 'Cat', 
    photo: '/static/media/cat.590ca8590214640ca23b.png' }
]);

const reviewee = () => "some user";

module.exports = {
  currentAdminUser,
  avails,
  roles,
  role,
  roleForm,
  avail,
  dateRange,
  bookingAvail,
  review,
  reviews,
  booking, 
  pet, 
  pets, 
  reviewee
}