import Link from "next/link";
import styles from "./eyeCatch.module.css";

export async function EyeCatch() {

	return (
		<div className={styles.eyeCatch}>
			<h1>W-Skills</h1>
			<p>部内で最高の知見を共有しよう</p>

			<div className={styles.buttons}>
				<Link href="/skills" className={styles.button}>
					スキル一覧
				</Link>
				<Link href="/skills/new" className={styles.button}>
					スキルを作成
				</Link>
			</div>
		</div>
	)

}
