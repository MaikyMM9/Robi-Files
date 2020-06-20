module.exports.run = async (client, message, arguments) => {






    message.channel.send(`De ping is: ${client.ping}ms`);
   
   
   
   }
   
   
   module.exports.help = {
       name: "ping"
   }