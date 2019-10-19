const commando = require("discord.js-commando");
const SpotifyAPI = require("node-spotify-api")
let spotify = new SpotifyAPI({
    id: "3fd6248f60c448fcad8c9e1c58369961",
    secret: "33427face37e4cee95df0c3be54299e8"
    // SPOTIFY_ID=3fd6248f60c448fcad8c9e1c58369961
    // SPOTIFY_SECRET=33427face37e4cee95df0c3be54299e8
});

class spotifysearch extends commando.Command {
    constructor(client) {
        super(client, {
            name: "spotifysearch",
            aliases: ["spotify"],
            group: "music",
            memberName: "spotifysearch",
            description: "Arugula searches Spotify for a given query.",
            details: "Arugula searches Spotify for a given query. The type of query must be an artist, album, or track.",
            format: "<type> <query>",
            examples: ["aru! spotifysearch track Shangri-la", "aru! spotify album Carrie & Lowell", "aru! spotify artist Flume"],
            args: [{
                key: "type",
                prompt: "What type are you searching for? (artist/album/track)",
                type: "string"
            }, {
                key: "query",
                prompt: "What would you like to search on Spotify?",
                type: "string"
            }]
        });
    }
    async run(message, args) {
        let typeText = args.type.toLowerCase()
        if (["artist", "singer", "creator", "band", "producer"].includes(typeText)) typeText = "artist"
        else if (["album", "ep"].includes(typeText)) typeText = "album"
        else if (["track", "song"].includes(typeText)) typeText = "track"

        spotify.search({
            type: typeText,
            query: args.query
        }).then(function(response) {
            spotify.request(response.artists.href)
                .then(function(data) {
                    console.log(data);
                }).catch(console.error);
        }).catch(console.error); // https://github.com/ceckenrode/node-spotify-api#readme
    }
}

module.exports = spotifysearch;