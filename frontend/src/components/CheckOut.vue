<template>
    <div class="check-out">
        <div class="product-sumary">
            <h2>Sumary</h2>
            <div class="item-sumary">
                <div class="sub-total">
                    SUBTOTAL:
                    <div>${{ calculateSubtotal() }}</div>
                </div>
                <div class="shipping">
                    SHIPPING EST: 
                    <div>{{ calculateShipping() }}</div>
                </div>
            </div>
            <input class="input" type="text" placeholder="Enter coupon">
            <div class="total">
                TOTAL PRICE: 
                <div>${{ calculateTotal() }}</div>
            </div>
            <button class="btn" type="button">PROCEED TO CHECKOUT</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedProducts: {
            type: Array,
            default: () => [],
        },
    },
    methods: {

        
        calculateSubtotal() {
            console.log(this.selectedProducts)
            // Calculate subtotal based on selected products
            const subtotal = this.selectedProducts.reduce(
                (total, product) =>
                    total + parseFloat(product.price) * parseInt(product.quantity),
                0
            );
            return subtotal.toFixed(2);
        },
        calculateShipping() {
            // You can implement shipping logic here
            // For example, a fixed shipping cost or free shipping for a certain condition
            return "0.00"; // Replace with your shipping calculation logic
        },
        calculateTotal() {
            // Calculate total including subtotal and shipping
            const subtotal = parseFloat(this.calculateSubtotal());
            const shipping = parseFloat(this.calculateShipping());
            const total = subtotal + shipping;
            return total.toFixed(2);
        },

        async proceedToCheckout() {
            // Emit an event to notify the parent component about the checkout
            this.$emit("checkout", this.selectedProducts);
        },
    },
}
</script>


<style scoped>
.check-out {
    width: 25%;
    height: 525px;
    background-color: var(--color-bg);
    border-radius: 8px;
}

.product-sumary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
}

.item-sumary {
    width: 100%;
    height: 130px;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid var(--black);
    margin-bottom: 50px;
}

.sub-total,
.shipping {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.input {
    border: none;
    outline: none;
    padding: 5px;
    background-color: transparent;
    border-bottom: 2px solid var(--black);
    height: 45px;
    margin-bottom: 50px;
}

input:focus {
    outline: none;
}

.total {
    margin: 30px 0 30px 0;
    display: flex;
    justify-content: space-between;
}

.btn {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    margin: 5px;
    padding: 10px 10px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn:hover {
    background-color: rgb(71, 69, 69);
}
</style>