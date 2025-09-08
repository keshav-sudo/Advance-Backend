import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

const produce = kafka.producer()

const run = async() => {
    await produce.connect()
    await produce.send({
        topic: 'quickstart-events',
        messages: [
            {value : 'hello Kafka JS user! From Node js '

            }
        ],
    })
}


  run().catch(console.error);