import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // console.log("nextProps===",nextProps)
    // console.log("preState===",preState)
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.id === key)[0];
  }

  toggleEditable = (e, key) => {
    // console.log("record.key====",key)
    e.preventDefault();
    const { data } = this.state;
    // console.log("datay====",data)
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };
  
  
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  
  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  
  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.content) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      this.toggleEditable(e, key);
      // const { data } = this.state;
      const saveData = this.getRowByKey(key);
      console.log("this.state====",saveData)
      const { onChange } = this.props;
      onChange(saveData);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: '5%'
      },
      {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
        width: '15%',
      },
      {
        title: '配置名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '配置内容',
        dataIndex: 'content',
        key: 'content',
        width: '30%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'content', record.id)}
                onKeyPress={e => this.handleKeyPress(e, record.id)}
                placeholder="配置内容"
              />
            );
          }
          return text;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        width: '20%',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          // console.log("record===",record)
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.id)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.id)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.id)}>编辑</a>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;
    // console.log("this.state=========",data)
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={record=>record.id}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
      </Fragment>
    );
  }
}

export default TableForm;
