const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');


const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body === '!todos') {
        try {
            const chat = await msg.getChat();
            if (chat.isGroup) {
                let mentions = [];
                for(let participant of chat.participants) {
                    let contact = await client.getContactById(participant.id._serialized);
                    mentions.push(contact);
                }
        
                let mentionMessage = '⺀𝗔𝗖𝗧𝗜𝗩𝗘𝗡𝗦𝗘 𝗕𝗜𝗡𝗔𝗥𝗜@𝗦⺀\n\n❏ 𝙼𝙴𝙽𝚂𝙰𝙹𝙴: \n\n❏ 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙰𝚂:\n';
                for(let mention of mentions) {
                    mentionMessage += `🌬️ @${mention.number}\n`;
                }
        
                mentionMessage += '└ By @necgamingbot';
        
                chat.sendMessage(mentionMessage, {
                    mentions: mentions
                });
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
});

client.initialize();
