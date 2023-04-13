var utils = require('../utils/utils')

const auth = async (req,res,next) => {
    try{ 
        const id = req.cookies['token'] // accessing the cookie which we sent in register or login 
        console.log(id)
        if(id != undefined){
            var user = utils.findId(id)
        }

        if(user == null){
            throw new Error()
        }

        req.user = user
        next()

    }catch(e){
        console.log(e)
        res.status(401).send({error: "Please authenticate.", e})
    }
}

module.exports = auth