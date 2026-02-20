"use client";

import Markdown from "@/component/markdown";
import { Grid } from "@mui/material";
import { useState } from "react";

export default function Editor(
	{
		defaultValue,
	}: {
		defaultValue: string;
	}
) {

	const [content, setContent] = useState<string>(defaultValue);

	return (
		<Grid container spacing={2}>
			<Grid size={6}>
				<textarea id="content" name="content" style={{ height: "100%" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
			</Grid>
			<Grid size={6}>
				<Markdown md={content} />
			</Grid>
		</Grid>
	);

}