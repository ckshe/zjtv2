import { parse } from 'url';
let tableListDataSource = {
	"status": 200,
	"message": "SUCCESS",
	"data": {
		"id": 100,
		"user_info": {
			"id": 1001,
			"add_time": "2018-09-19 14:25:23",
			"level": 1,
			"username": "帅到没有要",
			"nickname": "小帅很帅",
			"telephone": "13760129999",
		},
		"game_info": {
			"game_id": 2001,
			"home_team": "中国队",
			"away_team": "巴西队",
			"competition_id": 2,
			"competition_name": "世界杯",
			"game_time": "2018-09-19",
		},
		"viewmd": 288,
		"recommend_type": 2,
		"recommend_side": 1,
		"content": "帅到没有要也要看世界杯，做人唯有懂得感恩，才会不断积累善缘，人生的路上，谁都避免不了起伏，总会有人在你失意的时候奚落你，也有人会化身菩萨度你，人一定要有一颗干净的心，对得起伦理道德，也要把这份恩情铭记于心，心存感恩，善待众生，积德行善，自有福报",
		"view_num": 12,
		"expert_income": 122,
		"plat_income": 12,
		"income_rate": 12,
		"status": 1,
		"cancel_reason": "不想玩了呗",
		"view_user_list": [{
			"id": 1,
			"username": "帅到没有要",
			"nickname": "小帅很帅",
			"time":"2018-09-19 14:25:23"
		},{
			"id": 2,
			"username": "帅到有人要",
			"nickname": "选择车困难朕",
			"time":"2018-09-19 14:25:23"
		},{
			"id": 3,
			"username": "不想帅",
			"nickname": "工作困难朕",
			"time":"2018-09-19 14:25:23"
		}]
	}
};

export default {
	'GET /recommend/detail': tableListDataSource,
}