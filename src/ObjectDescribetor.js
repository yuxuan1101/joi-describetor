/**
 * Created Date: 2019/10/15, 4:52:09 pm
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/15, 5:15:51 pm
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

const DefaultDescribetor = require("./DefaultDescribetor");
const {fromEntries, describeValue} = require("./utils");

class ObjectDescribetor extends DefaultDescribetor {
    async describe (mode) {
        return ObjectDescribetor.describe(this.schema, mode)
    }

    static async describe (schema, mode) {
        const defaultDescription = await DefaultDescribetor.describe(schema);
        const {REQUIRED_ARGS, OPTIONAL_ARGS} = require(`./languages/${mode.language}`);

        return {
            [REQUIRED_ARGS] : fromEntries(
                Object.entries(defaultDescription.children)
                    .filter(([key, value]) => value.flags && value.flags.presence === "required")
                    .map(([key, value]) => [key, describeValue(value)])
            ),
            [OPTIONAL_ARGS] : fromEntries(
                Object.entries(defaultDescription.children)
                    .filter(([key, value]) => !value.flags || (value.flags.presence !== "required" && value.flags.presence !== "forbidden"))
                    .map(([key, value]) => [key, describeValue(value)])
            )
        }
    }
}

module.exports = ObjectDescribetor;
