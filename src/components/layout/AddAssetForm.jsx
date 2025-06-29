import { Select, Space, Typography, Flex, Divider, Form, Button, InputNumber, DatePicker } from "antd"
import { useState } from "react"
import { useCrypto } from "../../context/crypto-context"
import { totalPrice } from "../../utils.js"

export default function AddAssetForm() {
    const [inputValue, setInputValue] = useState(null)
    const [priceValue, setPriceValue] = useState(null)
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null)
    const validateMessages = {
        required: "'${label}' is required!",
        types: {
            number: '${label} is not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        }
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

    function handleAmountChange(newValue) {
        setInputValue(newValue);
      }

    function handlePriceChange(newValue) {
        setPriceValue(newValue);
    }

    const total = (inputValue || 0) * (priceValue || coin.price);

    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            validateMessages={validateMessages}
        >

            <Typography.Title level={2} style={{margin: 0}}>

            <Flex align="center">

                <img src={coin.icon} alt={coin.name} style={{ width: "40px", marginRight: '10px'}} />
                
                <Typography.Title level={2} style={{margin: '0px'}}>
                    {coin.name}
                </Typography.Title>

            </Flex>

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
                    defaultValue={coin.price.toFixed(3)}
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