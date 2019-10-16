# joi-describetor  joi schema ⇄ Object/Markdown

[![JavaScript Style Guide][style-image]][style-url]

[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com

<!-- ## Install
```bash
  $ npm install joi2json --save
``` -->

## Usage
```js
const Describetor = require('joi-describetor')

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
})

(async () => {
    let mode = {
        type: "object",
        language: "en_US"
    };
    let result = await new Describetor(schema).describe(mode);
})();
```
> result:
```js
{
    "Required Args": {
        "positive_number": "( 0, +Infinity)",
        "negative_number": "(-Infinity, 0)",
        "id": "[ -1, 10]",
        "number": "( -1, 10)",
        "email": "string"
    },
    "Optional Args": {
        "name": "string",
        "created": "date",
        "active": [
            "y",
            "n"
        ]
    }
}
```