import React, { FC, useState } from "react";
// models
import { IMessage } from "../../../models/IMessage";
// material
import {
	Card,
	Stack,
	Accordion,
	CardHeader,
	Pagination,
	Typography,
	CardContent,
	AccordionDetails,
	AccordionSummary,
} from "@mui/material";
// components
import Label from "../../shared/Label";
import EmptyContent from "../../shared/EmptyContent";
// animation
import { motion } from "framer-motion";
// icons
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ROWS_PER_PAGE = 5;

interface QuestionListProps {
	messages: IMessage[];
}

const QuestionList: FC<QuestionListProps> = ({ messages }) => {
	const [expanded, setExpanded] = useState<string | false>(false);
	const [page, setPage] = useState<number>(1);

	const isEmptyMessages = messages.length === 0;

	const qtyMessages = messages.length;
	const count = Math.ceil(qtyMessages / ROWS_PER_PAGE);
	const begin = page - 1;

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeMsg =
		(msg: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? msg : false);
		};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<Card>
				<CardHeader title="Сообщения:" />
				<CardContent>
					{isEmptyMessages ? (
						<EmptyContent
							title="Нет сообщений"
							description="Вы можете написать сообщение заполнив форму справа"
							imgComponent="/svg/illustration-writing.svg"
							sx={{ height: "300px" }}
						/>
					) : (
						messages
							.slice()
							.sort(
								(a: any, b: any) =>
									new Date(b.createdAt).valueOf() -
									new Date(a.createdAt).valueOf()
							)
							.slice(
								begin * ROWS_PER_PAGE,
								begin * ROWS_PER_PAGE + ROWS_PER_PAGE
							)
							.map((msg: any) => (
								<motion.div
									key={msg.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, marginBottom: 10 }}
									transition={{ duration: 0.8 }}
								>
									<Accordion
										expanded={expanded === msg.id}
										onChange={handleChangeMsg(msg.id)}
										disabled={!msg.response}
										sx={{
											mb: 1,
										}}
									>
										<AccordionSummary
											id={msg.id}
											expandIcon={msg.response ? <ExpandMoreIcon /> : null}
										>
											{msg.response ? (
												<MarkEmailReadIcon
													sx={{ color: "success.dark", fontSize: 28, mr: 2 }}
												/>
											) : (
												<AttachEmailIcon
													sx={{ color: "info.dark", fontSize: 28, mr: 2 }}
												/>
											)}
											<Stack>
												{msg.response ? (
													<Stack direction="row">
														<Typography
															variant="subtitle1"
															sx={{ color: "success.dark", mr: 4 }}
														>
															Вам ответили
														</Typography>

														<Label
															color="success"
															variant="ghost"
															sx={{
																cursor: "pointer",
																letterSpacing: 1,
																opacity: 0.75,
																textTransform: "uppercase",
																"&:hover": { opacity: 1 },
															}}
														>
															Читать
														</Label>
													</Stack>
												) : (
													<Typography
														variant="subtitle1"
														sx={{ color: "info.dark" }}
													>
														Мы ответим в ближайшее время
													</Typography>
												)}
												<Stack direction="row" spacing={1}>
													<Typography
														variant="subtitle1"
														sx={{ color: "text.tertiary" }}
													>
														Тема:
													</Typography>
													<Typography variant="subtitle1">
														{msg.subject}
													</Typography>
												</Stack>
												<Stack direction="row" spacing={1}>
													<Typography
														variant="subtitle1"
														sx={{ color: "text.tertiary" }}
													>
														Сообщение:
													</Typography>
													<Typography variant="body1">{msg.message}</Typography>
												</Stack>
											</Stack>
										</AccordionSummary>
										{msg.response && (
											<AccordionDetails>
												<Stack direction="row">
													<Typography
														variant="subtitle1"
														sx={{ color: "text.tertiary" }}
													>
														Ответ:
													</Typography>
													<Typography
														variant="subtitle1"
														sx={{
															color: "text.tertiary",

															letterSpacing: "1px",
															fontStyle: "italic",

															fontWeight: "fontWeightRegular",
															ml: 1,
														}}
													>
														{msg.response}
													</Typography>
												</Stack>
											</AccordionDetails>
										)}
									</Accordion>
								</motion.div>
							))
					)}

					{qtyMessages > ROWS_PER_PAGE && (
						<Pagination
							page={page}
							count={count}
							shape="rounded"
							onChange={handleChangePage}
						/>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default QuestionList;
