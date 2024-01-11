export const HTML_TEMPLATE = (data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Message Email</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>Great job! You submitted your session ${data.session} deliverable ✅</h1>
            </div>
            <div class="email-body">
              <h3>Thank you for submitting your <a href="${data.url}">deliverable</a>, ${data.user.name}!</h3>
              <h3>Please make sure to review two other participant submissions in order to see Callie's video when it is available on ${data.videoDate}.</h3>
              <h3>Click <a href="https://coding-with-callie.com/submissions/${data.session}">here</a> to view all session ${data.session} submissions.</h3>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
