# Generic Email

[![Build Status](https://travis-ci.com/kbanach/generic-email.svg?branch=master)](https://travis-ci.com/kbanach/generic-email)

Email envelope with formatter for MailJet (I hope I'll have an opportunity to introduce more).

Entire package contains three parts:

* `EmailEnvelope` which is a 'glue' class of them all
* `EmailAttachment` which is used as generic attachment class
* `EmailAddress` which is a simple wrapper to email address and name

For more examples have a look into [unit tests directory](https://github.com/kbanach/generic-email/tree/master/test)

<!--

* [EmailEnvelope](#EmailEnvelope)
* [EmailAttachment](#EmailAttachment)
* [EmailAddress](#EmailAddress)

## EmailEnvelope

## EmailAttachment

## EmailAttachment
-->

# Examples

Simplest example

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

## MailJet formatter

There is availabe [MailJet](https://www.mailjet.com/) formatter, which has to be given as a parameter to `email` object:

```javascript
email.toFormattedObject(
  EmailEnvelope.FORMATTERS.MAIL_JET
);
```

All formatters are available as an enum in `EmailEnvelope.FORMATTERS`.

To check all features, copy-paste below example:

```javascript
const email = new EmailEnvelope()
  .setSender('sender@sender.com', 'Long Sender Name')
  .setSubject('subject subject')
  .setHtmlContent('<h1>HTML content</h1>')
  .setTxtContent('Plain text content')
  .addRecipient('recipient1@recipient1.com', 'Recipient1 Long Name')
  .addRecipient('recipient2@recipient2.com', 'Recipient2 Long Name')
  .addAttachment(Buffer.from('abc', 'utf-8'), 'filename.txt', 'text/plain')
  .addAttachment(Buffer.from('xyz', 'utf-8'), 'inline.txt', 'text/plain', 'cid1');


const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request( email.toFormattedObject(EmailEnvelope.FORMATTERS.MAIL_JET) )
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    });
```

## Reason of existence of this project

This entire project was made just to practice TDD in JavaScript. Additional goal was to write as readable code as possible (I know it's not perfect, but it was only a side-quest).
