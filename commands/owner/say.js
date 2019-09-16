const commando = require("discord.js-commando");

class say extends commando.Command {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: ["sayd", "sd", "s", "saydelete", "tell"],
            group: "owner",
            memberName: "say",
            description: "Arugula sends a message specified by her owner.",
            details: "Arugula sends a message specified by her owner. If a channel is mentioned first, she will say it in that channel. ",
            format: "<#channel> <content>",
            examples: ["aru! say hi", "aru! say #channel hi", "aru! say in #channel hi"],
            args: [{
                key: "text",
                prompt: "What would you like me to say?",
                type: "string"
            }]
        });
    }
    hasPermission(message) {
        if (!this.client.isOwner(message.author)) {
            message.react("🚫");
            console.log(`${message.author} has attempted to use my SAY command with the wrong permissions.`);
            return false
        }
        return true;
    }
    async run(message, args) {
        message.delete()
            .catch(console.error);

        if (!message.mentions.channels.first()) return message.channel.send(args.text); // Sends if no channel mention
        
        var originalArgsText = args.text; // Used in case of blank message string
        var argsSplit = args.text.split(" ");
        if (argsSplit[0] !== "in") argsSplit.splice(0, 1); // Mention starts without in
        else if (argsSplit[0] === "in") argsSplit.splice(0, 2); // Mention starts with in
        else return message.channel.send(args.text); // Found a channel mention that isn't trying to send to another channel

        args.text = argsSplit.join(" ");
        if (!args.text) return message.channel.send(originalArgsText); // If message string is blank
        else return message.mentions.channels.first().send(args.text);
    }
}

module.exports = say;