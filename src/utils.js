import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import multer from "multer";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
//hash password process
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//comparition hash password
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateMocking = async () => {
    let products = [];
    for(let i= 0; i< 100; i++){
        products.push(generateProduct());
    }
    return products;
}

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        Description: faker.commerce.productDescription(),
        Thumbnail: faker.image.imageUrl(),
        Code: faker.random.alphaNumeric(6),
        Stock: faker.datatype.number(100), 
        price: parseFloat(faker.commerce.price()),
        id: faker.datatype.uuid(),
    };
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder;
        if (file.fieldname === "profile") {
            folder = "profiles";
        } else if (file.fieldname === "thumbnail") {
            folder = "products";
        } else if (file.fieldname === "documents") {
            folder = "documents";
        } else {
            folder = "general";
        }

        cb(null, `${__dirname}/public/${folder}`);
        console.log(cb)
    },  
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
export const uploader = multer({storage});

export default __dirname;
