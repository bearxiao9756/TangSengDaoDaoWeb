
import {WKApp} from '@tsdaodao/base'
import { IModule ,StorageService} from '@tsdaodao/base'
import React from 'react'
import Login from './login'
export default class LoginModule implements IModule {

    id(): string {
        return "LoginModule"
    }
    init(): void {
        const urlParams = new URLSearchParams(window.location.search);
        // 尝试获取名为 'channelCode' 或 'inviteCode' 的参数值（兼容性查找）
        const channelCode = urlParams.get('channelCode') || urlParams.get('inviteCode');
        console.log("码1")
        console.log(channelCode);
        console.log("渠1")
        if (channelCode) {
            console.log(`[Login] componentDidMount 获取到渠道码: ${channelCode}`);
            // 存入全局临时变量，供 LoginVM 实例化时使用
            StorageService.shared.setItem("ch", channelCode);
        }
        console.log("【LoginModule】初始化")
        WKApp.route.register("/login",(param:any):JSX.Element =>{
            return <Login />
        })
    }
}