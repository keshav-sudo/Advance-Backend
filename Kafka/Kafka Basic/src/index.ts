import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

const produce = kafka.producer()
const consumer = kafka.consumer({ groupId : "quickstart-events" });

const run = async() => {
    await produce.connect()
    await produce.send({
        topic: 'quickstart-events',
        messages: [
            {value : 'hello Kafka JS user! From Node js '

            }
        ],
    })

      await consumer.connect()
await consumer.subscribe({ topic: 'quickstart-events', fromBeginning: true })
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    if(!message.value){
        return;
    }
    console.log({
      partition,
      offset: message.offset,
      value: message.value.toString(),
    })
  },
}) 


}



run().catch(console.error);