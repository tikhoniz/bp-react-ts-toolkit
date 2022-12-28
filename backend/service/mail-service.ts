import sendgridMail from "@sendgrid/mail";

class MailService {
	async sendActivationMail(to: string, link: string) {
		//@ send reset password mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string);

		await sendgridMail
			.send({
				to,
				from: process.env.SMTP_USER as string,
				subject: "Подтверждение электронной почты на BRIGHTSPILATES.COM",
				html: `<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
								<tbody>
									<tr>
										<td>
											<table border="0" cellpadding="0" cellspacing="0" style="width:100%; border-bottom: 1px solid #e4e4e4; padding-bottom: 10px">
												<tbody>
													<tr>
														<td align="left">
															<img src="https://media.publit.io/file/statics/logo-brights-pilates.png" alt="" width="32px" height="32px" />
														</td>
														<td align="right">
															<a href="https://brightspilates.com/" style="text-decoration:none; text-transform:uppercase;font-weight: 600; color: #797979;font-size: 16px; display:block">Online studio Bright's pilates</a>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border-bottom: 1px solid #e4e4e4;">
												<tbody>
													<tr>
														<td>
															<p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 600;line-height: 130%;color:#171717;margin-bottom: 5px;">Подтверждение e-mail</p>
														</td>
													</tr>
													<tr>
														<td>
															<p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Вы получили это письмо, т.к. Ваш почтовый адрес был указан при регистрации на сайте <a href="https://brightspilates.com/" style="text-decoration:none; color: #51c5cf;font-size: 15px;">brightspilates.com</a>. Чтобы подтвердить эту почту нажмите на кнопку ниже: </p>
														</td>
													</tr>
													<tr>
														<td bgcolor="#51c5cf" align="center" style="border-radius: 4px;">
															<a href="${link}" style="text-transform:uppercase;background:#51c5cf;font-size:13px;font-weight:700;font-family:Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none!important;padding:14px 25px;border-radius:4px;display:block"> Подтвердить e-mail</a>
														</td>
													</tr>
													<tr>
														<td>
															<p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> Если Вы получили это письмо по ошибке, просто проигнорируйте его. </p>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
												<tbody>
													<tr>
														<td>
															<p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> С уважением, команда <a href='${process.env.CLIENT_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">Bright's Pilates</a>
															</p>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>`,
			})
			.then(() => {
				//console.log("Activation Email was sent");
			})
			.catch((error) => {
				//res.status(500).json({ message: error.message });
				//console.log(error);
				return;
			});
	}

	async sendRegistrationMail(user: any) {
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string);

		await sendgridMail
			.send({
				to: process.env.USERS_RECIPIENT_EMAIL as string,
				from: process.env.SMTP_USER as string,
				subject: "Регистрация нового аккаунта",
				html: `<div>
									<h1>Имя: ${user.name}</h1>
									<p>Email: ${user.email}</p>
								</div>`,
			})
			.then(() => {
				//console.log("Registration Email was sent");
			})
			.catch((error) => {
				//res.status(500).json({ message: error.message });
				//console.log(error);
				return;
			});
	}

	async resetPasswordMail(email: string, link: string) {
		//@ send reset password mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string);

		await sendgridMail
			.send({
				to: email,
				from: process.env.SMTP_USER as string,
				subject: "Изменение пароля от личного кабинета Bright's Pilates",
				html: `<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
				<tbody>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; border-bottom: 1px solid #e4e4e4; padding-bottom: 10px">
								<tbody>
									<tr>
										<td align="left">
											<img src="https://media.publit.io/file/statics/logo-brights-pilates.png" alt="" width="32px" height="32px" />
										</td>
										<td align="right">
											<a href="${process.env.CLIENT_URL}/profile" style="text-decoration:none; text-transform:uppercase; color: #797979;font-size: 12px; display:block">Вход в личный кабинет</a>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border-bottom: 1px solid #e4e4e4;">
								<tbody>
									<tr>
										<td align="center" style="padding-top:30px;">
											<img src="https://media.publit.io/file/statics/reset_password_icon.png" alt="" width="64px" height="64px" />
										</td>
									</tr>
									<tr>
										<td align="center">
											<p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;line-height: 130%;color:#171717;margin-bottom: 5px;">Изменение пароля от личного кабинета</p>
										</td>
									</tr>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Мы получили запрос на изменение пароля от личного кабинета ${email} на сайте <a href='${process.env.NEXTAUTH_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">brightspilates.com</a>. Для создания нового пароля нажмите на кнопку ниже </p>
										</td>
									</tr>
									<tr>
										<td bgcolor="#51c5cf" align="center" style="border-radius: 4px;">
											<a href="${link}" style="text-transform:uppercase;background:#51c5cf;font-size:13px;font-weight:700;font-family:Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none!important;padding:14px 25px;border-radius:4px;display:block"> Создать новый пароль</a>
										</td>
									</tr>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> Если Вы не запрашивали изменение пароля, проигнорируйте это письмо. </p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
								<tbody>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> С уважением, команда <a href='${process.env.CLIENT_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">Bright's Pilates</a>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>`,
			})
			.then(() => {
				//console.log("Reset password Email was sent");
			})
			.catch((error) => {
				//res.status(500).json({ message: error.message });
				//console.log(error);
				return;
			});
	}

	async sendPaidOrderMail(to: string, mail: any) {
		//@ send paid order mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string);

		await sendgridMail
			.send({
				to: to,
				from: process.env.SMTP_USER as string,
				subject: "Успешная оплата",
				html: ` <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
				<tbody>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; border-bottom: 1px solid #e4e4e4; padding-bottom: 10px">
								<tbody>
									<tr>
										<td align="left">
											<img src="https://media.publit.io/file/statics/logo-brights-pilates.png" alt="" width="32px" height="32px" />
										</td>
										<td align="right">
											<a href="${process.env.CLIENT_URL}/profile" style="text-decoration:none; text-transform:uppercase; color: #797979;font-size: 12px; display:block">Вход в личный кабинет</a>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border-bottom: 1px solid #e4e4e4;">
								<tbody>
									<tr>
										<td align="center">
											<p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;color:#171717;margin-bottom: 5px;">Оплата прошла успешно!</p>
										</td>
									</tr>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400;"> Здравствуйте! <br> Благодарим Вас за оплату счета. <a href='${mail.receipt}' target="_blank" style="color: #625afa;font-size: 16px;">
													<strong>Чек об оплате</strong>
												</a>
											</p>
										</td>
									</tr>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400;">
												<strong>Детали счета:</strong>
											</p>
											<p style="color: #666666;font-size: 16px; font-weight: 400;">Сумма:</p>
											<p style="color: #666666;font-size: 16px; font-weight: 400;">Всего оплачено:</p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
								<tbody>
									<tr>
										<td>
											<p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> С уважением, команда <a href='${process.env.CLIENT_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">Bright's Pilates</a>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>`,
			})
			.then(() => {
				//console.log("Order paid email was sent");
			})
			.catch((error) => {
				//res.status(500).json({ message: error.message });
				//console.log(error);
				return;
			});
	}
}

export default new MailService();
