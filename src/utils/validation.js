import {genSalt, hash} from 'bcryptjs';
import Fingerprint2 from 'fingerprintjs2';

/* eslint-disable compat/compat */

const getDeviceToken = new Promise((resolve, reject) => Fingerprint2().get(browerId => {
  if (browerId) {
    resolve(browerId);
  } else {
    reject(browerId);
  }
}));

const generateVarifyCode = (fact) => new Promise((resolve, reject) => {
  genSalt(6, (err, salt) => {
    if (err) {
      reject(err);
    }
    hash(fact, salt, (hashErr, innerHash) => {
      if (innerHash) {
        const varifyCode = innerHash.substring(15, 21);
        resolve(varifyCode);
      }
      reject(hashErr);
    });
  });
});


export async function generateBrowserId() {
  try {
    const deviceToken = await getDeviceToken;

    return generateVarifyCode(deviceToken);
  } catch (err) {
    throw new Error(err);
  }
}

export {getDeviceToken};



