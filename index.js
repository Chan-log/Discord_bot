
// Discord 연결

const { Client, Intents, MessageEmbed } = require("discord.js");
const { discord_token } = require("./config.json");
const MongoClient = require('mongodb').MongoClient;
const prefix = '!';

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
partials: ['MESSAGE', 'CHANNEL'] });

client.once("ready", () => {
  console.log("Ready!");
});

// MongoDB 연결

// 섬원 모집 데이터 베이스
MongoClient.connect('mongodb+srv://root:go_159159159@cluster0.j1qgc.mongodb.net/Notice?retryWrites=true&w=majority', (er, client) =>{
	db = client.db('Notice');
})

// 유저 정보 로드
MongoClient.connect('mongodb+srv://root:go_159159159@cluster0.j1qgc.mongodb.net/database?retryWrites=true&w=majority', (er, client) =>{
	userInfo = client.db('database');
})

// 명령어 설정

client.on("message", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) return;
	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	let command = args.shift().toLowerCase();
	if (command === `정보`){
		userInfo.collection('collection').find({name: args[0]}).toArray(function(err, respon){
			let info = respon[0];
			console.log(info);
			const infoMessage = new MessageEmbed()
			.setColor('#808080')
			.setTitle('유저 정보')
			.setURL('http://1.255.200.201/search?value=' + info.name)
			.setAuthor({ name: '유저 정보', iconURL: 'https://mc-heads.net/avatar/' + info.name, url: 'http://1.255.200.201/search?value=' + info.name })
			.setThumbnail( 'https://mc-heads.net/avatar/' + info.name )
			.addFields(
				{ name: '닉네임', value: info.name + '\n' },
				{ name: '함께한 시간', value: info.playtime + '\n', inline: true },
				{ name: '보유 자산', value: info.money  + '\n', inline: true },
				{ name: '인기도', value: info.pop + '\n', inline: true },
				{ name: '낚은 물고기', value: info.fish  + '\n', inline: true },
				{ name: '먹은 케이크', value: info.cake + '\n', inline: true },
				{ name: '섬 진행도', value: info.step + '레벨 | ' +  info.progress  + '%\n', inline: true },
			)
		
			message.channel.send({ embeds: [infoMessage] });
		})
	}
	if (message.channel.id === '986564757186293820') {
		let title = args.shift();
		let content = args.join(" ");
		if (command === `게시`) {
			if (title == undefined) return;
			const uploadMessage = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title + '')
			.setAuthor({ name: '게시가 완료되었습니다.', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
			.setDescription(content + '')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			message.channel.send({ embeds: [uploadMessage] });
			db.collection('post').insertOne( {title : title, content : content})
		}
	}
})

client.login(discord_token);
