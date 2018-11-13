import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { recommendType, status, level, sort } from '@/pages/config'
import TextArea from 'antd/lib/input/TextArea';
import Avatar from './AvatarView';
const FormItem = Form.Item;
const { Option } = Select;
const fieldLabels = {
  avatar: '头像',
  username: '账号',
  nickname: '昵称',
  source: '来源',
  introduce: '个人简介',
  name: '真实姓名',
  id_card_no: '身份证',
  bank_card_no: '银行卡',
  bank: '所属银行',
  area_code: '区号',
  telephone: '手机号',
  wechat: '微信号',
};

/* eslint react/no-multi-comp:0 */
@connect(({ exportlist, loading }) => ({
  exportlist,
  loading: loading.effects['exportlist/submitExportAdd']
}))
@Form.create()
class ExportAdd extends PureComponent {
  state = {
    nameOrNickIsExist:false
  };

  componentDidMount() {
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'exportlist/submitExportAdd',
          payload: values,
        });
      }
    });
  };
  onAvatarPic = (avatarpic) => {
    console.log("avatarpic======", avatarpic)
    return avatarpic;
  }
  // 校验方法
    userNameValidator = (rule, value, callback) => {
      const rNameReg =/^[A-Za-z0-9_.@#$%^*~·]{5,20}$/;
      // const valus = {
      //   username:value
      // }
      if(value && !rNameReg.test(value)){
        callback("请输入5-20位名称，支持数字、英文和字符")
      }else{
        // const { dispatch } = this.props;
        // dispatch({
        //   type: 'exportlist/nameOrNickIsExist',
        //   payload: valus,
        // });
        // if(this.state.nameOrNickIsExist){
        //   callback("此账号已被注册");
        // }
        callback();
      }
    }
    nicknameValidator = (rule, value, callback) => {
      const nickReg = /^[0-9a-zA-Z\s\S]{2,10}/;
      if(value && !nickReg.test(value)){
        callback("请输入1-10个汉字，支持数字、英文和字符")
      }else{
        callback();
      }
    }
    introduceValidator = (rule, value, callback) =>{
      const introduceReg = /^[\s\S]{0,300}$/;
      if(value && !introduceReg.test(value)){
        callback("简介最长300个字符")
      }else{
        callback();
      }
    }

  render() {
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <PageHeaderWrapper title="添加专家">
          <Card bordered={false}>
            <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
              <div className={styles.addExportAvatar} style={{ width: "200px", display: "inline" }}>
                <Form.Item label={fieldLabels.avatar}>
                  {getFieldDecorator('avatar', { getValueFromEvent: this.onAvatarPic,initialValue:"" })(<Avatar onChange={this.onAvatarPic} />)}
                </Form.Item>
              </div>
              <div>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label={fieldLabels.username}>
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '请输入账号' },
                          { validator: this.userNameValidator },
                        ],
                      })(<Input placeholder="请输入账号"/>)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={fieldLabels.nickname}>
                      {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称' },{
                          validator:this.nicknameValidator
                        }],
                      })(<Input placeholder="请输入昵称"  />)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={fieldLabels.source}>
                      {getFieldDecorator('source', {
                        rules: [{ required: true, message: '来源未填写' }],
                      })(
                        <Select placeholder="请选择管理员">
                          <Option value="1">7m内部专家</Option>
                          <Option value="2">sportsDt</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item label={fieldLabels.introduce}>
                    {getFieldDecorator('introduce', {
                      rules: [{validator:this.introduceValidator}],
                      initialValue:""
                    })(<TextArea rows={2} placeholder="请输入个人简介" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className={styles.order}>
                    <span className={styles.line}></span>
                    <span className={styles.txt}>实名认证</span>
                    <span className={styles.line}></span>
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label={fieldLabels.name}>
                    {getFieldDecorator('name',{initialValue:""})(<Input placeholder="请输入真实姓名" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.id_card_no}>
                    {getFieldDecorator('id_card_no',{initialValue:""})(<Input placeholder="请输入身份证" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.bank_card_no}>
                    {getFieldDecorator('bank_card_no',{initialValue:""})(<Input placeholder="请输入银行卡" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label={fieldLabels.bank}>
                    {getFieldDecorator('bank',{initialValue:""})(<Input placeholder="请输入所属银行" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Row gutter={16}>
                    <Col span={6}><Form.Item label={fieldLabels.area_code}>
                      {getFieldDecorator('area_code',{initialValue:""})(<Input placeholder="区号" />)}
                    </Form.Item>
                    </Col>
                    <Col span={18}>
                      <Form.Item label={fieldLabels.telephone}>
                        {getFieldDecorator('telephone',{initialValue:""})(<Input placeholder="请输入手机号" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.wechat}>
                    {getFieldDecorator('wechat',{initialValue:""})(<Input placeholder="请输入微信号" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit" loading={loading}>
                {/* <FormattedMessage id="form.submit" /> */}
                保存
              </Button>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ExportAdd;
