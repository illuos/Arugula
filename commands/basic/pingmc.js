const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const pingServer = require("minecraft-server-util");

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
                default: "andyusesrange.duckdns.org"
            }]
        });
    }
    async run(message, args) {

        // Callback ping
        pingServer(args.server, 25565, (error, response) => {
            if (error) {
                message.react('❌')
                message.channel.send(`\`\`\`${error}\n\`\`\`\nI was unable to connect to the server. Please contact my owner for more information.`);
            } else {
                message.react('✅');

                let playerList = "";
                for (var player in response.samplePlayers) {
                    playerList += response.samplePlayers[player].name + "\n";
                }

                let embed = new RichEmbed()
                    .setAuthor(response.host, "https://cdn.discordapp.com/attachments/385581009653202945/700031903994216468/minecraft-server-icon-64x64-54.png")
                    .setDescription(response.descriptionText)
                    .setColor(message.guild.member(this.client.user).displayHexColor)
                    .addField("Port", response.port, true)
                    .addField("Version", response.version, true)
                    .addField("Players", `${response.onlinePlayers}/${response.maxPlayers}`, true)
                    .addField("Players currently online:", playerList)
                    .setTimestamp(Date.now());
                
                    message.channel.send({embed});
            }
        });
    }
}


module.exports = pingmc;