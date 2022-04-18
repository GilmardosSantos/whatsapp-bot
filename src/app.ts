import {create, Whatsapp} from 'venom-bot';
import { ListenerLayer } from 'venom-bot/dist/api/layers/listener.layer';
const sleep = require('sleep-ts').sleep;
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('pt', 'Salve', 'greetings');
manager.addDocument('pt', 'Fala', 'greetings');
manager.addDocument('pt', 'Eae', 'greetings');
manager.addDocument('pt', 'Oi', 'greetings');
manager.addDocument('pt', 'Olá', 'greetings');
manager.addDocument('pt', 'Bom dia', 'greetings');
manager.addDocument('pt', 'Boa tarde', 'greetings');
manager.addDocument('pt', 'Boa Noite', 'greetings');

// Train also the NLG
manager.addAnswer('pt', 'greetings', 'Olá, bom dia, sou o atendente virtual da barbearia, escolha uma das opções para prosseguirmos com o atendimento');
manager.addAnswer('pt', 'greetings', 'Olá, boa tarde, sou o atendente virtual da barbearia, escolha uma das opções para prosseguirmos com o atendimento');
manager.addAnswer('pt', 'greetings', 'Olá, boa noite, sou o atendente virtual da barbearia, escolha uma das opções para prosseguirmos com o atendimento');
manager.addAnswer('pt', 'greetings', 'Olá, sou o atendente virtual da barbearia , escolha uma das opções para prosseguirmos com o atendimento');
const answer1 = "1 - Marcar um horário \n2 - Falar com um atendente";



// Train and save the model.


(async() => {
    await manager.train();
    manager.save();
    
    create("BOT")
    .then((client) =>{
        //Evento
        client.onMessage(async(message) =>{
            if(message.isGroupMsg === false){
            const response = await manager.process('pt', message.body.toLowerCase());
            client.sendText(message.from, response.answer)
            await sleep(1000);
            if(response.intent === 'greetings'){
            client.sendText(message.from, answer1)}
        
            switch (message.body){
                case "1":
                    client.sendText(message.from, "Caso deseje marcar um corte conosco, acesse o link : https://client.tuaagenda.com/c/Lacerdabarbershop")
                    break;
                case "2":
                    client.sendText(message.from, "Aguarde até que um atendente responda sua mensagem")
                default:
                    break;
            
            }
            }
        });
    })
    .catch((erro) => {
        console.log(erro);
    });
})();


    



