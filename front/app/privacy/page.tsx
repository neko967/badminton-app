import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-var(--header-height))] w-full flex justify-center items-start py-12 px-4 sm:px-6">
      <div className="flex flex-col justify-start items-center h-[calc(100%-var(--back-button-length)-var(--page-padding))] w-[calc(100%-var(--page-padding)*2)] pb-[calc(var(--back-button-length)+var(--page-padding)+80px)] lg:h-[calc(100%-var(--back-button-length)-var(--page-padding-lg))] lg:w-[calc(100%-var(--page-padding-lg)*2)] lg:pb-[calc(var(--back-button-length)+var(--page-padding-lg)+160px)]">
        <div className="w-full flex flex-col justify-center items-center lg:w-1/2">
          <h1 className="text-2xl font-bold mb-12 lg:text-3xl lg:mb-16">プライバシーポリシー</h1>
          <div className="text-sm mb-6 lg:text-base lg:mb-8">
            試合決めるくん（以下、「当方」といいます。）は、 本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、 ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </div>

          <div className="w-full mb-6">
            <h2 className="text-lg font-bold lg:text-xl">お客様から取得する情報</h2>
            <div className="text-sm ml-4 lg:text-base lg:ml-5">
              当方は、お客様から以下の情報を取得します。
              <ul className="list-disc list-inside space-y-2">
                <li>氏名(ニックネームやペンネームも含む)</li>
                <li>メールアドレス</li>
                <li>写真や動画</li>
                <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
                <li>Cookie(クッキー)を用いて生成された識別情報</li>
                <li>OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報</li>
                <li>当方ウェブサイトの滞在時間、入力履歴等の当方ウェブサイトにおけるお客様の利用履歴、行動履歴</li>
              </ul>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-lg font-bold lg:text-xl">お客様の情報を利用する目的</h2>
            <div className="text-sm ml-4 lg:text-base lg:ml-5">
              当方は、お客様から取得した情報を、以下の目的のために利用します。
              <ul className="list-disc list-inside space-y-2">
                <li>本サービスに関する登録の受付、お客様の本人確認、認証のため</li>
                <li>お客様の本サービスの利用履歴を管理するため</li>
                <li>本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため</li>
                <li>お客様からのお問い合わせに対応するため</li>
                <li>当方の規約や法令に違反する行為に対応するため</li>
                <li>当方規約の変更等を通知するため</li>
                <li>以上の他、本サービスの提供、維持、保護及び改善のため</li>
              </ul>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-lg font-bold lg:text-xl">第三者提供</h2>
            <div className="text-sm ml-4 lg:text-base lg:ml-5">
              当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
              <br />
              但し、次の場合は除きます。
              <ul className="list-disc list-inside space-y-2">
                <li>個人データの取扱いを外部に委託する場合</li>
                <li>当方や本サービスが買収された場合</li>
                <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
                <li>その他、法律によって合法的に第三者提供が許されている場合</li>
              </ul>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-lg font-bold lg:text-xl">アクセス解析ツール</h2>
            <div className="text-sm ml-4 lg:text-base lg:ml-5">
              当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。
              Googleアナリティクスについて、詳しくは
              <Link
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                className="underline"
              >
                こちら
              </Link>
              からご確認ください。
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-lg font-bold lg:text-xl">プライバシーポリシーの変更</h2>
            <div className="text-sm ml-4 lg:text-base lg:ml-5">
              当方は、必要に応じて、本ポリシーの内容を変更します。
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく、変更することができるものとします。
              当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本サービス中のウェブページに掲載したときから効力を生じるものとします。
            </div>
          </div>

          <div className="mt-12 text-sm lg:mt-16 lg:text-base">2024年06月27日 制定</div>
        </div>
      </div>
    </main>
  );
}
