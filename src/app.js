import path from "path";
import express from "express";
import morgan from "morgan";
import {create} from "express-handlebars";
import indexRoutes from "./routes/index.routes";

const app = express();

app.set("views", path.join(__dirname, "views"));

const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout:'main'
});

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//middkewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


//Routes
app.use(indexRoutes);

//static files
app.use(express.static(path.join(__dirname,"public")))

export default app;
