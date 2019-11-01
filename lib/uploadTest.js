require('dotenv').config()
// require file system
const fs = require('fs')
const mime = require('mime-types')
// require aws sdk
const AWS = require('aws-sdk')
// update region
AWS.config.update({ region: 'us-east-1' })
// create s3 obj instance
const s3 = new AWS.S3()

console.log(s3)

// access command line arguments to get file path
const filePath = process.argv[2]
// define BUCKET_NAME
const bucketName = process.env.BUCKET_NAME

console.log(bucketName)

// read the file first
fs.readFile(filePath, (err, fileData) => {
  if (err) throw err
console.log(mime.lookup(filePath))
  // create params object for s3 Upload
  const params = {
    Bucket: bucketName,
    Key: 'something',
    Body: fileData,
    ACL: 'public-read',
    ContentType: mime.lookup(filePath)
  }

  // Upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err

    console.log(s3Data)
  })
})
