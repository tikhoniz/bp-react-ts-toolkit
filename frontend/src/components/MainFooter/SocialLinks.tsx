// material
import { IconButton } from "@mui/material";
// icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const SOCIALS = [
	{
		name: "WhatsApp",
		icon: <WhatsAppIcon sx={{ fontSize: 40, color: "#45c655" }} />,
		href: `https://wa.me/${process.env.REACT_APP_WHATS_APP_PHONE}`,
	},
	{
		name: "FaceBook",
		icon: <FacebookIcon sx={{ fontSize: 40, color: "#1976f2" }} />,
		href: `https://www.facebook.com/${process.env.REACT_APP_FACEBOOK}`,
	},
	{
		name: "Instagram",
		icon: <InstagramIcon sx={{ fontSize: 40, color: "#f22eb4" }} />,
		href: `https://www.instagram.com/${process.env.REACT_APP_INSTAGRAM}`,
	},
	{
		name: "Linkedin",
		icon: <LinkedInIcon sx={{ fontSize: 40, color: "#0a66c2" }} />,
		href: `https://www.linkedin.com/company/${process.env.REACT_APP_LINKEDIN}`,
	},
];

const SocialLinks = () => {
	return (
		<>
			{SOCIALS.map((social: any) => (
				<IconButton
					key={social.name}
					color="primary"
					sx={{ p: 1 }}
					href={social.href}
					target="_blank"
				>
					{social.icon}
					<span className="visually-hidden">{social.name}</span>
				</IconButton>
			))}
		</>
	);
};

export default SocialLinks;
