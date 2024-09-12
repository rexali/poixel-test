var assert = require('assert');
const { escapeHTML } = require('../utils/escapeHTML');
const { hashpass } = require('../utils/hashHelper');

describe("Perform Utils Test", ()=>{

    it('Escape HTML string, should return a string', () => {
        assert.equal(escapeHTML("Silicon Valley"),"Silicon Valley");
    });

    it('Escaped string is not the same as the given in lowercase letter, should return a string', () => {
        assert.notEqual(escapeHTML("Silicon Valley"),"Silicon Valley".toLowerCase());
    });
    
    it('Hash a given password, should return a hashed string ', () => {
        assert.equal(typeof (escapeHTML("<Housing/>")), "string");
    });

    it('Escaped string is not the same as a given string', () => {
        assert.notEqual(escapeHTML("<Housing/>"), "<Housing/>");
    });
    
    it('Check that a hashed password is a string', () => {
        assert.equal(typeof (hashpass("Microsoft")), "string");
    });

})
