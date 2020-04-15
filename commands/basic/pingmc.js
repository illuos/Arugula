const commando = require("discord.js-commando");

class pingmc extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pingmc",
            aliases: ["mc", "server", "pingserver"],
            group: "basic",
            memberName: "pingmc",
            description: "Arugula pings the minecraft server and returns some information on its status.",
            details: "Arugula pings the minecraft server, returning the version, player count, and ping.",
            examples: ["aru! pingmc", "aru! mc", "aru! server", "aru! pingserver"],
            args: [{
                key: "server",
                prompt: "What server would you like to ping?",
                type: "string",
                default: "andyusesrange.duckdns.org:25565"
            }]
        });
    }
    async run(message, args) {
        message.react('✅');

        
    }
}


module.exports = pingmc;