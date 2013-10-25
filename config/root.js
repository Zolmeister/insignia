module.exports = {
  admin: {
    username: process.env.WEB_USERNAME,
    password: process.env.WEB_PASSWORD
  },
  
  adapters: {
    mongo:{
      url: process.env.DB_URL
    }
  }
}