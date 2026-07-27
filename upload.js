import * as ftp from "basic-ftp"

async function deploy() {
    const client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access({
            host: "94.199.205.52",
            user: "sile4237",
            password: "268ce65226T",
            secure: false
        })
        await client.cd("public_html");
        await client.uploadFromDir("dist");
        console.log("Upload completed!");
    } catch(err) {
        console.log(err)
    }
    client.close()
}

deploy()
