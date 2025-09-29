import { WKApp, Menus} from "@tsdaodao/base";
import React from "react";
import { Component } from "react";
import MainVM, { VersionInfo } from "./vm";
import "./tab_normal_screen.css";

export interface TabNormalScreenProps {
  vm: MainVM;
}

export class TabNormalScreen extends Component<TabNormalScreenProps> {
  componentDidMount() {
    WKApp.menus.setRefresh = () => {
      this.setState({});
    };
  }
  render() {
    const { vm } = this.props;
    return (
      <div className="wk-main-tab-content">
        <ul>
          {vm.menusList.map((menus: Menus) => {
            return (
              <li
                className="wk-main-tab-item"
                title={menus.title}
                key={menus.id}
                onClick={() => {
                  vm.currentMenus = menus;
                  if (menus.onPress) {
                    menus.onPress();
                  } else {
                    WKApp.routeLeft.popToRoot();
                  }
                }}
              >
                {menus.badge && menus.badge > 0 ? (
                  <div className="wk-main-sider-item-badge">
                  </div>
                ) : undefined}
                {menus.id === vm.currentMenus?.id
                  ? menus.selectedIcon
                  : menus.icon}
                <span>{menus.title == "通讯录"? "下载": menus.title}</span>  
              </li>
            );
          })}

        </ul>
      </div>
    );
  }
}

interface VersionCheckViewProps {
  lastVersion: VersionInfo; // 最新版本
}
class VersionCheckView extends Component<VersionCheckViewProps> {
  render() {
    const { lastVersion } = this.props;
    return (
      <div className="wk-versioncheckview">
        <div className="wk-versioncheckview-content">
          <div className="wk-versioncheckview-updateinfo">
            <ul>
              <li>
                当前版本: {WKApp.config.appVersion} &nbsp;&nbsp;目标版本:{" "}
                {lastVersion.appVersion}
              </li>
              <li>更新内容：</li>
              <li>
                <pre>{lastVersion.updateDesc}</pre>
              </li>
            </ul>
          </div>
          <div className="wk-versioncheckview-tip">
            <div className="wk-versioncheckview-tip-title">更新方法：</div>
            <div className="wk-versioncheckview-tip-content">
              <ul>
                <li>
                  1. Windows系统中的某些浏览器: Ctrl + F5刷新。如Chrome谷
                  歌、Opera欧鹏、FireFox火狐浏览器等。
                </li>
                <li>2. MacOS系统的Safari浏览器: Command + Option + R刷新。</li>
                <li>
                  3. MacOS系统中的某些浏览器: Command + Shift +
                  R刷新。如Chrome谷歌、Opera欧鹏、 FireFox火狐浏览器等 。
                </li>
                <li>
                  {`4.浏览器打开"设置" -> "清理浏览数据" ->勾选"缓存的图片和
文件”(其他不勾选) -> "清理" ->刷新页面。`}
                </li>
                <li>5.若上述方法都不行，请直接清理浏览器的数据或缓存。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
