const axios = require("axios");

async function fetchJobs() {

    const response = await axios.get(
        "https://remoteok.com/api"
    );
    console.log(response)
    return response.data.slice(1, 20);
}

module.exports = {
    fetchJobs
};