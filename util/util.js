module.exports = {
    reqShouldContain: function (params) {
        return function (req) {
            for (let p of params) {
                if (!req.body[p] && !req.query[p]) {
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
    }
}
