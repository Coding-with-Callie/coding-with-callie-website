export const HTML_TEMPLATE = (token, id) => {
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
            background-color: #E1E7CD;
            color: #45446A;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
            background-color: #E1E7CD;
            color: #45446A;
          }
          .group {
            display: flex;
          }
          .bold {
            width: 150px;
            font-weight: bold;
          }
          .email-footer {
            background-color: #E1E7CD;
            color: #45446A;
            padding: 20px;
          }
          .link-lists {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
          }
          li {
            font-size: 20px
          }
          p {
            font-size: 20px
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <img align="center" border="0" src="cid:logo" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/>
              <h1>Please reset your password!</h1>
            </div>
            <div class="email-body">
              <p>We have sent you this email in response to your request to reset your password on Coding with Callie. Please ignore this email if you did not request a password change.</p>
              <p>To reset your password, please click <a href="${
                process.env.ENVIRONMENT === 'local'
                  ? 'http://localhost:3000'
                  : 'https://coding-with-callie.com'
              }/profile/${token}/${id}" target="_blank">here</a></p>
              <p>This link can only be used once and will be valid for 10 minutes.</p>
            </div>
            <div class="email-footer">
              <h1>Helpful Links</h1>
              <div class="link-lists">
                <ul>
                  <li><a href="https://join.slack.com/t/codingwithcallie/shared_invite/zt-29pqf48yu-6NYcmLqMlHYDFVt7BkzQBQ">Coding with Callie's Slack Workspace</a></li>
                  <li><a href="https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1">Zoom Link (Thursdays 8PM - 9PM EST)</a></li>
                  <li><a href="https://www.linkedin.com/company/coding-with-callie">Coding with Callie's LinkedIn Page</a></li>
                </ul>
                <ul>
                  <li><a href="https://coding-with-callie.com/profile">Manage Your Account Details</a></li>
                  <li><a href="https://coding-with-callie.com/resources">Todo List Workshop Resources</a></li>
                  <li><a href="https://coding-with-callie.com/contact-callie">Contact Callie</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
