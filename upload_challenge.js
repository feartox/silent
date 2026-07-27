import * as ftp from 'basic-ftp';
import fs from 'fs';

async function run() {
  const client = new ftp.Client();
  try {
    await client.access({host:'94.199.205.52', user:'sile4237', password:'268ce65226T'});
    await client.cd('public_html');
    try { await client.send('MKD .well-known'); } catch(e){}
    await client.cd('.well-known');
    try { await client.send('MKD acme-challenge'); } catch(e){}
    await client.cd('acme-challenge');
    
    fs.writeFileSync('/tmp/'+process.env.CERTBOT_TOKEN, process.env.CERTBOT_VALIDATION);
    await client.uploadFrom('/tmp/'+process.env.CERTBOT_TOKEN, process.env.CERTBOT_TOKEN);
    console.log("Uploaded " + process.env.CERTBOT_TOKEN);
  } catch(e) { 
    console.error(e);
  }
  client.close();
}
run();
