// filename : database/_dbproc_arcplayer_update.js
// author   : CirnoBakaBOT
// date     : 04/10/2020

const TAG = 'database/_dbproc_arcplayer_update.js';

module.exports = (userinfo) => {
  return new Promise((reslove, reject) => {

    // check database valid
    if (!DATABASE_ARCPLAYER) {
      return reject(new Error(`Invalid database? DATABASE_ARCPLAYER => ${JSON.stringify(DATABASE_ARCPLAYER)}`));
    }

    // check data valid
    if (typeof userinfo.user_id != 'number' ||
      typeof userinfo.join_date != 'number' ||
      typeof userinfo.name != 'string' ||
      typeof userinfo.rating != 'number' ||
      typeof userinfo.code != 'string') {
      return reject(`Invalid input data? userinfo => ${JSON.stringify(userinfo)}`);
    }

    const _sqlbinding = {
      uid: userinfo.user_id,
      code: userinfo.code,
      name: userinfo.name,
      ptt: userinfo.rating,
      join_date: userinfo.join_date,
    };

    // this user ptt is hidden
    if (userinfo.rating == -1)
      delete _sqlbinding.ptt;

    const _sql =
      `INSERT OR REPLACE INTO ` +
      `\`players\`(${Object.keys(_sqlbinding).join()}) ` +
      `VALUES(${new Array(Object.keys(_sqlbinding).length).fill('?').join(',')});`;
    syslog.v(TAG, _sql);

    // execute sql
    DATABASE_ARCPLAYER.run(_sql, Object.values(_sqlbinding))
      .then(reslove())
      .catch((e) => { syslog.e(TAG, e.stack); reject(e); })

  });
}