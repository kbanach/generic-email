## \[work in progress\]

# OOP Generic Email

Simple email class.

## Examples

```javascript
const email = new EmailEnvelope()
  .addRecipient('a@a.com', 'Some Recipient von Abc')
  .setSubject('Lorem ipsum dolor sit amet')
  .setSender('z@z.com', 'Some Sender O\'Name');


SomeEmailSendingSystem.send({
  recipients: email.getRecipients(),
  subject: email.getSubject(),
  sender: email.getSender(),
});
```