// Discord 연결

const { Client, Intents } = require("discord.js");
const { discord_token } = require("./config.json");
const MongoClient = require('mongodb').MongoClient;

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
partials: ['MESSAGE', 'CHANNEL'] });

client.once("ready", () => {
  console.log("Ready!");
});

// MongoDB 연결

MongoClient.connect('mongodb+srv://root:go_159159159@cluster0.j1qgc.mongodb.net/Notice?retryWrites=true&w=majority', function(er, client){
	db = client.db('Notice');
})

client.on("message", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
    console.log(message.content)
	message.channel.send(message.content)
	db.collection('post').insertOne( {_id : 1, title : '하이'})
})

client.login(discord_token);
