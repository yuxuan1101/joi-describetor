/**
 * Created Date: 2019/10/15, 4:30:27 pm
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/15, 4:30:35 pm
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

class DefaultDescribetor {
    constructor (schema) {
        if (!schema.isJoi) throw new Error("not joi schema!");
        this.schema = schema;
    }

    setSchema (schema) {
        this.schema = schema;
    }

    describe () {
        return DefaultDescribetor.describe(this.schema);
    }

    static async describe (schema) {
        return schema.describe();
    }
}

module.exports = DefaultDescribetor;
