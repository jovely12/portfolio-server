const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = 'public/uploads/';

		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}

		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		req.body.imgName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		cb(null, req.body.imgName);
		// cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
	if (allowedFileTypes.includes(path.extname(file.originalname))) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type'));
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 2 },
	fileFilter: fileFilter
});

module.exports = upload;