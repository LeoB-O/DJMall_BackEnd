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
        }).lean().exec();

        let chatFrom = await Chat.findOne({
            from: receiverId,
            to: senderId
        }).lean().exec();
        let chatcontent = chatTo ? chatTo.contents : []
        let chatfromcontent = chatFrom ? chatFrom.contents : []
        for (let ct in chatcontent) {
            if (chatcontent.hasOwnProperty(ct)){
                let time = util.formatDate(new Date(chatcontent[ct].time), "yyyy-MM-dd hh:mm:ss")
                chatcontent[ct].time = time
            }
        }
        for (let cf in chatfromcontent) {
            let time = util.formatDate(new Date(chatfromcontent[cf].time), "yyyy-MM-dd hh:mm:ss")
            chatfromcontent[cf].time = time
        }
        let ret = {
            fromUser: chatTo ? chatcontent : [],
            toUser: chatFrom ? chatfromcontent : []
        }

        util.handleResponse(res, null, ret);
    },
    getChatM: async function (req, res, next) {
        if (!util.reqShouldContain(['to'])) {
            util.handleResponse(res, 'Missing params "to".', null);
            return;
        }

        let senderId = req.jwt.payload.merchantId;
        let receiverId = req.query.to;

        let chatTo = await Chat.findOne({
            from: senderId,
            to: receiverId
        }).lean().exec();

        let chatFrom = await Chat.findOne({
            from: receiverId,
            to: senderId
        }).lean().exec();
        let chatcontent = new Array()
        let chatfromcontent = new Array()
        chatcontent = chatTo ? chatTo.contents : []
        chatfromcontent = chatFrom ? chatFrom.contents : []
        for (let ct in chatcontent) {
            let time = util.formatDate(new Date(chatcontent[ct].time), "yyyy-MM-dd hh:mm:ss")
            chatcontent[ct].time = time
        }
        for (let cf in chatfromcontent) {
            let time = util.formatDate(new Date(chatfromcontent[cf].time), "yyyy-MM-dd hh:mm:ss")
            chatfromcontent[cf].time = time
        }
        let ret = {
            fromUser: chatTo ? chatcontent : [],
            toUser: chatFrom ? chatfromcontent : []
        }

        util.handleResponse(res, null, ret);
    },
    sendMessage: async function (req, res, next) {
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
                    message: message,
                    unread: true
                }]
            });

            util.handleResponse(res, null, {});
        } else {
            chat.contents.push({
                time: Date.now(),
                message: message,
                unread: true
            });
            await chat.save();

            util.handleResponse(res, null, {});
        }
    },
    sendMessageM: async function (req, res, next) {
        if (!util.reqShouldContain(['to', 'message'])) {
            util.handleResponse(res, 'Missing "to" or "message"', null);
            return;
        }

        let senderId = req.jwt.payload.merchantId;
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
                    message: message,
                    unread: true
                }]
            });

            util.handleResponse(res, null, {});
        } else {
            chat.contents.push({
                time: Date.now(),
                message: message,
                unread: true
            });
            await chat.save();

            util.handleResponse(res, null, {});
        }
    },
    getChatByMerchant: async function (req, res, next) {

        let toId = req.jwt.payload.merchantId;
        console.log(toId)
        let chat = await Chat.find({
            to: toId
        })
        chat = chat.map((current) => {
            return {
                from: current.from,
                contents: current.contents,
                createdAt: util.formatDate(new Date(current.createdAt), "yyyy-MM-dd hh:mm:ss"),
                updatedAt: util.formatDate(new Date(current.updatedAt), "yyyy-MM-dd hh:mm:ss")
            }
        })

        util.handleResponse(res, null, {
            chats: chat
        })
    },
    changeunread:function (req, res, next) {
        let fromid=req.body.fromid
        let toId = req.jwt.payload.merchantId;
        Chat.findOne({
            to: toId,
            from:fromid
        }, function (err, chat) {
            for(let r in chat.contents)
            {
                chat.contents[r].unread=false
            }
            chat.save();
            if (err) {
                util.handleResponse(res, err, {
                    ok: false
                })
            } else {
                util.handleResponse(res, err, {
                    ok: true
                })
            }
        })
    }
};
