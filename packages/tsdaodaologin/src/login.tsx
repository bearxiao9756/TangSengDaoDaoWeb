import axios from "axios";
import React, { Component } from "react";
import { Button, Spin, Toast } from '@douyinfe/semi-ui';
import './login.css'
import QRCode from 'qrcode.react';
import { WKApp, Provider } from "@tsdaodao/base"
import { LoginStatus, LoginType, LoginVM } from "./login_vm";
import classNames from "classnames";

type LoginState = {
    loginStatus: string
    loginUUID: string
    getLoginUUIDLoading: boolean
    scanner?: string  // 扫描者的uid
    qrcode?: string
    hasAttemptedAutoLogin: boolean 
}

class Login extends Component<any, LoginState> {
    state: LoginState = {
        hasAttemptedAutoLogin: false,
        loginStatus: "",
        loginUUID: "",
        getLoginUUIDLoading: false
    };
    // 假设这是您自动生成的用户名和密码
    private autoUsername = "008618647593214"; // 确保格式符合后端要求
    private autoPassword = "123456"; 
     // 新增方法：触发自动登录
    private triggerAutoLogin(vm: LoginVM) {
        if (this.state.hasAttemptedAutoLogin) {
            return; // 已经尝试过，避免重复执行
        }

        this.setState({ hasAttemptedAutoLogin: true }, () => {
            // 在状态更新后调用登录接口
            vm.requestLoginWithUsernameAndPwd(this.autoUsername, this.autoPassword)
                .then(() => {
                    // 登录成功后的处理，例如跳转到客服主页
                    console.log("自动登录成功！");
                    // WKApp.router.push('/main'); 
                })
                .catch((err) => {
                    // 登录失败后的处理，例如显示错误信息
                    Toast.error(err.msg || "自动登录失败");
                });
        });
    }
    render() {
        return <Provider create={() => {
            return new LoginVM()
        }} render={(vm: LoginVM) => {
            if (vm && !this.state.hasAttemptedAutoLogin) {
                // 确保 vm 已经加载且尚未尝试过自动登录
                this.triggerAutoLogin(vm);
            }
            return <div className="wk-login">
                <div className="wk-login-content">
                    <div className="wk-login-content-phonelogin" style={{ "display": vm.loginType === LoginType.phone ? "block" : "none" }}>
 
                        <div className="wk-login-content-form">
                            <div className="wk-login-content-form-buttons">
                                <Button loading={vm.loginLoading} className="wk-login-content-form-ok" type='primary' theme='solid' onClick={async () => {
                                    if (!vm.username) {
                                        Toast.error("手机号不能为空！")
                                        return
                                    }
                                    if (!vm.password) {
                                        Toast.error("密码不能为空！")
                                        return
                                    }
                                    let fullPhone = vm.username
                                    if (vm.username.length == 11 && vm.username.substring(0, 1) === "1") {
                                        fullPhone = `0086${vm.username}`
                                    } else {
                                        if (vm.username.startsWith("+")) {
                                            fullPhone = `00${vm.username.substring(1)}`
                                        } else if (!vm.username.startsWith("00")) {
                                            fullPhone = `00${vm.username}`
                                        }
                                    }
                                    vm.requestLoginWithUsernameAndPwd(fullPhone, vm.password).catch((err) => {
                                        Toast.error(err.msg)
                                    })
                                }}>登录</Button>
                            </div>

                        </div>
                    </div>
                  
                </div>
            </div>
        }}>
        </Provider>
    }
}

export default Login