const memData = [
  {
    name: "base",
    price: [
      {
        type: "btech",
        price: 100,
      },
      {
        type: "phd/mtech",
        price: 110,
      },
      {
        type: "faculty/staff",
        price: 120,
      },
      {
        type: "other",
        price: 200,
      },
    ],
    validity: 10 * 24 * 3600,
    availQR: 1,
  },
  {
    name: "silver",
    price: [
      {
        type: "btech",
        price: 200,
      },
      {
        type: "phd/mtech",
        price: 220,
      },
      {
        type: "faculty/staff",
        price: 240,
      },
      {
        type: "other",
        price: 380,
      },
    ],
    validity: 30 * 24 * 3600,
    availQR: 2,
  },
  {
    name: "gold",
    price: [
      {
        type: "btech",
        price: 300,
      },
      {
        type: "phd/mtech",
        price: 330,
      },
      {
        type: "faculty/staff",
        price: 360,
      },
      {
        type: "other",
        price: 540,
      },
    ],
    validity: 90 * 24 * 3600,
    availQR: 3,
  },
  {
    name: "diamond",
    price: [
      {
        type: "btech",
        price: 400,
      },
      {
        type: "phd/mtech",
        price: 440,
      },
      {
        type: "faculty/staff",
        price: 480,
      },
      {
        type: "other",
        price: 680,
      },
    ],
    validity: 365 * 24 * 3600,
    availQR: 4,
  },
];

module.exports = { memData };
