const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class UtilityPayment extends Resource {
    /**
     *
     * UtilityPayment object
     *
     * When you initialize a UtilityPayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (conditionally required):
     * line [string, default null]: Number sequence that describes the payment. Either 'line' or 'bar_code' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * barCode [string, default null]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
     *
     * Parameters (required):
     * description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
     *
     * Parameters (optional):
     * scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
     * tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * id [string, default null]: unique id returned when payment is created. ex: '5656565656565656'
     * status [string, default null]: current payment status. ex: 'registered' or 'paid'
     * amount [int, default null]: amount automatically calculated from line or bar_code. ex: 23456 (= R$ 234.56)
     * fee [integer, default null]: fee charged when utility payment is created. ex: 200 (= R$ 2.00)
     * created [string, default null]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    description, scheduled, line, barCode,
                    tags, amount, status, created,
                    fee, id,
                }) {
        super(id);
        this.barCode = barCode;
        this.line = line;
        this.description = description;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.amount = amount;
        this.status = status;
        this.created = created;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
    }
}

exports.UtilityPayment = UtilityPayment;
let resource = {'class': exports.UtilityPayment, 'name': 'UtilityPayment'};


exports.create = async function (payments, {user} = {}) {
    /**
     *
     * Create UtilityPayments
     *
     * Send a list of UtilityPayment objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * payments [list of UtilityPayment objects]: list of UtilityPayment objects to be created in the API
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * Return:
     * list of UtilityPayment objects with updated attributes
     *
     */
    return rest.post(resource, payments, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment
     *
     * Receive a single UtilityPayment object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment pdf file
     *
     * Receive a single UtilityPayment pdf file generated in the Stark Bank API by passing its id.
     * Only valid for utility payments with 'success' status.
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * UtilityPayment pdf file
     *
     */
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({ limit, after, before, tags, ids, status, user} = {}) {
    /**
     *
     * Retrieve UtilityPayments
     *
     * Receive a generator of UtilityPayment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default null] date filter for objects only before specified date. ex: '2020-03-10'
     * tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * status [string, default null]: filter for status of retrieved objects. ex: 'paid'
     * user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of UtilityPayment objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids: ids,
        status: status,
    };
    return rest.getList(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a UtilityPayment entity
     *
     * Delete a UtilityPayment entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: UtilityPayment unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted UtilityPayment with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};