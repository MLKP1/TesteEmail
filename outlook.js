import { config } from "dotenv";
import { createTransport } from "nodemailer";

config()

const transporter = createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,
	secure: false, // usar SSL
	auth: {
		user: "lucaslinyker@outlook.com",
		pass: "Dn#42697",
	},
});

const mailOptions = {
	from: "linykerlucas@icloud.com",
	to: "linykerlucas@icloud.com",
	subject: "Enviando Email usando Node.js",
	text: "Isso foi fácil!",
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.log("Erro:", error);
	} else {
		console.log("Email enviado:", info.response);
	}
});
