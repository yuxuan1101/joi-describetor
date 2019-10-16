/**
 * Created Date: 2019/10/15, 4:30:27 pm
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/15, 4:30:35 pm
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

const joi = require("joi");
const DefaultDescribetor = require("./DefaultDescribetor");

const ObjectDescribetor = require("./ObjectDescribetor");
const MDDescribetor = require("./MDDescribetor");

const {DEAFAULT_LANGUAGE, SUPPORTED_LANGUAGES} = require("./consts");

class Describetor extends DefaultDescribetor {

    async validMode (mode) {
        return joi.validate(mode, Describetor.modeSchema);
    }

    async describe (mode) {
        if (!mode) return this.schema.describe();
        await this.validMode(mode);

        return Describetor.describe(this.schema, mode)
    }

    static async describe (schema, mode) {
        return Describetor.getDescribetorByMode(mode)(schema, mode);
    }
    static getDescribetorByMode (mode) {
        return Describetor[`${mode.type}Describe`];
    }
}

Describetor.objectDescribe = ObjectDescribetor.describe;
Describetor.markdownDescribe = MDDescribetor.describe;

Describetor.modeSchema = joi.object().keys({
    type: joi.string().only(["object", "markdown"]).required(),
    skipVerification: joi.boolean(),
    language: joi.string().only(SUPPORTED_LANGUAGES),
})
.description("describetor mode schema.");


module.exports = Describetor;
