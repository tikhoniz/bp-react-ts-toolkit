import { merge } from "lodash";

import Card from "./Card";
import Tabs from "./Tabs";
import Link from "./Link";
import Alert from "./Alert";
import Table from "./Table";
import Input from "./Input";
import Drawer from "./Drawer";
import Button from "./Button";
import LoadingButton from "./LoadingButton";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: any) {
	return merge(
		Tabs(theme),
		Card(theme),
		Link(theme),
		Input(theme),
		Table(theme),
		Alert(theme),
		Button(theme),
		Drawer(theme),
		LoadingButton(theme)
	);
}
