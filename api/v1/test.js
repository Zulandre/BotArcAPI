// filename : /v1/test.js
// author   : CirnoBakaBOT
// date     : 02/10/2020
// comment  : test api

import Utils from 'Utils';

export default async function (argument) {

    // initialize response data
    let _response_code = 200;
    let _response_message = 'ok';
    let _response_data_template = {
        'test': null
    };

    // fill the template
    _response_data_template.test = '(｡･∀･)ﾉﾞ嗨';

    // make response
    return Utils.MakeApiObject(_response_code, _response_message, _response_data_template);
};

