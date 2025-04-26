from confluent_kafka import Consumer, KafkaException

c = Consumer({
    'bootstrap.servers': '10.10.76.231:7676',
    'group.id': 'my-group',
    'auto.offset.reset': 'earliest'
})

c.subscribe(['sensor_metrics_air'])

try:
    msg = c.poll(1.0)
    if msg is None:
        print('No message')
    elif msg.error():
        raise KafkaException(msg.error())
    else:
        print(msg.value().decode('utf-8'))
finally:
    c.close()