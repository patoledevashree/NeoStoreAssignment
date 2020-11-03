import React, { useState } from 'react'
import { View, Text ,StyleSheet} from 'react-native'


export default function Orders() {
    const [orderList, setOrder] = useState([
        {
            _id: "ORDERNO_376",
            product_details: [
                {
                    _id: "5e09ccbb58b863edc9e81984",
                    total_cartCost: "8400",
                    isDelivered: false,
                    customer_id: 199,
                    order_id: "ORDERNO_376",
                    product_id: "5d0b1f354594d26e47774b5e",
                    quantity: 1,
                    delivery_address: "At neosoft technology, mumbai, maharastra-443322, india",
                    total_productCost: "8000",
                    createdAt: "2019-12-30T10:08:59.106Z",
                    __v: 0,
                    product_details: [
                        {
                            _id: "5d0b1f354594d26e47774b5e",
                            subImages_id: "5d0b1e0e4594d26e47774b5d",
                            category_id: "5cfe3c65ea821930af69281f",
                            color_id: "5cfe247ade89f8148fbd0146",
                            product_id: "5d0b1f354594d26e47774b5e",
                            product_name: "FurnitureKraft Kansas Metal Bed",
                            product_image: "2019-06-20T05-52-53.191Zam2.jpg",
                            product_desc: "This Bed Is Ergonomically Sound, Stylish And Offers Superb Value For Money. The product requires carpenter assembly and will be provided by the seller",
                            product_rating: "NaN",
                            product_producer: "Engineering Wood",
                            product_cost: 8000,
                            product_stock: 490,
                            product_dimension: "500*900",
                            product_material: "Metal",
                            createdAt: "2019-06-20T05:52:53.219Z",
                            __v: 0
                        }]
                }]

        }
    ])
    return (
        <View style={styles.container}>
            <Text>Orders</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
    }
})