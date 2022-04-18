

//Venom-BOT

//*import {create, Whatsapp} from 'venom-bot';
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
//Node-nlp
// Adds the utterances and intents for the NLP

//Treino Saudação
manager.addDocument('pt', 'bom dia', 'saudacao');
manager.addDocument('pt', 'boa tarde', 'saudacao');
manager.addDocument('pt', 'boa noite', 'saudacao');
manager.addDocument('pt', 'e ae, tudo bem', 'saudacao');
manager.addDocument('pt', 'ola', 'saudacao');
manager.addDocument('pt', 'oi', 'saudacao');
manager.addDocument('pt', 'tudo bom', 'saudacao');

//Treino Pedidos
manager.addDocument('pt', 'gostaria de agendar um corte','pedido')
manager.addDocument('pt', 'gostaria de marcar um corte','pedido')
manager.addDocument('pt', 'gostaria de agendar uma informação','pedido')

//Resposta Saudação
manager.addAnswer('pt', 'saudacao', 'Olá, bom dia, sou um atendente virtual, escolha uma das opções para prosseguirmos com o atendimento');

//Resposta Pedidos
manager.addAnswer('pt', 'pedido', 'Você pode agendar um corte conosco pelo seguinte link: https://client.tuaagenda.com/c/Lacerdabarbershop');


// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

  create('BOT')
  .then((client) => {
    //Evento
    client.onMessage(async (message) => {
      if (message.isGroupMsg === false){
        const response = await manager.process(
        "pt", 
        message.body.toLowerCase()
        );
        console.log(response);
        client.sendText(message.from, response.answer)
      }
    });
    })
  .catch((erro) =>{
    console.log(erro);
  });
})();

