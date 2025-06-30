import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCrypto, fetchAssets } from '../api.js';
import { percentDifference } from "../utils.js";


const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([]) // массив с инфой про текущий курс
    const [assets, setAssets] = useState([]) //информация о крипте в портфолио

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price <= coin.price,// boolean упала цена на коин или нет
                growPercent: percentDifference(asset.price, coin.price), //на сколько процентов упала или повысилась цена
                totalAmount: asset.amount * coin.price, //за сколько можно продать
                totalProfit: (+asset.amount * +coin.price - +asset.amount * +asset.price).toFixed(2),
                name: coin.name,
                ...asset
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto() // массив со всей криптой
            const assets = await fetchAssets()
            // загрузка завершена
            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
            {children}
        </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}