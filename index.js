const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
        product.id = lastProductId + 1;
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(product => product.id !== id);
        this.saveProducts(products);
    }

    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data);
    }
}
