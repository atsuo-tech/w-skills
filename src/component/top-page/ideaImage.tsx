import styles from "./ideaImage.module.css";
import Image from "next/image";

export function IdeaImage() {

	return (
		<div className={styles.container}>
			<div className={styles.ideaImage}>
				<Image src="/idea.svg" alt="Idea Image" width={800} height={400} />
			</div>
		</div>
	)

}
