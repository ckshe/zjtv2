import React, { PureComponent } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import router from 'umi/router';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, onMenuClick } = this.props;
    let user_info;  
    try {
      user_info = JSON.parse(localStorage.getItem("user_info")); 
      if (!user_info.username) {
        router.push('/user/login');
      }
    } catch (e) {
      // 设置username为空  免得下面user_info.username没有报错
      user_info = {username:''}
      router.push('/user/login');
    }
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={className}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>{user_info.username}</span>
            </span>
          </Dropdown>
        </div>

        {/* <RightContent {...this.props} /> */}
      </div>
    );
  }
}
