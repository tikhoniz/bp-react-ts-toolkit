import React, { FC } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
//import TotalUsers from "./TotalUsers";

interface SummaryProps {
	events: [object];
	users: [object];
	messages: [object];
	videos: [object];
}

const Summary: FC<SummaryProps> = ({ events, users, messages, videos }) => {
	return (
		<Container maxWidth="lg" sx={{ p: 4 }}>
			{/*<ClassList />*/}
			<div>
				<p>Количество классов</p>
				{events.length}
			</div>
			<Grid container spacing={3} sx={{ my: 4 }}>
				<Grid item xs={12} sm={6} md={4}>
					{/*<TotalUsers />*/}
					<div>
						<p>Количество пользователей</p>
						{users.length}
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{/*<TotalUsers users={users} />*/}
					<div>
						<p>Количество сообщений</p> {messages.length}
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<div>
						<p>Количество видео</p> {videos.length}
					</div>
					{/*<TotalUsers users={users} />*/}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Summary;
