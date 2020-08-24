const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`What's your password?`, password => {
    console.log(`Your password is ${password}!`)
    readline.close()
  })