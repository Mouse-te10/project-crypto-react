import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { toUpperFirstLetter } from '../../utils.js'
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.jsx';

const siderStyle = {
    padding: '1rem',
  };

export default function AppSider() {
    const { assets} = useContext(CryptoContext)

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                <Statistic
                    title={toUpperFirstLetter(asset.id)}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                    prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    suffix="$"
                />
                <List
                    size='small'
                    dataSource={[
                        {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        // {title: 'Difference', value: asset.growPercent},
                    ]}
                    renderItem={item => (
                <List.Item>
                <span>{item.title}</span>
                
                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}

                {item.isPlain ? <span>{item.value}</span> : 
                <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value}$</Typography.Text>}
                </List.Item>
                )}
                />
            </Card>
            ))}
        </Layout.Sider>
    )
}