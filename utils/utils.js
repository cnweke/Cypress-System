var fs = require('fs');

module.exports.register = function(data) {
    writeFile(data, 'user.json')
}

module.exports.login = function(data) {
    var found = 0;
    var usersString = fs.readFileSync('data/user.json').toString()
    var users = JSON.parse(usersString)
    var user = {}

    for(var i = 0; i < users.length; i++){
        if((data.userName === users[i].userName) && (data.pass === users[i].pass)){
            console.log("User: " + users[i].userName + ' logged in.')
            found=1
            user = users[i]
        }
    }
    if(found === 0){
        console.log('Invalid Username or Password')
    }

    return user
}

// Create a function

module.exports.problems = function(newData){
    writeFile(newData,'problems.json')
}

module.exports.findId = function(id){

    var usersString = fs.readFileSync('data/user.json').toString()
    var users = JSON.parse(usersString)
    var found = 0

    for(var i = 0; i < users.length; i++){
        if((id == users[i].userName)){
            console.log("User: " + users[i].userName + ' exists.')
            found = 1
            return users[i]
        }
    }
    if(found == 0){
        console.log('User not found')
        return null
    }
}

function writeFile(newData, fileName){
    var allData = []
    var filePath = 'data/'+fileName;

    if(fs.readFileSync(filePath).toString() != ''){
        var oldDataString = fs.readFileSync(filePath).toString();
        var oldData = JSON.parse(oldDataString)
        for(var i = 0; i < oldData.length ; i++){
            allData.push(oldData[i])
        }
    }
    
    allData.push(newData)

    fs.writeFileSync(filePath, JSON.stringify(allData))
}