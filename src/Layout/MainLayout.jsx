import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { SiBitcoinsv } from "react-icons/si";

import { Outlet } from "react-router-dom";

import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const colorBgContainer = "#fff";
  const borderRadiusLG = "8px";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Fixed Sider */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <h2 className="text-white text-xl text-center py-3 mb-0">
            <span className="sm-logo">7D</span>
            <span className="lg-logo">Cryptocurrency</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="py-6 font-bold"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              // need to handle logout
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "coins",
              icon: <SiBitcoinsv className="fs-5" />,
              label: "Coins",
            },
          ]}
        />
      </Sider>
      {/* Main Layout */}
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "18px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
