import { Select, Space, Typography, Flex, Divider, Form, Button, InputNumber, DatePicker, Result } from "antd"
import { useState, useRef } from "react"
import { useCrypto } from "../../context/crypto-context"
import { totalPrice } from "../../utils.js"
import CoinInfo from "./CoinInfo.jsx"

export default function AddAssetForm() {
    const [inputValue, setInputValue] = useState(null)
    const [priceValue, setPriceValue] = useState(null)
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const validateMessages = {
        required: "'${label}' is required!",
        types: {
            number: '${label} is not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        }
      }
      const assetRef = useRef()

    function onClose() {
        setSubmitted(false)
    }

    if(submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    Close
                </Button>,
                ]}
            />
        )
    }

    if(!coin) {
        return (
            <Select
                style={{width: '100%'}}
                onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
                placeholder="Select coin"
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
        )
    }

    const total = (inputValue || 0) * (priceValue || coin.price);

    function onFinish(values) {
        
        values.price = +coin.price.toFixed(3)
        values.total = total.toFixed(3)

        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(newValue) {
        setInputValue(newValue);
      }

    function handlePriceChange(newValue) {
        setPriceValue(newValue);
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            validateMessages={validateMessages}
            onFinish={onFinish}
        >

            <Typography.Title level={2} style={{margin: 0}}>

            <CoinInfo coin={coin}/>

            <Divider />
            
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, type: 'number', min: 0, }]}
                >
                <InputNumber style={{width: '100%'}} placeholder="Enter Amount" onChange={handleAmountChange}/>

                </Form.Item>
                
                <Form.Item
                    label="Price"
                    name="price"
                >
                    <InputNumber
                    style={{width: '100%'}}
                    disabled
                    placeholder={coin.price.toFixed(3)}
                    onChange={handlePriceChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Date & Time"
                    name="date"
                >
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item
                    label="Total"
                    name="total"
                >
                    <InputNumber disabled style={{width: '100%'}} placeholder={Number(total).toFixed(3) + '$'}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Typography.Title>
        </Form>
    )
}