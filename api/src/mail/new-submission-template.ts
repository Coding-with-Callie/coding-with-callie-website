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
          .button {
            border: 1px solid #45446A;
            border-radius: 4px;
            padding: 15px;
            background-color: #45446A;
            color: #E1E7CD !important;
            text-decoration: none;
            font-size: 16px;
            text-align: center;
            display: block;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #E1E7CD;
            color: #45446A !important;
          }
          li {
            font-size: 20px
          }
          p {
            font-size: 20px
          }
          h2 {
            color: #45446A;
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <img align="center" border="0" src="cid:logo" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/>
              <h1>Great job! You submitted your session ${data.session} deliverable ✅</h1>
            </div>
            <div class="email-body">
              <p>Thank you for submitting your <a href="${data.url}">deliverable</a>, ${data.user.name}!</p>
              <div class="email-body">
                <h2>Next steps:</h2>
                <ol>
                  <li>
                    <p>Make sure to post your progress to <a href="https://www.linkedin.com">LinkedIn</a>!</p>
                    <p>Building in public is an essential piece of the breaking into tech puzzle. Tag me (<a href="https://www.linkedin.com/in/cstoscup/">Callie Stoscup</a>) in the post so I can take a look too! I'll be sure to comment 🥳</p>
                  </li>
                  <li>
                    <p>Review other participants' <a href="https://coding-with-callie.com/submissions/${data.session}">submissions</a>!</p>
                    <p>You learn so much when reviewing other peoples' code! Helping others write better code helps you write better code too 🙋🏻‍♀️</p>
                  </li>
                  <li>
                    <p>Watch Callie's solution <a href="https://coding-with-callie.com/submissions/callie/${data.session}">videos</a>!</p>
                    <p>If you're unsure about any of your code, feel free to watch how I tackled it 💃🏼</p>
                  </li>
                </ol>
              </div>
              <div class="email-body">
                <h2>Enjoying Coding with Callie?!</h2>
                <p>Consider leaving Coding with Callie a review! It helps the community grow and motivates me to keep recording all these videos
                <a href="https://coding-with-callie.com/reviews" class="button">Leave Coding with Callie a Review!</a>
                </div>
            </div>
            <div class="email-footer">
              <h1>Helpful Links</h1>
              <div class="link-lists">
                <ul>
                  <li><a href="https://join.slack.com/t/codingwithcallie/shared_invite/zt-29pqf48yu-6NYcmLqMlHYDFVt7BkzQBQ">Coding with Callie's Slack Workspace</a></li>
                  <li><a href="https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1">Zoom Link (Thursdays 7PM - 9PM EST)</a></li>
                  <li><a href="https://www.linkedin.com/groups/14345705/">Coding with Callie's LinkedIn Group</a></li>
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
