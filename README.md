# Insignia

[![Insignia](https://raw.github.com/Zolmeister/insignia/master/assets/img/screenshot-680-420.png)](http://insignia.zolmeister.com)

### A personal showcase for sharing and tracking personal projects

## Setup
```bash
git clone https://github.com/Zolmeister/insignia.git
cd insignia
npm install
```
Then edit the root config file
```javascript
// config/root.js
module.exports = {

  // web page login
  admin: {
    username: process.env.WEB_USERNAME,
    password: process.env.WEB_PASSWORD
  },
  
  // MongoDB url: mongodb://localhost/insignia
  adapters: {
    mongo:{
      url: process.env.DB_URL
    }
  }
}
```
## Admin
Browse to http://localhost/#/login
and login using the config credentials  
Drag and drop elements to move them around, drag and drop images onto the target images for upload.
[![Insignia](https://raw.github.com/Zolmeister/insignia/master/assets/img/screenshot-admin-680-420.png)](http://insignia.zolmeister.com)
[![Insignia](https://raw.github.com/Zolmeister/insignia/master/assets/img/screenshot-edit-680-420.png)](http://insignia.zolmeister.com)
