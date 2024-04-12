export const HTML_TEMPLATE = (workshopName, workshopId, userName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Purchase Confirmation</title>
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
              <h1>Thank you for your purchase, ${userName}!</h1>
            </div>
            <div class="email-body">
              <h2 class="body-heading">You now have access to ${workshopName}</h3>
              <p>We have weekly meet-ups via Zoom on Thursdays from 7PM EST to 9PM EST.</p>
              <p>Click <a href="https://www.coding-with-callie.com/resources/${workshopId}">here</a> to view ${workshopName} resources!</p>
            </div>
            <div class="email-footer">
              <h1>Helpful Links</h1>
              <div class="link-lists">
                <ul>
                  <li><a href="https://join.slack.com/t/codingwithcallie/shared_invite/zt-29pqf48yu-6NYcmLqMlHYDFVt7BkzQBQ">Coding with Callie's Slack Workspace</a></li>
                  <li><a href="https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1">Zoom Link (Thursdays 7PM - 9PM EST)</a></li>
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
