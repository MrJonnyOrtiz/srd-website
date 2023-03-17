// Create clients and set shared const values outside of the handler.
const https = require("https");
const querystring = require("querystring");

// Create a DocumentClient that represents the query to add an item
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

// to generate a unique id
const crypto = require("crypto");

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

const formatResponse = (returnCode, body) => {
   const response = {
      statusCode: returnCode,
      headers: {
         "Access-Control-Allow-Headers": "Content-Type",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
      },
      isBase64Encoded: false,
      body: JSON.stringify(body),
   };
   return response;
};

const validateCaptcha = (responseToken) => {
   const secretKey = "6LcaoNkjAAAAAJpx85a1EqMT2ZjKGtQtsPimOBky";

   const postData = querystring.stringify({
      secret: secretKey,
      response: responseToken,
   });

   const options = {
      hostname: "www.google.com",
      port: 443,
      path: "/recaptcha/api/siteverify",
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         "Content-Length": postData.length,
      },
   };

   return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
         res.setEncoding("utf8");
         let data = "";
         res.on("data", (chunk) => {
            data += chunk;
         });
         res.on("end", () => {
            const result = JSON.parse(data);

            if (result.success) {
               resolve({ validCaptcha: true });
            } else {
               resolve({ validCaptcha: false });
            }
         });
      });

      req.on("error", (err) => {
         reject(err);
      });

      req.write(postData);
      req.end();
   });
};

const putRecord = (data) => {
   const params = {
      TableName: tableName,
      Item: data,
   };
   return docClient.put(params).promise();
};

const sendEmail = async () => {
   try {
      const sns = new AWS.SNS();
      const subject = "New Review Posted!";
      const message = "Check it out!";
      const topicArn = "arn:aws:sns:us-east-1:529376456722:srd-reviews-topic";
      const params = {
         Message: message,
         Subject: subject,
         TopicArn: topicArn,
      };
      const snsPublishMsgPromise = await sns.publish(params).promise();
      return formatResponse(
         200,
         `Message ID: ${snsPublishMsgPromise.MessageId}`
      );
   } catch (err) {
      return formatResponse(500, err);
   }
};

exports.putItemHandler = async (event, content) => {
   if (event.httpMethod !== "POST") {
      throw new Error(
         `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
      );
   }

   try {
      const inputData = JSON.parse(event.body);
      const captchaStatus = await validateCaptcha(
         inputData["g-recaptcha-response"]
      );

      if (captchaStatus.validCaptcha) {
         const id = crypto.randomUUID();

         const putResult = await putRecord({
            id: id,
            fName: inputData.fName,
            lInit: inputData.lInit,
            remodelArea: inputData.remodelArea,
            stars: inputData.stars,
            review: inputData.review,
            timestamp: new Date().toISOString(),
         });

         const sendMsg = await sendEmail();
         console.info("sendMsg", sendMsg);
         console.info(
            "validated captcha, posted review, and sent notification"
         );

         return formatResponse(200, {
            message:
               "Captcha validation, post to db, and notification completed",
         });
      } else {
         return formatResponse(500, {
            message: "Captcha validation failed, review not posted",
         });
      }
   } catch (error) {
      return formatResponse(500, { message: error.message });
   }
};
