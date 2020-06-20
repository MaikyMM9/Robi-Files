const discord = require("discord.js")
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();



fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <=0) {
        console.log("Kan geen jsFiles vinden!");
        return;
    }

jsFiles.forEach((f,i) => {

    var fileGet = require(`./commands/${f}`);
    console.log(`De file ${f} is geladen`)

});

});




client.login(process.env.token);

client.on("ready", async () => {

    client.user.setActivity("AnimalCrossing: NH", { type: "Playing" });


    console.log(`De bot: ${client.user.username} is online`)

});
client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];


        

    



});

