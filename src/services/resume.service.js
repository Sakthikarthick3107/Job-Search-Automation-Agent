const axios = require("axios");
const constants = require("../config/constants");

async function getResumeText() {

    const response = await axios.get(
        constants.RESUME_URL
    );

    return response.data;
}

module.exports = {
    getResumeText
};