define(function(){
	return {
		'Top' : { // TOPページ
			path : 'pages/top',
			url : ''
		},
		'NoticeList' : { // 運営告知一覧
			path : 'pages/notice/list',
			url : 'notice/'
		},
		'NoticeDetail' : { // 運営告知詳細
			path : 'pages/notice/detail',
			url : 'notice/detail/:info_id/'
		},
		'Mypage' : { // マイページ
			path : 'pages/mypage',
			url : 'mypage/'
		},
		'Battle' : { // バトル
			path : 'pages/battle',
			url : 'battle/'
		},
		'BattleTop' : { // バトルトップ
			path : 'pages/battle/top',
			url : 'battle/top/'
		},
		'BattleGauge' : { // バトルゲージ
			path : 'pages/battle/gauge',
			url : 'battle/gauge/'
		},
		'BattleAttack' : { // バトル攻撃
			path : 'pages/battle/attack',
			url : 'battle/attack/'
		},
		'BattleAbility' : { // バトル必殺技
			path : 'pages/battle/ability',
			url : 'battle/ability/'
		},
		'BattleYell' : { // バトルエール
			path : 'pages/battle/yell',
			url : 'battle/yell/'
		},
		'BattleSpecialYell' : { // バトル特別エール
			path : 'pages/battle/special_yell',
			url : 'battle/special_yell/'
		},
		'BattleCheer' : { // バトル鼓舞
			path : 'pages/battle/cheer',
			url : 'battle/cheer/'
		},
		'BattleSchedule' : { // バトルスケジュール
			path : 'pages/battle/schedule',
			url : 'battle/schedule/'
		},
		'BattleSituationList' : { // バトル戦況履歴一覧
			path : 'pages/battle/situation/list',
			url : 'battle/situation/list/'
		},
		'BattleSituationDetail' : { // バトル戦況履歴
			path : 'pages/battle/situation/detail',
			url : 'battle/situation/detail/:date/:round/'
		},
		'CollectionTop' : { // 図鑑TOP
			path : 'pages/collection/top',
			url : 'collection/top/'
		},
		'CollectionEquipList' : { // 武具図鑑TOP
			path : 'pages/collection/equip/list',
			url : 'collection/equip/list/'
		},
		'CollectionEquipDetail' : { // 武具図鑑詳細
			path : 'pages/collection/equip/detail',
			url : 'collection/equip/detail/:equip_id/'
		},
		'CollectionBonusList' : { // 図鑑ボーナス
			path : 'pages/collection/bonus/list',
			url : 'collection/bonus/list/'
		},
		'CollectionSeriesList' : { // 秘宝シリーズ図鑑TOP
			path : 'pages/collection/series/list',
			url : 'collection/series/list/'
		},
		'CollectionTreasureList' : { // 秘宝シリーズ詳細
			path : 'pages/collection/treasure/list',
			url : 'collection/treasure/list/:series_id/'
		},
		'CollectionTreasureDetail' : { // 秘宝詳細
			path : 'pages/collection/treasure/detail',
			url : 'collection/treasure/detail/:series_id/:treasure_id/'
		},
		'CollectionTreasureMessageSend' : { // 秘宝図鑑メッセージ送信完了 ※テスト用
			path : 'pages/collection/treasure/message/send',
			url : 'collection/treasure/message/send/:series_id/:treasure_id/:to_user_id/:message/'
		},
		'MissionProceed' : { // クエスト進行画面
			path : 'pages/mission/proceed',
			url : 'mission/proceed/:stage_id/:field_id/'
		},
		'MissionMploss' : { // クエストP不足画面
			path : 'pages/mission/mploss',
			url : 'mission/mploss/'
		},
		'MissionTop' : { // クエストTOP
			path : 'pages/mission/top',
			url : 'mission/top/:stage_id/'
		},
		'MissionStageList' : { // クエストステージ選択
			path : 'pages/mission/stage',
			url : 'mission/stage/'
		},
		'MissionBossReady' : { // クエストボス準備
			path : 'pages/mission/boss/ready',
			url : 'mission/boss/ready/:stage_id/:field_id/'
		},
		'MissionBossResult' : { // クエストボス結果
			path : 'pages/mission/boss/result',
			url : 'mission/boss/result/:stage_id/:field_id/'
		},
		'MissionPartnerAdd' : { // クエスト同行者追加
			path : 'pages/mission/partner/add',
			url : 'mission/partner/add/:backto/'
		},
		'MissionPartnerChange' : { // クエスト同行者変更
			path : 'pages/mission/partner/change',
			url : 'mission/partner/change/:backto/:partner_id/'
		},
		'ItemList' : { //アイテムリスト
			path : 'pages/item/list',
			url : 'item/list/'
		},
		'ItemUse' : { //アイテム使用完了
			path : 'pages/item/use',
			url : 'item/use/'
		},
		'ShopList' : { //ショップリスト
			path : 'pages/shop/list',
			url : 'shop/list/'
		},
		'ShopConfirm' : { //ショップ購入確認
			path : 'pages/shop/confirm',
			url : 'shop/confirm/'
		},
		'ShopBuyCoin' : { //ショップコインでの購入完了
			path : 'pages/shop/buy/coin',
			url : 'shop/buy/coin/'
		},
		'ShopBuyAmegold' : { //ショップアメGでの購入完了
			path : 'pages/shop/buy/amegold',
			url : 'shop/buy/amegold/'
		},
		'FriendList' : { // フレンドTOP　※リリース後対応
			path : 'pages/friend/list',
			url : 'friend/list/'
		},
		'FriendApply' : { // フレンド承認　※リリース後対応
			path : 'pages/friend/apply',
			url : 'friend/apply/'
		},
		'FriendRemoveConfirm' : { // フレンド解除確認　※リリース後対応
			path : 'pages/friend/remove/confirm',
			url : 'friend/remove/confirm/:friend_user_id/'
		},
		'FriendRemoveDo' : { // フレンド解除　※リリース後対応
			path : 'pages/friend/remove/do',
			url : 'friend/remove/do/:friend_user_id/'
		},
		'GachaTop' : { //ガチャTop
			path : 'pages/gacha/top',
			url : 'gacha/(:selected_tab/)'
		},
		'GachaDrawList' : { //ガチャで出る武具一覧
			path : 'pages/gacha/draw-list',
			url : 'gacha/draw-list/:gacha_id/'
		},
		'GachaNormalDrawSingle' : { //ノーマルガチャを引く(単発)
			path : 'pages/gacha/normal/draw-single',
			url : 'gacha/normal/draw-single/:gacha_id/'
		},
		'GachaNormalDrawMulti' : { //ノーマルガチャを引く(複数)
			path : 'pages/gacha/normal/draw-multi',
			url : 'gacha/normal/draw-multi/:gacha_id/:draw_count/'
		},
		'GachaBuyConfirm' : { //ガチャ購入確認
			path : 'pages/gacha/buy/confirm',
			url : 'gacha/buy/confirm/:gacha_id/:buy_num/'
		},
		'GachaBuyDrawSingle' : { //有料ガチャを引く(単発)
			path : 'pages/gacha/buy/draw-single',
			url : 'gacha/buy/draw-single/:gacha_id/:payment_method/'
		},
		'GachaBuyDrawMulti' : { //有料ガチャを引く(複数)
			path : 'pages/gacha/buy/draw-multi',
			url : 'gacha/buy/draw-multi/:gacha_id/:payment_method/:draw_count/'
		},
		'WantList' : { // 欲しいものリスト　※リリース後対応
			path : 'pages/want/list',
			url : 'want/list/'
		},
		'WantAdd' : { // 欲しいものリスト追加　※リリース後対応
			path : 'pages/want/add',
			url : 'want/add/'
		},
		'WantRemoveConfirm' : { // 欲しいものリスト削除確認　※リリース後対応
			path : 'pages/want/remove/confirm',
			url : 'want/remove/confirm/:equip_id/'
		},
		'WantRemoveDo' : { // 欲しいものリスト削除　※リリース後対応
			path : 'pages/want/remove/do',
			url : 'want/remove/do/:equip_id/'
		},
		'RaremedalList' : { // レアメダルTOP
			path : 'pages/raremedal/list',
			url : 'raremedal/list/'
		},
		'RaremedalConfirm' : { // レアメダル確認　※リリース後対応
			path : 'pages/raremedal/confirm',
			url : 'raremedal/confirm/:raremdal_item_id/:qty/'
		},
		'RaremedalResult' : { // レアメダル結果　※リリース後対応
			path : 'pages/raremedal/result',
			url : 'raremedal/result/'
		},
		'EquipList' : { //武具一覧
			path : 'pages/equip/list',
			url : 'equip/list/'
		},
		'EquipDetail' : { //武具詳細
			path : 'pages/equip/detail',
			url : 'equip/detail/:user_equip_no/'
		},
		'EquipSellList' : { //武具一覧（売却）
			path : 'pages/equip/sell/list',
			url : 'equip/sell/list/'
		},
		'EquipSellConfirm' : { //武具売却確認（選択）
			path : 'pages/equip/sell/confirm',
			url : 'equip/sell/confirm/'
		},
		'EquipSellNormalBulkConfirm' : { //武具売却確認（ノーマル以下一括）
			path : 'pages/equip/sell/normal-bulk-confirm',
			url : 'equip/sell/normal-bulk-confirm/'
		},
		'EquipSellComplete' : { //武具売却完了
			path : 'pages/equip/sell/complete',
			url : 'equip/sell/complete/'
		},
		'Compose' : {//通常合成ベース選択
			path : 'pages/compose/compose',
			url : 'compose/'
		},
		'ComposeEvolution' : { //限界突破ベース選択
			path : 'pages/compose/compose-evolution',
			url : 'compose/compose-evolution/'
		},
		'ComposeBaseSelect' : { //通常合成素材選択
			path : 'pages/compose/base',
			url : 'compose/base/(:base_selected_tab/)'
		},
		'ComposeBaseEvolutionSelect' : { //限界突破素材選択
			path : 'pages/compose/base-evolution',
			url : 'compose/base-evolution/'
		},
		'ComposeSelectConfirm' : { //合成確認
			path : 'pages/compose/confirm',
			url : 'compose/confirm/'
		},
		'ComposeResult' : { //合成完了
			path : 'pages/compose/result',
			url : 'compose/result/'
		},
		'DeckList' : { //装備Top
			path : 'pages/deck/list',
			url : 'deck/list/:equip_type/'
		},
		'DeckEdit' : { //装備編集
			path : 'pages/deck/edit',
			url : 'deck/edit/:equip_type/:deck_no/'
		},
		'DeckDisarmComplete' : { //装備解除完了 ※テスト用
			path : 'pages/deck/equip/disarm',
			url : 'deck/equip/disarm/:equip_type/:deck_no/:place_no/'
		},
		'DeckChangeMainComplete' : { //メイン装備完了 ※テスト用
			path : 'pages/deck/equip/change-main',
			url : 'deck/equip/change-main/:equip_type/:deck_no/:place_no/'
		},
		'DeckEquipAddList' : { //装備追加一覧
			path : 'pages/deck/equip/add-list',
			url : 'deck/equip/add-list/:equip_type/:deck_no/:place_no/'
		},
		'DeckEquipChangeList' : { //装備変更一覧
			path : 'pages/deck/equip/change-list',
			url : 'deck/equip/change-list/:equip_type/:deck_no/:place_no/:user_equip_no/'
		},
		'DeckEquipBulk' : { //おすすめ一括装備
			path : 'pages/deck/equip/bulk',
			url : 'deck/equip/bulk/'
		},
		'Ranking' : { // ギルドランキング
			path : 'pages/guild/rank',
			url : 'guild/rank/'
		},
		'Greet' : { // あいさつ
			path : 'pages/greet',
			url : 'greet/'
		},
		'New_arrival' : { // 新着ユーザー
			path : 'pages/new_arrival',
			url : 'new_arrival/'
		},
		'Job' : { // ジョブトップ
			path : 'pages/job',
			url : 'job/'
		},
		'JobDetail' : { // ジョブ詳細
			path : 'pages/job/detail',
			url : 'job/detail/:job_id/'
		},
		'JobAvatarSelect' : { // ジョブアバター選択
			path : 'pages/job/avatar_select',
			url : 'job/avatar_select/:job_id/'
		},
		'JobAvatarDetail' : { // ジョブアバター詳細
			path : 'pages/job/avatar_detail',
			url : 'job/avatar_detail/:avatar_id/'
		},
		'Ability' : { // アビリティトップ
			path : 'pages/ability/top',
			url : 'ability/(:front/)'
		},
		'AbilityChange' : { // アビリティ変更
			path : 'pages/ability/change',
			url : 'ability/change/:ability_id/:ability_set_type/'
		},
		'AbilityAdd' : { // アビリティ追加
			path : 'pages/ability/add',
			url : 'ability/add/:ability_set_type/'
		},
		'Guild' : { // ギルドTOP
			path : 'pages/guild',
			url : 'guild/'
		},
		'GuildOther' : { // 他人のギルドTOP
			path : 'pages/guild/other',
			url : 'guild/other/:guild_id/'
		},
		'GuildInvited' : { // 勧誘されているギルド一覧
			path : 'pages/guild/invited',
			url : 'guild/invited/'
		},
		'GuildJoinRequested' : { // ギルド加入希望者一覧
			path : 'pages/guild/join_requested',
			url : 'guild/join_requested/'
		},
		'GuildBbs' : { // ギルド掲示板
			path : 'pages/guild/bbs',
			url : 'guild/bbs/'
		},
		'GuildBbsOther' : { // 他人のギルド掲示板
			path : 'pages/guild/bbs_other',
			url : 'guild/bbs/other/:guild_id/'
		},
		'GuildMembers' : { // ギルドメンバー一覧
			path : 'pages/guild/members',
			url : 'guild/members/'
		},
		'GuildMembersOther' : { // 他人のギルドメンバー一覧
			path : 'pages/guild/members_other',
			url : 'guild/members/other/:guild_id/'
		},
		'GuildPositionList' : { // ギルド役職一覧
			path : 'pages/guild/position/list',
			url : 'guild/position/list/'
		},
		'GuildAppointPosition' : { // 役職任命
			path : 'pages/guild/position/appoint',
			url : 'guild/position/appoint/:position_id/'
		},
		'GuildChangePosition' : { // 役職変更
			path : 'pages/guild/position/appoint',
			url : 'guild/position/appoint/:position_id/:user_id/'
		},
		'GuildSpace' : { // ギルド広場
			path : 'pages/guild/space',
			url : 'guild/space/'
		},
		'GuildCandidate' : { // ギルド勧誘おすすめユーザー一覧
			path : 'pages/guild/candidate',
			url : 'guild/candidate/'
		},
		'GuildMenbo' : { // ギルドメンバー募集中ギルド一覧
			path : 'pages/guild/menbo/list',
			url : 'guild/menbo/'
		},
		'GuildMenboEdit' : { // ギルドメンバー募集内容の編集・削除
			path : 'pages/guild/menbo/edit',
			url : 'guild/menbo/edit/'
		},
		'GuildPartner' : { // クエスト同行
			path : 'pages/mission/partner/list',
			url : 'guild/partner/'
		},
		'GuildBackEdit' : { // 後衛希望
			path : 'pages/guild/back/edit',
			url : 'guild/back/edit/'
		},
		'GuildNameEdit' : { // ギルド名編集
			path : 'pages/guild/guild_name/edit',
			url : 'guild/guild_name/edit/'
		},
		'GuildMasterCommentEdit' : { // ギルドマスターコメント編集
			path : 'pages/guild/master_comment/edit',
			url : 'guild/master_comment/edit/'
		},
		'GuildLeave' : { // ギルド退団完了
			path : 'pages/guild/leave',
			url : 'guild/leave/'
		},
		'GiftList' : { //ギフト一覧
			path : 'pages/gift/list',
			url : 'gift/list/'
		},
		'GiftOpen' : { //ギフト開封
			path : 'pages/gift/open',
			url : 'gift/open/'
		},
		'GiftBulkOpen' : { //ギフト一括開封
			path : 'pages/gift/bulk-open',
			url : 'gift/bulk-open/'
		},
		'Profile' : { // プロフィールTOP
			path : 'pages/profile/profile',
			url : 'profile/'
		},
		'ProfileOther' : { // 他人のプロフィール
			path : 'pages/profile/other',
			url : 'profile/other/:user_id/'
		},
		'ProfileEdit' : { // 自己紹介
			path : 'pages/profile/edit',
			url : 'profile/edit/'
		},
		'MessageList' : { // メッセージ一覧
			path : 'pages/message/list',
			url : 'message/list/'
		},
		'MessageDetail' : { // メッセージ詳細
			path : 'pages/message/detail',
			url : 'message/detail/:message_id/'
		},
		'MessageEdit' : { // メッセージ送信文編集
			path : 'pages/message/edit',
			url : 'message/edit/:user_id/'
		},
		'MessageSendComplete' : { // メッセージ送信完了
			path : 'pages/message/send_complete',
			url : 'message/send_complete/'
		},
		'Faq' : { // よくあるご質問
			path : 'pages/faq',
			url : 'faq/'
		},
		'HelpList' : { // ヘルプ一覧
			path : 'pages/help/list',
			url : 'help/'
		},
		'HelpDetail' : { // ヘルプ詳細
			path : 'pages/help/detail',
			url : 'help/detail/:help_id/'
		},
		'Tutorial' : { // チュートリアル
			path : 'pages/tutorial',
			url : 'tutorial/'
		},
		'TutorialComplete' : { // チュートリアル完了
			path : 'pages/tutorial/complete',
			url : 'tutorial/complete/'
		},
		'StartdashTop' : { // スタートダッシュキャンペーンTOP
			path : 'pages/start_dash/top',
			url : 'startdash/'
		},
		'JexEffect' : { //ジョブGET・アビリティGET・ジョブマスター演出
			path : 'pages/battle/jex',
			url : 'battle/jex/'
		},
		'BattleStrengtheningWeeks' : { // イベント: バトル強化週間
			path : 'pages/event/battle/weeks',
			url : 'event/battle/weeks/'
		},
		'SpringComboFestival' : { // イベント: 春のコンボまつり
			path : 'pages/event/combo/festival',
			url : 'event/combo/:version/'
		},
		'EventAlchemyTop' : { // イベント: ミッちゃんの錬金術はじめました。（TOP）
			path : 'pages/event/alchemy/top',
			url : 'event/alchemy/'
		},
		'EventAlchemyItems' : { // イベント: ミッちゃんの錬金術はじめました。（アイテム一覧）
			path : 'pages/event/alchemy/items',
			url : 'event/alchemy/items/'
		},
		'EventAlchemyResult' : { // イベント: ミッちゃんの錬金術はじめました。（結果）
			path : 'pages/event/alchemy/result',
			url : 'event/alchemy/result/'
		},
		'Quiz' : { // クイズ
			path : 'pages/quiz/top',
			url : 'quiz/top/'
		},
		'Question' : { // クイズの問題
			path : 'pages/quiz/question',
			url : 'quiz/question/:chapter_id/:quiz_id/'
		},
		'Answer' : { // クイズの答え
			path : 'pages/quiz/answer',
			url : 'quiz/answer/:chapter_id/:quiz_id/:answer/'
		},
		'WaitingNotice' : { // バトルまで何する？まとめ
			path : 'pages/waiting_notice/waiting_notice',
			url : 'waiting_notice/'
		},
		'SeasonAvatar' : {
			path : 'pages/season_avatar/top',
			url : 'season_avatar/:season_id/'
		},
		'NotFound' : { // 404
			path : 'pages/404',
			url : '404/'
		}
	};
});
