const discord = require("discord.js")

module.exports.run = async (client, message, arguments) => {

    if (!message.member.roles.cache.has('17635063218438165')) {
        return message.channel.send("Je beschikt niet over de Game-Pass")

    }

    if (message.member.roles.cache.has('17635063218438165')) {



        return message.reply("Hallo! Pass-Lid :smile:");


    }


}


module.exports.help = {
    name: "hallo"

}
