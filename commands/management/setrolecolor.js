const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

class setrolecolor extends commando.Command {
    constructor(client) {
        super(client, {
            name: "setrolecolor",
            aliases: ["hex", "color", "rolecolor", "rolehex"],
            group: "management",
            memberName: "setrolecolor",
            description: "Arugula changes the color of your highest role.",
            details: "Arugula changes the color of your highest role to any color specified.",
            format: "<hex color>",
            examples: ["aru! setrolecolor blue", "aru! setrolecolor #00CDC8"],
            args: [{
                key: "color",
                prompt: "What color do you want to set?",
                type: "string"
            }]
        });
    }
    async run(message, args) {
        var hexCode = args.color;
        if (hexCode.startsWith("#")) hexCode = hexCode.substr(1); // Cuts off leading # mark

        message.member.colorRole.setColor(args.color)
            .catch(console.error);
        let embed = new RichEmbed()
            .setTitle("Finished changing color.")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`Set color to #${hexCode}.`)
            .setColor(hexCode);
            
        return message.channel.send(embed);
    }
}

module.exports = setrolecolor;