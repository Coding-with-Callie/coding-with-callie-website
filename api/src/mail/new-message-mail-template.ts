export const HTML_TEMPLATE = (message) => {
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
              <h1>${message.name} sent Coding with Callie a message!</h1>
            </div>
            <div class="email-body">
              <h3>${message.name}</h3>
              <h3>${message.email}</h3>
              <h3>${message.message}</h3>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
