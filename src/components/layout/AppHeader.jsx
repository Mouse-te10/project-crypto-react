import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context.jsx'
import { useEffect, useState } from 'react'
import CoinInfoModal from './CoinInfoModal.jsx'
import AddAssetForm from './AddAssetForm.jsx';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [openD, setOpenD] = useState(false);

    useEffect(() => {
        const keypress = event => {
            if(event.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)

        return () => {
            document.removeEventListener('keypress', keypress)
        }
    }, [])
    
      const handleCancel = () => {
        setModal(false);
      };

      const handleSelect = (val) => {
        setCoin(crypto.find(coin => coin.id === val))
        setModal(true)
      }

      const openDrawer = () => {
        setOpenD(true)
      }

      const onClose = () => {
        setOpenD(false)
      }
      
    return (
        <Layout.Header style={headerStyle}>
            <Select
                open={select}
                style={{ width: '250px' }}
                onSelect={handleSelect}
                onClick={() => setSelect(prev => !prev)}
                value='press / to open'
                placeholder="select one country"
                defaultValue={['china']}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                <Space>
                    <img src={option.data.icon} alt={option.data.label} style={{width: '20px'}}/> {option.data.label}
                </Space>
                )}
            />

            <Button type='primary' onClick={openDrawer}>Add Asset</Button>

            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal}
                onCancel={handleCancel}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>

            <Drawer
                width={600}
                title="Add Asset"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={openD}
                destroyOnHidden
            >
                <AddAssetForm onClose={() => setOpenD(false)}/>
            </Drawer>
            
        </Layout.Header>
    )
}

export default AppHeader