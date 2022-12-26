import { Box } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface PageProps {
	title: string;
	children?: ReactNode;
	links?: any;
}

const Page = forwardRef<HTMLInputElement, PageProps>(
	({ title = "", children, ...other }, ref): JSX.Element => {
		return (
			<Box ref={ref} {...other}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				{children}
			</Box>
		);
	}
);

export default Page;
