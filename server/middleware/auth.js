import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) return res.status(404).send(`auth failed`);
            const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500
            let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'dwadsadx')
            req.userId = decodedData?.id;
        }
        else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;

