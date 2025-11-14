const transporter = require("../utils/nodemailer.config");

exports.sendBulkMail = async (req, res) => {
    try {
        // 10 sample emails
      const emailList = [
    "shivamugale53@gmail.com",
    "ugaleshivam36@gmail.com",
    "ugaleshivam7@gmail.com",
    "ugalesheth@gmail.com",
    "axarpatel118436@gmail.com",
    "rohit4393sharma@gmail.com",
    "shethmane073@gmail.com",
    "tejassunilsurse2004@gamil.com",
    "tejas.s.surse2004@gmail.com",
    "tejas.tech2004@gmail.com",
    "aniketmehatar8888@gmail.com"
];

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            subject: "Testing My New Feature 😎",
            html: `
                <h3>Hey bro 👋</h3>
                <p>This email is sent from a feature I built…</p>
                <p><b>Because your brain clearly needed a reminder that I’m smarter 😎</b></p>
            `
        };

        for (const email of emailList) {
            await transporter.sendMail({
                ...mailOptions,
                to: email,
            });
            console.log("Email sent → ", email);
        }

        return res.json({
            success: true,
            message: "Bulk emails sent successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error sending bulk emails",
            error: error.message,
        });
    }
};
