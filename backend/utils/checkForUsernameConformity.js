const checkForUsernameConformity = (req) => {
    if ((req.body.username.toUpperCase()).slice(0, 3) === 'NF_') {
        return req.body.username.toUpperCase()
    }
    else return 'NF_' + req.body.username.toUpperCase()
}

module.exports = checkForUsernameConformity