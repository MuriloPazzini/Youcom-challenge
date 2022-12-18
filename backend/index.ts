import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fetch from "node-fetch";
import session from 'express-session';
import cors from 'cors';;
import { Product } from './models/product';

//RNF01
declare module 'express-session' {
    interface Session {
        favorites: string[];
    }
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  
app.use(session({ secret: 'youcom', cookie: { maxAge: 60000 }}));
app.use(cors(corsOptions));

app.get('/favorites', async (req: Request, res: Response) => {
    try {
        if(!req.session.favorites) {
            req.session.favorites = [];
        }
        
        res.status(200).json(req.session.favorites);
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});

//RF06
app.post('/toggleFavorite/:id', async (req: Request, res: Response) => {
    try {
        if(!req.session.favorites) {
            req.session.favorites = [];
        }
            
        if(req.session.favorites.indexOf(req.params.id) === -1) {
            req.session.favorites.push(req.params.id);
        }
        else {
            req.session.favorites.splice(req.session.favorites.indexOf(req.params.id), 1);
        }     
        
        res.status(200).json(req.session.favorites);
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});

app.get('/products', async (req: Request, res: Response) => {
    try {
            const acceptedCategories = [
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
            ];
            
            //RF01
            const response = await fetch('https://dummyjson.com/products?limit=100');
            const responseAsJson: any = (await response.json());
    
            //RF02
            let filteredProducts = responseAsJson.products.filter((product: Product) => acceptedCategories.includes(product.category));
            
            //RF03
            filteredProducts = filteredProducts.filter((product: Product) => product.stock >= 10);
    
            //RF04
            filteredProducts = filteredProducts.filter((product: Product) => (product.category !== 'womens-shoes' && product.category !== 'mens-shoes') || product.discountPercentage <= 15)
            
            res.status(200).json(filteredProducts);
      } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});