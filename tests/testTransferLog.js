const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestTransferLogGet', () => {
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.transfer.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        console.log(i)
        assert(i === 5);
        console.log('Number of logs:', i);
    });
});


describe('TestTransferLogInfoGet', () => {
    it('test_success', async () => {
        let logs = await starkbank.transfer.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.transfer.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});