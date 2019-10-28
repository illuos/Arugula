const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

class info extends commando.Command {
    constructor(client) {
        super(client, {
            name: "info",
            aliases: ["av", "person"],
            group: "basic",
            memberName: "info",
            description: "Arugula pastes out information of a person specified.",
            details: "Arugula pastes out various information of a person specified by a tag.",
            format: "<@user>",
            examples: ["aru! info @Vins#9790", "aru! info Vins"],
            args: [{
                key: "user",
                prompt: "Which person would you like to pull information of?",
                type: "user"
            }]
        });
    }
    async run(message, args) {
        let embed = new RichEmbed()
            .setAuthor(args.user.username, args.user.displayAvatarURL)
            .setURL(args.user.displayAvatarURL)
            .setColor(message.guild.member(args.user).highestRole.color)
            .setImage(args.user.displayAvatarURL)
            .setDescription(`[Direct Avatar Link!](${args.user.displayAvatarURL})`)
            .addField("User ID", args.user.id, true)
            .addField("Discriminator Tag", args.user.tag, true)
            .addField("Status", args.user.presence.status.toUpperCase(), true)
            .setThumbnail("https://vignette.wikia.nocookie.net/central/images/6/60/Discord-logo.png/revision/latest?cb=20170621125902")
            .setTimestamp(args.user.createdAt)
            .setFooter("Account created on");

        if (args.user.presence.game) embed.addField("Activity", args.user.presence.game.name, true);

        message.channel.send({embed});
    }
}

module.exports = info;