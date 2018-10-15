import React, { PureComponent, Fragment } from 'react';
import { Table, Alert, Modal } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

const UserModal = (props) => {
  const { modalVisible, handleModalVisible } = props;
  return (
    <Modal
      destroyOnClose
      title="名单"
      visible={modalVisible}
      onOk={() => handleModalVisible()}
      onCancel={() => handleModalVisible()}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );

}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
      modalVisible: false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  // handleRowSelectChange = (selectedRowKeys, selectedRows) => {
  //   let { needTotalList } = this.state;
  //   needTotalList = needTotalList.map(item => ({
  //     ...item,
  //     total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
  //   }));
  //   const { onSelectRow } = this.props;
  //   if (onSelectRow) {
  //     onSelectRow(selectedRows);
  //   }

  //   this.setState({ selectedRowKeys, needTotalList });
  // };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  // cleanSelectedKeys = () => {
  //   this.handleRowSelectChange([], []);
  // };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const { selectedRowKeys, needTotalList, modalVisible } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
    } = this.props;
    console.log(rowKey)
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 0 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.handleModalVisible} style={{ marginLeft: 24 }}>
                  注意：24小时内有2位用户充值超过1000M钻
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={rowKey || 'key'}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
        <UserModal {...parentMethods} modalVisible={modalVisible} />
      </div>
    );
  }
}

export default StandardTable;
