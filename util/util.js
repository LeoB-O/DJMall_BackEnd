module.exports = {
    reqShouldContain: function (params) {
        return function (req) {
            for (let p of params) {
                if (!req.body[p] && !req.query[p]) {
                    return false;
                }
                if (req.body[p] === 'undefined' || req.query[p] === 'undefined') {
                    return false;
                }
            }
            return true;
        }
    },

    reqShouldOnlyContain: function(params) {
        return function (req) {
            let ret = {};
            for (let p of params) {
                if (req[p]) {
                    ret[p] = req[p]
                }
            }
            return ret;
        }
    },

    handleResponse: function (res, err, data) {
        if (data === null) {
            data = {}
        }
        if (err) {
            res.send({success: false, data: {err: err}});
        } else {
            res.send({success: true, data: data});
        }
    },

    // array should like[{key: key1, value: value1, active: true}]
    arrayToObject: function (array) {
        let ret = {};
        for (let object of array) {
            if (object.active && object.key!=='password'&&object.key!=='username') {
                ret[object.key] = object.value;
            }
        }
        return ret;
    },

    findInArray: function (array, key, value) {
        for (let i of array) {
            if (i[key]==value) {
                return i;
            }
        }

        return null;
    },
    formatDate:function (date,format) {
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
}
