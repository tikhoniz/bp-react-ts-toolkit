import { FC } from "react";
import { IEvent } from "../../../models/IEvent";
import Calendar from "./Calendar";

interface GroupClassesProps {
	classes: IEvent[];
}

const GroupClasses: FC<GroupClassesProps> = ({ classes }) => {
	return <>{classes && <Calendar events={classes} />}</>;
};

export default GroupClasses;
