import { useState } from "react";
// material
import {
	Card,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	CardHeader,
	Typography,
	TableContainer,
	TablePagination,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
// components
import ComletedClassRow from "./CompletedClassRow";

import { motion } from "framer-motion";

// ----------------------------------------------------------------------

const UserCompletedClasses = ({ list }: any) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Card
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.55 }}
		>
			<CardHeader title="Завершённые тренировки" sx={{ mb: 3 }} />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ padding: "8px 14px" }}>Дата</TableCell>
							{isTablet && <TableCell>Название</TableCell>}
							<TableCell sx={{ padding: "8px 14px" }}>Тренер</TableCell>
							<TableCell sx={{ padding: "8px 14px" }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item: any) => {
								return <ComletedClassRow key={item.id} cls={item} />;
							})}

						{list.length < 1 && (
							<TableRow>
								<TableCell
									align="center"
									colSpan={100}
									sx={{ padding: "8px 14px" }}
								>
									<Typography
										variant="overline"
										sx={{ mb: 1, display: "block" }}
									>
										Нет записей
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				labelRowsPerPage={isTablet ? "Тренировок на странице" : ""}
				rowsPerPageOptions={[5, 10, 25, 50]}
				component="div"
				count={list.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Card>
	);
};

export default UserCompletedClasses;
