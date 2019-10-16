/**
 * Created Date: 2019/10/15, 4:15:07 pm
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/15, 4:15:18 pm
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

const Describetor = require("./index");
const joi = require("joi");
const util = require('util');

const log = (...rest) => console.log(util.inspect(...rest, {depth: 5}));

const schema = joi.object().keys({
    positive_number:      joi.number().positive().required(),
    negative_number:      joi.number().negative().required(),
    id:      joi.number().min(-1).max(10).required().notes("id"),
    number:      joi.number().greater(-1).less(10).required().notes("id"),
    name:    joi.string().notes(["name", "username"]),
    email:   joi.string().email().required(),
    created: joi.date().allow(null),
    active:  joi.string().only(["y", "n"]),
    version: joi.forbidden(),
});

const mode = {
    type: "object",
    language: "en_US"
};
(async () => {
    let result = await new Describetor(schema).describe(mode);
    log(result);
})();
