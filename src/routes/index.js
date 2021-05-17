import IndexController from "../controllers/IndexController";

export default app => {
  app.post("/rules", IndexController.rule);
  app.post("/transactions", IndexController.transaction);
  app.get("/cashbacks", IndexController.cashback);
};
