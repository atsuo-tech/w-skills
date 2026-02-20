import { IdeaImage } from "@/component/top-page/ideaImage";
import styles from "./page.module.css";
import { EyeCatch } from "@/component/top-page/eyeCatch";

export default function Home() {
  return (
    <main className={styles.container}>
      <EyeCatch />

      <div className={styles.content}>
        <h2>Our Idea</h2>
        <p>
          W-PCP では、各個人がゲーム制作、Webデザイン、機械学習など、様々な分野のスキルを持っています。
          <br />
          しかし、これらのスキルは教える際になかなか個人の時間が取れなかったり、共有する機会が少なかったりして、部内で十分に活用されていないことがあります。
          <br />
          そこで、W-Skills では、部内のメンバーが持つスキルを共有し、いつでも互いに学び合うことができるプラットフォームを提供します。
        </p>

        <IdeaImage />

        <h2>機能</h2>
        <ul>
          <li>スキルの作成：メンバーは自分のスキルを登録できます。スキルには、名前、説明、関連するタグなどを付けることができます。</li>
          <li>スキルの閲覧：メンバーは他のメンバーが登録したスキルを閲覧できます。これにより、部内の知見を共有し、新しいスキルを学ぶことができます。</li>
          <li>スキルの検索：メンバーは特定のスキルやタグで検索することができます。これにより、必要なスキルを素早く見つけることができます。</li>
        </ul>
      </div>
    </main>
  );
}
