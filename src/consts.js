/**
 * Created Date: 2019/10/16, 10:51:20 am
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/16, 10:51:24 am
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

const fs = require("fs");
const path = require("path");

exports.CHECK_RULES = ["positive", "negative", "less", "greater", "max", "min"]
exports.DEAFAULT_LANGUAGE = "zh_CN";

exports.SUPPORTED_LANGUAGES = (() => {
    let languages = fs.readdirSync(path.join(__dirname, 'languages'))
        .map(file => file.split(".")[0]);
    console.log(languages);
    return languages;
})()