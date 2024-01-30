import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post('/health-problem', async (req, res) => {
    try {
        const { name, degree, clientId } = req.body;
        
        if (degree > 2) {
          return res.status(404).json({"message": "invalid data"})
        }
        const clientUpdate = await prisma.healthProblem.create({
            data: {
                name,
                degree,
                clientId
            },           
        })
       
        res.status(201).json(clientUpdate)

        
    } catch (error) {
        res.status(404).json(error)
    }
})

app.put('/health-problem/:id', async (req, res) => {
    try {
      const { name, degree } = req.body
      const { id } = req.params

      const hp = await prisma.healthProblem.update({
        where: {
          id,
        },
        data: {
          name,
          degree,
        },
      })
      if (degree == 1 || degree == 2) {
        res.json(hp)
      }
      else {
        res.status(500).json({
          message: "Invalid value",
        })
      }
    }
    catch(error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})

app.get('/clients', async (req, res) => {
    const clients = await prisma.client.findMany({
       include: {
        healthProblems: true
       }
    })
    res.json(clients )
})

app.get('/client/:id', async (req, res) => {
    const { id } = req.params

    const clientUnique = await prisma.client.findUnique({
        where: {
        id: id
        },
        include: { healthProblems: true },
    });
    res.json(clientUnique)
})

app.put('/client/:id', async (req, res) => {
  try {
    const { name, sex , birthDate} = req.body
    const { id } = req.params

    const hp = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        sex,
        birthDate
      },
    })
    res.json(hp);
  }
  catch(error) {
    res.status(500).json({
      message: "Something went wrong",
    })
  }
})

app.delete(`/client/:id`, async (req, res) => {
  const { id } = req.params
  const deleteClient = await prisma.client.delete({
    where: {
      id: id
    },
  })
  res.json(deleteClient)
})

app.post(`/client`, async (req, res) => {
    const { name, birthDate, sex } = req.body
    const result = await prisma.client.create({
      data: {
        name,
        birthDate,
        sex,
      },
    })
    res.json(result)
  })

app.get('/critical-clients', async (req, res) => {
    const clients = await prisma.client.findMany({
      include: { healthProblems: true },
    })
    const criticalClients = clients.map((client) => {
      const problemSum = client.healthProblems.reduce(
        (acc, healthProblem) => acc + healthProblem.degree,
        0,
      );
        
      const score = (1 / (1 + Math.exp(-(-2.8 + problemSum)))) * 100;
      return { ...client, score };
    });

    function order(array: any) {
      return array.sort((a:any, b: any) => b[array.score] - a[array.score]);
    }
    const tenCritical = order(criticalClients).slice(0, 10);
    res.json(tenCritical)
})

async function main() {

    const newUser = await prisma.client.create({
        data: {
          name: "João Lopes",
          birthDate: "1997-07-16T19:20:30.451Z",
          sex: "Male",

        },
      });
    
      console.log("New User:");
      console.log(newUser);

      const disease = await prisma.healthProblem.create({
        data: {
          name: "ASD",
          degree: 1,
          clientId: newUser.id,
        },
      });
    
      console.log("First tweet:");
      console.log(disease);

      const newUserWithDisease = await prisma.client.findUnique({
        where: {
          name: "João Lopes",
          id: newUser.id
        },
        include: { healthProblems: true },
      });
    
      console.log("User object with Disease:");
      console.dir(newUserWithDisease);

}

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)