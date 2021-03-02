import React from "react";
import styles from "./styles.module.scss";

const MultipleSections = ({ content = "" }) => (
	<main className="main">
		<section className="section hero-intro"></section>
		<section className="section one-column">
			<div className="container">
				<h2>Section 2</h2>
			</div>
		</section>
	</main>
);

export default MultipleSections;
