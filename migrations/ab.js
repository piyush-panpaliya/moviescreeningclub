const fetcher = async (c) => {
  const a = await fetch(
    "http://localhost:8000/api/seatmap/66bd08b5b083991ce46949f4",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmEyNTY5ZTc5YTE3MmFhYWY5NTU2YWYiLCJlbWFpbCI6ImQyMzI3OUBzdHVkZW50cy5paXRtYW5kaS5hYy5pbiIsInVzZXJ0eXBlIjoiYWRtaW4iLCJuYW1lIjoicGl5dXNoIHBhbnBhbGl5YSIsInBob25lIjoiOTM3MDA5ODU5NCIsImlhdCI6MTcyMzY2NDQ3MywiZXhwIjoxNzIzNzUwODczfQ.R2oPaQx26B3ndEUG2rCMXg_iTwgpTqPCiilqt5SBdH8",
      },
      body: JSON.stringify({ seats: ["E" + c.toString(), "F" + c.toString()] }),
    },
  );
  const b = await a.json();
  console.log(b);
};

const init = async () => {
  for (let i = 1; i < 15; i++) {
    const firstFetch = fetcher(i);
    const secondFetch = fetcher(i);
    await Promise.all([firstFetch, secondFetch]);
  }
};

init();
