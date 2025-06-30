import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
  };

function AppContent() {
  const {assets, crypto} = useCrypto()
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})
  
    return <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{textAlign: 'left', color: '#fff'}}>
            Portfolio: {' '}
            {assets
              .map(asset => asset.amount * cryptoPriceMap[asset.id] /* оптимизация asset.amount * coin.price */)
              .reduce((acc, value) => acc += value, 0) /*получаем общую сумму денег в кошельке*/
              .toFixed(2)}$ 
        </Typography.Title>
        <PortfolioChart />
        <AssetsTable />
    </Layout.Content>
    
}

export default AppContent