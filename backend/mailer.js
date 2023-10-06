const nodeMailer = require("nodemailer");

const adminEmail = "abc@gmail.com";
const adminPassword = "lndensrtuxc123qwedas";

//Sử dụng host của google
const mailHost = "smtp.gmail.com";

//Port 587 dùng cho việc gửi mail
const mailPort = 587;

const sendMail = async (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const info = await transporter.sendMail({
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  });

  return info;
};

module.exports = {
  sendMail,
};
