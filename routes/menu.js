const express = require("express");
const router = express.Router();

const controller = require("../controller/menu");
const upload = require('../utils/multer')


router.post("/addmenu", upload.upload.fields([{ name: 'dishImage', maxCount: 1 }, { name: 'dishImageGallery', maxCount: 8 }]), controller.addMenu);

router.get("/getmenu", controller.getMenus);
router.get("/getmenuitem", controller.getMenuitem);

router.put("/updatemenu/:id", controller.updateMenu);
router.patch("/updateonemenu/:id", controller.updateOneMenu);

router.delete("/deletemenu/:id", controller.deleteMenu);





module.exports = router;