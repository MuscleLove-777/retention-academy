const LEVEL2_DATA = {
    id: 2,
    title: "現状把握の技術",
    icon: "🔍",
    description: "エンゲージメント調査と1on1面談を学ぶ",
    modules: [
        {
            id: 201,
            title: "3-1. エンゲージメントの理解",
            duration: "20分",
            content: "<h2>エンゲージメントとは</h2><p>従業員エンゲージメント（Employee Engagement）とは、従業員が組織に対して持つ自発的な貢献意欲と心理的な結びつきの度合いです。</p>" +
                "<h3>エンゲージメントの3要素</h3>" +
                "<table><thead><tr><th>要素</th><th>英語</th><th>説明</th></tr></thead><tbody>" +
                "<tr><td>活力</td><td>Vigor</td><td>仕事に対するエネルギーが高い</td></tr>" +
                "<tr><td>熱意</td><td>Dedication</td><td>仕事の意義を感じ、誇りと情熱を持つ</td></tr>" +
                "<tr><td>没頭</td><td>Absorption</td><td>仕事に集中し没頭している状態</td></tr>" +
                "</tbody></table>" +
                "<p>高エンゲージメントは離職率低下、生産性向上、顧客満足度向上につながります。</p>" +
                "<h2>主な調査手法</h2>" +
                "<table><thead><tr><th>手法</th><th>概要</th><th>頻度</th><th>質問数</th></tr></thead><tbody>" +
                "<tr><td>eNPS</td><td>「この会社を友人に勧めるか」を0〜10で評価</td><td>四半期</td><td>1〜3問</td></tr>" +
                "<tr><td>パルスサーベイ</td><td>短い質問を高頻度で実施</td><td>週次〜月次</td><td>5〜15問</td></tr>" +
                "<tr><td>Gallup Q12</td><td>12の質問でエンゲージメントを測定</td><td>半年〜年次</td><td>12問</td></tr>" +
                "<tr><td>センサス調査</td><td>包括的な従業員満足度調査</td><td>年次</td><td>50〜100問</td></tr>" +
                "</tbody></table>" +
                "<h2>Gallup Q12の12の質問</h2>" +
                "<table><thead><tr><th>#</th><th>質問</th><th>測定領域</th></tr></thead><tbody>" +
                "<tr><td>Q1</td><td>仕事で何を期待されているか知っている</td><td>基本的ニーズ</td></tr>" +
                "<tr><td>Q2</td><td>仕事をうまくやるための材料や道具を持っている</td><td>基本的ニーズ</td></tr>" +
                "<tr><td>Q3</td><td>毎日、最も得意なことをする機会がある</td><td>個人の貢献</td></tr>" +
                "<tr><td>Q4</td><td>過去7日間で良い仕事をしたと認められた</td><td>個人の貢献</td></tr>" +
                "<tr><td>Q5</td><td>上司や職場の誰かが自分を気にかけてくれている</td><td>個人の貢献</td></tr>" +
                "<tr><td>Q6</td><td>職場で自分の成長を促してくれる人がいる</td><td>個人の貢献</td></tr>" +
                "</tbody></table>" +
                "<div class='info-box tip'><div class='info-box-title'>ポイント</div>eNPS、パルスサーベイ、Gallup Q12は目的と頻度に応じて使い分けましょう。</div>",
            quiz: [
                { id: "q2_1_1", type: "choice", question: "エンゲージメントの3要素に含まれないものはどれですか？", options: ["活力（Vigor）", "熱意（Dedication）", "報酬（Compensation）", "没頭（Absorption）"], answer: 2, explanation: "エンゲージメントの3要素は活力（Vigor）、熱意（Dedication）、没頭（Absorption）です。報酬は含まれません。" },
                { id: "q2_1_2", type: "choice", question: "eNPSの質問は何ですか？", options: ["仕事に満足していますか", "この会社を友人に勧めるか", "上司を信頼していますか", "給与に満足していますか"], answer: 1, explanation: "eNPS（Employee Net Promoter Score）は「この会社を友人に勧めるか」を0〜10で評価する指標です。" },
                { id: "q2_1_3", type: "choice", question: "パルスサーベイの特徴として正しいのはどれですか？", options: ["年1回、100問以上の調査", "短い質問を高頻度（週次〜月次）で実施", "12の固定質問で測定", "退職者のみを対象とする"], answer: 1, explanation: "パルスサーベイは5〜15問の短い質問を週次〜月次の高頻度で実施する調査手法です。リアルタイム性が高い特徴があります。" }
            ]
        },
        {
            id: 202,
            title: "3-2. 調査設計と調査疲れの防止",
            duration: "15分",
            content: "<h2>調査設計のポイント</h2><p>エンゲージメント調査は「設計→実施→分析→施策立案→施策実行→改善」のサイクルで運用します。</p>" +
                "<h3>設計→実施→活用フロー</h3><ol><li><strong>設計:</strong> 目的明確化、質問設計、対象選定</li><li><strong>実施:</strong> 匿名性確保、回答期間設定、リマインド</li><li><strong>分析:</strong> 部門別比較、経年比較、相関分析</li><li><strong>施策立案:</strong> 優先順位付け、責任者設定</li><li><strong>施策実行:</strong> 施策推進、進捗管理</li><li><strong>改善:</strong> 効果測定、次回調査</li></ol>" +
                "<h2>調査疲れ（Survey Fatigue）の防止</h2>" +
                "<table><thead><tr><th>問題</th><th>対策</th></tr></thead><tbody>" +
                "<tr><td>回答率の低下</td><td>質問数を最小限にする（パルスサーベイは10問以内）</td></tr>" +
                "<tr><td>形骸化の認知</td><td>調査結果と実施した施策を必ずフィードバックする</td></tr>" +
                "<tr><td>頻度過多による負担</td><td>パルスは月1〜2回、センサスは年1回を目安</td></tr>" +
                "<tr><td>匿名性への不信</td><td>技術的・制度的な匿名性の保証を明示する</td></tr>" +
                "<tr><td>「何も変わらない」感</td><td>小さくても「調査に基づいて変えた」実績を見せる</td></tr>" +
                "</tbody></table>" +
                "<div class='info-box warning'><div class='info-box-title'>重要</div>調査は「実施して終わり」ではありません。分析→施策→改善のサイクルを回すこと、そして結果のフィードバックと可視的な改善が不可欠です。</div>",
            quiz: [
                { id: "q2_2_1", type: "choice", question: "調査疲れを防ぐために最も重要なのはどれですか？", options: ["質問数を増やす", "調査結果に基づく改善を可視化する", "全員に回答を義務化する", "調査頻度を増やす"], answer: 1, explanation: "「何も変わらない」感を防ぐために、調査結果に基づいて変えた実績を見せることが最も重要です。" },
                { id: "q2_2_2", type: "choice", question: "パルスサーベイの適切な頻度はどの程度ですか？", options: ["毎日", "月1〜2回", "年1回", "3年に1回"], answer: 1, explanation: "パルスサーベイは月1〜2回が適切な頻度の目安です。頻度が多すぎると調査疲れを引き起こします。" },
                { id: "q2_2_3", type: "choice", question: "エンゲージメント調査の分析手法に含まれないものはどれですか？", options: ["部門別比較", "経年比較", "売上予測", "相関分析"], answer: 2, explanation: "エンゲージメント調査の分析手法は部門別比較、経年比較、相関分析などです。売上予測は含まれません。" }
            ]
        },
        {
            id: 203,
            title: "4. 1on1面談の技術",
            duration: "25分",
            content: "<h2>1on1の目的と効果</h2><p>1on1面談は、上司と部下が定期的に行う1対1の対話の場です。3つの目的があります。</p>" +
                "<ol><li><strong>信頼関係の構築</strong> - 心理的安全性の醸成、相互理解の深化</li><li><strong>困りごとの早期発見</strong> - 業務上の課題、人間関係の悩み、離職の予兆キャッチ</li><li><strong>成長支援</strong> - キャリア対話、フィードバック、内省の促進</li></ol>" +
                "<h2>傾聴（Active Listening）の5つの要素</h2>" +
                "<table><thead><tr><th>要素</th><th>説明</th><th>具体的な行動</th></tr></thead><tbody>" +
                "<tr><td>受容</td><td>相手の話を否定せず受け止める</td><td>「なるほど」「そう感じたんですね」</td></tr>" +
                "<tr><td>共感</td><td>相手の感情に寄り添う</td><td>「それは大変でしたね」</td></tr>" +
                "<tr><td>反復</td><td>相手の話を要約して返す</td><td>「つまり○○ということですね」</td></tr>" +
                "<tr><td>沈黙</td><td>相手が考える時間を与える</td><td>焦らず待つ、間を恐れない</td></tr>" +
                "<tr><td>質問</td><td>深掘りする問いかけ</td><td>オープンクエスチョンを使う</td></tr>" +
                "</tbody></table>" +
                "<h2>1on1のアンチパターン</h2>" +
                "<table><thead><tr><th>アンチパターン</th><th>問題点</th><th>改善策</th></tr></thead><tbody>" +
                "<tr><td>進捗報告会になる</td><td>業務連絡の場に堕す</td><td>進捗はSlack等で共有し、1on1は対話に使う</td></tr>" +
                "<tr><td>上司が話しすぎる</td><td>部下の発言機会が奪われる</td><td>上司の発言は全体の30%以下を目安</td></tr>" +
                "<tr><td>説教の場になる</td><td>心理的安全性が破壊される</td><td>まず肯定から入り、改善点は問いかけで引き出す</td></tr>" +
                "<tr><td>ドタキャンが頻発</td><td>「大切にされていない」と感じる</td><td>1on1を最優先の予定として扱う</td></tr>" +
                "<tr><td>形骸化する</td><td>ただの雑談で終わる</td><td>事前にアジェンダを共有する</td></tr>" +
                "</tbody></table>" +
                "<h2>頻度と時間の設計</h2><p><strong>推奨:</strong> 週1回〜隔週（最低でも月1回）、30分（15分は短すぎ、60分は長すぎ）</p>" +
                "<h3>30分の時間配分（目安）</h3><ul><li>0〜5分: アイスブレイク・近況確認</li><li>5〜20分: メインテーマの対話</li><li>20〜25分: アクションの確認</li><li>25〜30分: 次回に向けた共有事項</li></ul>" +
                "<div class='info-box success'><div class='info-box-title'>まとめ</div>1on1は「信頼関係構築」「困りごと発見」「成長支援」の3つが目的です。傾聴とオープンクエスチョンで部下の本音を引き出しましょう。ドタキャンは厳禁です。</div>",
            quiz: [
                { id: "q2_3_1", type: "choice", question: "1on1面談で上司の発言量の目安はどの程度ですか？", options: ["全体の70%以上", "全体の50%", "全体の30%以下", "全体の10%以下"], answer: 2, explanation: "1on1では上司の発言は全体の30%以下を目安にし、部下が中心に話す場にしましょう。" },
                { id: "q2_3_2", type: "choice", question: "1on1が「アンチパターン」に陥る例として、最も心理的安全性を破壊するものはどれですか？", options: ["進捗報告会になる", "説教・ダメ出しの場になる", "形骸化する", "雑談が多い"], answer: 1, explanation: "説教・ダメ出しの場になると心理的安全性が破壊され、部下は本音を話せなくなります。" },
                { id: "q2_3_3", type: "choice", question: "1on1の推奨時間はどの程度ですか？", options: ["10分", "30分", "60分", "90分"], answer: 1, explanation: "1on1の推奨時間は30分です。15分は短すぎ、60分は長すぎます。" }
            ]
        }
    ]
};
