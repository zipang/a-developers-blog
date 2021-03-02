import React from "react";
import ReactMarkdown from "react-markdown";

const SimpleLayout = ({ content = "" }) => (
	<section className="main">
		<div className="container">
			<ReactMarkdown source={content}></ReactMarkdown>
		</div>
	</section>
);

export default SimpleLayout;
