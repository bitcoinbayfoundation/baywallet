const Environment = require('jest-environment-jsdom');

module.exports = class TestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextDecoder === 'undefined') {
            const { TextEncoder } = require("text-decoding");
            this.global.TextDecoder = TextDecoder;
        }
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require("text-encoding");
            this.global.TextEncoder = TextEncoder;
        }
    }
}