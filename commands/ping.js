module.exports.run = async (client, message, arguments) => {



    if (message.member.roles.cache.has('17635063218438165')) {
        return message.channel.send("Je beschikt niet over de Game-Pass")

    }

    if (message.member.roles.cache.has('17635063218438165')) {



        var ping = Date.now() - message.createdTimestamp + " ms";



        message.channel.send("Jouw ping is: `" + `${Date.now() - message.createdTimestamp}` + " ms`");

    }

}


module.exports.help = {
    name: "ping"
}