"use client";

import Link from "next/link";
import styles from "./layout.module.css";
import { useState } from "react";

export function Sidebar(
	{
		username,
		children,
	}: {
		username: string;
		children: React.ReactNode;
	},
) {

	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
			<nav className={styles.navbar}>
				<h1 className={styles.logo}>W-Skills</h1>
				<span className={styles.username}>{username}</span>
			</nav>
			<div className={styles.sidebar}>
				<h2>W-Skills</h2>
				<nav>
					<ul>
						<li><Link href="/skills">スキル一覧</Link></li>
						<li><Link href="/skills/new">スキルを作成</Link></li>
					</ul>
					<ul className={styles.accountMenu}>
						<li><Link href="https://auth.w-pcp.dev/">{username}</Link></li>
						<li className={styles.logout}><Link href="https://auth.w-pcp.dev/logout">ログアウト</Link></li>
					</ul>
				</nav>
			</div>
			<div className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? '<<' : '>>'}
			</div>
			<div></div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);

}
