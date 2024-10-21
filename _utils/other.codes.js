require('dotenv').config();
const { createCipheriv, createDecipheriv } = require("crypto")

function generateRandomNumber() {
     let result = '';
     const characters = '0123456789';
     
     for (let i = 0; i < 10; i++) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
     }
     
     return result;
   }

function replaceFirstThree(str) {
    if (str.length <= 3) {
      return '*'.repeat(str.length);  
    }
    return '*'.repeat(3) + str.slice(3);
  }
  
  const algoritma = process.env.APP_ALGORITMA
  const key = process.env.APP_KEY
  const iv = Buffer.from('0123456789abcdef')

  
function encrypt(text) {
      const cipher = createCipheriv(algoritma, key, iv)
      let encrypted = cipher.update(text, 'utf8', 'base64')
      encrypted += cipher.final('base64')
      return encrypted
  }
  
function decrypt(text) {
      const decipher = createDecipheriv(algoritma, key, iv)
      let decrypted = decipher.update(text, 'base64', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
  }
  
  
module.exports = {
  generateRandomNumber, encrypt, decrypt
}