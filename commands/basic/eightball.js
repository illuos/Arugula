const commando = require('discord.js-commando');
const eightBallResponse = require('8ball.js')(); // () handles random response

class eightball extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'eightball',
            aliases: ['8ball'],
            group: 'basic',
            memberName: 'eightball',
            description: 'Arugula responds to a question with a response from the magic eightball.',
            details: 'Arugula responds to a question specified by the user with an answer depending on her mood that day.',
            format: '<question>',
            examples: ['aru! eightball Is Vins#9790 best dev?', 'aru! 8ball Is Arugula best bot?'],
            args: [{
                key: 'question',
                prompt: 'What would you like to ask?',
                type: 'string'
            }]
        });
    }
    async run(message, args) {
        // TODO: Personalize Arugula's responses, add more responses, or clean up responses
        message.channel.send(eightBallResponse);
    }
}

module.exports = eightball;