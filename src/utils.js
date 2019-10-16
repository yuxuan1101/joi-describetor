/**
 * Created Date: 2019/10/15, 6:28:07 pm
 * Author: yuxuan.dong at yuxuan.dong@ucloud.cn
 * -----
 * Last Modified: 2019/10/15, 6:28:13 pm
 * Modified By: yuxuan.dong at yuxuan.dong@ucloud.cn
 **/

'use strict';

const {CHECK_RULES} = require('./consts');

exports.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));

/**
 *
 * @param {*} value
 * { type: 'string' } => string
 */
exports.describeValue = (value, opts) => {
    let {type, flags, valids, rules} = value;

    if (!flags) return type;

    // enums type
    if (flags.allowOnly) return valids;

    if (rules) {
        rules = pickValueRule(rules, CHECK_RULES);
        if (type === "number") {
            let ret = {};
            if (rules["positive"]) {
                ret = addNumberRule({name: "start", num: 0, allowEq: false}, ret);
            }
            if (rules["greater"]) {
                ret = addNumberRule({name: "start", num: rules["greater"]["arg"], allowEq: false}, ret);
            }
            if (rules["min"]) {
                ret = addNumberRule({name: "start", num: rules["min"]["arg"], allowEq: true}, ret);
            }

            if (rules["negative"]) {
                ret = addNumberRule({name: "end", num: 0, allowEq: false}, ret);
            }
            if (rules["less"]) {
                ret = addNumberRule({name: "end", num: rules["less"]["arg"], allowEq: false}, ret);
            }
            if (rules["max"]) {
                ret = addNumberRule({name: "end", num: rules["max"]["arg"], allowEq: true}, ret);
            }

            if (!ret.start && !ret.end) return type;

            let description = ["(-Infinity, ", "+Infinity)"];
            if (ret.start) {
                description[0] = `${ret.start.allowEq ? "[" : "("} ${ret.start.num}, `
            }
            if (ret.end) {
                description[1] = `${ret.end.num}${ret.end.allowEq ? "]" : ")"}`
            }
            return description.join("");
        }

    }

    return type;
}

const pickValueRule = (rules, names) => {
    let ret = {};
    for (let name of names) {
        let picked = rules.filter(item => item.name === name);
        if (picked.length === 1) {
            ret[name] = picked[0];
        }
    }
    return ret;
}
/**
 *
 * @param {object} rule
 * @param {"start", "end"} rule.name
 * @param {number} rule.num
 * @param {boolean} rule.allowEq
 * @param {object} previous
 */
const addNumberRule = (rule, previous) => {
    if (rule.name === "start") {
        if (!previous.start) {
            return Object.assign({}, {
                start : {
                    num:     rule.num,
                    allowEq: rule.allowEq
                }
            }, previous);
        }
        if (rule.num > previous.start.num) {
            previous.start.num = rule.num;
            previous.start.allowEq = rule.allowEq;
        }
        if (rule.num === previous.start.num) {
            previous.start.allowEq = rule.allowEq && previous.start.allowEq;
        }
        return previous;
    }

    if (rule.name === "end") {
        if (!previous.end) {
            return Object.assign({}, {
                end : {
                    num:     rule.num,
                    allowEq: rule.allowEq
                }
            }, previous);
        }
        if (rule.num < previous.end.num) {
            previous.end.num = rule.num;
            previous.end.allowEq = rule.allowEq;
        }
        if (rule.num === previous.end.num) {
            previous.end.allowEq = rule.allowEq && previous.end.allowEq;
        }
        return previous;
    }
}
