const fs = require('fs');
const path = require('path');

const imgDelete = (req, res, next) => {
  try { 
    if (req.body.oldImg) {
      console.log("aaa")
      let root = path.parse(__dirname).dir
      fs.unlinkSync(path.join(root, 'public','uploads', req.body.oldImg))
    } else {
      console.log("bbb")
      let root = path.parse(__dirname).dir
      fs.unlinkSync(path.join(root, 'public','uploads', req.body.imgName))
    }

  } catch (err) {
    console.log(err)
  }
	next();
}

module.exports = { imgDelete };