export const HTML_TEMPLATE = (data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New User Email</title>
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
          .body-heading {
            color: #45446A;
            text-align: center;
          }
          .email-body {
            padding: 20px;
            background-color: #E1E7CD;
            color: #45446A;
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
            font-size: 16px;
          }
          p {
            font-size: 16px;
            text-align: center;
            font-weight: 100;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <img align="center" border="0" src="cid:logo" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/>
              <h1>Welcome to Coding with Callie, ${data.name}!</h1>
            </div>
            <div class="email-body">
              <h2 class="body-heading">Meet-ups</h3>
              <p>We have weekly meet-ups via Zoom on Thursdays from 8PM EST to 9PM EST.</p>
              <p>Click <a href="https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1">here</a> to join the Zoom room!</p>
            </div>
            <div class="email-body">
              <h2 class="body-heading">Guest Speakers</h3>
              <p>During our meet-ups, we have guest speakers from the industry join and share their insights, tips, and tricks. With their permission, I record the sessions and then post the recordings to our Guest Speaker page.</p>
              <p>Click <a href="https://coding-with-callie.com/guest-speakers">here</a> to view the availale recordings!</p>
            </div>
            <div class="email-body">
              <h2 class="body-heading">Coding with Callie Workshops</h3>
              <p>Checkout the available Coding with Callie workshops <a href="https://coding-with-callie.com/workshops">here</a>.</p>
              <p>Please let me know if you have any questions or concerns 🙂</p>
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
                  <li><a href="https://coding-with-callie.com/workshops">Coding with Callie Workshops</a></li>
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
