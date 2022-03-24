import App from "./app";
import ProductRoute from "./routes/product.route";
import ShoppingCartRoute from "./routes/shopping-cart.route";

const app = new App([new ProductRoute(), new ShoppingCartRoute()]);

app.listen();