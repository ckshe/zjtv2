import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

@connect()
class ApplicationList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'exportlist':
        router.push(`${match.url}/exportlist`);
        break;
      case 'locklist':
        router.push(`${match.url}/locklist`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const tabList = [
      {
        key: 'exportlist',
        tab: '申请列表',
      },
      {
        key: 'locklist',
        tab: '封号',
      },
    ];

    // const mainSearch = (
    //   <div style={{ textAlign: 'center' }}>
    //     <Input.Search
    //       placeholder="请输入"
    //       enterButton="搜索"
    //       size="large"
    //       onSearch={this.handleFormSubmit}
    //       style={{ width: 522 }}
    //     />
    //   </div>
    // );

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="专家申请审核列表"
        // content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
        className={styles.antTabs}
      >
        {/* {children} */}
        {/* <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch> */}
      </PageHeaderWrapper>
    );
  }
}

export default ApplicationList;
