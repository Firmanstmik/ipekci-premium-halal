/**
 * Deploy the theme via FTP
 * 
 * Usage: 
 * set FTP_HOST=ftp.yourhost.com
 * set FTP_USER=your_username
 * set FTP_PASS=your_password
 * set FTP_PORT=21
 * set FTP_DIR=/domains/ipekcislachterij.localclicks.nl/public_html/wp-content/themes/ipekci-theme
 * node scripts/deploy-ftp.mjs
 */
import * as ftp from 'basic-ftp';
import { resolve } from 'path';
import 'dotenv/config'; // allow reading from .env if present

const host = process.env.FTP_HOST;
const user = process.env.FTP_USER;
const password = process.env.FTP_PASS;
const port = process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21;
const remoteDir = process.env.FTP_DIR || '/domains/ipekcislachterij.localclicks.nl/public_html/wp-content/themes/ipekci-theme';
const localDir = resolve('ipekci-theme');

if (!host || !user || !password) {
    console.error('FTP_HOST, FTP_USER, and FTP_PASS must be set in the environment or .env file');
    process.exit(1);
}

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        console.log(`Connecting to FTP ${host}:${port} as ${user}...`);
        await client.access({
            host,
            user,
            password,
            port,
            secure: false // Set to true for explicit FTPS
        });
        
        console.log(`Connected. Ensuring remote directory exists: ${remoteDir}`);
        await client.ensureDir(remoteDir);
        
        console.log(`Uploading contents of ${localDir} to ${remoteDir}...`);
        await client.uploadFromDir(localDir);
        
        console.log('Upload complete!');
    }
    catch (err) {
        console.error('FTP Deployment failed:', err);
        process.exit(1);
    }
    client.close();
}

deploy();
