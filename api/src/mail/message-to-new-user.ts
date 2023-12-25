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
              <h1>Hi, ${data.name}!</h1>
            </div>
            <div class="email-body">
              <h3>Thank you for joining Coding with Callie! You now have access to the Coding with Callie resources.</h3>
              <h3>Please let me know if you have any questions or concerns 🙂</h3>
              <p>You can manage your account <a href="https://coding-with-callie.com/profile">here</a></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
