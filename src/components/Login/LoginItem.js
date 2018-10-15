import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WarpFormItem extends Component {
  static defaultProps = {
    buttonText: '获取验证码',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      captchaUrl:'https://txt-console-dev.sportsdt.com/interface/mobi/admin/user/getVerifyCode?mode=backstage'
    };
  }

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    this.setState({
      captchaUrl:""
    })
    setTimeout(() => {
      this.setState({
        captchaUrl:'https://txt-console-dev.sportsdt.com/interface/mobi/admin/user/getVerifyCode?mode=backstage'
      })
    },10)
    
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  render() {

    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      buttonText,
      updateActive,
      type,
      captchaNum,
      ...restProps
    } = this.props;
    const {captchaUrl} = this.state;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};
    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={14}>
              {
                getFieldDecorator(name, options)(
                  <Input {...customprops} {...inputProps} />
                )}
            </Col>
            <Col span={8}>
              <img src={captchaUrl} alt="" onClick={this.onGetCaptcha} className={styles.getCaptcha} />
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WarpFormItem
          customprops={item.props}
          {...props}
          rules={item.rules}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
