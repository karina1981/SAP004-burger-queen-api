import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import models from "../models";
import moment from "moment";

dotenv.config();

const server = express();

server.use(bodyParser.json());

server.get("/user", async (req, resp) => {
  const user = await models.User.findAll();
  resp.send(user);
});

server.get("/user/:id", async (req, resp) => {
  const user = await models.User.findByPk(req.params.id);
  resp.send(user);
});

server.get("/menu", async (req, resp) => {
  const menu = await models.Menu.findAll();
  resp.send(menu);
});

server.get("/menu/:id", async (req, resp) => {
  const menu = await models.Menu.findByPk(req.params.id);
  resp.send(menu);
});

server.post("/menu", async (req, resp) => {
  const { name, price, category, type } = req.body;

  const menu = await models.Menu.create({
    name,
    price,
    category,
    type,
  });
  resp.send(menu);
});

server.put("/menu/:id", async (req, resp) => {
  const id = req.params.id;
  const { name, price, category, type } = req.body;
  const menu = await models.Menu.findByPk(id);

  menu.name = name;
  menu.price = price;
  menu.category = category;
  menu.type = type;
  menu.save();

  resp.send(menu);
});

server.get("/request", async (req, resp) => {
  const request = await models.Request.findAll();
  resp.send(request);
});

server.get("/request/:id", async (req, resp) => {
  const request = await models.Request.findByPk(req.params.id);
  resp.send(request);
});

server.post("/request", async (req, resp) => {
  const { tableNumber, clientName, requestItens } = req.body;
  if (!tableNumber || !clientName || requestItens.length === 0) {
    return resp.status().send();
  }

  const totalValue = (requestItens || []).reduce((acumulate, currentValue) => {
    return acumulate
      ? parseFloat(currentValue.price) + acumulate
      : parseFloat(currentValue.price);
  });

  console.log(models.Request);
  const request = await models.Request.create({
    tableNumber,
    clientName,
    totalValue: parseFloat(totalValue),
    startDate: moment(),
  });

  const _requestItens = await Promise.all(
    requestItens.map(async (item) => {
      await models.RequestItem.create({ request_id: request.id, ...item });
    })
  );

  request.getRequestItem();

  // request.RequestItem().bulkCreate(requestItens);

  resp.send(request);
});

server.listen(process.env.HTTP_PORT, () => {
  console.log(`API running on port ${process.env.HTTP_PORT} ...`);
});
