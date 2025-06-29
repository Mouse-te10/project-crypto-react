import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader.jsx'
import AppSider from './AppSider.jsx';
import AppContent from './AppContent.jsx'
import CryptoContext from '../../context/crypto-context.jsx';
import { useContext } from 'react'

export default function AppLayout() {
    const {loading} = useContext(CryptoContext)

    if(loading) {
            return (
            <Spin tip="Loading..." fullscreen size='large'/>
            )
        }

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>
    )
}