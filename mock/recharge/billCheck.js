
import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push(
        {
            "date" : "xx",
            "iTunes_30" : i,
            "iTunes_68" : i,
            "iTunes_128" : i,
            "iTunes_288" : i,
            "iTunes_388" : i,
            "iTunes_648" : i,
            "backstage_30" : i,
            "backstage_68" : i,
            "backstage_128" : i,
            "backstage_288" : i,    
            "backstage_388" : i,
            "backstage_648" : i,
            "diff_30" : i,
            "diff_68" : i,
            "diff_128" : i,
            "diff_288" : i,
            "diff_388" : i,
            "diff_648" : i,
        }
    );
}
function getBillAppStoreCheckList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = tableListDataSource;
    if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend') {
                return next[s[0]] - prev[s[0]];
            }
            return prev[s[0]] - next[s[0]];
        });
    }

    if (params.status) {
        const status = params.status.split(',');
        let filterDataSource = [];
        status.forEach(s => {
            filterDataSource = filterDataSource.concat(
                dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
            );
        });
        dataSource = filterDataSource;
    }

    if (params.name) {
        dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    let pageSize = 10;
    if (params.pageSize) {
        pageSize = params.pageSize * 1;
    }

    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        },
        header: {
            "user_count": 12,
            "times": 24,
            "score_count": 1233,
            "amount_count": 12323,
            "over_recharge_count": 2,
            "over_recharge_list": [
                "xxx",
                "xxx"
            ]
        },
        search: {
            "key": "xx",
            "shoplist_id": 1,
            "pay_type": 1,
            "is_first": 1,
            "status": 1,
            "is_test": 1,
            "plat": 1,
            "start_date": "xx",
            "end_date": "xx"
        },
    };

    return res.json(result);
}
export default {
    'GET /order/billAppStoreCheckList': getBillAppStoreCheckList,
}