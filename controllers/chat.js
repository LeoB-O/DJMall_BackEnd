const Chat = require('../models/Chat');
const util = require('../util/util');

module.exports = {
    getChat: async function (req, res, next) {
        if (!util.reqShouldContain(['to'])) {
            util.handleResponse(res, 'Missing params "to".', null);
            return;
        }

        let senderId = req.jwt.payload.userId;
        let receiverId = req.query.to;

        let chatTo = await Chat.findOne({
            from: senderId,
            to: receiverId
        });

        let chatFrom = await Chat.findOne({
            from: receiverId,
            to: senderId
        });
        let chatcontent=new Array()
        let chatfromcontent=new Array()
        chatcontent=chatTo?chatTo.contents:[]
        chatfromcontent=chatFrom?chatFrom.contents:[]
        for(let ct in chatcontent)
        {
            let time = util.formatDate(new Date(chatcontent[ct].time),"yyyy-MM-dd hh:mm:ss")
            chatcontent[ct].time=time
        }
        for(let cf in chatfromcontent)
        {
            let time = util.formatDate(new Date(chatfromcontent[cf].time),"yyyy-MM-dd hh:mm:ss")
            chatfromcontent[cf].time=time
        }
        let ret = {
            fromUser: chatTo?chatcontent:[],
            toUser: chatFrom?chatfromcontent:[]
        }

        util.handleResponse(res, null, ret);
    },
    sendMessage: async function(req, res, next) {
        if (!util.reqShouldContain(['to', 'message'])) {
            util.handleResponse(res, 'Missing "to" or "message"', null);
            return;
        }

        let senderId = req.jwt.payload.userId;
        let receiverId = req.body.to;
        let message = req.body.message;

        let chat = await Chat.findOne({
            from: senderId,
            to: receiverId
        });

        if (!chat) {
            await Chat.create({
                from: senderId,
                to: receiverId,
                contents: [{
                    time: Date.now(),
                    message: message
                }]
            });

            util.handleResponse(res, null, {});
        } else {
            chat.contents.push({
                time: Date.now(),
                message: message
            });
            await chat.save();

            util.handleResponse(res, null, {});
        }
    }
};
