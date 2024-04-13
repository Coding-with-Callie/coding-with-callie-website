export const HTML_TEMPLATE = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>New Feedback Email</title>
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
      .bold {
        font-weight: bold;
      }
      li {
        font-size: 16px
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
              <h1>You have new feedback on your ${data.workshop}: Session ${data.session} submission!</h1>
            </div>
            <div class="email-body">
              <p>${data.feedbackProvider} reviewed your deliverable!</p>
              <p class="bold">Positive Feedback:</p>
              <p>${data.positiveFeedback}</p>
              <p class="bold">Immediate Changes Requested:</p>
              <p>${data.immediateChangesRequested}</p>
              <p class="bold">Future Enhancements Requested:</p>
              <p>${data.longTermChangesRequested}</p>
              <p>Click <a href="https://coding-with-callie.com/submissions/${data.workshopId}/${data.session}">here</a> to view all ${data.workshop}: Session ${data.session} submissions.</p>
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
                  <li><a href="https://coding-with-callie.com/resources/${data.workshopId}">${data.workshop} Workshop Resources</a></li>
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
