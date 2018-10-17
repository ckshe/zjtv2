import React, { Component } from 'react';
import { Form,Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
@Form.create()
class BillCheckIndex extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'details-list':
                router.push({
                    pathname: `${match.url}/details-list`,
                })
                break;
            case 'ios-list':
                router.push({
                    pathname: `${match.url}/ios-list`,
                })
                break;
            default:
                break;
        }
    }
    render() {
        const tabList = [
            {
                key: 'details-list',
                tab: '账单核对',
            },
            {
                key: 'ios-list',
                tab: 'iOS账单核对',
            },
        ];
        const { children, match, location } = this.props;
        return (
            <PageHeaderWrapper
                title="账单核对"
                tabList={tabList}
                onTabChange={this.handleTabChange}
                tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
            >
                <Card bordered={false}>
                    {children}
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BillCheckIndex;
