const rest = require('../utils/rest.js');
const Resource = require('../utils/resource.js').Resource


class Transaction extends Resource {
    /**
     *
     * Transaction object
     *
     * A Transaction is a transfer of funds between workspaces inside Stark Bank.
     * Transactions created by the user are only for internal transactions.
     * Other operations (such as transfer or charge-payment) will automatically
     * create a transaction for the user which can be retrieved for the statement.
     * When you initialize a Transaction, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * amount [integer]: amount in cents to be transferred. ex: 1234 (= R$ 12.34)
     * description [string]: text to be displayed in the receiver and the sender statements (Min. 10 characters). ex: 'funds redistribution'
     * externalId [string]: unique id, generated by user, to avoid duplicated transactions. ex: 'transaction ABC 2020-03-30'
     * receivedId [string]: unique id of the receiving workspace. ex: '5656565656565656'
     *
     * Parameters (optional):
     * tags [list of strings]: list of strings for reference when searching transactions (may be empty). ex: ['abc', 'test']
     * Attributes (return-only):
     * source [string, default null]: unique locator of the related entity in the API reference
     * id [string, default null]: unique id returned when Transaction is created. ex: '7656565656565656'
     * fee [integer, default null]: fee charged when transfer is created. ex: 200 (= R$ 2.00)
     * created [string, default null]: creation datetime for the boleto. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ amount, description, externalId, receiverId, tags, fee, created, source, id }) {
        super(id);
        this.amount = amount;
        this.description = description;
        this.externalId = externalId;
        this.receiverId = receiverId;
        this.tags = tags;
        this.fee = fee;
        this.created = created;
        this.source = source;
    }
}

exports.Transaction = Transaction;
let resource = {'class': exports.Transaction, 'name': 'Transaction'};

exports.create = async function (transactions, {user} = {}) {
    /**
     *
     * Create Transactions
     *
     * Send a list of Transaction objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * transactions [list of Transaction objects]: list of Transaction objects to be created in the API
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of Transaction objects with updated attributes
     *
     */
    return rest.post(resource, transactions, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Transaction
     *
     * Receive a single Transaction object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Transaction object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, externalIds, user} = {}) {
    /**
     *
     * Retrieve Transactions
     *
     * Receive a generator of Transaction objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * externalIds [list of strings, default null]: list of external ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of Transaction objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        externalIds: externalIds,
    };
    return rest.getList(resource, query, user);
};
