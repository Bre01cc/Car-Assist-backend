
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2f70bbd96f422e",
    pass: "fb79643ca60864"
  }
});