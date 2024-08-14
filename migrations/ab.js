const autocannon = require('autocannon')

autocannon(
  {
    url: 'http://localhost:3000',
    connections: 10,
    pipelining: 1,
    duration: 2
  },
  console.log
)

// async/await
async function foo() {
  const result = await autocannon({
    url: 'http://localhost:8000/api/seatmap/66bc73deed6ecdb424ecacae',
    connections: 10,
    pipelining: 1,
    duration: 10,
    method: 'PUT',
    headers: {
      Cookie:
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmEyNTY5ZTc5YTE3MmFhYWY5NTU2YWYiLCJlbWFpbCI6ImQyMzI3OUBzdHVkZW50cy5paXRtYW5kaS5hYy5pbiIsInVzZXJ0eXBlIjoiYWRtaW4iLCJuYW1lIjoicGl5dXNoIHBhbnBhbGl5YSIsInBob25lIjoiOTM3MDA5ODU5NCIsImlhdCI6MTcyMzYyNTc4NywiZXhwIjoxNzIzNzEyMTg3fQ.NHfHRud2rtkI1STjaKpPdy9Gfn3Jz1AYswBjgs3xDEA',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ seats: ['A18', 'A19'] })
  })
  console.log(result)
}

foo()
