import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { recommendType, status, level, sort } from '@/pages/config'

class ExportList extends PureComponent {
 

  render() {
   
    return (
      <Fragment>
          <Card bordered={false}>
            <div className={styles.tableList}>
                  1111111
            </div>
          </Card>
      </Fragment>
    );
  }
}

export default ExportList;
